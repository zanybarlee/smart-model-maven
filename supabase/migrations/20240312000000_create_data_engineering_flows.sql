
create table if not exists data_engineering_flows (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  description text,
  flow_data jsonb not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  updated_at timestamp with time zone default timezone('utc'::text, now()) not null,
  user_id uuid references auth.users not null
);

-- Enable RLS
alter table data_engineering_flows enable row level security;

-- Create policies
create policy "Users can view their own flows"
  on data_engineering_flows for select
  using (auth.uid() = user_id);

create policy "Users can create their own flows"
  on data_engineering_flows for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own flows"
  on data_engineering_flows for update
  using (auth.uid() = user_id);

create policy "Users can delete their own flows"
  on data_engineering_flows for delete
  using (auth.uid() = user_id);

-- Add updated_at trigger
create trigger handle_updated_at before update on data_engineering_flows
  for each row execute procedure moddatetime (updated_at);
