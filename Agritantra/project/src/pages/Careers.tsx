import React from 'react';
import { MapPin, Clock, Users, Award, ArrowRight, Briefcase } from 'lucide-react';

export const Careers: React.FC = () => {
  const values = [
    {
      icon: <Users className="h-8 w-8 text-green-600" />,
      title: "Collaborative Culture",
      description: "Work with passionate individuals committed to transforming agriculture"
    },
    {
      icon: <Award className="h-8 w-8 text-blue-600" />,
      title: "Growth Opportunities",
      description: "Continuous learning and career advancement in a fast-growing industry"
    },
    {
      icon: <Briefcase className="h-8 w-8 text-purple-600" />,
      title: "Meaningful Work",
      description: "Make a real impact on farmers' lives and sustainable agriculture"
    }
  ];

  const benefits = [
    "Competitive salary and equity options",
    "Comprehensive health insurance",
    "Flexible work arrangements",
    "Learning and development budget",
    "Team outings and company events",
    "Stock options for key positions"
  ];

  // const openings = [
  //   {
  //     title: "Senior Full Stack Developer",
  //     department: "Engineering",
  //     location: "Bangalore / Remote",
  //     type: "Full-time",
  //     description: "Lead development of our farmer-facing platform and IoT integration systems.",
  //     requirements: ["5+ years full-stack experience", "React/Node.js expertise", "IoT experience preferred"]
  //   },
  //   {
  //     title: "AI/ML Engineer",
  //     department: "Data Science",
  //     location: "Pune / Hybrid",
  //     type: "Full-time",
  //     description: "Build and deploy machine learning models for crop health analysis and prediction.",
  //     requirements: ["ML/AI experience", "Computer vision skills", "Python/TensorFlow expertise"]
  //   },
  //   {
  //     title: "IoT Solutions Architect",
  //     department: "Hardware",
  //     location: "Chennai / On-site",
  //     type: "Full-time",
  //     description: "Design and implement IoT sensor networks and communication protocols.",
  //     requirements: ["IoT systems experience", "MQTT/LoRaWAN knowledge", "Hardware integration skills"]
  //   },
  //   {
  //     title: "Product Manager - Marketplace",
  //     department: "Product",
  //     location: "Mumbai / Hybrid",
  //     type: "Full-time",
  //     description: "Drive product strategy for our farmer-buyer marketplace platform.",
  //     requirements: ["Product management experience", "Marketplace/B2B experience", "Agricultural domain knowledge"]
  //   },
  //   {
  //     title: "Agricultural Specialist",
  //     department: "Domain Expert",
  //     location: "Multiple locations",
  //     type: "Full-time",
  //     description: "Provide domain expertise and work directly with farmers for product development.",
  //     requirements: ["Agricultural background", "Field experience", "Regional language skills"]
  //   },
  //   {
  //     title: "DevOps Engineer",
  //     department: "Engineering",
  //     location: "Bangalore / Remote",
  //     type: "Full-time",
  //     description: "Manage cloud infrastructure, CI/CD pipelines, and system reliability.",
  //     requirements: ["AWS/GCP experience", "Kubernetes/Docker skills", "Monitoring and automation"]
  //   }
  // ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">
            Build the Future of Agriculture
          </h1>
          <p className="text-xl max-w-3xl mx-auto text-green-100">
            Join our mission to transform farming through technology. Work with passionate 
            professionals making a real impact on farmers' lives across India.
          </p>
        </div>
      </section>

      {/* Company Culture */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Work at Agritantra?</h2>
            <p className="text-xl text-gray-600">
              Be part of a team that's revolutionizing agriculture
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {values.map((value, index) => (
              <div key={index} className="text-center">
                <div className="mb-4 flex justify-center">{value.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </div>
            ))}
          </div>

          <div className="bg-green-50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Our Benefits</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                  <span className="text-gray-700">{benefit}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Open Positions */}
      {/* <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Open Positions</h2>
            <p className="text-xl text-gray-600">
              Find your next opportunity with us
            </p>
          </div>

          <div className="space-y-6">
            {openings.map((job, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2">
                    <div className="flex flex-wrap items-center gap-4 mb-4">
                      <h3 className="text-xl font-bold text-gray-900">{job.title}</h3>
                      <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                        {job.department}
                      </span>
                    </div>
                    
                    <p className="text-gray-600 mb-4">{job.description}</p>
                    
                    <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <MapPin className="h-4 w-4" />
                        <span>{job.location}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="h-4 w-4" />
                        <span>{job.type}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="lg:col-span-1">
                    <h4 className="font-semibold text-gray-900 mb-2">Key Requirements:</h4>
                    <ul className="text-sm text-gray-600 space-y-1 mb-4">
                      {job.requirements.map((req, reqIndex) => (
                        <li key={reqIndex} className="flex items-center space-x-2">
                          <div className="w-1.5 h-1.5 bg-green-600 rounded-full"></div>
                          <span>{req}</span>
                        </li>
                      ))}
                    </ul>
                    <button className="w-full bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors duration-200 flex items-center justify-center space-x-2">
                      <span>Apply Now</span>
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section> */}

      {/* Application Process */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Hiring Process</h2>
            <p className="text-xl text-gray-600">
              A transparent and efficient process to find the right fit
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-green-600">1</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Application</h3>
              <p className="text-gray-600">Submit your resume and cover letter through our portal</p>
            </div>

            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-blue-600">2</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Screening</h3>
              <p className="text-gray-600">Initial phone/video call to discuss role and background</p>
            </div>

            <div className="text-center">
              <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-purple-600">3</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Technical Round</h3>
              <p className="text-gray-600">Technical assessment and problem-solving exercises</p>
            </div>

            <div className="text-center">
              <div className="bg-yellow-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-yellow-600">4</span>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Final Interview</h3>
              <p className="text-gray-600">Meet with team leads and cultural fit assessment</p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Culture */}
      <section className="py-20 bg-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Life at Agritantra</h2>
            <p className="text-xl text-gray-600">
              A glimpse into our work culture and team activities
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-lg overflow-hidden shadow-lg">
              <img
                src="https://www.haworth.com/content/dam/haworth/spark/photography/2023/q1/4-types-of-collaborative-spaces/2736x1130_4-Types_of_Collaborative-Spaces.jpg"
                alt="Team Collaboration"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="font-semibold text-gray-900 mb-2">Collaborative Workspace</h3>
                <p className="text-gray-600">Open offices designed for creativity and collaboration</p>
              </div>
            </div>

            <div className="bg-white rounded-lg overflow-hidden shadow-lg">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSfYsszwmDMWDAwh2FtUZ-S5vQt1-s-779bBo3oV9phlqLTx3DXdRku4cAhChBjmfvF0w&usqp=CAU"
                alt="Learning Sessions"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="font-semibold text-gray-900 mb-2">Learning & Development</h3>
                <p className="text-gray-600">Regular tech talks, workshops, and skill development sessions</p>
              </div>
            </div>

            <div className="bg-white rounded-lg overflow-hidden shadow-lg">
              <img
                src="data:image/jpeg;base64,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"
                alt="Team Events"
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <h3 className="font-semibold text-gray-900 mb-2">Team Building</h3>
                <p className="text-gray-600">Regular team outings, celebrations, and fun activities</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Make an Impact?</h2>
          <p className="text-xl mb-8 text-green-100 max-w-2xl mx-auto">
            Join our team and help transform agriculture through technology. 
            Be part of something meaningful.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200 inline-flex items-center justify-center">
              View All Openings
              <ArrowRight className="ml-2 h-5 w-5" />
            </button>
            <a
              href="/contact"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-green-600 transition-colors duration-200"
            >
              Get in Touch
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};