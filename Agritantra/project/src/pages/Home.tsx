import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, TrendingUp, Droplets, Shield, Users, Leaf, Award } from 'lucide-react';

export const Home: React.FC = () => {
  const benefits = [
    {
      icon: <TrendingUp className="h-12 w-12 text-green-600" />,
      title: "Increased Revenue",
      description: "Smart financial management and direct market access help farmers increase their income by up to 30%"
    },
    {
      icon: <Droplets className="h-12 w-12 text-blue-600" />,
      title: "Water Conservation",
      description: "IoT-driven smart irrigation systems save up to 40% water while maintaining optimal crop growth"
    },
    {
      icon: <Shield className="h-12 w-12 text-orange-600" />,
      title: "Better Crop Health",
      description: "AI-based early disease detection prevents crop loss and ensures healthier yields"
    },
    {
      icon: <Users className="h-12 w-12 text-purple-600" />,
      title: "Fair Market Access",
      description: "Connect directly with buyers, eliminate middlemen, and get fair prices for your produce"
    },
    {
      icon: <Leaf className="h-12 w-12 text-green-700" />,
      title: "Soil Health",
      description: "Organic vermicompost solutions improve soil fertility and promote sustainable farming"
    },
    {
      icon: <Award className="h-12 w-12 text-yellow-600" />,
      title: "Easy Technology",
      description: "Farmer-friendly mobile app makes advanced technology accessible to everyone"
    }
  ];

  const achievements = [
    {
      
      description: "Recognized and funded by the Ministry of Agriculture for innovative farming solutions"
    },
    {
      
      description: "Incubated at India's premier agricultural business incubator"
    },
    {
      
      description: "Officially recognized startup by Department for Promotion of Industry and Internal Trade"
    }
  ];

  const faqs = [
    {
      question: "How does smart irrigation work?",
      answer: "Our IoT sensors monitor soil moisture, weather conditions, and crop requirements to automatically control irrigation systems, ensuring optimal water usage."
    },
    {
      question: "Is the app really free for farmers?",
      answer: "Yes, our basic app features including weather updates, market prices, and farming tips are completely free for all registered farmers."
    },
    {
      question: "How accurate is the crop health monitoring?",
      answer: "Our AI system has 95% accuracy in detecting crop diseases and pest issues, helping farmers take preventive action early."
    },
    {
      question: "How can I sell my produce through the platform?",
      answer: "Simply list your crops in our marketplace, set your price, and connect directly with verified buyers without any middlemen."
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-green-600 via-green-700 to-green-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
                Empowering Farmers with 
                <span className="text-yellow-400"> Smart Technology</span>
              </h1>
              <p className="text-xl mb-8 text-green-100">
                Transform your farming with AI-driven crop health monitoring, smart irrigation, 
                and direct market access. Join thousands of farmers already benefiting from Agritantra.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/register"
                  className="bg-yellow-500 text-green-900 px-8 py-4 rounded-lg font-semibold hover:bg-yellow-400 transition-colors duration-200 text-center"
                >
                  Get Started Free
                </Link>
                <Link
                  to="/solutions"
                  className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-green-700 transition-colors duration-200 text-center"
                >
                  Learn More
                </Link>
              </div>
            </div>
            <div className="lg:text-right">
              <img
                src="https://www.csm.tech/storage/uploads/news/66459a90c3ba31715837584Thumb.jpg"
                alt="Smart Farming Technology"
                className="rounded-lg shadow-2xl w-full max-w-md mx-auto lg:mx-0 lg:ml-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Core Benefits for Farmers
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover how Agritantra transforms traditional farming into smart, profitable, and sustainable agriculture
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-gray-50 p-8 rounded-xl hover:shadow-lg transition-shadow duration-200">
                <div className="mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Recognition & Achievements */}
      <section className="py-20 bg-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Recognition & Achievements
            </h2>
            <p className="text-xl text-gray-600">
              Trusted and recognized by leading agricultural institutions
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {achievements.map((achievement, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-lg text-center">
                <Award className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-900 mb-3">{achievement.title}</h3>
                <p className="text-gray-600">{achievement.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600">
              Get answers to common questions about our platform
            </p>
          </div>

          <div className="space-y-8">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-green-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Transform Your Farming?
          </h2>
          <p className="text-xl mb-8 text-green-100 max-w-2xl mx-auto">
            Join thousands of farmers who have already increased their revenue and reduced costs with Agritantra
          </p>
          <Link
            to="/register"
            className="inline-flex items-center bg-yellow-500 text-green-900 px-8 py-4 rounded-lg font-semibold hover:bg-yellow-400 transition-colors duration-200"
          >
            Start Your Free Trial
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  );
};