import React from 'react';
import { Link } from 'react-router-dom';
import { Sprout, LeafyGreen, Tractor, SearchCheck, Folder, Handshake, TrendingUp, Users, Award, ChevronRight, BarChart3, Shield, Clock, Calendar, CheckCircle, ArrowRight } from 'lucide-react';

const Home = () => {
  // Define the new color palette for Tailwind classes
  const colors = {
    primaryBg: '#FAF7F3',
    primaryText: '#2D4F2B',
    secondaryBg: '#708A58',
    lightText: '#FAF7F3',
    darkText: '#2D4F2B',
  };

  return (
    <div style={{ backgroundColor: colors.primaryBg }} className="min-h-screen overflow-hidden font-sans antialiased">
      
      {/* Navbar - A clean, natural-themed header */}
      <header className="sticky top-0 z-50 shadow-sm bg-opacity-95 backdrop-blur-lg" style={{ backgroundColor: colors.secondaryBg }}>
        <div className="container flex items-center justify-between px-6 py-4 mx-auto">
          <div className="flex items-center space-x-2">
            <div className="p-2 rounded-full" style={{ backgroundColor: colors.primaryText }}>
              <Sprout className="w-6 h-6" style={{ color: colors.lightText }} />
            </div>
            <Link to="/" className="text-2xl font-bold tracking-wide" style={{ color: colors.lightText }}>SmartTender</Link>
          </div>
          <nav>
            <ul className="flex items-center space-x-6">
              <li>
                <Link 
                  to="/features" 
                  className="font-medium transition duration-300 hover:opacity-80"
                  style={{ color: colors.lightText }}
                >
                  Features
                </Link>
              </li>
              <li>
                <Link 
                  to="/pricing" 
                  className="font-medium transition duration-300 hover:opacity-80"
                  style={{ color: colors.lightText }}
                >
                  Pricing
                </Link>
              </li>
              <li>
                <Link 
                  to="/login" 
                  className="font-medium transition duration-300 hover:opacity-80"
                  style={{ color: colors.lightText }}
                >
                  Login
                </Link>
              </li>
              <li>
                <Link 
                  to="/register" 
                  className="px-5 py-2.5 font-medium transition duration-300 rounded-full hover:shadow-lg"
                  style={{ backgroundColor: colors.primaryText, color: colors.lightText }}
                >
                  Start Now
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Hero Section with Image Background */}
      <main className="relative py-20 md:py-32" style={{ 
        backgroundImage: `linear-gradient(to bottom, rgba(45, 79, 43, 0.7), rgba(45, 79, 43, 0.7)), url('https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}>
        <div className="container relative z-10 px-6 mx-auto text-center text-lightText">
          <div className="max-w-3xl mx-auto">
            <h1 className="mb-6 text-4xl font-extrabold leading-tight md:text-6xl">
              Cultivate Your Business <span className="italic font-normal">Growth</span>
            </h1>
            <p className="max-w-xl mx-auto mb-10 text-lg font-light md:text-xl opacity-90" style={{ color: colors.lightText }}>
              SmartTender helps you discover, prepare, and win tenders with our intelligent platform designed for businesses that want to grow naturally.
            </p>
            <Link 
              to="/register" 
              className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold transition duration-500 transform rounded-full shadow-xl hover:shadow-2xl hover:-translate-y-1"
              style={{ backgroundColor: colors.secondaryBg, color: colors.lightText }}
            >
              Start Free Trial
              <ChevronRight className="w-5 h-5 ml-2" />
            </Link>
          </div>
        </div>
      </main>


      {/* Proven Results Section */}
      <section className="py-16" style={{ backgroundColor: colors.secondaryBg }}>
        <div className="container px-6 mx-auto">
          <div className="grid grid-cols-2 gap-8 text-center md:grid-cols-4">
            <div className="p-6">
              <p className="mb-2 text-4xl font-bold" style={{ color: colors.lightText }}>500+</p>
              <p className="text-sm tracking-widest uppercase opacity-80" style={{ color: colors.lightText }}>Active Businesses</p>
            </div>
            <div className="p-6">
              <p className="mb-2 text-4xl font-bold" style={{ color: colors.lightText }}>1,250+</p>
              <p className="text-sm tracking-widest uppercase opacity-80" style={{ color: colors.lightText }}>Tenders Won</p>
            </div>
            <div className="p-6">
              <p className="mb-2 text-4xl font-bold" style={{ color: colors.lightText }}>68%</p>
              <p className="text-sm tracking-widest uppercase opacity-80" style={{ color: colors.lightText }}>Success Rate</p>
            </div>
            <div className="p-6">
              <p className="mb-2 text-4xl font-bold" style={{ color: colors.lightText }}>15 hrs</p>
              <p className="text-sm tracking-widest uppercase opacity-80" style={{ color: colors.lightText }}>Saved per tender</p>
            </div>
          </div>
        </div>
      </section>


      {/* Key Features Section */}
      <section className="py-20" style={{ backgroundColor: colors.primaryBg }}>
        <div className="container px-6 mx-auto">
          <div className="max-w-3xl mx-auto mb-16 text-center">
            <h2 className="mb-4 text-3xl font-extrabold md:text-4xl" style={{ color: colors.primaryText }}>Key Features for Tender Success</h2>
            <p className="text-lg" style={{ color: colors.secondaryBg }}>Designed to make your business flourish</p>
          </div>
          
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3">
            {/* Feature Card 1 */}
            <div className="p-8 transition-all duration-300 transform rounded-2xl hover:shadow-xl hover:-translate-y-2" style={{ backgroundColor: 'white' }}>
              <div className="flex justify-center mb-6">
                <div className="p-4 rounded-full" style={{ backgroundColor: colors.secondaryBg }}>
                  <SearchCheck className="w-8 h-8" style={{ color: colors.lightText }} />
                </div>
              </div>
              <h3 className="mb-3 text-xl font-bold text-center" style={{ color: colors.primaryText }}>AI-Powered Discovery</h3>
              <p className="mb-4 text-sm text-center" style={{ color: colors.secondaryBg }}>
                Our intelligent system scans thousands of tenders to find the perfect matches for your business.
              </p>
            </div>
            
            {/* Feature Card 2 */}
            <div className="p-8 transition-all duration-300 transform rounded-2xl hover:shadow-xl hover:-translate-y-2" style={{ backgroundColor: 'white' }}>
              <div className="flex justify-center mb-6">
                <div className="p-4 rounded-full" style={{ backgroundColor: colors.secondaryBg }}>
                  <Folder className="w-8 h-8" style={{ color: colors.lightText }} />
                </div>
              </div>
              <h3 className="mb-3 text-xl font-bold text-center" style={{ color: colors.primaryText }}>Effortless Preparation</h3>
              <p className="mb-4 text-sm text-center" style={{ color: colors.secondaryBg }}>
                Organize documents, track deadlines, and collaborate with your team in one secure place.
              </p>
            </div>

            {/* Feature Card 3 */}
            <div className="p-8 transition-all duration-300 transform rounded-2xl hover:shadow-xl hover:-translate-y-2" style={{ backgroundColor: 'white' }}>
              <div className="flex justify-center mb-6">
                <div className="p-4 rounded-full" style={{ backgroundColor: colors.secondaryBg }}>
                  <Handshake className="w-8 h-8" style={{ color: colors.lightText }} />
                </div>
              </div>
              <h3 className="mb-3 text-xl font-bold text-center" style={{ color: colors.primaryText }}>Confident Submission</h3>
              <p className="mb-4 text-sm text-center" style={{ color: colors.secondaryBg }}>
                Submit flawless bids with our guided process and track your applications to success.
              </p>
            </div>
          </div>
        </div>
      </section>


      {/* CTA Section */}
      <section className="py-20" style={{ backgroundColor: colors.primaryBg }}>
        <div className="container px-6 mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="mb-6 text-3xl font-extrabold md:text-4xl" style={{ color: colors.primaryText }}>Ready to grow your business?</h2>
            <p className="mb-10 text-lg" style={{ color: colors.secondaryBg }}>Join hundreds of businesses that have successfully expanded with SmartTender</p>
            
            <div className="flex flex-col justify-center gap-4 md:flex-row">
              <Link 
                to="/register" 
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold transition duration-500 transform rounded-full shadow-xl hover:shadow-2xl hover:-translate-y-1"
                style={{ backgroundColor: colors.secondaryBg, color: colors.lightText }}
              >
                Start Free Trial
                <ChevronRight className="w-5 h-5 ml-2" />
              </Link>
            </div>
            
            <p className="mt-10 text-sm opacity-70" style={{ color: colors.secondaryBg }}>
              No credit card required • Free 14-day trial • Cancel anytime
            </p>
          </div>
        </div>
      </section>
      
      {/* Minimalist Footer */}
      <footer className="pt-8 pb-8" style={{ backgroundColor: colors.primaryText }}>
        <div className="container px-6 mx-auto">
          <div className="flex flex-col items-center gap-8 md:flex-row md:justify-between">
            <div className="flex flex-col items-center text-center md:flex-row md:text-left">
              <div className="flex items-center mb-4 md:mb-0">
                <div className="p-2 rounded-full" style={{ backgroundColor: colors.secondaryBg }}>
                  <Sprout className="w-5 h-5" style={{ color: colors.lightText }} />
                </div>
                <span className="ml-2 text-xl font-bold" style={{ color: colors.lightText }}>SmartTender</span>
              </div>
              <p className="mt-4 text-sm opacity-80 md:mt-0 md:ml-6" style={{ color: colors.lightText }}>
                &copy; {new Date().getFullYear()} SmartTender. All rights reserved.
              </p>
            </div>
            <div className="flex justify-center space-x-4">
              <a href="#" className="block p-2 transition-colors rounded-full hover:bg-opacity-80" style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}>
                <span className="sr-only">Facebook</span>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" style={{ color: colors.lightText }}><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
              </a>
              <a href="#" className="block p-2 transition-colors rounded-full hover:bg-opacity-80" style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}>
                <span className="sr-only">Twitter</span>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" style={{ color: colors.lightText }}><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"/></svg>
              </a>
              <a href="#" className="block p-2 transition-colors rounded-full hover:bg-opacity-80" style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}>
                <span className="sr-only">LinkedIn</span>
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" style={{ color: colors.lightText }}><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;