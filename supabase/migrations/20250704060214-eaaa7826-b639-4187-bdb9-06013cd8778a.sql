-- Add missing columns to groups table
ALTER TABLE public.groups ADD COLUMN IF NOT EXISTS points_required INTEGER DEFAULT 0;

-- Create group_join_requests table
CREATE TABLE IF NOT EXISTS public.group_join_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  group_id UUID NOT NULL REFERENCES public.groups(id) ON DELETE CASCADE,
  user_id UUID NOT NULL,
  points_required INTEGER NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'approved', 'rejected')),
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create admin_elections table  
CREATE TABLE IF NOT EXISTS public.admin_elections (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  group_id UUID NOT NULL REFERENCES public.groups(id) ON DELETE CASCADE,
  phase TEXT NOT NULL,
  title TEXT NOT NULL,
  candidates UUID[] NOT NULL DEFAULT '{}',
  votes JSONB DEFAULT '{}',
  status TEXT NOT NULL DEFAULT 'active' CHECK (status IN ('active', 'completed')),
  elected_admins UUID[] DEFAULT '{}',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create admin_votes table
CREATE TABLE IF NOT EXISTS public.admin_votes (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  election_id UUID NOT NULL REFERENCES public.admin_elections(id) ON DELETE CASCADE,
  voter_id UUID NOT NULL,
  selected_admins UUID[] NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(election_id, voter_id)
);

-- Add missing columns to group_members table
ALTER TABLE public.group_members ADD COLUMN IF NOT EXISTS status TEXT DEFAULT 'active' CHECK (status IN ('pending', 'awaiting_approval', 'active', 'frozen'));
ALTER TABLE public.group_members ADD COLUMN IF NOT EXISTS points_held INTEGER DEFAULT 0;

-- Create group_actions_log table for admin actions
CREATE TABLE IF NOT EXISTS public.group_actions_log (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  group_id UUID NOT NULL REFERENCES public.groups(id) ON DELETE CASCADE,
  admin_id UUID NOT NULL,
  target_user_id UUID,
  action TEXT NOT NULL,
  reason TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all new tables
ALTER TABLE public.group_join_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_elections ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_votes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.group_actions_log ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for group_join_requests
CREATE POLICY "Anyone can view join requests" ON public.group_join_requests FOR SELECT USING (true);
CREATE POLICY "Users can create join requests" ON public.group_join_requests FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update their join requests" ON public.group_join_requests FOR UPDATE USING (auth.uid() = user_id);

-- Create RLS policies for admin_elections
CREATE POLICY "Anyone can view elections" ON public.admin_elections FOR SELECT USING (true);
CREATE POLICY "Authenticated users can create elections" ON public.admin_elections FOR INSERT WITH CHECK (auth.uid() IS NOT NULL);
CREATE POLICY "Authenticated users can update elections" ON public.admin_elections FOR UPDATE USING (auth.uid() IS NOT NULL);

-- Create RLS policies for admin_votes
CREATE POLICY "Anyone can view votes" ON public.admin_votes FOR SELECT USING (true);
CREATE POLICY "Users can vote" ON public.admin_votes FOR INSERT WITH CHECK (auth.uid() = voter_id);

-- Create RLS policies for group_actions_log
CREATE POLICY "Anyone can view action logs" ON public.group_actions_log FOR SELECT USING (true);
CREATE POLICY "Admins can create action logs" ON public.group_actions_log FOR INSERT WITH CHECK (auth.uid() = admin_id);