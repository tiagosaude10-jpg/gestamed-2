-- GestaMed: real account approval, notifications and administrator audit.
-- Root administrator: tiagosaude10@gmail.com

create schema if not exists private;
revoke all on schema private from public, anon;
grant usage on schema private to authenticated;

alter table public.profiles
  add column if not exists account_status text not null default 'pending',
  add column if not exists approved_at timestamptz,
  add column if not exists approved_by uuid references public.profiles(id),
  add column if not exists blocked_at timestamptz,
  add column if not exists blocked_by uuid references public.profiles(id),
  add column if not exists status_reason text,
  add column if not exists updated_at timestamptz not null default now();

do $$
begin
  if not exists (
    select 1 from pg_constraint
    where conname = 'profiles_account_status_check'
      and conrelid = 'public.profiles'::regclass
  ) then
    alter table public.profiles
      add constraint profiles_account_status_check
      check (account_status in ('pending', 'approved', 'denied', 'blocked'));
  end if;
end $$;

update public.profiles
set is_admin = true,
    account_status = 'approved',
    approved_at = coalesce(approved_at, now()),
    updated_at = now()
where lower(email) = 'tiagosaude10@gmail.com';

create or replace function private.is_admin()
returns boolean
language sql
stable
security definer
set search_path = pg_catalog, public
as $$
  select coalesce((
    select p.is_admin and p.account_status = 'approved'
    from public.profiles p
    where p.id = auth.uid()
  ), false)
$$;

revoke all on function private.is_admin() from public, anon;
grant execute on function private.is_admin() to authenticated;

create table if not exists public.notifications (
  id uuid primary key default gen_random_uuid(),
  recipient_id uuid not null references public.profiles(id) on delete cascade,
  type text not null,
  title text not null,
  message text not null,
  subject_user_id uuid references public.profiles(id) on delete set null,
  created_at timestamptz not null default now(),
  read_at timestamptz
);

create index if not exists notifications_recipient_created_idx
  on public.notifications (recipient_id, created_at desc);

alter table public.notifications enable row level security;

create table if not exists public.admin_audit_log (
  id uuid primary key default gen_random_uuid(),
  admin_id uuid references public.profiles(id) on delete set null,
  target_user_id uuid not null references public.profiles(id) on delete cascade,
  action text not null,
  previous_status text,
  new_status text,
  reason text,
  created_at timestamptz not null default now()
);

create index if not exists admin_audit_log_created_idx
  on public.admin_audit_log (created_at desc);

alter table public.admin_audit_log enable row level security;

drop policy if exists profiles_select_own_or_admin on public.profiles;
create policy profiles_select_own_or_admin
on public.profiles for select to authenticated
using (auth.uid() = id or private.is_admin());

drop policy if exists profiles_admin_update on public.profiles;
create policy profiles_admin_update
on public.profiles for update to authenticated
using (private.is_admin())
with check (private.is_admin());

drop policy if exists access_requests_insert_own on public.access_requests;
create policy access_requests_insert_own
on public.access_requests for insert to authenticated
with check (
  auth.uid() = user_id
  and exists (
    select 1 from public.profiles p
    where p.id = auth.uid() and p.account_status = 'approved'
  )
);

drop policy if exists access_requests_select_own_or_admin on public.access_requests;
create policy access_requests_select_own_or_admin
on public.access_requests for select to authenticated
using (auth.uid() = user_id or private.is_admin());

drop policy if exists notifications_select_own on public.notifications;
create policy notifications_select_own
on public.notifications for select to authenticated
using (recipient_id = auth.uid());

drop policy if exists notifications_update_own on public.notifications;
create policy notifications_update_own
on public.notifications for update to authenticated
using (recipient_id = auth.uid())
with check (recipient_id = auth.uid());

drop policy if exists admin_audit_log_admin_select on public.admin_audit_log;
create policy admin_audit_log_admin_select
on public.admin_audit_log for select to authenticated
using (private.is_admin());

revoke all on public.profiles from anon;
revoke all on public.access_requests from anon;
revoke all on public.notifications from anon;
revoke all on public.admin_audit_log from anon;

grant select on public.profiles to authenticated;
revoke update on public.profiles from authenticated;
grant update (account_status, status_reason) on public.profiles to authenticated;
grant select, insert on public.access_requests to authenticated;
grant select on public.notifications to authenticated;
grant update (read_at) on public.notifications to authenticated;
grant select on public.admin_audit_log to authenticated;

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = pg_catalog, public
as $$
declare
  root_admin boolean := lower(coalesce(new.email, '')) = 'tiagosaude10@gmail.com';
  requested_name text;
begin
  requested_name := left(trim(regexp_replace(coalesce(new.raw_user_meta_data->>'display_name', ''), '\\s+', ' ', 'g')), 24);
  if requested_name = '' then
    requested_name := left(split_part(coalesce(new.email, 'Profissional'), '@', 1), 24);
  end if;

  insert into public.profiles (
    id, email, display_name, is_admin, account_status, approved_at, updated_at
  ) values (
    new.id,
    new.email,
    requested_name,
    root_admin,
    case when root_admin then 'approved' else 'pending' end,
    case when root_admin then now() else null end,
    now()
  )
  on conflict (id) do update set
    email = excluded.email,
    display_name = coalesce(nullif(public.profiles.display_name, ''), excluded.display_name),
    is_admin = case when root_admin then true else public.profiles.is_admin end,
    account_status = case when root_admin then 'approved' else public.profiles.account_status end,
    approved_at = case when root_admin then coalesce(public.profiles.approved_at, now()) else public.profiles.approved_at end,
    updated_at = now();
  return new;
end;
$$;

revoke all on function public.handle_new_user() from public, anon, authenticated;

create or replace function private.notify_new_pending_profile()
returns trigger
language plpgsql
security definer
set search_path = pg_catalog, public
as $$
begin
  if new.account_status = 'pending' then
    insert into public.notifications (recipient_id, type, title, message, subject_user_id)
    select p.id,
           'new_registration',
           'Novo cadastro aguardando aprovação',
           coalesce(new.display_name, new.email, 'Novo usuário') || ' solicitou acesso ao GestaMed.',
           new.id
    from public.profiles p
    where p.is_admin = true and p.account_status = 'approved' and p.id <> new.id;
  end if;
  return new;
end;
$$;

revoke all on function private.notify_new_pending_profile() from public, anon, authenticated;

drop trigger if exists on_profile_created_notify_admin on public.profiles;
create trigger on_profile_created_notify_admin
after insert on public.profiles
for each row execute function private.notify_new_pending_profile();

create or replace function private.audit_profile_status_change()
returns trigger
language plpgsql
security definer
set search_path = pg_catalog, public
as $$
declare
  actor uuid := auth.uid();
  action_name text;
begin
  if lower(coalesce(old.email, '')) = 'tiagosaude10@gmail.com' then
    new.is_admin := true;
    new.account_status := 'approved';
  else
    new.is_admin := old.is_admin;
  end if;

  if new.account_status is distinct from old.account_status then
    new.updated_at := now();
    if new.account_status = 'approved' then
      new.approved_at := now();
      new.approved_by := actor;
      new.blocked_at := null;
      new.blocked_by := null;
      action_name := case when old.account_status = 'blocked' then 'reactivated' else 'approved' end;
    elsif new.account_status = 'blocked' then
      new.blocked_at := now();
      new.blocked_by := actor;
      action_name := 'blocked';
    elsif new.account_status = 'denied' then
      action_name := 'denied';
    else
      action_name := 'returned_to_pending';
    end if;

    insert into public.admin_audit_log (
      admin_id, target_user_id, action, previous_status, new_status, reason
    ) values (
      actor, old.id, action_name, old.account_status, new.account_status, new.status_reason
    );

    insert into public.notifications (
      recipient_id, type, title, message, subject_user_id
    ) values (
      old.id,
      'account_status',
      case new.account_status
        when 'approved' then 'Acesso aprovado'
        when 'blocked' then 'Acesso bloqueado'
        when 'denied' then 'Cadastro não aprovado'
        else 'Cadastro em análise'
      end,
      case new.account_status
        when 'approved' then 'Seu acesso ao GestaMed foi liberado.'
        when 'blocked' then 'Seu acesso ao GestaMed foi bloqueado pela administração.'
        when 'denied' then 'Seu cadastro não foi aprovado pela administração.'
        else 'Seu cadastro voltou para análise administrativa.'
      end,
      old.id
    );
  end if;
  return new;
end;
$$;

revoke all on function private.audit_profile_status_change() from public, anon, authenticated;

drop trigger if exists before_profile_status_change on public.profiles;
create trigger before_profile_status_change
before update on public.profiles
for each row execute function private.audit_profile_status_change();

create or replace function public.admin_decide_request(request_id uuid, decision text)
returns void
language plpgsql
security definer
set search_path = pg_catalog, public
as $$
declare
  req public.access_requests%rowtype;
begin
  if not private.is_admin() then
    raise exception 'not authorized';
  end if;
  if decision not in ('approved', 'denied') then
    raise exception 'invalid decision';
  end if;

  select * into req from public.access_requests where id = request_id;
  if not found then
    raise exception 'request not found';
  end if;

  update public.access_requests
  set status = decision, decided_at = now(), decided_by = auth.uid()
  where id = request_id;

  if decision = 'approved' then
    if req.resource = 'cid' then
      update public.profiles set cid_access = true where id = req.user_id;
    elsif req.resource = 'labor_analise' then
      update public.profiles set labor_access = true where id = req.user_id;
    end if;
  end if;
end;
$$;

revoke all on function public.admin_decide_request(uuid, text) from public, anon;
grant execute on function public.admin_decide_request(uuid, text) to authenticated;

drop function if exists public.is_admin();

-- Security/performance hardening after the account approval migration.

drop policy if exists profiles_select_own_or_admin on public.profiles;
create policy profiles_select_own_or_admin
on public.profiles for select to authenticated
using ((select auth.uid()) = id or (select private.is_admin()));

drop policy if exists profiles_admin_update on public.profiles;
create policy profiles_admin_update
on public.profiles for update to authenticated
using ((select private.is_admin()))
with check ((select private.is_admin()));

drop policy if exists access_requests_insert_own on public.access_requests;
create policy access_requests_insert_own
on public.access_requests for insert to authenticated
with check (
  (select auth.uid()) = user_id
  and exists (
    select 1 from public.profiles p
    where p.id = (select auth.uid()) and p.account_status = 'approved'
  )
);

drop policy if exists access_requests_select_own_or_admin on public.access_requests;
create policy access_requests_select_own_or_admin
on public.access_requests for select to authenticated
using ((select auth.uid()) = user_id or (select private.is_admin()));

drop policy if exists access_requests_admin_update on public.access_requests;
create policy access_requests_admin_update
on public.access_requests for update to authenticated
using ((select private.is_admin()))
with check ((select private.is_admin()));

drop policy if exists notifications_select_own on public.notifications;
create policy notifications_select_own
on public.notifications for select to authenticated
using (recipient_id = (select auth.uid()));

drop policy if exists notifications_update_own on public.notifications;
create policy notifications_update_own
on public.notifications for update to authenticated
using (recipient_id = (select auth.uid()))
with check (recipient_id = (select auth.uid()));

drop policy if exists admin_audit_log_admin_select on public.admin_audit_log;
create policy admin_audit_log_admin_select
on public.admin_audit_log for select to authenticated
using ((select private.is_admin()));

grant update (status, decided_at, decided_by) on public.access_requests to authenticated;
grant update (cid_access, labor_access) on public.profiles to authenticated;

create or replace function public.admin_decide_request(request_id uuid, decision text)
returns void
language plpgsql
security invoker
set search_path = pg_catalog, public
as $$
declare
  req public.access_requests%rowtype;
begin
  if not private.is_admin() then
    raise exception 'not authorized';
  end if;
  if decision not in ('approved', 'denied') then
    raise exception 'invalid decision';
  end if;

  select * into req from public.access_requests where id = request_id;
  if not found then
    raise exception 'request not found';
  end if;

  update public.access_requests
  set status = decision, decided_at = now(), decided_by = auth.uid()
  where id = request_id;

  if decision = 'approved' then
    if req.resource = 'cid' then
      update public.profiles set cid_access = true where id = req.user_id;
    elsif req.resource = 'labor_analise' then
      update public.profiles set labor_access = true where id = req.user_id;
    end if;
  end if;
end;
$$;

create index if not exists access_requests_decided_by_idx on public.access_requests(decided_by);
create index if not exists admin_audit_log_admin_idx on public.admin_audit_log(admin_id);
create index if not exists admin_audit_log_target_idx on public.admin_audit_log(target_user_id);
create index if not exists notifications_subject_user_idx on public.notifications(subject_user_id);
create index if not exists profiles_approved_by_idx on public.profiles(approved_by);
create index if not exists profiles_blocked_by_idx on public.profiles(blocked_by);
