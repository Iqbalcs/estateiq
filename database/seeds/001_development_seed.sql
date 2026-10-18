-- Development-only deterministic seed. Do not run against shared or production data.
BEGIN;

TRUNCATE TABLE sales, properties RESTART IDENTITY CASCADE;

INSERT INTO properties
  (title, description, city, address, property_type, listing_price, area_sqft, bedrooms, bathrooms, status, created_at, updated_at)
VALUES
  ('DHA Phase 6 Family Villa', 'Sunlit family villa with a landscaped lawn, study, and generous living spaces.', 'Lahore', 'Street 18, DHA Phase 6', 'House', 68500000, 4500, 5, 6, 'Sold', '2025-09-08', '2026-01-18'),
  ('Gulberg Executive Apartment', 'Modern apartment with city views, secure parking, and backup power.', 'Lahore', 'Main Boulevard, Gulberg III', 'Apartment', 24500000, 1650, 3, 3, 'Available', '2026-08-21', '2026-08-21'),
  ('Bahria Orchard Corner House', 'Corner home close to the community park with a separate drawing room.', 'Lahore', 'Block E, Bahria Orchard', 'House', 32800000, 2250, 4, 4, 'Sold', '2025-08-14', '2025-11-03'),
  ('Johar Town Retail Unit', 'Ground-floor commercial unit on a busy market corridor.', 'Lahore', 'G1 Market, Johar Town', 'Commercial', 29500000, 900, 0, 1, 'Available', '2026-09-02', '2026-09-02'),
  ('Model Town Garden House', 'Renovated house with mature trees, a terrace, and flexible family rooms.', 'Lahore', 'Block C, Model Town', 'House', 92000000, 5400, 6, 7, 'Available', '2026-06-17', '2026-06-17'),
  ('F-11 Park View Apartment', 'Well-planned apartment overlooking a park with lift and covered parking.', 'Islamabad', 'F-11 Markaz', 'Apartment', 31500000, 1900, 3, 3, 'Sold', '2025-10-02', '2025-12-12'),
  ('Bani Gala Hillside Home', 'Quiet hillside home with wide terraces and views toward Rawal Lake.', 'Islamabad', 'Street 9, Bani Gala', 'House', 57500000, 3800, 5, 5, 'Available', '2026-05-11', '2026-05-11'),
  ('Blue Area Office Floor', 'Fitted office floor with meeting rooms and reliable building services.', 'Islamabad', 'Jinnah Avenue, Blue Area', 'Commercial', 78000000, 4200, 0, 4, 'Sold', '2025-11-06', '2026-02-09'),
  ('G-13 Residential Plot', 'Level residential plot on a developed street with utilities available.', 'Islamabad', 'Street 42, G-13/3', 'Plot', 36500000, 2250, 0, 0, 'Available', '2026-09-19', '2026-09-19'),
  ('E-11 Skyline Apartment', 'Contemporary apartment with an open kitchen and mountain-facing balcony.', 'Islamabad', 'Sector E-11/2', 'Apartment', 19800000, 1350, 2, 2, 'Available', '2026-07-28', '2026-07-28'),
  ('Clifton Sea View Apartment', 'Spacious apartment with sea-facing windows and a staffed reception.', 'Karachi', 'Block 2, Clifton', 'Apartment', 47500000, 2350, 4, 4, 'Sold', '2025-07-12', '2025-10-21'),
  ('DHA Phase 8 Townhouse', 'Low-maintenance townhouse with contemporary finishes and a roof terrace.', 'Karachi', 'Zone B, DHA Phase 8', 'House', 84500000, 3900, 4, 5, 'Available', '2026-04-05', '2026-04-05'),
  ('Shahrah-e-Faisal Office', 'Efficient office suite near major transport links and business services.', 'Karachi', 'PECHS Block 6', 'Commercial', 52000000, 2800, 0, 3, 'Sold', '2025-12-09', '2026-03-14'),
  ('Scheme 33 Residential Plot', 'West-open plot in a growing gated community with paved access.', 'Karachi', 'Sector 27-A, Scheme 33', 'Plot', 14200000, 2160, 0, 0, 'Available', '2026-08-07', '2026-08-07'),
  ('Gulshan Family Apartment', 'Comfortable family apartment near schools, shops, and public transport.', 'Karachi', 'Block 13-D, Gulshan-e-Iqbal', 'Apartment', 17600000, 1550, 3, 3, 'Available', '2026-10-01', '2026-10-01'),
  ('Bahria Town Designer House', 'Designer home featuring double-height living and a private courtyard.', 'Rawalpindi', 'Overseas Enclave, Bahria Town', 'House', 46500000, 3100, 5, 5, 'Sold', '2025-09-25', '2026-04-07'),
  ('Saddar Main Road Shop', 'High-visibility shop suited to retail or customer-facing services.', 'Rawalpindi', 'Bank Road, Saddar', 'Commercial', 33500000, 750, 0, 1, 'Available', '2026-06-03', '2026-06-03'),
  ('Askari 14 Family Apartment', 'Secure family apartment with playground access and reserved parking.', 'Rawalpindi', 'Sector B, Askari 14', 'Apartment', 18750000, 1450, 3, 3, 'Sold', '2025-10-17', '2026-05-16'),
  ('Chakri Road Farm Plot', 'Accessible farm plot with a level site and clear boundary markers.', 'Rawalpindi', 'Chakri Road', 'Plot', 9800000, 10800, 0, 0, 'Available', '2026-09-11', '2026-09-11'),
  ('University Town Residence', 'Updated residence with two lounges and a compact private garden.', 'Peshawar', 'Road 4, University Town', 'House', 49800000, 3600, 5, 5, 'Available', '2026-03-19', '2026-03-19'),
  ('Hayatabad Corner Plot', 'Prime corner plot near a neighborhood mosque and commercial street.', 'Peshawar', 'Phase 3, Hayatabad', 'Plot', 28500000, 2250, 0, 0, 'Sold', '2025-08-30', '2026-06-22'),
  ('Saddar Trade Centre Office', 'Ready-to-use office with reception, cabins, and a conference room.', 'Peshawar', 'Saddar Road', 'Commercial', 26400000, 1800, 0, 2, 'Available', '2026-07-09', '2026-07-09'),
  ('Hayatabad Modern House', 'Modern family house with practical planning and durable finishes.', 'Peshawar', 'Phase 6, Hayatabad', 'House', 54200000, 4050, 6, 6, 'Sold', '2025-12-22', '2026-07-31'),
  ('Cantt Compact Apartment', 'Bright compact apartment in a quiet, well-connected neighborhood.', 'Peshawar', 'Peshawar Cantt', 'Apartment', 12800000, 1050, 2, 2, 'Available', '2026-09-27', '2026-09-27'),
  ('Lake City Golf View Villa', 'Premium villa with golf-course views and a ground-floor guest suite.', 'Lahore', 'Sector M7, Lake City', 'House', 73500000, 4700, 5, 6, 'Available', '2026-02-12', '2026-02-12'),
  ('Gulberg Studio Suite', 'Efficient serviced studio suited to executives and long-term stays.', 'Lahore', 'MM Alam Road, Gulberg', 'Apartment', 15200000, 680, 1, 1, 'Sold', '2025-11-18', '2026-08-18'),
  ('Gulberg Greens Farmhouse Plot', 'Large farmhouse plot in a planned green community near the expressway.', 'Islamabad', 'Block B, Gulberg Greens', 'Plot', 61000000, 21780, 0, 0, 'Available', '2026-10-05', '2026-10-05'),
  ('North Nazimabad Family Home', 'Solid family home with a flexible upper portion and broad frontage.', 'Karachi', 'Block H, North Nazimabad', 'House', 62500000, 3600, 5, 5, 'Available', '2026-01-23', '2026-01-23');

INSERT INTO sales (property_id, sale_price, sold_at, created_at)
VALUES
  (1, 65750000, '2026-01-18', '2026-01-18 11:20:00+05'),
  (3, 31500000, '2025-11-03', '2025-11-03 15:05:00+05'),
  (6, 30250000, '2025-12-12', '2025-12-12 10:40:00+05'),
  (8, 74200000, '2026-02-09', '2026-02-09 13:15:00+05'),
  (11, 45100000, '2025-10-21', '2025-10-21 16:30:00+05'),
  (13, 49800000, '2026-03-14', '2026-03-14 12:10:00+05'),
  (16, 44750000, '2026-04-07', '2026-04-07 14:45:00+05'),
  (18, 17900000, '2026-05-16', '2026-05-16 11:05:00+05'),
  (21, 27300000, '2026-06-22', '2026-06-22 17:25:00+05'),
  (23, 51900000, '2026-07-31', '2026-07-31 12:55:00+05'),
  (26, 14600000, '2026-08-18', '2026-08-18 10:15:00+05');

COMMIT;
