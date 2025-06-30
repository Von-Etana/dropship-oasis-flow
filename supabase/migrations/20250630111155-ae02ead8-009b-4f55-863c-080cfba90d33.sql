
-- Create stores table to manage AI-built stores
CREATE TABLE public.stores (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  domain TEXT UNIQUE,
  subdomain TEXT UNIQUE,
  description TEXT,
  logo_url TEXT,
  primary_color TEXT DEFAULT '#6366f1',
  secondary_color TEXT DEFAULT '#f59e0b',
  font_family TEXT DEFAULT 'Inter',
  template_id TEXT,
  company_profile JSONB,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'published', 'paused')),
  settings JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create products table to manage imported products
CREATE TABLE public.products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  store_id UUID REFERENCES public.stores(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10,2),
  compare_at_price DECIMAL(10,2),
  sku TEXT,
  barcode TEXT,
  inventory_quantity INTEGER DEFAULT 0,
  images JSONB DEFAULT '[]',
  variants JSONB DEFAULT '[]',
  tags TEXT[],
  category TEXT,
  supplier_name TEXT,
  supplier_url TEXT,
  status TEXT DEFAULT 'draft' CHECK (status IN ('draft', 'active', 'archived')),
  seo_title TEXT,
  seo_description TEXT,
  weight DECIMAL(8,2),
  dimensions JSONB,
  shipping_info JSONB,
  reviews JSONB DEFAULT '[]',
  rating DECIMAL(3,2) DEFAULT 0,
  review_count INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create orders table for payment processing
CREATE TABLE public.orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  store_id UUID REFERENCES public.stores(id) ON DELETE CASCADE,
  user_id UUID REFERENCES auth.users(id),
  customer_email TEXT NOT NULL,
  customer_name TEXT,
  customer_phone TEXT,
  shipping_address JSONB,
  billing_address JSONB,
  line_items JSONB NOT NULL,
  subtotal DECIMAL(10,2) NOT NULL,
  tax_amount DECIMAL(10,2) DEFAULT 0,
  shipping_amount DECIMAL(10,2) DEFAULT 0,
  total_amount DECIMAL(10,2) NOT NULL,
  currency TEXT DEFAULT 'USD',
  payment_status TEXT DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'failed', 'refunded')),
  fulfillment_status TEXT DEFAULT 'unfulfilled' CHECK (fulfillment_status IN ('unfulfilled', 'fulfilled', 'cancelled')),
  stripe_session_id TEXT,
  stripe_payment_intent_id TEXT,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Create file uploads table for company profiles and assets
CREATE TABLE public.file_uploads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  store_id UUID REFERENCES public.stores(id) ON DELETE CASCADE,
  filename TEXT NOT NULL,
  file_path TEXT NOT NULL,
  file_type TEXT NOT NULL,
  file_size INTEGER,
  upload_type TEXT NOT NULL CHECK (upload_type IN ('company_profile', 'logo', 'product_image', 'other')),
  metadata JSONB DEFAULT '{}',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.stores ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.file_uploads ENABLE ROW LEVEL SECURITY;

-- RLS Policies for stores
CREATE POLICY "Users can view their own stores" ON public.stores
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users can create their own stores" ON public.stores
  FOR INSERT WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update their own stores" ON public.stores
  FOR UPDATE USING (user_id = auth.uid());

CREATE POLICY "Users can delete their own stores" ON public.stores
  FOR DELETE USING (user_id = auth.uid());

-- RLS Policies for products
CREATE POLICY "Users can view their own products" ON public.products
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users can create their own products" ON public.products
  FOR INSERT WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can update their own products" ON public.products
  FOR UPDATE USING (user_id = auth.uid());

CREATE POLICY "Users can delete their own products" ON public.products
  FOR DELETE USING (user_id = auth.uid());

-- RLS Policies for orders
CREATE POLICY "Users can view orders for their stores" ON public.orders
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM public.stores 
      WHERE stores.id = orders.store_id 
      AND stores.user_id = auth.uid()
    )
  );

CREATE POLICY "Anyone can create orders" ON public.orders
  FOR INSERT WITH CHECK (true);

-- RLS Policies for file uploads
CREATE POLICY "Users can view their own uploads" ON public.file_uploads
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Users can create their own uploads" ON public.file_uploads
  FOR INSERT WITH CHECK (user_id = auth.uid());

CREATE POLICY "Users can delete their own uploads" ON public.file_uploads
  FOR DELETE USING (user_id = auth.uid());

-- Create indexes for better performance
CREATE INDEX idx_stores_user_id ON public.stores(user_id);
CREATE INDEX idx_stores_domain ON public.stores(domain);
CREATE INDEX idx_stores_subdomain ON public.stores(subdomain);
CREATE INDEX idx_products_store_id ON public.products(store_id);
CREATE INDEX idx_products_user_id ON public.products(user_id);
CREATE INDEX idx_products_status ON public.products(status);
CREATE INDEX idx_orders_store_id ON public.orders(store_id);
CREATE INDEX idx_orders_payment_status ON public.orders(payment_status);
CREATE INDEX idx_file_uploads_user_id ON public.file_uploads(user_id);
CREATE INDEX idx_file_uploads_store_id ON public.file_uploads(store_id);
