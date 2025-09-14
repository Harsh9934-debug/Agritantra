import React from 'react';
import { Users, Target, Award, Lightbulb } from 'lucide-react';

export const About: React.FC = () => {
  const team = [
    {
      name: 'ESAHAKARA',
      role: 'BY AGRITANTRA PVT',
      image: 'https://www.esahakara.com/demo/assets/uploads/company/cust_photo_9536.png',
      description: 'Leading agricultural technology company focused on sustainable farming solutions.'
    },
    
  ];

  const values = [
    {
      icon: <Users className="h-8 w-8 text-green-600" />,
      title: 'Farmer-Centric',
      description: 'Every decision we make prioritizes the needs and success of farmers'
    },
    {
      icon: <Target className="h-8 w-8 text-blue-600" />,
      title: 'Innovation',
      description: 'Continuously pushing the boundaries of agricultural technology'
    },
    {
      icon: <Award className="h-8 w-8 text-yellow-600" />,
      title: 'Excellence',
      description: 'Delivering high-quality solutions that exceed expectations'
    },
    {
      icon: <Lightbulb className="h-8 w-8 text-purple-600" />,
      title: 'Sustainability',
      description: 'Promoting environmentally responsible farming practices'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-green-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">About Agritantra</h1>
          <p className="text-xl max-w-3xl mx-auto text-green-100">
            We are revolutionizing agriculture through innovative technology, empowering farmers 
            with AI-driven insights, IoT solutions, and direct market access for sustainable farming.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                To democratize advanced agricultural technology and make it accessible to farmers 
                of all scales. We bridge the gap between traditional farming practices and modern 
                technology, ensuring sustainable agriculture that benefits both farmers and consumers.
              </p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Vision</h2>
              <p className="text-gray-600 text-lg leading-relaxed">
                To create a world where every farmer has access to intelligent farming tools that 
                maximize yield, minimize environmental impact, and ensure fair market prices. 
                We envision a future of smart, sustainable agriculture powered by technology.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Our Story</h2>
            <div className="text-gray-600 text-lg leading-relaxed space-y-6">
              <p>
                Agritantra was born from a simple yet powerful observation: while technology was 
                transforming every industry, agriculture remained largely unchanged. Our founders, 
                coming from agricultural and technology backgrounds, saw an opportunity to bridge this gap.
              </p>
              <p>
                Starting in 2020, we began developing IoT-based solutions for smart irrigation and 
                crop monitoring. What started as a small project quickly evolved into a comprehensive 
                platform that addresses the entire agricultural value chain - from farm management 
                to marketplace connectivity.
              </p>
              <p>
                Today, we are proud to be recognized by RKVY-RAFTAAR, incubated at KRISHIK-ABI, 
                and officially acknowledged by DPIIT as a innovative startup contributing to 
                India's agricultural transformation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Core Values</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-lg text-center">
                <div className="mb-4 flex justify-center">{value.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      {/* <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"> */}
          {/* <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Meet Our Team</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Passionate experts dedicated to transforming agriculture
            </p>
          </div> */}

          {/* <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div key={index} className="bg-gray-50 rounded-xl overflow-hidden shadow-lg">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-64 object-cover"
                />
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                  <p className="text-green-600 font-medium mb-3">{member.role}</p>
                  <p className="text-gray-600">{member.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Awards & Recognition */}
      <section className="py-20 bg-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Awards & Recognition</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Recognized by leading institutions for our innovation in agriculture
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-lg text-center">
              <Award className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-3"></h3>
              <p className="text-gray-600">
                Awarded funding by the Ministry of Agriculture & Farmers Welfare 
                for innovative agricultural solutions
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-lg text-center">
              <Award className="h-16 w-16 text-green-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-3"></h3>
              <p className="text-gray-600">
                Successfully incubated at India's premier agricultural business 
                incubator and innovation center
              </p>
            </div>
            
            <div className="bg-white p-8 rounded-xl shadow-lg text-center">
              <Award className="h-16 w-16 text-blue-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-gray-900 mb-3"></h3>
              <p className="text-gray-600">
                Officially recognized startup by Department for Promotion of 
                Industry and Internal Trade
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-green-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Join Our Mission?</h2>
          <p className="text-xl mb-8 text-green-100 max-w-2xl mx-auto">
            Be part of the agricultural revolution. Transform your farming with smart technology today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/register"
              className="bg-yellow-500 text-green-900 px-8 py-3 rounded-lg font-semibold hover:bg-yellow-400 transition-colors duration-200"
            >
              Get Started
            </a>
            <a
              href="/contact"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-green-700 transition-colors duration-200"
            >
              Contact Us
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};