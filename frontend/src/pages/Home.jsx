import React from 'react';
import { Link } from 'react-router-dom';
import { Lightbulb, Briefcase, Handshake } from 'lucide-react'; // Using Lucide for modern icons

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 antialiased">
      {/* Navbar */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold text-indigo-600 tracking-tight">SmartTender</Link>
          <nav>
            <ul className="flex items-center space-x-6">
              <li>
                <Link 
                  to="/login" 
                  className="font-medium text-gray-600 hover:text-indigo-600 transition duration-300"
                >
                  Login
                </Link>
              </li>
              <li>
                <Link 
                  to="/register" 
                  className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-300 shadow-md"
                >
                  Sign Up
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <main className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight mb-4">
          Streamline Your Tendering Process
        </h1>
        <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
          Connect with suppliers, manage bids, and win more projects with our intuitive platform.
        </p>
        <Link 
          to="/register" 
          className="inline-block px-8 py-4 bg-indigo-600 text-white text-lg font-bold rounded-full shadow-lg hover:bg-indigo-700 transition duration-300 transform hover:scale-105"
        >
          Get Started - It's Free
        </Link>
      </main>

      {/* Features Section */}
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">Why Choose SmartTender?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
              <div className="flex justify-center mb-4">
                <Lightbulb className="w-12 h-12 text-indigo-500" />
              </div>
              <h3 className="text-xl font-bold text-center mb-2">Smart Bidding</h3>
              <p className="text-center text-gray-600">
                Our platform provides intelligent insights to help you craft winning bids.
              </p>
            </div>
            {/* Feature 2 */}
            <div className="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
              <div className="flex justify-center mb-4">
                <Briefcase className="w-12 h-12 text-green-500" />
              </div>
              <h3 className="text-xl font-bold text-center mb-2">Efficient Management</h3>
              <p className="text-center text-gray-600">
                Manage all your tender documents and communication in one central place.
              </p>
            </div>
            {/* Feature 3 */}
            <div className="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
              <div className="flex justify-center mb-4">
                <Handshake className="w-12 h-12 text-yellow-500" />
              </div>
              <h3 className="text-xl font-bold text-center mb-2">Connect & Collaborate</h3>
              <p className="text-center text-gray-600">
                Easily connect with a network of trusted suppliers and partners.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
