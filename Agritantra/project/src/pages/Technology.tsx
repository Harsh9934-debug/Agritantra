import React from 'react';
import { Cpu, Wifi, Cloud, Smartphone, Activity, Shield, Zap, Eye } from 'lucide-react';

export const Technology: React.FC = () => {
  const technologies = [
    {
      icon: <Activity className="h-12 w-12 text-green-600" />,
      title: "AI & Machine Learning",
      description: "Advanced computer vision and predictive analytics for crop health monitoring, disease detection, and yield optimization.",
      features: [
        "Deep learning models for crop disease identification",
        "Predictive analytics for weather and yield forecasting",
        "Computer vision for pest and nutrient deficiency detection",
        "Real-time recommendation engine"
      ]
    },
    {
      icon: <Wifi className="h-12 w-12 text-blue-600" />,
      title: "IoT Sensors & Devices",
      description: "Network of smart sensors and actuators for real-time farm monitoring and automated control systems.",
      features: [
        "Soil moisture and pH sensors",
        "Weather monitoring stations",
        "Smart irrigation controllers",
        "Drone integration for aerial monitoring"
      ]
    },
    {
      icon: <Cloud className="h-12 w-12 text-purple-600" />,
      title: "Cloud Infrastructure",
      description: "Scalable cloud platform ensuring 99.9% uptime with secure data storage and real-time processing capabilities.",
      features: [
        "AWS/Firebase cloud hosting",
        "Real-time data synchronization",
        "Automated backup and disaster recovery",
        "Global CDN for fast app performance"
      ]
    },
    {
      icon: <Smartphone className="h-12 w-12 text-orange-600" />,
      title: "Mobile-First Design",
      description: "Cross-platform mobile applications designed specifically for farmers with offline capabilities and intuitive interface.",
      features: [
        "Native Android and iOS apps",
        "Offline mode for remote areas",
        "Multi-language support (Hindi, English, Regional)",
        "Voice commands and audio feedback"
      ]
    },
    {
      icon: <Shield className="h-12 w-12 text-red-600" />,
      title: "Security & Privacy",
      description: "Enterprise-grade security with end-to-end encryption and compliance with data protection regulations.",
      features: [
        "End-to-end data encryption",
        "Secure API key management",
        "GDPR and local data compliance",
        "Multi-factor authentication"
      ]
    },
    {
      icon: <Zap className="h-12 w-12 text-yellow-600" />,
      title: "Real-Time Processing",
      description: "Lightning-fast data processing and instant notifications for time-critical farming decisions.",
      features: [
        "MQTT/WebSocket real-time communication",
        "Edge computing for faster response",
        "Instant alert system",
        "Live dashboard updates"
      ]
    }
  ];

  const techSpecs = [
    {
      category: "AI Models",
      specs: [
        "95% accuracy in disease detection",
        "Support for 50+ crop varieties",
        "10+ regional languages",
        "Real-time image processing"
      ]
    },
    {
      category: "IoT Capabilities",
      specs: [
        "Support for 1000+ devices per farm",
        "Battery life up to 2 years",
        "Range up to 10km with LoRaWAN",
        "IP67 weather resistance"
      ]
    },
    {
      category: "Platform Performance",
      specs: [
        "99.9% uptime guarantee",
        "Sub-second response times",
        "Support for millions of users",
        "Auto-scaling infrastructure"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">
              Cutting-Edge Technology for Modern Agriculture
            </h1>
            <p className="text-xl max-w-3xl mx-auto text-blue-100">
              Powered by AI, IoT, and cloud computing to deliver intelligent farming 
              solutions that are both advanced and easy to use.
            </p>
          </div>
        </div>
      </section>

      {/* Technology Stack */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Our Technology Stack
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Built on proven technologies that ensure reliability, scalability, and performance
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {technologies.map((tech, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="mb-6">{tech.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{tech.title}</h3>
                <p className="text-gray-600 mb-4">{tech.description}</p>
                <ul className="space-y-2">
                  {tech.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-sm text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technical Specifications */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Technical Specifications
            </h2>
            <p className="text-xl text-gray-600">
              Industry-leading performance and capabilities
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {techSpecs.map((spec, index) => (
              <div key={index} className="bg-gray-50 p-8 rounded-xl">
                <h3 className="text-xl font-bold text-gray-900 mb-6">{spec.category}</h3>
                <ul className="space-y-3">
                  {spec.specs.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-center space-x-3">
                      <Eye className="h-5 w-5 text-green-600" />
                      <span className="text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Architecture Diagram */}
      <section className="py-20 bg-gradient-to-r from-green-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Platform Architecture
            </h2>
            <p className="text-xl text-gray-600">
              Scalable, secure, and reliable infrastructure
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow-xl p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
              <div className="text-center">
                <div className="bg-green-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Smartphone className="h-10 w-10 text-green-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Mobile Apps</h3>
                <p className="text-gray-600">iOS & Android applications with offline capabilities</p>
              </div>

              <div className="text-center">
                <div className="bg-blue-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Cloud className="h-10 w-10 text-blue-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Cloud Platform</h3>
                <p className="text-gray-600">AI processing, data analytics, and secure storage</p>
              </div>

              <div className="text-center">
                <div className="bg-purple-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Wifi className="h-10 w-10 text-purple-600" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">IoT Network</h3>
                <p className="text-gray-600">Smart sensors and automated control systems</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Innovation & Research */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Continuous Innovation
              </h2>
              <p className="text-gray-600 text-lg mb-6">
                Our research and development team continuously works on advancing agricultural 
                technology, partnering with leading universities and research institutions.
              </p>
              <ul className="space-y-4">
                <li className="flex items-center space-x-3">
                  <Cpu className="h-6 w-6 text-green-600" />
                  <span className="text-gray-700">AI model training with 100M+ crop images</span>
                </li>
                <li className="flex items-center space-x-3">
                  <Shield className="h-6 w-6 text-blue-600" />
                  <span className="text-gray-700">ISO 27001 certified security standards</span>
                </li>
                <li className="flex items-center space-x-3">
                  <Zap className="h-6 w-6 text-yellow-600" />
                  <span className="text-gray-700">Edge computing for millisecond responses</span>
                </li>
              </ul>
            </div>
            <div>
              <img
                src="https://www.vitelglobal.in/blog/wp-content/uploads/2023/08/Blog_Sustaining-Success-The-Importance-of-Continuous-Innovation-in-Business.jpg"
                alt="Agricultural Technology Research"
                className="rounded-xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Experience the Future of Farming
          </h2>
          <p className="text-xl mb-8 text-green-100 max-w-2xl mx-auto">
            Join thousands of farmers who are already benefiting from our advanced technology platform
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/register"
              className="bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200"
            >
              Get Started Today
            </a>
            <a
              href="/contact"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-green-600 transition-colors duration-200"
            >
              Request Demo
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};