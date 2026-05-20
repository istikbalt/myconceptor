export const categoriesData = {
  restaurant: {
    id: "restaurant",
    name: "Restaurant / Cafe",
    icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="cat-icon"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/><path d="M6 18h12"/></svg>`,
    menu: ["Home", "Menu", "Reservations", "Online Ordering", "Gallery", "About Us", "Contact", "Reviews"],
    tagline: "Savor the art of fine dining & crafted coffee.",
    defaultDescription: "A cozy culinary destination offering hand-crafted dishes, artisanal coffee, and a warm, inviting atmosphere perfect for memorable gatherings.",
    featuresDescription: "Complete with reservations management, dynamic digital menu card, local online ordering system, and guest review listings.",
    mockItems: [
      { name: "Artisanal Avocado Toast", price: "$14.50", desc: "Sourdough, heirloom tomatoes, poached farm egg, microgreens." },
      { name: "Pan-Seared Sea Bass", price: "$28.00", desc: "Lemon herb butter, saffron risotto, charred asparagus." },
      { name: "Signature Velvet Latte", price: "$5.50", desc: "Double shot espresso, organic oat milk, vanilla bean syrup, nutmeg." },
      { name: "Truffle Parm Fries", price: "$9.00", desc: "Hand-cut potatoes, white truffle oil, grated parmesan, fresh rosemary." }
    ],
    reviews: [
      { author: "Michael C.", rating: 5, text: "The ambiance is incredible and the pan-seared sea bass was outstanding! A must-visit spot." },
      { author: "Sarah M.", rating: 5, text: "Absolutely loved the velvet latte. Super friendly staff and cozy corners for working." }
    ]
  },
  furniture: {
    id: "furniture",
    name: "Furniture Store",
    icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="cat-icon"><path d="M4 18v3M20 18v3M12 4v14M4 12h16M4 8h16M8 4h8"/></svg>`,
    menu: ["Home", "Products", "Categories", "New Arrivals", "Sale", "Gallery", "About Us", "Contact"],
    tagline: "Curated comfort and timeless design for your home.",
    defaultDescription: "We design and source premium, sustainable furniture that blends form, function, and comfort to elevate your everyday living spaces.",
    featuresDescription: "Showcases premium product galleries, categorizations, custom catalog specs, and inquiry forms for premium pieces.",
    mockItems: [
      { name: "Nordic Oak Dining Table", price: "$1,250", desc: "Solid white oak dining table with seating for up to eight guests." },
      { name: "Bouclé Curve Lounge Chair", price: "$740", desc: "Ultra-comfortable curved accent chair in premium white bouclé fabric." },
      { name: "Minimalist Brass Floor Lamp", price: "$210", desc: "Sleek, brushed brass standing lamp with dimmable ambient LED light." },
      { name: "Modular Velvet Sectional", price: "$2,890", desc: "Adaptable deep-seat sofa in luxurious royal forest green velvet." }
    ],
    reviews: [
      { author: "Elena R.", rating: 5, text: "Beautiful craftsmanship. The Nordic oak table has become the centerpiece of our home!" },
      { author: "David T.", rating: 4.8, text: "Extremely comfortable lounge chair and seamless delivery. Highly recommend." }
    ]
  },
  realestate: {
    id: "realestate",
    name: "Real Estate",
    icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="cat-icon"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><path d="M9 22V12h6v10"/></svg>`,
    menu: ["Home", "Property Listings", "Featured Properties", "Agents", "Mortgage Calculator", "About Us", "Testimonials", "Contact"],
    tagline: "Guiding you home with trust and expert local insight.",
    defaultDescription: "Discover your dream property. Whether you are buying, selling, or investing, our elite agency offers elite service and tailored strategies.",
    featuresDescription: "Includes dynamic property grids, mortgage calculation script preview, agent profiles, and lead-capture scheduling forms.",
    mockItems: [
      { name: "The Crestwood Villa", price: "$1,450,000", desc: "4 Beds | 4.5 Baths | 4,200 sqft. Modern design with private pool and mountain views." },
      { name: "Metro Light Penthouse", price: "$890,000", desc: "2 Beds | 2 Baths | 1,550 sqft. High-rise living with floor-to-ceiling windows and luxury finishes." },
      { name: "Serene Lakefront Retreat", price: "$1,820,000", desc: "5 Beds | 5 Baths | 5,100 sqft. Private dock, expansive deck, and stunning panoramic lake views." }
    ],
    reviews: [
      { author: "Marcus & Jane K.", rating: 5, text: "They made buying our first home stress-free. Incredibly professional and always responsive." },
      { author: "Arthur L.", rating: 5, text: "Sold our penthouse above asking price in just two weeks! Truly exceptional service." }
    ]
  },
  beauty: {
    id: "beauty",
    name: "Beauty Salon / Spa",
    icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="cat-icon"><path d="M12 22a7 7 0 0 0 7-7c0-2-1-3.9-3-5.5s-3-4-4-6.5c-1 2.5-2 4.9-4 6.5C6 11.1 5 13 5 15a7 7 0 0 0 7 7z"/></svg>`,
    menu: ["Home", "Services", "Pricing", "Book Appointment", "Gallery", "Staff / Team", "Testimonials", "Contact"],
    tagline: "Indulge in absolute wellness and timeless beauty.",
    defaultDescription: "A sanctuary of peace and rejuvenation. Treat yourself to advanced skincare, artisanal hair treatments, and holistic massage therapy.",
    featuresDescription: "Features live appointment scheduling links, transparent service menus, therapist portfolios, and Instagram-ready gallery grids.",
    mockItems: [
      { name: "Signature Glow Facial", price: "$120", desc: "60 mins of microdermabrasion, customized mask, and soothing face massage." },
      { name: "Balayage & Bespoke Cut", price: "$240+", desc: "Custom hand-painted highlights, deep conditioning, and designer haircut." },
      { name: "Deep Tissue Ritual Massage", price: "$145", desc: "90 mins of therapeutic pressure, warm basalt stones, and organic aromatherapy." }
    ],
    reviews: [
      { author: "Claire D.", rating: 5, text: "The deep tissue ritual was heavenly. Best spa experience I've ever had." },
      { author: "Beatrice S.", rating: 5, text: "Love my new haircut and color! They pay so much attention to the little details." }
    ]
  },
  dental: {
    id: "dental",
    name: "Dental Clinic",
    icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="cat-icon"><path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 15a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm1-5.5V7h-2v4.5H8.5v2h5v-2z"/></svg>`,
    menu: ["Home", "Services", "Doctors", "Book Appointment", "Insurance Info", "Testimonials", "FAQ", "Contact"],
    tagline: "Innovative dental care for a lifelong radiant smile.",
    defaultDescription: "Providing gentle, high-tech family dentistry. From routine cleaning to implant restoration, our focus is your ultimate comfort and long-term health.",
    featuresDescription: "Equipped with booking tools, patient insurance portals, patient FAQs, and bios of dental specialists.",
    mockItems: [
      { name: "Comprehensive Preventative Exam", price: "$150", desc: "Full digital X-rays, detailed oral health scan, and professional cleaning." },
      { name: "3D Porcelain Veneers", price: "$950/tooth", desc: "Custom crafted porcelain shells designed for a perfectly natural-looking smile." },
      { name: "Laser Teeth Whitening", price: "$390", desc: "In-office laser whitening session yielding immediate results up to 8 shades lighter." }
    ],
    reviews: [
      { author: "Robert G.", rating: 5, text: "I used to be terrified of the dentist, but their staff is exceptionally gentle and kind." },
      { author: "Laura F.", rating: 4.9, text: "Amazing results with the whitening! Clear explanations and beautiful, pristine clinic." }
    ]
  },
  lawfirm: {
    id: "lawfirm",
    name: "Law Firm",
    icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="cat-icon"><path d="M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z"/><path d="m12 6-2 4h4zM12 18V10M8 14h8"/></svg>`,
    menu: ["Home", "Practice Areas", "Attorneys", "Case Results", "Consultation Booking", "Testimonials", "Blog", "Contact"],
    tagline: "Fierce advocacy, uncompromising integrity, proven results.",
    defaultDescription: "We provide strategic counsel and formidable litigation representation for corporate litigation, high-asset estate planning, and intellectual property.",
    featuresDescription: "Presents professional attorney grids, successful case study records, blog feed, and private consultation scheduler.",
    mockItems: [
      { name: "Bespoke Estate Trust & Will Planning", price: "Custom Quote", desc: "Detailed structuring of trusts, assets, medical directives, and wealth succession." },
      { name: "Corporate Intellectual Property Audit", price: "Hourly / Flat Fee", desc: "Protecting software, trade secrets, patents, and structuring clear licensing frameworks." },
      { name: "Litigation Strategy Consultation", price: "$250 / Session", desc: "1-hour focused consultation outlining tactical options and legal merits of your case." }
    ],
    reviews: [
      { author: "Jonathan E.", rating: 5, text: "Their strategic insight saved our company millions during a complex IP dispute. Unparalleled attorneys." },
      { author: "Miriam V.", rating: 5, text: "Highly professional, empathetic, and got us an outstanding result in our estate litigation." }
    ]
  },
  gym: {
    id: "gym",
    name: "Gym / Fitness",
    icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="cat-icon"><path d="m6.5 6.5 11 11M3 21l3-3M21 3l-3 3M14.5 3.5l6 6M3.5 14.5l6 6"/></svg>`,
    menu: ["Home", "Membership Plans", "Classes", "Trainers", "Schedule", "Gallery", "Success Stories", "Contact"],
    tagline: "Unleash your strength. Transform your life.",
    defaultDescription: "Our state-of-the-art facility features elite strength coaching, athletic training zones, high-energy group fitness, and recovery suites.",
    featuresDescription: "Includes structured membership tiers, interactive group class schedules, coach profiles, and inspirational success testimonials.",
    mockItems: [
      { name: "All-Access Elite Membership", price: "$89/mo", desc: "Unlimited class access, recovery zone, full facility usage, 1 assessment." },
      { name: "1-on-1 Athletic Strength Coaching", price: "$75/hr", desc: "Customized training program, biomechanics correction, and nutritional design." },
      { name: "High-Intensity Pilates Reformer Class", price: "$25/class", desc: "Core-stabilizing, muscular endurance training in small focused groups." }
    ],
    reviews: [
      { author: "Tyler P.", rating: 5, text: "Outstanding equipment and a community that genuinely pushes you to grow. The trainers are top notch." },
      { author: "Chloe L.", rating: 4.8, text: "The reformer pilates classes completely cured my lower back pain. Clean, friendly gym." }
    ]
  },
  construction: {
    id: "construction",
    name: "Construction / Renovation",
    icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="cat-icon"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`,
    menu: ["Home", "Services", "Projects", "Before & After", "Testimonials", "Quote Request", "About Us", "Contact"],
    tagline: "Building spaces you love with quality you trust.",
    defaultDescription: "We specialize in luxury custom home building, commercial design-build services, and high-end residential kitchen and bathroom renovations.",
    featuresDescription: "Equipped with interactive Before & After visual sliders, premium design portfolios, and step-by-step Quote Estimate forms.",
    mockItems: [
      { name: "Complete Luxury Kitchen Remodel", price: "Free Estimate", desc: "Custom cabinetry, marble islands, built-in panel appliances, and smart illumination." },
      { name: "Whole-Home Expansion / Addition", price: "Free Consultation", desc: "Adding family rooms, master suites, or structural lofts with architectural integrity." },
      { name: "Custom Deck & Covered Patio Living", price: "Custom Quote", desc: "Premium composites, outdoor kitchens, fire features, and automated weather screens." }
    ],
    reviews: [
      { author: "Patrick K.", rating: 5, text: "Our kitchen renovation was finished on time and on budget! Exquisite craftsmanship and clean crews." },
      { author: "Victoria W.", rating: 5, text: "Helped us design and construct our custom deck. Absolutely spectacular results." }
    ]
  },
  auto: {
    id: "auto",
    name: "Auto Dealership",
    icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="cat-icon"><path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"/><circle cx="7" cy="17" r="2"/><circle cx="17" cy="17" r="2"/></svg>`,
    menu: ["Home", "Inventory", "Vehicle Details", "Financing", "Trade-In", "Promotions", "Testimonials", "Contact"],
    tagline: "Drive away in luxury. Transparent deals, pristine vehicles.",
    defaultDescription: "Offering an curated inventory of premium certified pre-owned sports cars, luxury SUVs, and cutting-edge electric vehicles.",
    featuresDescription: "Includes vehicle lists with dynamic specifications (mileage, engine), trade-in valuation forms, and financing calculators.",
    mockItems: [
      { name: "Zenith EV Premium SUV", price: "$64,900", desc: "Dual Motor AWD | 320 Miles Range | Fully Autonomous Suite | 12k Miles." },
      { name: "Apex Sport 911 Coupe", price: "$115,000", desc: "Twin-Turbo Flat-6 | 450 HP | Red Leather Interior | Chrono Package | 4k Miles." },
      { name: "Roadmaster Touring Hybrid", price: "$38,500", desc: "Comfort Package | 48 MPG | Adaptive Cruise | Pristine Condition | 18k Miles." }
    ],
    reviews: [
      { author: "Jonathan A.", rating: 5, text: "Easiest auto purchase of my life. Transparent pricing, no pushy sales, and beautiful showroom." },
      { author: "Samantha H.", rating: 4.8, text: "Got a fantastic trade-in value for my SUV and drove away in my brand new Zenith EV the same day." }
    ]
  },
  clothing: {
    id: "clothing",
    name: "Clothing / Boutique",
    icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="cat-icon"><path d="M20.38 3.46L16 2.14a2 2 0 0 0-1.16 0L10.4 3.46A2 2 0 0 1 9 5.38V19a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2V5.38a2 2 0 0 1 1.38-1.92z"/><path d="M3.62 3.46L8 2.14a2 2 0 0 1 1.16 0L13.6 3.46A2 2 0 0 0 15 5.38V19a2 2 0 0 1-2 2h-2a2 2 0 0 1-2-2V5.38a2 2 0 0 0-1.38-1.92z"/></svg>`,
    menu: ["Home", "Shop", "Categories", "New Collection", "Best Sellers", "Lookbook", "About Us", "Contact"],
    tagline: "Effortless silhouette, high-end sustainable fabrics.",
    defaultDescription: "Designed for the modern individual. Discover slow-fashion collections with minimalist tailoring, organic linen, and custom hand-knit pieces.",
    featuresDescription: "Includes dynamic apparel grids, lookbook carousels, size filters, and streamlined checkout/cart concept flows.",
    mockItems: [
      { name: "Organic Linen Column Dress", price: "$140", desc: "Breathable heavy linen, sleeveless design, subtle side slit, natural dye." },
      { name: "Bespoke Wool Trench Coat", price: "$320", desc: "100% fine merino wool, structured shoulder, adjustable belted silhouette." },
      { name: "Silk Crepe Slouchy Trouser", price: "$165", desc: "Relaxed fit, high waist, double pleated, comfortable silk-satin blend." }
    ],
    reviews: [
      { author: "Fiona G.", rating: 5, text: "The quality of the wool trench coat is phenomenal. It drapes beautifully and feels so soft." },
      { author: "Nora D.", rating: 5, text: "Minimalist fashion at its absolute best. Every item feels timeless and extremely well made." }
    ]
  }
};
