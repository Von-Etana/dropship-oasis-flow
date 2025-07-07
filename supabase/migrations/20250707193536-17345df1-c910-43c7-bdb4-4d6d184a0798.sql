
-- Create payment_integrations table
CREATE TABLE public.payment_integrations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  store_id UUID REFERENCES public.stores(id) ON DELETE CASCADE,
  provider TEXT NOT NULL CHECK (provider IN ('stripe', 'flutterwave', 'paystack')),
  api_key_encrypted TEXT,
  webhook_secret_encrypted TEXT,
  is_active BOOLEAN DEFAULT false,
  test_mode BOOLEAN DEFAULT true,
  settings JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create platform_integrations table
CREATE TABLE public.platform_integrations (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  store_id UUID REFERENCES public.stores(id) ON DELETE CASCADE,
  platform TEXT NOT NULL CHECK (platform IN ('shopify', 'woocommerce', 'ebay', 'wordpress')),
  api_key_encrypted TEXT,
  api_secret_encrypted TEXT,
  store_url TEXT,
  webhook_url TEXT,
  is_active BOOLEAN DEFAULT false,
  sync_products BOOLEAN DEFAULT true,
  sync_orders BOOLEAN DEFAULT true,
  last_sync_at TIMESTAMPTZ,
  settings JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create automated_orders table for supplier order processing
CREATE TABLE public.automated_orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  store_id UUID REFERENCES public.stores(id) ON DELETE CASCADE,
  order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE,
  supplier_name TEXT NOT NULL,
  supplier_order_id TEXT,
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'shipped', 'delivered', 'failed')),
  tracking_number TEXT,
  supplier_cost DECIMAL(10,2),
  profit_margin DECIMAL(5,2),
  order_data JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create payment_transactions table
CREATE TABLE public.payment_transactions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  store_id UUID REFERENCES public.stores(id) ON DELETE CASCADE,
  order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE,
  payment_provider TEXT NOT NULL,
  transaction_id TEXT NOT NULL,
  amount DECIMAL(10,2) NOT NULL,
  currency TEXT DEFAULT 'USD',
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed', 'refunded')),
  gateway_response JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create webhook_logs table for debugging
CREATE TABLE public.webhook_logs (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  store_id UUID REFERENCES public.stores(id) ON DELETE CASCADE,
  source TEXT NOT NULL,
  event_type TEXT NOT NULL,
  payload JSONB DEFAULT '{}',
  processed BOOLEAN DEFAULT false,
  error_message TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.payment_integrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.platform_integrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.automated_orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.payment_transactions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.webhook_logs ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for payment_integrations
CREATE POLICY "Users can view their own payment integrations" ON public.payment_integrations
  FOR SELECT USING (store_id IN (SELECT id FROM public.stores WHERE user_id = auth.uid()));

CREATE POLICY "Users can manage their own payment integrations" ON public.payment_integrations
  FOR ALL USING (store_id IN (SELECT id FROM public.stores WHERE user_id = auth.uid()));

-- Create RLS policies for platform_integrations
CREATE POLICY "Users can view their own platform integrations" ON public.platform_integrations
  FOR SELECT USING (store_id IN (SELECT id FROM public.stores WHERE user_id = auth.uid()));

CREATE POLICY "Users can manage their own platform integrations" ON public.platform_integrations
  FOR ALL USING (store_id IN (SELECT id FROM public.stores WHERE user_id = auth.uid()));

-- Create RLS policies for automated_orders
CREATE POLICY "Users can view their own automated orders" ON public.automated_orders
  FOR SELECT USING (store_id IN (SELECT id FROM public.stores WHERE user_id = auth.uid()));

CREATE POLICY "Users can manage their own automated orders" ON public.automated_orders
  FOR ALL USING (store_id IN (SELECT id FROM public.stores WHERE user_id = auth.uid()));

-- Create RLS policies for payment_transactions
CREATE POLICY "Users can view their own payment transactions" ON public.payment_transactions
  FOR SELECT USING (store_id IN (SELECT id FROM public.stores WHERE user_id = auth.uid()));

CREATE POLICY "Users can manage their own payment transactions" ON public.payment_transactions
  FOR ALL USING (store_id IN (SELECT id FROM public.stores WHERE user_id = auth.uid()));

-- Create RLS policies for webhook_logs
CREATE POLICY "Users can view their own webhook logs" ON public.webhook_logs
  FOR SELECT USING (store_id IN (SELECT id FROM public.stores WHERE user_id = auth.uid()));

CREATE POLICY "Users can manage their own webhook logs" ON public.webhook_logs
  FOR ALL USING (store_id IN (SELECT id FROM public.stores WHERE user_id = auth.uid()));
