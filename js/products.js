/**
 * BJA ENTERPRISE — Product Catalogue Data
 * 
 * Each product adheres to the PRD schema:
 * - id: unique string identifier
 * - name: product name
 * - category: category key matching filter categories
 * - image: relative path to product asset
 * - imageAlt: descriptive alternative text
 * - shortDescription: concise product summary
 * - brandModel: confirmed brand / model string (or null)
 * - specifications: array of key specifications (or null)
 * - price: approved price in INR (number) or null for "Ask for price"
 * - availability: availability note (e.g. "Contact shop for availability")
 * - featured: whether highlighted on initial landing
 * - active: whether visible in catalogue
 */

const PRODUCT_CATEGORIES = [
  { id: 'all', label: 'All Products' },
  { id: 'gifts-home', label: 'Gifts & Home Items' },
  { id: 'electrical-lighting', label: 'Electrical & Lighting' },
  { id: 'fans-appliances', label: 'Fans & Small Appliances' },
  { id: 'kitchen-dining', label: 'Kitchen & Dining' },
  { id: 'bottles-storage', label: 'Bottles & Storage' }
];

const PRODUCTS_DATA = [
  {
    id: 'prod-001',
    name: '1200mm High-Speed Decorative Ceiling Fan',
    category: 'fans-appliances',
    categoryName: 'Fans & Small Appliances',
    image: 'assets/products/ceiling_fan.jpg',
    imageAlt: '1200mm high-speed decorative ceiling fan in premium matte brown and gold finish',
    shortDescription: 'High air delivery decorative ceiling fan engineered for whisper-quiet performance and energy efficiency.',
    brandModel: '1200mm Decorative Series',
    specifications: [
      'Sweep size: 1200 mm (48 inches)',
      'High-speed copper motor',
      'Aerodynamically balanced blades',
      'Rust-resistant metallic powder finish'
    ],
    price: null, // "Ask for price" as required by PRD when unconfirmed
    availability: 'Contact shop for availability',
    featured: true,
    active: true
  },
  {
    id: 'prod-002',
    name: '750W Heavy Duty Mixer Grinder (3 Jars)',
    category: 'fans-appliances',
    categoryName: 'Fans & Small Appliances',
    image: 'assets/products/mixer_grinder.jpg',
    imageAlt: '750W heavy duty mixer grinder with three stainless steel jars',
    shortDescription: 'Powerful 750-watt kitchen mixer grinder equipped with 3 durable stainless steel jars for wet, dry, and chutney grinding.',
    brandModel: '750W Power Series',
    specifications: [
      'Motor power: 750 Watts',
      '3 Stainless steel jars with flow breakers',
      'Overload protection indicator',
      '3-speed rotary control with incher pulse'
    ],
    price: null,
    availability: 'Contact shop for availability',
    featured: true,
    active: true
  },
  {
    id: 'prod-003',
    name: '1.8L Stainless Steel Electric Kettle',
    category: 'fans-appliances',
    categoryName: 'Fans & Small Appliances',
    image: 'assets/products/electric_kettle.jpg',
    imageAlt: '1.8 Litre brushed stainless steel electric kettle with automatic shut-off base',
    shortDescription: 'Rapid-boil stainless steel cordless electric kettle with 360-degree rotational base and auto-cut safety feature.',
    brandModel: '1.8L QuickBoil Series',
    specifications: [
      'Capacity: 1.8 Litres',
      'Food-grade stainless steel interior',
      'Concealed heating element',
      'Automatic shut-off & boil-dry protection'
    ],
    price: null,
    availability: 'Contact shop for availability',
    featured: true,
    active: true
  },
  {
    id: 'prod-004',
    name: '400mm Oscillating Table Fan',
    category: 'fans-appliances',
    categoryName: 'Fans & Small Appliances',
    image: 'assets/products/table_fan.jpg',
    imageAlt: '400mm high air delivery table fan with wide angle oscillation',
    shortDescription: 'Compact and high-performance table fan with jerk-free oscillation and multi-speed airflow adjustment.',
    brandModel: '400mm Breeze Series',
    specifications: [
      'Sweep: 400 mm (16 inches)',
      'Wide angle 90-degree oscillation',
      'Sturdy base with push-button controls',
      'Thermal overload motor protection'
    ],
    price: null,
    availability: 'Contact shop for availability',
    featured: false,
    active: true
  },
  {
    id: 'prod-005',
    name: '1000W Heavy Deluxe Dry Iron',
    category: 'fans-appliances',
    categoryName: 'Fans & Small Appliances',
    image: 'assets/products/dry_iron.svg',
    imageAlt: '1000W deluxe heavy dry iron with non-stick coated soleplate',
    shortDescription: 'Ergonomic 1000W dry iron with a non-stick golden coated soleplate for smooth, wrinkle-free ironing.',
    brandModel: '1000W Deluxe',
    specifications: [
      'Power: 1000 Watts',
      'Non-stick dual-layer soleplate',
      'Adjustable fabric temperature dial',
      '360-degree swivel cord'
    ],
    price: null,
    availability: 'Contact shop for availability',
    featured: false,
    active: true
  },
  {
    id: 'prod-006',
    name: '9W Inverter Emergency LED Bulb',
    category: 'electrical-lighting',
    categoryName: 'Electrical & Lighting',
    image: 'assets/products/emergency_bulb.jpg',
    imageAlt: '9W rechargeable inverter emergency LED light bulb with battery backup',
    shortDescription: 'Smart inverter LED bulb that lights up automatically during power outages with up to 4 hours of backup battery.',
    brandModel: '9W Inverter LED',
    specifications: [
      'Wattage: 9W (Cool Daylight 6500K)',
      'Built-in lithium-ion rechargeable battery',
      'Up to 4 hours backup on power failure',
      'Fits standard B22 / E27 holders'
    ],
    price: null,
    availability: 'Contact shop for availability',
    featured: true,
    active: true
  },
  {
    id: 'prod-007',
    name: '20W Slim LED Batten Tube Light',
    category: 'electrical-lighting',
    categoryName: 'Electrical & Lighting',
    image: 'assets/products/batten_light.svg',
    imageAlt: '20W slim glare-free LED batten tube light fixture',
    shortDescription: 'Sleek and glare-free 20W LED batten providing uniform, high-lumen illumination for homes and offices.',
    brandModel: '20W Batten Slim',
    specifications: [
      'Power: 20 Watts',
      'High lumen output (2000+ Lumens)',
      'Surge protection up to 3.5kV',
      'Lightweight polycarbonate body'
    ],
    price: null,
    availability: 'Contact shop for availability',
    featured: false,
    active: true
  },
  {
    id: 'prod-008',
    name: 'Modular 6A Switches & Socket Pack',
    category: 'electrical-lighting',
    categoryName: 'Electrical & Lighting',
    image: 'assets/products/modular_switches.svg',
    imageAlt: 'Modular 6A wall switch and shuttered socket plate combo',
    shortDescription: 'Flame-retardant modular switches and safety-shuttered power sockets for domestic electrical installations.',
    brandModel: 'Modular Elite Series',
    specifications: [
      'Rating: 6A / 240V AC',
      'UV-stabilized polycarbonate material',
      'Child-safe socket shutters',
      'Silver cadmium contacts for long life'
    ],
    price: null,
    availability: 'Contact shop for availability',
    featured: false,
    active: true
  },
  {
    id: 'prod-009',
    name: '4-Socket Surge & Spike Protector Board',
    category: 'electrical-lighting',
    categoryName: 'Electrical & Lighting',
    image: 'assets/products/spike_guard.svg',
    imageAlt: '4-socket universal surge and spike protector extension board',
    shortDescription: 'Heavy-duty multi-plug extension board with built-in surge suppressor and individual safety switches.',
    brandModel: 'SpikeGuard 4-Way',
    specifications: [
      '4 Universal socket outlets',
      'Master reset / overload switch',
      'Heavy-duty copper wiring (2-metre cable)',
      'High-grade fire-resistant casing'
    ],
    price: null,
    availability: 'Contact shop for availability',
    featured: false,
    active: true
  },
  {
    id: 'prod-010',
    name: '5-Litre Induction Base Pressure Cooker',
    category: 'kitchen-dining',
    categoryName: 'Kitchen & Dining',
    image: 'assets/products/pressure_cooker.jpg',
    imageAlt: '5-litre hard anodized induction base pressure cooker',
    shortDescription: 'Durable hard-anodized pressure cooker compatible with both induction cooktops and gas stoves.',
    brandModel: '5L Hard Anodized',
    specifications: [
      'Capacity: 5.0 Litres',
      'Hard anodized body with stainless steel lid',
      'Induction & Gas stove compatible',
      'Precision weight valve and safety gasket'
    ],
    price: null,
    availability: 'Contact shop for availability',
    featured: true,
    active: true
  },
  {
    id: 'prod-011',
    name: '32-Piece Melamine Floral Dinner Set',
    category: 'kitchen-dining',
    categoryName: 'Kitchen & Dining',
    image: 'assets/products/dinner_set.jpg',
    imageAlt: '32-piece elegant floral melamine dinner set with plates, bowls and spoons',
    shortDescription: 'Break-resistant, food-grade melamine dinner set with elegant floral motifs, perfect for family dining and festive gifts.',
    brandModel: 'Royal Flora 32-Pc',
    specifications: [
      '32 Pieces: full plates, quarter plates, bowls, serving spoons',
      '100% Food-grade & BPA-free melamine',
      'Stain-resistant and dishwasher safe',
      'Premium gift packaging'
    ],
    price: null,
    availability: 'Contact shop for availability',
    featured: true,
    active: true
  },
  {
    id: 'prod-012',
    name: '3-Piece Non-Stick Granite Cookware Set',
    category: 'kitchen-dining',
    categoryName: 'Kitchen & Dining',
    image: 'assets/products/cookware_set.svg',
    imageAlt: '3-piece non-stick cookware set including kadhai with lid, fry pan and tawa',
    shortDescription: 'Multi-layer non-stick cookware set comprising a kadhai with glass lid, frying pan, and flat dosa tawa.',
    brandModel: 'Granite Tri-Ply Combo',
    specifications: [
      'Includes: Kadhai with lid (24cm), Fry Pan (24cm), Flat Tawa (28cm)',
      'Multi-layer scratch-resistant non-stick coating',
      'Cool-touch bakelite handles',
      'Gas and induction compatible'
    ],
    price: null,
    availability: 'Contact shop for availability',
    featured: false,
    active: true
  },
  {
    id: 'prod-013',
    name: '1000ml Vacuum Insulated Stainless Steel Flask',
    category: 'bottles-storage',
    categoryName: 'Bottles & Storage',
    image: 'assets/products/vacuum_flask.jpg',
    imageAlt: '1000ml double-wall vacuum insulated stainless steel hot and cold flask',
    shortDescription: 'Double-walled stainless steel flask that retains hot beverages for up to 18 hours and cold water for 24 hours.',
    brandModel: 'ThermoShield 1000',
    specifications: [
      'Capacity: 1000 ml (1 Litre)',
      'SUS304 Food-grade stainless steel',
      'Double-wall vacuum insulation',
      'Leak-proof airtight cap with carry loop'
    ],
    price: null,
    availability: 'Contact shop for availability',
    featured: true,
    active: true
  },
  {
    id: 'prod-014',
    name: 'Luxury Crystal Touch Control LED Table Lamp',
    category: 'gifts-home',
    categoryName: 'Gifts & Home Items',
    image: 'assets/products/crystal_lamp.jpg',
    imageAlt: 'Luxury crystal touch control LED bedside decorative lamp with warm lighting',
    shortDescription: 'Exquisite crystal decorative table lamp with multi-level touch dimming and warm ambient illumination.',
    brandModel: 'Crystal Glow Deluxe',
    specifications: [
      'Faceted K9 crystal lampshade with brass base',
      '3-level touch brightness dimmer',
      'Warm white eye-caring LED glow',
      'Ideal for bedside, living room or gift presenting'
    ],
    price: null,
    availability: 'Contact shop for availability',
    featured: true,
    active: true
  },
  {
    id: 'prod-015',
    name: 'Traditional Brass Pooja Diya Gift Set',
    category: 'gifts-home',
    categoryName: 'Gifts & Home Items',
    image: 'assets/products/brass_diya.svg',
    imageAlt: 'Handcrafted traditional brass pooja diya gift set with engraved stem',
    shortDescription: 'Artisanal pure brass diya gift set, handcrafted for festive occasions, daily pooja, and auspicious gifting.',
    brandModel: 'Heritage Brass Collection',
    specifications: [
      'Crafted in 100% solid brass',
      'Traditional engraved pillar design',
      'Sturdy balanced base plate',
      'Packaged in an elegant gift presentation box'
    ],
    price: null,
    availability: 'Contact shop for availability',
    featured: false,
    active: true
  },
  {
    id: 'prod-016',
    name: 'Decorative Ceramic Flower Vase',
    category: 'gifts-home',
    categoryName: 'Gifts & Home Items',
    image: 'assets/products/ceramic_vase.svg',
    imageAlt: 'Handcrafted decorative ceramic flower vase with violet glaze and gold ring',
    shortDescription: 'Elegant handcrafted ceramic vase with a rich glossy violet finish and gold detailing for home décor or gifting.',
    brandModel: 'Artisan Glaze Studio',
    specifications: [
      'High-fired premium ceramic pottery',
      'Glossy violet glaze with golden accent band',
      'Waterproof interior for fresh or dried flowers',
      'Height: 10 inches'
    ],
    price: null,
    availability: 'Contact shop for availability',
    featured: false,
    active: true
  }
];
