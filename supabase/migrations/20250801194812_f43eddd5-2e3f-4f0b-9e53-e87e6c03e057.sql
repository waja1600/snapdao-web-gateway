
-- Create investment groups table
CREATE TABLE public.investment_groups (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  target_amount DECIMAL(12,2) NOT NULL,
  current_amount DECIMAL(12,2) DEFAULT 0,
  min_investment DECIMAL(12,2) NOT NULL,
  max_investors INTEGER NOT NULL,
  current_investors INTEGER DEFAULT 0,
  risk_level TEXT NOT NULL CHECK (risk_level IN ('low', 'medium', 'high')),
  expected_return TEXT,
  duration TEXT,
  category TEXT,
  status TEXT DEFAULT 'forming' CHECK (status IN ('forming', 'active', 'completed', 'cancelled')),
  creator_id UUID REFERENCES auth.users(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create investment participations table
CREATE TABLE public.investment_participations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  investment_group_id UUID REFERENCES public.investment_groups(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id),
  amount DECIMAL(12,2) NOT NULL,
  share_percentage DECIMAL(5,2),
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'withdrawn')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(investment_group_id, user_id)
);

-- Create wallet transactions table
CREATE TABLE public.wallet_transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id),
  type TEXT NOT NULL CHECK (type IN ('deposit', 'withdrawal', 'transfer_in', 'transfer_out', 'investment', 'dividend', 'fee', 'bonus')),
  amount DECIMAL(12,2) NOT NULL,
  balance_after DECIMAL(12,2) NOT NULL,
  description TEXT,
  reference_id UUID,
  reference_type TEXT,
  status TEXT DEFAULT 'completed' CHECK (status IN ('pending', 'completed', 'failed', 'cancelled')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.investment_groups ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.investment_participations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.wallet_transactions ENABLE ROW LEVEL SECURITY;

-- RLS Policies for investment_groups
CREATE POLICY "Anyone can view investment groups" ON public.investment_groups
  FOR SELECT USING (true);

CREATE POLICY "Authenticated users can create investment groups" ON public.investment_groups
  FOR INSERT WITH CHECK (auth.uid() = creator_id);

CREATE POLICY "Creators can update their investment groups" ON public.investment_groups
  FOR UPDATE USING (auth.uid() = creator_id);

-- RLS Policies for investment_participations
CREATE POLICY "Users can view participations they're involved in" ON public.investment_participations
  FOR SELECT USING (
    auth.uid() = user_id OR 
    auth.uid() IN (
      SELECT creator_id FROM public.investment_groups 
      WHERE id = investment_group_id
    )
  );

CREATE POLICY "Users can create their own participations" ON public.investment_participations
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own participations" ON public.investment_participations
  FOR UPDATE USING (auth.uid() = user_id);

-- RLS Policies for wallet_transactions
CREATE POLICY "Users can view their own transactions" ON public.wallet_transactions
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "System can insert transactions" ON public.wallet_transactions
  FOR INSERT WITH CHECK (true);

-- Create wallet balance function
CREATE OR REPLACE FUNCTION public.get_wallet_balance(p_user_id UUID)
RETURNS DECIMAL(12,2)
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  balance DECIMAL(12,2);
BEGIN
  SELECT COALESCE(
    (SELECT balance_after FROM public.wallet_transactions 
     WHERE user_id = p_user_id 
     ORDER BY created_at DESC LIMIT 1), 
    0
  ) INTO balance;
  
  RETURN balance;
END;
$$;

-- Create investment participation function
CREATE OR REPLACE FUNCTION public.join_investment_group(
  p_group_id UUID,
  p_user_id UUID,
  p_amount DECIMAL(12,2)
)
RETURNS BOOLEAN
LANGUAGE plpgsql
SECURITY DEFINER
AS $$
DECLARE
  group_record RECORD;
  user_balance DECIMAL(12,2);
  new_share DECIMAL(5,2);
BEGIN
  -- Get group details
  SELECT * INTO group_record FROM public.investment_groups WHERE id = p_group_id;
  
  IF NOT FOUND OR group_record.status != 'forming' THEN
    RETURN FALSE;
  END IF;
  
  -- Check minimum investment
  IF p_amount < group_record.min_investment THEN
    RETURN FALSE;
  END IF;
  
  -- Check if group is full
  IF group_record.current_investors >= group_record.max_investors THEN
    RETURN FALSE;
  END IF;
  
  -- Check user balance
  user_balance := public.get_wallet_balance(p_user_id);
  IF user_balance < p_amount THEN
    RETURN FALSE;
  END IF;
  
  -- Calculate share percentage
  new_share := (p_amount / (group_record.current_amount + p_amount)) * 100;
  
  -- Insert participation
  INSERT INTO public.investment_participations (
    investment_group_id, user_id, amount, share_percentage
  ) VALUES (
    p_group_id, p_user_id, p_amount, new_share
  );
  
  -- Update group totals
  UPDATE public.investment_groups
  SET 
    current_amount = current_amount + p_amount,
    current_investors = current_investors + 1,
    updated_at = now()
  WHERE id = p_group_id;
  
  -- Create wallet transaction
  INSERT INTO public.wallet_transactions (
    user_id, type, amount, balance_after, description, reference_id, reference_type
  ) VALUES (
    p_user_id, 'investment', -p_amount, user_balance - p_amount,
    'Investment in ' || group_record.name, p_group_id, 'investment_group'
  );
  
  RETURN TRUE;
END;
$$;
