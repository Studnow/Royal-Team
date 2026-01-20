export default {
  header: {
    title: "Company",
    items: ["About Us", "How It Works", "Equipment", "Price", "FAQ"],
    logo: { name: "logo", ext: "png" },
  },
  hero: [
    {
      title: "Safe and reliable auto transport services nationwide",
      img: {
        src: { path: "assets/images/", item: { name: "slide_1", ext: "png" } },
        alt: "описание",
      },
    },
  ],
  cover: {
    heading: {
      description: "Calculate transport costs wright now online:",
    },
    phone: "253-264-9577",
    buttonText: "call us",
    cards: [
      {
        badge: "1.000.000 +",
        description: "Satisfied Customers",
      },
      {
        badge: "1.070.000 +",
        description: "Vehicles Delivered",
      },
      {
        badge: "16 +",
        description: "Years Experience",
      },
    ],
    fields: [
      { placeholder: "Enter the distance", name: "cover" },
      { text: "= 1.000 $" },
      { text: "Get Instant Quote" },
    ],
  },
  aboutus: {
    heading: {
      caption: "About us",
      title:
        "Why Thousands of Customers Choose RoyalTeam for Their Auto Transport Needs",
      description:
        "Our experts oversee each stage — from pickup to delivery, ensuring maximum safety throughout the journey.",
    },
    cards: [
      {
        title: "Dedicated Advisors",
        description:
          "Personal advisor assigned to guide you through the entire transport process.",
        icon: { id: "advisor", ext: "svg", alt: "Advisors" },
        img: {
          src: {
            path: "assets/images/",
            item: { name: "advisor", ext: "png" },
          },
          alt: "Advisors",
        },
      },
      {
        title: "Personalized Approach",
        description:
          "Individual solutions for each customer, considering vehicle specifications and preferences.",
        icon: { id: "personalized", ext: "svg", alt: "Personalized" },
        img: {
          src: {
            path: "assets/images/",
            item: { name: "approach", ext: "png" },
          },
          alt: "Approach",
        },
      },
      {
        title: "Trust the Professionals",
        description:
          "We specialize exclusively in auto transport and understand every nuance of the process.",
        icon: { id: "insurance", ext: "svg", alt: "Insurance" },
      },
      {
        title: "$1M Insurance Coverage",
        description:
          "Complete protection with our comprehensive $1 million Insurance coverage.",
        icon: { id: "insurance", ext: "svg", alt: "Insurance" },
      },
      {
        title: "15,000+ Auto Carriers",
        description:
          "Extensive network of vetted carriers for quick and optimal transport solutions.",
        icon: { id: "carriers", ext: "svg", alt: "Carriers" },
      },
      {
        title: "Payment After Assignment",
        description:
          "No upfront payments required! Pay only after a carrier is assigned to your order.",
        icon: { id: "payment", ext: "svg", alt: "Payment" },
      },
      {
        title: "Support Hours",
        description:
          "Available 7 days a week to answer any questions whenever it's convenient for you.",
        icon: { id: "support", ext: "svg", alt: "Support" },
      },
      {
        title: "Top-Rated Company",
        description:
          "Thousands of positive reviews confirm the high quality and reliability of our services.",
        icon: { id: "rating", ext: "svg", alt: "Rating" },
      },
    ],
  },
  howitwork: {
    heading: {
      caption: "How it work",
      title: "Three Simple Steps to Safe Auto Transport",
    },
    img: {
      src: { path: "assets/images/", item: { name: "howitwork", ext: "png" } },
      alt: "How it work",
    },
    cards: [
      {
        title: "Step 1: Get a Quote and Book Your Order",
        description:
          "Fill out the form on our website or call us to get an accurate transport quote. Our advisors will help you choose the optimal transport option and answer all your questions. After confirming your order, we begin searching for a suitable carrier.",
      },
      {
        title: "Step 2: We Pick Up Your Vehicle",
        description:
          "At the agreed time, the carrier will contact you to confirm details and arrive to collect your vehicle. Before loading, you and the driver will conduct an inspection and document the vehicle's current condition in a pickup report.",
      },
      {
        title: "Step 3: Receive Your Vehicle at Destination",
        description:
          "You'll be notified in advance of the delivery time. Upon receiving your vehicle, you and the driver will check its condition and sign the delivery report. Your vehicle is delivered safely and on time!",
      },
    ],
  },
  brands: [
    {
      src: { path: "assets/images/", item: { name: "braman", ext: "png" } },
      alt: "braman",
    },
    {
      src: { path: "assets/images/", item: { name: "earth", ext: "png" } },
      alt: "Hearth",
    },
    {
      src: {
        path: "assets/images/",
        item: { name: "mark_motors", ext: "png" },
      },
      alt: "Mark Motors",
    },
    {
      src: { path: "assets/images/", item: { name: "earth", ext: "png" } },
      alt: "Hearth",
    },
    {
      src: {
        path: "assets/images/",
        item: { name: "mark_motors", ext: "png" },
      },
      alt: "Mark Motors",
    },
  ],
  reviews: {
    heading: {
      caption: "Reviews",
      title: "Over 1,000,000 Satisfied Customers and 16 Years of Experience",
    },
    buttonText: "Want to Work with You",
    cards: [
      {
        badge: "1,070,000+",
        description: "Vehicles Transported",
        caption:
          "Successfully delivered over one million vehicles of various makes and models to all US states",
      },
      {
        badge: "1,000,000+",
        description: "Satisfied Customers",
        caption:
          "Hundreds of thousands of customers trust us again and recommending our service.",
      },
      {
        badge: "16 Years",
        description: "in Auto Transport",
        caption:
          "Since 2009 continuously improving service quality and setting new industry standards.",
      },
    ],
    testimonials: [
      {
        text: "RoyalTeam made transporting my car absolutely hassle-free. Personal approach, constant communication, and precise timing — everything was top-notch.",
        author: "Michael S., New York",
      },
    ],
  },
  equipment: {
    heading: {
      caption: "Equipment",
      title: "Choose the Optimal Transport Option for Your Vehicle",
    },
    cards: [
      {
        title: "Open Transport",
        description:
          "Economical and reliable way to transport standard vehicles. Your vehicle is transported on an open trailer with other vehicles, making this option the most affordable.",
        img: {
          src: {
            path: "assets/images/",
            item: { name: "open_transport", ext: "png" },
          },
          alt: "Open Transport",
        },
        list: [
          "Affordable pricing",
          "Wide network of carriers",
          "Fast carrier assignment",
          "Perfect for most standard vehicles",
        ],
        buttonText: "Choose Open Transport",
      },
      {
        title: "Enclosed Transport",
        description:
          "Premium option providing maximum protection from weather conditions and road factors. Recommended for exclusive, expensive, and collectible vehicles.",
        img: {
          src: {
            path: "assets/images/",
            item: { name: "enclosed_transport", ext: "png" },
          },
          alt: "Enclosed Transport",
        },
        list: [
          "Complete protection from weather conditions and road debris",
          "Additional security and privacy",
          "Individual securing for each vehicle",
          "Perfect for premium and rare vehicles",
        ],
        buttonText: "Choose Enclosed Transport",
      },
    ],
  },

  price: {
    heading: {
      caption: "Price",
      title: "How Auto Transport Pricing is Determined",
    },
    img: {
      src: {
        path: "assets/images/",
        item: { name: "price", ext: "png" },
      },
      alt: "price",
    },
    cards: [
      {
        title: "Transport Distance",
        description:
          "Longer distances have higher total costs but lower per-mile rates.",
      },
      {
        title: "Vehicle Size and Weight",
        description:
          "Larger and heavier vehicles require more space and fuel, affecting transport costs.",
      },
      {
        title: "Transport Type",
        description:
          "Open trailers are more affordable, while enclosed trailers offer premium protection.",
      },
      {
        title: "Vehicle Condition",
        description:
          "Inoperable vehicles require additional equipment and effort during loading.",
      },
      {
        title: "Seasonality",
        description:
          "Summer months and holidays see increased demand affecting pricing.",
      },
    ],
    buttonText: "Get Accurate Quote",
    caption:
      "Contact us for personalized pricing based on your specific requirements",
  },

  extra: {
    heading: {
      title: "Auto Transport to Any Location in the United States",
      description:
        "Our extensive carrier network covers all 50 states, including remote regions",
    },
    cards: {
      title: "We Transport All Vehicle Types:",
      items: [
        {
          title: "Passenger Cars",
          img: {
            src: {
              path: "assets/images/",
              item: { name: "passenger_cars", ext: "png" },
            },
            alt: "Passenger Cars",
          },
        },
        {
          title: "SUVs & Pickups",
          img: {
            src: {
              path: "assets/images/",
              item: { name: "suvs_pickups", ext: "png" },
            },
            alt: "SUVs & Pickups",
          },
        },
        {
          title: "Sports Cars",
          img: {
            src: {
              path: "assets/images/",
              item: { name: "sports_cars", ext: "png" },
            },
            alt: "Sports Cars",
          },
        },
        {
          title: "Motorcycles",
          img: {
            src: {
              path: "assets/images/",
              item: { name: "motorcycles", ext: "png" },
            },
            alt: "Motorcycles",
          },
        },
      ],
    },
    routes: {
      title: "Popular Routes:",
      items: [
        "New York — Los Angeles",
        "Miami — Chicago",
        "Boston — San Francisco",
        "Dallas — Seattle",
        "Las Vegas — Washington",
      ],
    },
    seasonal: {
      title: "Special Seasonal Offers:",
      description: [
        "Planning to winter in Florida or summer vacation in California?",
        "Ask our advisors about special seasonal discounts for popular destinations.",
      ],
    },
  },

  faq: {
    heading: {
      title: "Frequently Asked Questions",
    },
    accordion: [
      {
        question: "When will my vehicle be picked up?",
        answer:
          "Yes, you can leave personal items up to 100 pounds in your vehicle's trunk. However, we recommend minimizing personal items as they are not covered by the carrier's insurance.",
      },
      {
        question: "Is my vehicle insured during transport?",
        answer:
          "Yes, you can leave personal items up to 100 pounds in your vehicle's trunk. However, we recommend minimizing personal items as they are not covered by the carrier's insurance.",
      },
      {
        question: "Can I track my vehicle's location?",
        answer:
          "Yes, you can leave personal items up to 100 pounds in your vehicle's trunk. However, we recommend minimizing personal items as they are not covered by the carrier's insurance.",
      },
      {
        question: "What is door-to-door delivery?",
        answer:
          "Yes, you can leave personal items up to 100 pounds in your vehicle's trunk. However, we recommend minimizing personal items as they are not covered by the carrier's insurance.",
      },
      {
        question: "Can I leave personal items in my car during transport?",
        answer:
          "Yes, you can leave personal items up to 100 pounds in your vehicle's trunk. However, we recommend minimizing personal items as they are not covered by the carrier's insurance.",
      },
    ],
    form: {
      title: "Book Auto Transport Service Right Now",
      description:
        "Trust vehicle transportation to RoyalTeam professionals. We guarantee safe, on-time delivery and complete information support at every stage.",
      fields: [
        { placeholder: "Origin Address", type: "text", name: "origin" },
        {
          placeholder: "Destination Address",
          type: "text",
          name: "destination",
        },
        {
          placeholder: "Open Transport",
          type: "select",
          name: "transport_type",
        },
        {
          placeholder: "Vehicle over 4000 lbs",
          type: "checkbox",
          name: "heavy_vehicle",
        },
      ],
      buttonText: "Submit Transport Request",
    },
  },

  footer: {
    columns: [
      {
        title: "RoyalTeam Auto Transport",
        items: [
          "Direct carrier with 16 years of experience and $1M insurance coverage. Your trusted partner for safe auto transport nationwide.",
          "© 2025 RoyalTeam Auto Transport. All rights reserved.",
        ],
      },
      {
        title: "Company",
        items: ["About Us", "How It Works", "Equipment", "Price", "FAQ"],
      },
      {
        title: "Services",
        items: [
          "Open Transport",
          "Enclosed Transport",
          "Luxury Car Transport",
          "Motorcycle Transport",
        ],
      },
      {
        title: "Contact Info",
        items: [
          "info@royalteam.org",
          "(888) 555-0123",
          "425 Main St, Suite 300 Schaumburg, IL 60173",
          "Business Hours: Mon-Fri 8AM-8PM, Sat-Sun 9AM-6PM",
        ],
      },
    ],
  },
};
