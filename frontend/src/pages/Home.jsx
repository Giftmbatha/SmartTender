import React from 'react';
import { Link } from 'react-router-dom';
import { Rocket, Gem, Zap } from 'lucide-react'; // Using new icons for a fresh look

const Home = () => {
  return (
    <div className="min-h-screen font-sans antialiased text-white bg-gray-900">
      
      {/* Navbar - A dark, sleek header */}
      <header className="sticky top-0 z-50 bg-gray-900 shadow-sm bg-opacity-80 backdrop-blur-lg">
        <div className="container flex items-center justify-between px-6 py-5 mx-auto">
          <Link to="/" className="text-3xl font-extrabold tracking-widest text-white uppercase">SmartTender</Link>
          <nav>
            <ul className="flex items-center space-x-8">
              <li>
                <Link 
                  to="/login" 
                  className="font-semibold text-gray-400 transition duration-300 transform hover:text-indigo-400 hover:scale-110"
                >
                  Login
                </Link>
              </li>
              <li>
                <Link 
                  to="/register" 
                  className="px-6 py-2 font-bold text-white transition duration-300 transform bg-indigo-600 rounded-full shadow-lg hover:bg-indigo-500 hover:scale-105"
                >
                  Start Now
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Hero Section - Bold and impactful */}
      <main className="container px-6 py-24 mx-auto text-center">
        <h1 className="mb-6 text-5xl font-extrabold leading-tight text-transparent md:text-7xl bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-600">
          Win Tenders. Simplified.
        </h1>
        <p className="max-w-3xl mx-auto mb-10 text-lg font-light text-gray-300 md:text-xl">
          Harness the power of AI to discover, manage, and submit winning bids. Our platform makes success inevitable.
        </p>
        <Link 
          to="/register" 
          className="inline-block px-10 py-5 text-xl font-bold text-white transition duration-500 transform rounded-full shadow-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:shadow-2xl hover:-translate-y-1 hover:scale-105"
        >
          Join the Revolution
        </Link>
      </main>

      {/* Features Section - Sleek, futuristic cards */}
      <section className="py-20 bg-gray-800">
        <div className="container px-6 mx-auto">
          <h2 className="mb-16 text-4xl font-extrabold text-center text-white">Your Competitive Edge</h2>
          <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
            {/* Feature Card 1 */}
            <div className="p-8 transition-all duration-300 transform bg-gray-900 border border-gray-700 shadow-xl rounded-2xl hover:shadow-2xl hover:scale-105">
              <div className="flex justify-center mb-6">
                <div className="p-4 bg-indigo-600 rounded-full">
                  <Rocket className="w-10 h-10 text-white" />
                </div>
              </div>
              <h3 className="mb-3 text-2xl font-bold text-center text-white">Accelerate Growth</h3>
              <p className="text-sm text-center text-gray-400">
                Drastically reduce time spent on tender discovery and application, focusing on what matters most.
              </p>
            </div>
            
            {/* Feature Card 2 */}
            <div className="p-8 transition-all duration-300 transform bg-gray-900 border border-gray-700 shadow-xl rounded-2xl hover:shadow-2xl hover:scale-105">
              <div className="flex justify-center mb-6">
                <div className="p-4 bg-purple-600 rounded-full">
                  <Gem className="w-10 h-10 text-white" />
                </div>
              </div>
              <h3 className="mb-3 text-2xl font-bold text-center text-white">Uncover Opportunities</h3>
              <p className="text-sm text-center text-gray-400">
                Our AI-powered engine finds hidden opportunities that perfectly match your business profile.
              </p>
            </div>

            {/* Feature Card 3 */}
            <div className="p-8 transition-all duration-300 transform bg-gray-900 border border-gray-700 shadow-xl rounded-2xl hover:shadow-2xl hover:scale-105">
              <div className="flex justify-center mb-6">
                <div className="p-4 bg-yellow-500 rounded-full">
                  <Zap className="w-10 h-10 text-white" />
                </div>
              </div>
              <h3 className="mb-3 text-2xl font-bold text-center text-white">Win with Confidence</h3>
              <p className="text-sm text-center text-gray-400">
                Get real-time insights and tools to craft highly competitive, data-driven bids every time.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer - A simple, clean footer for a professional feel */}
      <footer className="py-8 bg-gray-900">
        <div className="container px-6 mx-auto text-sm text-center text-gray-500">
          &copy; {new Date().getFullYear()} SmartTender. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default Home;