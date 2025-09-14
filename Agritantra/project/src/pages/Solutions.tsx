import React from 'react';
import { Droplets, Activity, ShoppingCart, DollarSign, Leaf, Smartphone } from 'lucide-react';

export const Solutions: React.FC = () => {
  const solutions = [
    {
      icon: <Droplets className="h-12 w-12 text-blue-600" />,
      title: "Smart Irrigation",
      subtitle: "Save up to 40% water",
      description: "IoT-powered irrigation systems that monitor soil moisture, weather conditions, and crop requirements to optimize water usage automatically.",
      features: [
        "Real-time soil moisture monitoring",
        "Weather-based irrigation scheduling",
        "Remote control via mobile app",
        "Water usage analytics and reporting"
      ],
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSa0T02Wus6DZWUHv9gfm4FhC6nI6upaJ47ow&s"
    },
    {
      icon: <Activity className="h-12 w-12 text-green-600" />,
      title: "Crop Health Monitoring",
      subtitle: "95% accuracy in disease detection",
      description: "AI-powered crop analysis using computer vision to detect diseases, pest infestations, and nutrient deficiencies early.",
      features: [
        "Early disease detection with AI",
        "Pest identification and alerts",
        "Nutrient deficiency analysis",
        "Treatment recommendations"
      ],
      image: "https://b1721680.smushcdn.com/1721680/wp-content/uploads/2021/05/Crop-Health-Monitoring-Primary-Image-896x448.jpg?lossy=0&strip=1&webp=0"
    },
    {
      icon: <ShoppingCart className="h-12 w-12 text-purple-600" />,
      title: "Direct Marketplace",
      subtitle: "Eliminate middlemen",
      description: "Connect directly with buyers, get fair prices for your produce, and manage orders through our integrated marketplace platform.",
      features: [
        "Direct buyer-farmer connection",
        "Fair price discovery",
        "Order management system",
        "Payment processing integration"
      ],
      image: "https://static.businessworld.in/1620817067_56omBd_online_shopping.png"
    },
    {
      icon: <DollarSign className="h-12 w-12 text-yellow-600" />,
      title: "Financial Management",
      subtitle: "Track and optimize costs",
      description: "Comprehensive financial tracking system to monitor expenses, revenue, and profitability with detailed analytics.",
      features: [
        "Expense and revenue tracking",
        "Profit margin analysis",
        "Budget planning tools",
        "Financial reporting dashboard"
      ],
      image: "https://sp-ao.shortpixel.ai/client/to_webp,q_glossy,ret_img,w_1024,h_570/https://theincmagazine.com/wp-content/uploads/2022/10/The-importance-of-effective-financial-management-in-todays-businesses-1024x570.jpg"
    },
    {
      icon: <Leaf className="h-12 w-12 text-green-700" />,
      title: "Soil Health Management",
      subtitle: "Organic solutions",
      description: "Improve soil fertility with organic vermicompost solutions and soil health monitoring for sustainable farming.",
      features: [
        "Soil pH and nutrient monitoring",
        "Organic vermicompost supply",
        "Soil health improvement recommendations",
        "Sustainable farming practices guidance"
      ],
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaSFbQEH7wJODTB8NKBBPKdr5naDUh3x8eVQ&s"
    },
    {
      icon: <Smartphone className="h-12 w-12 text-indigo-600" />,
      title: "Mobile App",
      subtitle: "Easy-to-use interface",
      description: "User-friendly mobile application that puts all farming tools at your fingertips with offline capability.",
      features: [
        "Intuitive farmer-friendly design",
        "Offline mode for remote areas",
        "Push notifications and alerts",
        "Multi-language support"
      ],
      image: "https://www.mindinventory.com/blog/wp-content/uploads/2018/12/benefits-of-mobile-app-for-business.webp"
    }
  ];

  const benefits = [
    { metric: "40%", label: "Water Savings", color: "text-blue-600" },
    { metric: "30%", label: "Increased Revenue", color: "text-green-600" },
    { metric: "95%", label: "Disease Detection Accuracy", color: "text-purple-600" },
    { metric: "25%", label: "Cost Reduction", color: "text-yellow-600" }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-green-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">
              Complete Smart Farming Solutions
            </h1>
            <p className="text-xl max-w-3xl mx-auto text-green-100">
              Transform your farming operations with our comprehensive suite of AI-powered, 
              IoT-enabled solutions designed specifically for modern agriculture.
            </p>
          </div>
        </div>
      </section>

      {/* Benefits Overview */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="text-center">
                <div className={`text-4xl font-bold ${benefit.color} mb-2`}>
                  {benefit.metric}
                </div>
                <div className="text-gray-600 font-medium">{benefit.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Solutions Grid */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Our Complete Solution Suite
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Everything you need to modernize your farming operations and maximize profitability
            </p>
          </div>

          <div className="space-y-20">
            {solutions.map((solution, index) => (
              <div key={index} className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${
                index % 2 === 1 ? 'lg:grid-flow-row-dense' : ''
              }`}>
                {/* Content */}
                <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                  <div className="flex items-center space-x-4 mb-6">
                    {solution.icon}
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">{solution.title}</h3>
                      <p className="text-lg text-green-600 font-medium">{solution.subtitle}</p>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 text-lg mb-6 leading-relaxed">
                    {solution.description}
                  </p>
                  
                  <ul className="space-y-3">
                    {solution.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center space-x-3">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-gray-700">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                {/* Image */}
                <div className={index % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}>
                  <div className="relative">
                    <img
                      src={solution.image}
                      alt={solution.title}
                      className="rounded-xl shadow-2xl w-full"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-xl"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              How Agritantra Works
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Get started with our smart farming platform in just a few simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-green-600">1</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Setup & Installation</h3>
              <p className="text-gray-600">
                Install IoT sensors and devices across your farm. Our team provides complete 
                setup and training support.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-blue-600">2</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Monitor & Analyze</h3>
              <p className="text-gray-600">
                Real-time monitoring of soil, crops, and weather conditions with AI-powered 
                insights and recommendations.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-purple-600">3</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Optimize & Grow</h3>
              <p className="text-gray-600">
                Implement automated systems, connect with buyers, and continuously improve 
                your farming operations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-green-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready to Transform Your Farm?
          </h2>
          <p className="text-xl mb-8 text-green-100 max-w-2xl mx-auto">
            Join thousands of farmers who have already increased their yields and profits with Agritantra
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/register"
              className="bg-yellow-500 text-green-900 px-8 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition-colors duration-200"
            >
              Get Started Today
            </a>
            <a
              href="/contact"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-green-700 transition-colors duration-200"
            >
              Schedule Demo
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};