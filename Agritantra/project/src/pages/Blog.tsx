import React, { useState } from 'react';
import { Calendar, ArrowRight, Search, Tag } from 'lucide-react';

export const Blog: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    { id: 'all', name: 'All Posts' },
    { id: 'smart-farming', name: 'Smart Farming' },
    { id: 'iot', name: 'IoT Technology' },
    { id: 'sustainability', name: 'Sustainability' },
    { id: 'market-insights', name: 'Market Insights' },
    { id: 'success-stories', name: 'Success Stories' }
  ];

  const featuredPost = {
    title: "How AI is Revolutionizing Crop Health Monitoring in Indian Agriculture",
    excerpt: "Discover how artificial intelligence and computer vision are helping farmers detect crop diseases early, leading to better yields and reduced losses.",
    image: "https://www.forwardpathway.us/wp-content/uploads/2025/08/ai_remote_sensing_agriculture_field.jpg",
    category: "smart-farming",
    readTime: "8 min read"
  };

  const blogPosts = [
    {
      title: "Smart Irrigation: Saving Water While Increasing Yields",
      excerpt: "Learn how IoT sensors and automated irrigation systems are helping farmers save up to 40% water while improving crop productivity.",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJY7vc5eQ0ZhRpl6-NyO5m_G5sFtC_ia7YSQ&s",
      category: "iot",
      readTime: "6 min read"
    },
    {
      title: "From Farm to Fork: Building Transparent Supply Chains",
      excerpt: "Explore how blockchain and IoT technologies are creating transparent, traceable supply chains in agriculture.",
      image: "https://i.ytimg.com/vi/jKKztahx8aI/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLDg3AJvyuO9IG07Qno7o0bHXiugpw",
      category: "sustainability",
      readTime: "7 min read"
    },
    {
      title: "Success Story: How Farmers in Punjab Increased Revenue by 30%",
      excerpt: "Read about real farmers who transformed their operations using Agritantra's smart farming solutions.",
      image: "https://media.springernature.com/lw685/springer-static/image/chp%3A10.1007%2F978-981-15-9335-2_4/MediaObjects/978-981-15-9335-2_4_Fig18_HTML.png",
      category: "success-stories",
      readTime: "5 min read"
    },
    {
      title: "Market Trends: Organic Produce Demand Soars in Urban India",
      excerpt: "Analysis of growing demand for organic produce in metropolitan cities and opportunities for farmers.",
      image: "https://indian-retailer.s3.ap-south-1.amazonaws.com/s3fs-public/2024-10/Designer%20%283%29.jpeg",
      category: "market-insights",
      readTime: "6 min read"
    },
    {
      title: "The Role of Drones in Precision Agriculture",
      excerpt: "How aerial monitoring and drone technology is revolutionizing farm management and crop surveillance.",
      image: "https://tropogo.com/blogs/images/blog/bg_advantages.png",
      category: "iot",
      readTime: "7 min read"
    },
    {
      title: "Climate-Smart Agriculture: Adapting to Changing Weather Patterns",
      excerpt: "Strategies and technologies to help farmers adapt to climate change and extreme weather events.",
      image: "https://www.shutterstock.com/image-vector/sustainable-food-systems-nature-friendly-600nw-2300602315.jpg",
      category: "sustainability",
      readTime: "9 min read"
    }
  ];

  const filteredPosts = selectedCategory === 'all' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-blue-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold mb-6">
            Agritantra Blog
          </h1>
          <p className="text-xl max-w-2xl mx-auto text-green-100">
            Latest insights, trends, and success stories from the world of smart agriculture
          </p>
        </div>
      </section>

      {/* Search and Filter */}
      <section className="py-12 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-6 items-center justify-between">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search articles..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-green-500"
              />
            </div>
            
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                    selectedCategory === category.id
                      ? 'bg-green-600 text-white'
                      : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Post */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-2xl overflow-hidden shadow-xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div className="p-8 lg:p-12">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 mb-4">
                  <Tag className="h-3 w-3 mr-1" />
                  Featured
                </span>
                <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
                  {featuredPost.title}
                </h2>
                <p className="text-gray-600 mb-6 text-lg">
                  {featuredPost.excerpt}
                </p>
                <span>{featuredPost.readTime}</span>
                <button className="inline-flex items-center bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors duration-200 mt-6">
                  Read Full Article
                  <ArrowRight className="ml-2 h-4 w-4" />
                </button>
              </div>
              <div className="lg:p-8">
                <img
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  className="w-full h-64 lg:h-80 object-cover rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-12">
            <h2 className="text-2xl font-bold text-gray-900">
              {/* Removed "Latest Articles" text */}
              {selectedCategory === 'all' ? '' : categories.find(cat => cat.id === selectedCategory)?.name}
            </h2>
            <span className="text-gray-600">
              {filteredPosts.length} article{filteredPosts.length !== 1 ? 's' : ''}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((post, index) => (
              <article key={index} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <span className={`inline-block px-2 py-1 rounded text-xs font-medium mb-3 ${
                    post.category === 'smart-farming' ? 'bg-green-100 text-green-800' :
                    post.category === 'iot' ? 'bg-blue-100 text-blue-800' :
                    post.category === 'sustainability' ? 'bg-purple-100 text-purple-800' :
                    post.category === 'market-insights' ? 'bg-yellow-100 text-yellow-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {categories.find(cat => cat.id === post.category)?.name}
                  </span>
                  
                  <h3 className="text-lg font-bold text-gray-900 mb-3 hover:text-green-600 cursor-pointer">
                    {post.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-4">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between text-sm text-gray-500">
                    {/* Removed author and date */}
                    <span>{post.readTime}</span>
                  </div>
                  
                  <button className="mt-4 text-green-600 hover:text-green-700 font-medium inline-flex items-center">
                    Read More
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Signup */}
      <section className="py-16 bg-green-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Stay Updated with Agritantra</h2>
          <p className="text-xl text-green-100 mb-8">
            Get the latest insights, tips, and success stories delivered to your inbox
          </p>
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-green-300"
            />
            <button className="bg-white text-green-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
