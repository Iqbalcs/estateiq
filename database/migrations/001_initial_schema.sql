CREATE TABLE IF NOT EXISTS properties (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  title VARCHAR(160) NOT NULL,
  description TEXT NOT NULL,
  city VARCHAR(80) NOT NULL,
  address VARCHAR(220) NOT NULL,
  property_type VARCHAR(20) NOT NULL,
  listing_price NUMERIC(14, 2) NOT NULL,
  area_sqft INTEGER NOT NULL,
  bedrooms SMALLINT NOT NULL DEFAULT 0,
  bathrooms SMALLINT NOT NULL DEFAULT 0,
  status VARCHAR(12) NOT NULL DEFAULT 'Available',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT properties_title_not_blank CHECK (length(trim(title)) > 0),
  CONSTRAINT properties_description_not_blank CHECK (length(trim(description)) > 0),
  CONSTRAINT properties_city_not_blank CHECK (length(trim(city)) > 0),
  CONSTRAINT properties_address_not_blank CHECK (length(trim(address)) > 0),
  CONSTRAINT properties_type_valid CHECK (property_type IN ('House', 'Apartment', 'Commercial', 'Plot')),
  CONSTRAINT properties_status_valid CHECK (status IN ('Available', 'Sold')),
  CONSTRAINT properties_listing_price_positive CHECK (listing_price > 0),
  CONSTRAINT properties_area_positive CHECK (area_sqft > 0),
  CONSTRAINT properties_bedrooms_nonnegative CHECK (bedrooms >= 0),
  CONSTRAINT properties_bathrooms_nonnegative CHECK (bathrooms >= 0)
);

CREATE TABLE IF NOT EXISTS sales (
  id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  property_id BIGINT NOT NULL REFERENCES properties(id) ON DELETE RESTRICT,
  sale_price NUMERIC(14, 2) NOT NULL,
  sold_at DATE NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  CONSTRAINT sales_property_unique UNIQUE (property_id),
  CONSTRAINT sales_price_positive CHECK (sale_price > 0),
  CONSTRAINT sales_date_not_future CHECK (sold_at <= CURRENT_DATE)
);

CREATE INDEX IF NOT EXISTS idx_properties_city ON properties(city);
CREATE INDEX IF NOT EXISTS idx_properties_type ON properties(property_type);
CREATE INDEX IF NOT EXISTS idx_properties_status ON properties(status);
CREATE INDEX IF NOT EXISTS idx_properties_price ON properties(listing_price);
CREATE INDEX IF NOT EXISTS idx_properties_created_at ON properties(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_properties_title_lower ON properties(LOWER(title));
CREATE INDEX IF NOT EXISTS idx_properties_city_lower ON properties(LOWER(city));
CREATE INDEX IF NOT EXISTS idx_sales_sold_at ON sales(sold_at DESC);

CREATE OR REPLACE FUNCTION set_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS properties_set_updated_at ON properties;
CREATE TRIGGER properties_set_updated_at
BEFORE UPDATE ON properties
FOR EACH ROW
EXECUTE FUNCTION set_updated_at();
