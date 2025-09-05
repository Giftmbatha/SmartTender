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

      {/* Hero Section - Modern layout with organic shapes */}
      <main className="relative">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute rounded-full -top-40 -left-40 w-80 h-80 opacity-20" style={{ backgroundColor: colors.secondaryBg }}></div>
          <div className="absolute rounded-full top-1/2 -right-40 w-96 h-96 opacity-20" style={{ backgroundColor: colors.secondaryBg }}></div>
        </div>
        
        <div className="container relative flex flex-col-reverse items-center justify-between gap-12 px-6 py-20 mx-auto md:flex-row md:py-32">
          <div className="w-full text-center md:w-1/2 md:text-left">
            <div className="inline-flex items-center px-4 py-2 mb-6 rounded-full" style={{ backgroundColor: 'rgba(112, 138, 88, 0.1)' }}>
              <span className="text-sm font-medium" style={{ color: colors.secondaryBg }}>New: AI-Powered Tender Matching</span>
              <ArrowRight className="w-4 h-4 ml-2" style={{ color: colors.secondaryBg }} />
            </div>
            
            <h1 className="mb-6 text-4xl font-extrabold leading-tight md:text-6xl" style={{ color: colors.primaryText }}>
              Cultivate Your Business <span className="italic font-normal">Growth</span>
            </h1>
            <p className="max-w-xl mx-auto mb-10 text-lg font-light md:text-xl md:mx-0" style={{ color: colors.secondaryBg }}>
              SmartTender helps you discover, prepare, and win tenders with our intelligent platform designed for businesses that want to grow naturally.
            </p>
            
            <div className="flex flex-col items-center gap-4 mb-10 md:flex-row">
              <Link 
                to="/register" 
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-bold transition duration-500 transform rounded-full shadow-xl hover:shadow-2xl hover:-translate-y-1"
                style={{ backgroundColor: colors.secondaryBg, color: colors.lightText }}
              >
                Start Free Trial
                <ChevronRight className="w-5 h-5 ml-2" />
              </Link>
              
              <Link 
                to="/demo" 
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium transition duration-300 rounded-full hover:underline"
                style={{ color: colors.secondaryBg }}
              >
                <div className="flex items-center justify-center w-10 h-10 mr-2 rounded-full" style={{ backgroundColor: 'rgba(112, 138, 88, 0.1)' }}>
                  <BarChart3 className="w-5 h-5" style={{ color: colors.secondaryBg }} />
                </div>
                Watch Demo
              </Link>
            </div>
            
            <div className="flex items-center justify-center gap-6 md:justify-start">
              <div className="flex items-center">
                <div className="flex -space-x-3">
                  <div className="w-10 h-10 border-2 rounded-full" style={{ borderColor: colors.primaryBg, backgroundColor: '#E9DECF' }}></div>
                  <div className="w-10 h-10 border-2 rounded-full" style={{ borderColor: colors.primaryBg, backgroundColor: '#DBC9B3' }}></div>
                  <div className="w-10 h-10 border-2 rounded-full" style={{ borderColor: colors.primaryBg, backgroundColor: '#CDB497' }}></div>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium" style={{ color: colors.primaryText }}>500+ Businesses</p>
                  <p className="text-xs" style={{ color: colors.secondaryBg }}>Growing with us</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <Award className="w-5 h-5 mr-2" style={{ color: colors.secondaryBg }} />
                <p className="text-sm font-medium" style={{ color: colors.primaryText }}>Industry Leader</p>
              </div>
            </div>
          </div>
          
          <div className="relative w-full md:w-1/2">
            <div className="relative z-10 p-2 rounded-2xl" style={{ backgroundColor: colors.primaryBg, boxShadow: `0 25px 50px -12px rgba(45, 79, 43, 0.25)` }}>
              <img 
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" 
                alt="Business professionals reviewing documents" 
                className="w-full h-auto rounded-xl"
              />
            </div>
            
            {/* Floating stats cards */}
            <div className="absolute z-20 p-4 shadow-lg -left-4 top-1/4 rounded-xl" style={{ backgroundColor: colors.lightText, width: '160px' }}>
              <div className="flex items-center mb-2">
                <div className="p-1 rounded-md" style={{ backgroundColor: colors.secondaryBg }}>
                  <TrendingUp className="w-4 h-4" style={{ color: colors.lightText }} />
                </div>
                <span className="ml-2 text-xs font-medium" style={{ color: colors.primaryText }}>Success Rate</span>
              </div>
              <p className="text-2xl font-bold" style={{ color: colors.primaryText }}>68%</p>
              <p className="text-xs" style={{ color: colors.secondaryBg }}>Higher than industry average</p>
            </div>
            
            <div className="absolute z-20 p-4 shadow-lg -bottom-4 -right-4 rounded-xl" style={{ backgroundColor: colors.lightText, width: '180px' }}>
              <div className="flex items-center mb-2">
                <div className="p-1 rounded-md" style={{ backgroundColor: colors.secondaryBg }}>
                  <Clock className="w-4 h-4" style={{ color: colors.lightText }} />
                </div>
                <span className="ml-2 text-xs font-medium" style={{ color: colors.primaryText }}>Time Saved</span>
              </div>
              <p className="text-2xl font-bold" style={{ color: colors.primaryText }}>15 hours</p>
              <p className="text-xs" style={{ color: colors.secondaryBg }}>Per tender application</p>
            </div>
          </div>
        </div>
      </main>

      {/* Logo Cloud Section */}
      <section className="py-16 bg-white">
        <div className="container px-6 mx-auto">
          <p className="mb-10 text-sm font-medium tracking-widest text-center uppercase" style={{ color: colors.secondaryBg }}>Trusted by industry leaders</p>
          <div className="flex flex-wrap items-center justify-center gap-12 opacity-70">
            <div className="w-32 h-10 bg-gray-200 rounded-lg"></div>
            <div className="w-32 h-10 bg-gray-200 rounded-lg"></div>
            <div className="w-32 h-10 bg-gray-200 rounded-lg"></div>
            <div className="w-32 h-10 bg-gray-200 rounded-lg"></div>
            <div className="w-32 h-10 bg-gray-200 rounded-lg"></div>
          </div>
        </div>
      </section>

      {/* How It Works Section - Modern stepped process */}
      <section className="relative py-20">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute rounded-full -left-40 top-1/3 w-80 h-80 opacity-10" style={{ backgroundColor: colors.secondaryBg }}></div>
        </div>
        
        <div className="container relative px-6 mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="mb-4 text-3xl font-extrabold md:text-4xl" style={{ color: colors.primaryText }}>From Discovery to Success</h2>
            <p className="mb-16 text-lg" style={{ color: colors.secondaryBg }}>Our streamlined process makes tender management simple and effective</p>
          </div>
          
          <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
            <div className="relative">
              <div className="flex flex-col items-center text-center">
                <div className="relative mb-6">
                  <div className="absolute inset-0 rounded-full opacity-20 -z-10 animate-pulse" style={{ backgroundColor: colors.secondaryBg }}></div>
                  <div className="p-5 rounded-full" style={{ backgroundColor: colors.secondaryBg }}>
                    <SearchCheck className="w-10 h-10" style={{ color: colors.lightText }} />
                  </div>
                  <div className="absolute z-10 hidden transform -translate-y-1/2 -right-6 top-1/2 md:block">
                    <div className="w-16 h-1" style={{ backgroundColor: colors.secondaryBg, opacity: 0.3 }}></div>
                  </div>
                </div>
                <h3 className="mb-3 text-xl font-bold" style={{ color: colors.primaryText }}>1. Intelligent Discovery</h3>
                <p className="text-sm" style={{ color: colors.secondaryBg }}>Our AI-powered system scans thousands of tenders to find perfect matches for your business.</p>
              </div>
            </div>
            
            <div className="relative">
              <div className="flex flex-col items-center text-center">
                <div className="relative mb-6">
                  <div className="absolute inset-0 rounded-full opacity-20 -z-10 animate-pulse" style={{ backgroundColor: colors.secondaryBg }}></div>
                  <div className="p-5 rounded-full" style={{ backgroundColor: colors.secondaryBg }}>
                    <Folder className="w-10 h-10" style={{ color: colors.lightText }} />
                  </div>
                  <div className="absolute z-10 hidden transform -translate-y-1/2 -right-6 top-1/2 md:block">
                    <div className="w-16 h-1" style={{ backgroundColor: colors.secondaryBg, opacity: 0.3 }}></div>
                  </div>
                </div>
                <h3 className="mb-3 text-xl font-bold" style={{ color: colors.primaryText }}>2. Effortless Preparation</h3>
                <p className="text-sm" style={{ color: colors.secondaryBg }}>Organize documents, track deadlines, and collaborate with your team in one secure platform.</p>
              </div>
            </div>
            
            <div className="relative">
              <div className="flex flex-col items-center text-center">
                <div className="relative mb-6">
                  <div className="absolute inset-0 rounded-full opacity-20 -z-10 animate-pulse" style={{ backgroundColor: colors.secondaryBg }}></div>
                  <div className="p-5 rounded-full" style={{ backgroundColor: colors.secondaryBg }}>
                    <Handshake className="w-10 h-10" style={{ color: colors.lightText }} />
                  </div>
                </div>
                <h3 className="mb-3 text-xl font-bold" style={{ color: colors.primaryText }}>3. Confident Submission</h3>
                <p className="text-sm" style={{ color: colors.secondaryBg }}>Submit flawless bids with our guided process and track your applications to success.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section - Modern cards with illustrations */}
      <section className="py-20 bg-white">
        <div className="container px-6 mx-auto">
          <div className="max-w-3xl mx-auto mb-16 text-center">
            <h2 className="mb-4 text-3xl font-extrabold md:text-4xl" style={{ color: colors.primaryText }}>Designed for Growth</h2>
            <p className="text-lg" style={{ color: colors.secondaryBg }}>Powerful tools that help your business flourish</p>
          </div>
          
          <div className="grid grid-cols-1 gap-12 md:grid-cols-2 lg:grid-cols-3">
            {/* Feature Card 1 */}
            <div className="p-8 transition-all duration-300 transform rounded-2xl hover:shadow-xl hover:-translate-y-2" style={{ backgroundColor: colors.primaryBg }}>
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <div className="absolute inset-0 rounded-full opacity-20 -z-10 animate-pulse" style={{ backgroundColor: colors.secondaryBg }}></div>
                  <div className="p-4 rounded-full" style={{ backgroundColor: colors.secondaryBg }}>
                    <Sprout className="w-8 h-8" style={{ color: colors.lightText }} />
                  </div>
                </div>
              </div>
              <h3 className="mb-3 text-xl font-bold text-center" style={{ color: colors.primaryText }}>Smart Matching</h3>
              <p className="mb-4 text-sm text-center" style={{ color: colors.secondaryBg }}>
                Our intelligent system finds the perfect tenders for you, saving you countless hours.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center text-sm" style={{ color: colors.secondaryBg }}>
                  <CheckCircle className="w-4 h-4 mr-2" style={{ color: colors.secondaryBg }} />
                  AI-powered recommendations
                </li>
                <li className="flex items-center text-sm" style={{ color: colors.secondaryBg }}>
                  <CheckCircle className="w-4 h-4 mr-2" style={{ color: colors.secondaryBg }} />
                  Customizable filters
                </li>
                <li className="flex items-center text-sm" style={{ color: colors.secondaryBg }}>
                  <CheckCircle className="w-4 h-4 mr-2" style={{ color: colors.secondaryBg }} />
                  Daily alerts
                </li>
              </ul>
            </div>
            
            {/* Feature Card 2 */}
            <div className="p-8 transition-all duration-300 transform rounded-2xl hover:shadow-xl hover:-translate-y-2" style={{ backgroundColor: colors.primaryBg }}>
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <div className="absolute inset-0 rounded-full opacity-20 -z-10 animate-pulse" style={{ backgroundColor: colors.secondaryBg }}></div>
                  <div className="p-4 rounded-full" style={{ backgroundColor: colors.secondaryBg }}>
                    <LeafyGreen className="w-8 h-8" style={{ color: colors.lightText }} />
                  </div>
                </div>
              </div>
              <h3 className="mb-3 text-xl font-bold text-center" style={{ color: colors.primaryText }}>Document Nurturing</h3>
              <p className="mb-4 text-sm text-center" style={{ color: colors.secondaryBg }}>
                Keep all your tender documents organized and ready to go in one secure place.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center text-sm" style={{ color: colors.secondaryBg }}>
                  <CheckCircle className="w-4 h-4 mr-2" style={{ color: colors.secondaryBg }} />
                  Secure cloud storage
                </li>
                <li className="flex items-center text-sm" style={{ color: colors.secondaryBg }}>
                  <CheckCircle className="w-4 h-4 mr-2" style={{ color: colors.secondaryBg }} />
                  Version control
                </li>
                <li className="flex items-center text-sm" style={{ color: colors.secondaryBg }}>
                  <CheckCircle className="w-4 h-4 mr-2" style={{ color: colors.secondaryBg }} />
                  Team collaboration
                </li>
              </ul>
            </div>

            {/* Feature Card 3 */}
            <div className="p-8 transition-all duration-300 transform rounded-2xl hover:shadow-xl hover:-translate-y-2" style={{ backgroundColor: colors.primaryBg }}>
              <div className="flex justify-center mb-6">
                <div className="relative">
                  <div className="absolute inset-0 rounded-full opacity-20 -z-10 animate-pulse" style={{ backgroundColor: colors.secondaryBg }}></div>
                  <div className="p-4 rounded-full" style={{ backgroundColor: colors.secondaryBg }}>
                    <Tractor className="w-8 h-8" style={{ color: colors.lightText }} />
                  </div>
                </div>
              </div>
              <h3 className="mb-3 text-xl font-bold text-center" style={{ color: colors.primaryText }}>Bid Submission</h3>
              <p className="mb-4 text-sm text-center" style={{ color: colors.secondaryBg }}>
                Our intuitive platform guides you through the entire submission process for a flawless bid.
              </p>
              <ul className="space-y-2">
                <li className="flex items-center text-sm" style={{ color: colors.secondaryBg }}>
                  <CheckCircle className="w-4 h-4 mr-2" style={{ color: colors.secondaryBg }} />
                  Step-by-step guidance
                </li>
                <li className="flex items-center text-sm" style={{ color: colors.secondaryBg }}>
                  <CheckCircle className="w-4 h-4 mr-2" style={{ color: colors.secondaryBg }} />
                  Deadline tracking
                </li>
                <li className="flex items-center text-sm" style={{ color: colors.secondaryBg }}>
                  <CheckCircle className="w-4 h-4 mr-2" style={{ color: colors.secondaryBg }} />
                  Submission history
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20" style={{ backgroundColor: colors.secondaryBg }}>
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

      {/* CTA Section */}
      <section className="py-20">
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
              
              <Link 
                to="/demo" 
                className="inline-flex items-center justify-center px-8 py-4 text-lg font-medium transition duration-300 border rounded-full hover:shadow-md"
                style={{ borderColor: colors.secondaryBg, color: colors.secondaryBg }}
              >
                Schedule a Demo
              </Link>
            </div>
            
            <p className="mt-10 text-sm opacity-70" style={{ color: colors.secondaryBg }}>
              No credit card required • Free 14-day trial • Cancel anytime
            </p>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="pt-12 pb-8" style={{ backgroundColor: colors.secondaryBg }}>
        <div className="container px-6 mx-auto">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
            <div>
              <div className="flex items-center mb-6">
                <div className="p-2 rounded-full" style={{ backgroundColor: colors.primaryText }}>
                  <Sprout className="w-5 h-5" style={{ color: colors.lightText }} />
                </div>
                <span className="ml-2 text-xl font-bold" style={{ color: colors.lightText }}>SmartTender</span>
              </div>
              <p className="mb-6 text-sm opacity-80" style={{ color: colors.lightText }}>
                Helping businesses grow naturally through intelligent tender management.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="block p-2 rounded-full" style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}>
                  <span className="sr-only">Facebook</span>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" style={{ color: colors.lightText }}><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </a>
                <a href="#" className="block p-2 rounded-full" style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}>
                  <span className="sr-only">Twitter</span>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" style={{ color: colors.lightText }}><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"/></svg>
                </a>
                <a href="#" className="block p-2 rounded-full" style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)' }}>
                  <span className="sr-only">LinkedIn</span>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" style={{ color: colors.lightText }}><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                </a>
              </div>
            </div>
            
            <div>
              <h3 className="mb-6 text-sm font-semibold tracking-widest uppercase" style={{ color: colors.lightText }}>Product</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-sm transition opacity-80 hover:opacity-100" style={{ color: colors.lightText }}>Features</a></li>
                <li><a href="#" className="text-sm transition opacity-80 hover:opacity-100" style={{ color: colors.lightText }}>Pricing</a></li>
                <li><a href="#" className="text-sm transition opacity-80 hover:opacity-100" style={{ color: colors.lightText }}>Case Studies</a></li>
                <li><a href="#" className="text-sm transition opacity-80 hover:opacity-100" style={{ color: colors.lightText }}>Reviews</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="mb-6 text-sm font-semibold tracking-widest uppercase" style={{ color: colors.lightText }}>Resources</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-sm transition opacity-80 hover:opacity-100" style={{ color: colors.lightText }}>Blog</a></li>
                <li><a href="#" className="text-sm transition opacity-80 hover:opacity-100" style={{ color: colors.lightText }}>Help Center</a></li>
                <li><a href="#" className="text-sm transition opacity-80 hover:opacity-100" style={{ color: colors.lightText }}>Tender Guide</a></li>
                <li><a href="#" className="text-sm transition opacity-80 hover:opacity-100" style={{ color: colors.lightText }}>Webinars</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="mb-6 text-sm font-semibold tracking-widest uppercase" style={{ color: colors.lightText }}>Company</h3>
              <ul className="space-y-3">
                <li><a href="#" className="text-sm transition opacity-80 hover:opacity-100" style={{ color: colors.lightText }}>About Us</a></li>
                <li><a href="#" className="text-sm transition opacity-80 hover:opacity-100" style={{ color: colors.lightText }}>Careers</a></li>
                <li><a href="#" className="text-sm transition opacity-80 hover:opacity-100" style={{ color: colors.lightText }}>Contact Us</a></li>
                <li><a href="#" className="text-sm transition opacity-80 hover:opacity-100" style={{ color: colors.lightText }}>Partners</a></li>
              </ul>
            </div>
          </div>
          
          <div className="pt-12 mt-12 border-t border-opacity-20" style={{ borderColor: colors.lightText }}>
            <div className="flex flex-col items-center justify-between md:flex-row">
              <p className="text-sm text-center md:text-left" style={{ color: colors.lightText }}>
                &copy; {new Date().getFullYear()} SmartTender. All rights reserved.
              </p>
              
              <div className="flex flex-wrap justify-center gap-6 mt-4 md:mt-0">
                <a href="#" className="text-sm transition opacity-80 hover:opacity-100" style={{ color: colors.lightText }}>Privacy Policy</a>
                <a href="#" className="text-sm transition opacity-80 hover:opacity-100" style={{ color: colors.lightText }}>Terms of Service</a>
                <a href="#" className="text-sm transition opacity-80 hover:opacity-100" style={{ color: colors.lightText }}>Cookie Policy</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;