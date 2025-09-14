import React from "react";
import { Link } from "react-router-dom";
import {
  Shield,
  Truck,
  Users,
  Award,
  ArrowRight,
  Search,
  Clock,
} from "lucide-react";

export const ForBuyers: React.FC = () => {
  const benefits = [
    {
      icon: <Shield className="h-8 w-8 text-green-600" />,
      title: "Quality Guarantee",
      description:
        "Direct sourcing from verified farmers with quality certifications and traceability.",
    },
    {
      icon: <Truck className="h-8 w-8 text-blue-600" />,
      title: "Fresh Supply Chain",
      description:
        "Reduced transit time with direct farm-to-buyer delivery ensuring maximum freshness.",
    },
    {
      icon: <Users className="h-8 w-8 text-purple-600" />,
      title: "No Middlemen",
      description:
        "Connect directly with farmers for better prices and transparent transactions.",
    },
    {
      icon: <Award className="h-8 w-8 text-yellow-600" />,
      title: "Certified Organic",
      description:
        "Access to certified organic and sustainably grown produce with documentation.",
    },
  ];

  const categories = [
    {
      name: "Vegetables",
      count: "2,500+ varieties",
      image:
        "https://cdn.britannica.com/17/196817-050-6A15DAC3/vegetables.jpg",
    },
    {
      name: "Fruits",
      count: "1,800+ varieties",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmFP2n_nogMiQm24-g53ON7yZq-KCjgnzLlw&s",
    },
    {
      name: "Grains",
      count: "850+ varieties",
      image:
        "https://4.imimg.com/data4/WT/HN/MY-19032682/food-grains.jpg",
    },
    {
      name: "Pulses",
      count: "650+ varieties",
      image:
        "https://hodmedods.co.uk/cdn/shop/articles/Twelve_pulses_square_3x2_3d2d60a7-c205-4be0-bbc6-716be8bbac1b_2400x.png?v=1739396053",
    },
    {
      name: "Spices",
      count: "400+ varieties",
      image:
        "https://static.toiimg.com/photo/64699039.cms",
    },
    {
      name: "Herbs",
      count: "300+ varieties",
      image:
        "https://images.pexels.com/photos/461428/pexels-photo-461428.jpeg?auto=compress&cs=tinysrgb&w=800",
    },
  ];

  const buyerTypes = [
    {
      title: "Restaurants & Hotels",
      description:
        "Get fresh ingredients directly from farms with consistent quality and competitive prices.",
      features: [
        "Bulk ordering",
        "Custom requirements",
        "Scheduled deliveries",
        "Quality assurance",
      ],
    },
    {
      title: "Retail Stores",
      description:
        "Stock your shelves with fresh, traceable produce that customers trust and prefer.",
      features: [
        "Flexible quantities",
        "Brand partnerships",
        "Marketing support",
        "Inventory management",
      ],
    },
    {
      title: "Food Processors",
      description:
        "Source high-quality raw materials for processing with complete supply chain transparency.",
      features: [
        "Contract farming",
        "Volume discounts",
        "Quality specifications",
        "Consistent supply",
      ],
    },
    {
      title: "Exporters",
      description:
        "Access premium quality produce meeting international standards and certifications.",
      features: [
        "Export documentation",
        "Quality certifications",
        "Packaging support",
        "Logistics assistance",
      ],
    },
  ];

  const features = [
    {
      icon: <Search className="h-6 w-6 text-green-600" />,
      title: "Smart Search",
      description:
        "Find exactly what you need with advanced filters for location, quantity, quality grade, and price.",
    },
    {
      icon: <Shield className="h-6 w-6 text-blue-600" />,
      title: "Verified Farmers",
      description:
        "All farmers are verified with quality certifications and farming practice documentation.",
    },
    {
      icon: <Clock className="h-6 w-6 text-purple-600" />,
      title: "Real-time Tracking",
      description:
        "Track your orders from farm to delivery with live updates and estimated arrival times.",
    },
    {
      icon: <Award className="h-6 w-6 text-yellow-600" />,
      title: "Quality Assurance",
      description:
        "Every batch comes with quality certificates and detailed farming practice information.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 via-purple-600 to-green-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">
              Source Fresh Produce
              <span className="text-yellow-400"> Directly from Farmers</span>
            </h1>
            <p className="text-xl max-w-3xl mx-auto mb-8 text-blue-100">
              Connect with 15,000+ verified farmers across India. Get fresher
              produce, better prices, and complete supply chain transparency for
              your business.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/register"
                className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200 inline-flex items-center justify-center"
              >
                Join as Buyer
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                to="/contact"
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors duration-200"
              >
                Request Demo
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Leading Buyers Choose Agritantra
            </h2>
            <p className="text-xl text-gray-600">
              Transform your procurement process with direct farmer connections
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center">
                <div className="mb-4 flex justify-center">{benefit.icon}</div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {benefit.title}
                </h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Product Categories */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Extensive Product Categories
            </h2>
            <p className="text-xl text-gray-600">
              Access thousands of varieties across all major agricultural
              categories
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category, index) => (
              <div
                key={index}
                className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
              >
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {category.name}
                  </h3>
                  <p className="text-gray-600 mb-4">{category.count} available</p>
                  <button className="text-blue-600 hover:text-blue-500 font-medium inline-flex items-center">
                    Browse {category.name}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Buyer Types */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Solutions for Every Type of Buyer
            </h2>
            <p className="text-xl text-gray-600">
              Tailored features and services for different business needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {buyerTypes.map((type, index) => (
              <div
                key={index}
                className="bg-gray-50 p-8 rounded-xl border border-gray-200"
              >
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {type.title}
                </h3>
                <p className="text-gray-600 mb-6">{type.description}</p>
                <ul className="list-disc list-inside space-y-2 text-gray-700">
                  {type.features.map((feature, idx) => (
                    <li key={idx}>{feature}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Platform Features
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need for a seamless buying experience
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-6 shadow hover:shadow-lg transition-shadow duration-300"
              >
                <div className="mb-4 flex justify-center">{feature.icon}</div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
