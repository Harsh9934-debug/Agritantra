import React from "react";
import { Link } from "react-router-dom";
import { Droplets, TrendingUp, Shield, DollarSign } from "lucide-react";

export const ForFarmers: React.FC = () => {
  const benefits = [
    {
      icon: <TrendingUp className="h-8 w-8 text-green-600" />,
      title: "Increase Revenue by 30%",
      description:
        "Smart financial management, direct market access, and optimized farming practices to maximize your profits.",
    },
    {
      icon: <Droplets className="h-8 w-8 text-blue-600" />,
      title: "Save 40% Water",
      description:
        "IoT-driven smart irrigation systems that monitor soil moisture and weather to optimize water usage.",
    },
    {
      icon: <Shield className="h-8 w-8 text-purple-600" />,
      title: "Protect Your Crops",
      description:
        "AI-powered early disease detection and pest identification to prevent crop loss before it happens.",
    },
    {
      icon: <DollarSign className="h-8 w-8 text-yellow-600" />,
      title: "Get Fair Prices",
      description:
        "Connect directly with buyers, eliminate middlemen, and sell your produce at competitive market rates.",
    },
  ];

  const features = [
    {
      title: "Smart Irrigation Control",
      description:
        "Automate your irrigation based on real-time soil moisture, weather forecasts, and crop requirements.",
      image:
        "https://www.netafimindia.com/contentassets/56b4db493ff74411823ec87b3230174c/smart-drip-irrigation-using-iot.png?v=4909f9",
    },
    {
      title: "Crop Health Monitoring",
      description:
        "Take photos of your crops and get instant AI-powered analysis for diseases, pests, and nutrient deficiencies.",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQbF142jMqxcqTIocski30TGImOpwb7rlAmqg&s",
    },
    {
      title: "Direct Marketplace",
      description:
        "List your produce, connect with buyers, negotiate prices, and manage orders all in one place.",
      image:
        "https://static.businessworld.in/1620817067_56omBd_online_shopping.png",
    },
    {
      title: "Financial Tracking",
      description:
        "Track expenses, monitor revenue, analyze profit margins, and plan your budget effectively.",
      image: "https://mailmktg.makemytrip.com/mybusiness/images/Exp-Management_3.jpg",
    },
  ];

  const testimonials = [
    {
      name: "ESAHAKARA",
      location: "35 Mayasandra, Turuvekere, Tumkur 572221",
      image: 'https://www.esahakara.com/demo/assets/uploads/company/cust_photo_9536.png',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto p-6">
      {/* Header */}
      <header className="mb-12 text-center">
        <h1 className="text-4xl font-bold mb-4 text-green-700">Empower Your Farm with Smart Technology</h1>
        <p className="text-lg text-gray-700">
          Harness AI, IoT, and marketplace tools designed specifically for farmers like you.
        </p>
        <Link
          to="/signup"
          className="mt-6 inline-block bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700 transition"
        >
          Get Started
        </Link>
      </header>

      {/* Benefits Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-semibold text-center mb-10">Benefits for Farmers</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {benefits.map(({ icon, title, description }) => (
            <div key={title} className="bg-white rounded-lg shadow-md p-6 text-center">
              <div className="mb-4 flex justify-center">{icon}</div>
              <h3 className="font-bold text-xl mb-2">{title}</h3>
              <p className="text-gray-600">{description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-semibold text-center mb-10">Key Features</h2>
        <div className="space-y-12">
          {features.map(({ title, description, image }) => (
            <div
              key={title}
              className="flex flex-col md:flex-row items-center md:items-start gap-6 bg-white rounded-lg shadow-md p-6"
            >
              <img
                src={image}
                alt={title}
                className="w-full md:w-1/3 rounded-lg object-cover"
                loading="lazy"
              />
              <div className="md:w-2/3">
                <h3 className="text-2xl font-bold mb-3">{title}</h3>
                <p className="text-gray-700">{description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-semibold text-center mb-10">What Farmers Say</h2>
        <div className="max-w-3xl mx-auto">
          {testimonials.map(({ name, location, image }) => (
            <div key={name} className="bg-white rounded-lg shadow-md p-6 flex items-center gap-6">
              <img
                src={image}
                alt={name}
                className="w-24 h-24 rounded-full object-cover border-2 border-green-600"
                loading="lazy"
              />
              <div>
                <p className="text-gray-800 italic mb-1">
                  "This platform has transformed how I manage my farm. Increased yields and fair prices!"
                </p>
                <p className="font-semibold text-green-700">{name}</p>
                <p className="text-sm text-gray-500">{location}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
