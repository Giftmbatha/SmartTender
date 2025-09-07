import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { getCurrentUser } from "../services/authServices";
import {
  LogOut,
  User,
  Briefcase,
  Settings,
  LayoutDashboard,
  Grid3X3,
  Layers,
  Search,
  Building,
  FileText,
  Target,
  BarChart3,
  Bell,
  HelpCircle,
  ChevronDown,
  ChevronRight,
  Sparkles,
  Shield,
  Users,
  Calendar,
  Award,
  Clock,
  CheckCircle,
  Star,
  Sprout,
  LeafyGreen,
  Tractor,
  Handshake
} from "lucide-react";

export default function Dashboard() {
  const navigate = useNavigate();
  const [role, setRole] = useState("user");
  const [user, setUser] = useState({});
  const [activeTab, setActiveTab] = useState("dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Define the color palette from the home page
  const colors = {
    primaryBg: '#FAF7F3',
    primaryText: '#2D4F2B',
    secondaryBg: '#708A58',
    lightText: '#FAF7F3',
    darkText: '#2D4F2B',
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    const savedRole = localStorage.getItem("role");
    const savedUser = localStorage.getItem("user");

    if (!token) {
      navigate("/login");
      return;
    }

    if (savedRole) setRole(savedRole);
    if (savedUser) setUser(JSON.parse(savedUser));
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("user");
    navigate("/login");
  };

  // Stats data for demonstration
  const userStats = [
    { label: "Tenders Viewed", value: "24", icon: <FileText className="w-5 h-5" />, change: "+12%", positive: true },
    { label: "Applications", value: "8", icon: <CheckCircle className="w-5 h-5" />, change: "+5%", positive: true },
    { label: "Success Rate", value: "68%", icon: <Award className="w-5 h-5" />, change: "+8%", positive: true },
    { label: "Time Saved", value: "42h", icon: <Clock className="w-5 h-5" />, change: "+15h", positive: true }
  ];

  const adminStats = [
    { label: "Total Users", value: "524", icon: <Users className="w-5 h-5" />, change: "+24", positive: true },
    { label: "Active Teams", value: "48", icon: <Building className="w-5 h-5" />, change: "+3", positive: true },
    { label: "Tenders Posted", value: "127", icon: <FileText className="w-5 h-5" />, change: "+12", positive: true },
    { label: "System Health", value: "99.8%", icon: <Shield className="w-5 h-5" />, change: "Stable", positive: true }
  ];

  const recentActivities = [
    { action: "Submitted tender application", entity: "City Infrastructure Project", time: "2 hours ago" },
    { action: "Viewed tender", entity: "Healthcare System Upgrade", time: "5 hours ago" },
    { action: "Updated company profile", entity: "", time: "Yesterday" },
    { action: "Downloaded tender documents", entity: "Educational Facilities", time: "2 days ago" }
  ];

  return (
    <div className="flex h-screen font-sans" style={{ backgroundColor: colors.primaryBg }}>
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-64' : 'w-20'} transition-all duration-300 flex flex-col`} style={{ backgroundColor: colors.secondaryBg, color: colors.lightText }}>
        <div className="flex items-center justify-between p-5 border-b" style={{ borderColor: 'rgba(250, 247, 243, 0.2)' }}>
          {sidebarOpen ? (
            <Link to="/" className="flex items-center gap-2 text-xl font-bold">
              <LayoutDashboard className="h-7 w-7" style={{ color: colors.lightText }} />
              <span style={{ color: colors.lightText }}>SmartTender</span>
            </Link>
          ) : (
            <Link to="/" className="flex justify-center">
              <LayoutDashboard className="h-7 w-7" style={{ color: colors.lightText }} />
            </Link>
          )}
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-1 rounded hover:bg-opacity-20" style={{ backgroundColor: 'rgba(250, 247, 243, 0.1)' }}
          >
            {sidebarOpen ? <ChevronRight size={20} style={{ color: colors.lightText }} /> : <ChevronDown size={20} style={{ color: colors.lightText }} />}
          </button>
        </div>
        
        <nav className="flex-1 mt-6">
          <ul className="px-3 space-y-1">
            <li>
              <Link 
                to="/dashboard" 
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'dashboard' ? 'bg-opacity-20' : 'hover:bg-opacity-10'}`}
                style={{ backgroundColor: activeTab === 'dashboard' ? 'rgba(250, 247, 243, 0.2)' : 'transparent' }}
                onClick={() => setActiveTab('dashboard')}
              >
                <LayoutDashboard className="w-5 h-5" style={{ color: colors.lightText }} />
                {sidebarOpen && <span style={{ color: colors.lightText }}>Dashboard</span>}
              </Link>
            </li>
            <li>
              <Link 
                to="/search" 
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'search' ? 'bg-opacity-20' : 'hover:bg-opacity-10'}`}
                style={{ backgroundColor: activeTab === 'search' ? 'rgba(250, 247, 243, 0.2)' : 'transparent' }}
                onClick={() => setActiveTab('search')}
              >
                <Search className="w-5 h-5" style={{ color: colors.lightText }} />
                {sidebarOpen && <span style={{ color: colors.lightText }}>Search Tenders</span>}
              </Link>
            </li>
            <li>
              <Link 
                to="/companies" 
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'companies' ? 'bg-opacity-20' : 'hover:bg-opacity-10'}`}
                style={{ backgroundColor: activeTab === 'companies' ? 'rgba(250, 247, 243, 0.2)' : 'transparent' }}
                onClick={() => setActiveTab('companies')}
              >
                <Building className="w-5 h-5" style={{ color: colors.lightText }} />
                {sidebarOpen && <span style={{ color: colors.lightText }}>My Company</span>}
              </Link>
            </li>
            <li>
              <Link 
                to="/user/summaries" 
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'summaries' ? 'bg-opacity-20' : 'hover:bg-opacity-10'}`}
                style={{ backgroundColor: activeTab === 'summaries' ? 'rgba(250, 247, 243, 0.2)' : 'transparent' }}
                onClick={() => setActiveTab('summaries')}
              >
                <FileText className="w-5 h-5" style={{ color: colors.lightText }} />
                {sidebarOpen && <span style={{ color: colors.lightText }}>Tender Summaries</span>}
              </Link>
            </li>
            <li>
              <Link 
                to="/user/readiness" 
                className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${activeTab === 'readiness' ? 'bg-opacity-20' : 'hover:bg-opacity-10'}`}
                style={{ backgroundColor: activeTab === 'readiness' ? 'rgba(250, 247, 243, 0.2)' : 'transparent' }}
                onClick={() => setActiveTab('readiness')}
              >
                <Target className="w-5 h-5" style={{ color: colors.lightText }} />
                {sidebarOpen && <span style={{ color: colors.lightText }}>Check Readiness</span>}
              </Link>
            </li>
          </ul>
          
          {role === "admin" && sidebarOpen && (
            <div className="px-3 mt-8">
              <h3 className="px-4 text-xs font-semibold tracking-widest uppercase" style={{ color: 'rgba(250, 247, 243, 0.7)' }}>Admin</h3>
              <ul className="mt-2 space-y-1">
                <li>
                  <Link 
                    to="/admin/teams" 
                    className="flex items-center gap-3 px-4 py-3 transition-colors rounded-lg hover:bg-opacity-10"
                    style={{ backgroundColor: 'transparent' }}
                  >
                    <Grid3X3 className="w-5 h-5" style={{ color: colors.lightText }} />
                    <span style={{ color: colors.lightText }}>Manage Teams</span>
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/admin/plans" 
                    className="flex items-center gap-3 px-4 py-3 transition-colors rounded-lg hover:bg-opacity-10"
                    style={{ backgroundColor: 'transparent' }}
                  >
                    <Layers className="w-5 h-5" style={{ color: colors.lightText }} />
                    <span style={{ color: colors.lightText }}>Manage Plans</span>
                  </Link>
                </li>
                <li>
                  <Link 
                    to="/admin/users" 
                    className="flex items-center gap-3 px-4 py-3 transition-colors rounded-lg hover:bg-opacity-10"
                    style={{ backgroundColor: 'transparent' }}
                  >
                    <User className="w-5 h-5" style={{ color: colors.lightText }} />
                    <span style={{ color: colors.lightText }}>View All Users</span>
                  </Link>
                </li>
              </ul>
            </div>
          )}
        </nav>
        
        <div className="p-4 border-t" style={{ borderColor: 'rgba(250, 247, 243, 0.2)' }}>
          <div className="flex items-center gap-3 px-2 py-3 rounded-lg" style={{ backgroundColor: 'rgba(250, 247, 243, 0.1)' }}>
            <div className="flex items-center justify-center w-8 h-8 rounded-full" style={{ backgroundColor: colors.primaryText }}>
              <span className="text-sm font-medium" style={{ color: colors.lightText }}>{user.full_name ? user.full_name.charAt(0) : 'U'}</span>
            </div>
            {sidebarOpen && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate" style={{ color: colors.lightText }}>{user.full_name || "User"}</p>
                <p className="text-xs truncate" style={{ color: 'rgba(250, 247, 243, 0.7)' }}>{user.email || "user@example.com"}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Header */}
        <header style={{ backgroundColor: colors.primaryBg, borderColor: 'rgba(45, 79, 43, 0.1)' }} className="border-b">
          <div className="flex items-center justify-between px-6 py-4">
            <h1 className="text-2xl font-bold" style={{ color: colors.primaryText }}>
              {role === "admin" ? "Admin Dashboard" : "Dashboard"}
            </h1>
            
            <div className="flex items-center space-x-4">
              <button className="p-2 rounded-full hover:bg-opacity-10" style={{ backgroundColor: 'rgba(45, 79, 43, 0.05)' }}>
                <Bell className="w-5 h-5" style={{ color: colors.primaryText }} />
                <span className="absolute top-0 right-0 w-2 h-2 rounded-full" style={{ backgroundColor: colors.secondaryBg }}></span>
              </button>
              
              <button className="p-2 rounded-full hover:bg-opacity-10" style={{ backgroundColor: 'rgba(45, 79, 43, 0.05)' }}>
                <HelpCircle className="w-5 h-5" style={{ color: colors.primaryText }} />
              </button>
              
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium transition duration-300 rounded-lg hover:bg-opacity-10"
                style={{ color: colors.primaryText, backgroundColor: 'rgba(45, 79, 43, 0.05)' }}
              >
                <LogOut className="w-4 h-4" />
                Log Out
              </button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1 p-6 overflow-y-auto" style={{ backgroundColor: colors.primaryBg }}>
          {/* Welcome Banner */}
          <div className="p-6 mb-8 shadow-lg rounded-2xl" style={{ backgroundColor: colors.secondaryBg, color: colors.lightText }}>
            <div className="flex items-center justify-between">
              <div>
                <h2 className="mb-2 text-2xl font-bold">Welcome back, {user.full_name || "User"}! 👋</h2>
                <p className="max-w-2xl opacity-90">
                  {role === "admin" 
                    ? "Here's what's happening with your platform today." 
                    : "Ready to find your next business opportunity? Check out the latest tenders matching your profile."}
                </p>
              </div>
              <div className="hidden md:block">
                <Sprout className="w-16 h-16 opacity-30" style={{ color: colors.lightText }} />
              </div>
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-2 lg:grid-cols-4">
            {(role === "admin" ? adminStats : userStats).map((stat, index) => (
              <div key={index} className="p-6 transition-shadow border shadow-sm rounded-2xl hover:shadow-md" style={{ backgroundColor: colors.primaryBg, borderColor: colors.secondaryBg, color: colors.primaryText }}>
                <div className="flex items-center justify-between mb-4">
                  <div className="p-3 rounded-xl" style={{ backgroundColor: 'rgba(112, 138, 88, 0.1)' }}>
                    {React.cloneElement(stat.icon, { style: { color: colors.secondaryBg } })}
                  </div>
                  <span className={`text-sm font-medium ${stat.positive ? 'text-green-600' : 'text-red-600'}`}>
                    {stat.change}
                  </span>
                </div>
                <h3 className="mb-1 text-2xl font-bold" style={{ color: colors.primaryText }}>{stat.value}</h3>
                <p className="text-sm" style={{ color: colors.secondaryBg }}>{stat.label}</p>
              </div>
            ))}
          </div>

          {role === "admin" ? (
            /* Admin Dashboard */
            <div className="space-y-6">
              <div className="overflow-hidden border shadow-sm rounded-2xl" style={{ backgroundColor: colors.primaryBg, borderColor: colors.secondaryBg }}>
                <div className="px-6 py-5 border-b" style={{ borderColor: colors.secondaryBg }}>
                  <h2 className="flex items-center gap-3 text-xl font-semibold" style={{ color: colors.primaryText }}>
                    <Briefcase className="w-6 h-6" style={{ color: colors.secondaryBg }} />
                    Admin Tools
                  </h2>
                  <p className="mt-1" style={{ color: colors.secondaryBg }}>
                    Manage users, plans, and teams across the entire SmartTender platform.
                  </p>
                </div>
                
                <div className="p-6">
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    <Link
                      to="/admin/teams"
                      className="p-5 transition-all border group rounded-xl hover:shadow-md"
                      style={{ backgroundColor: colors.primaryBg, borderColor: colors.secondaryBg }}
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 transition-colors rounded-lg group-hover:bg-opacity-20" style={{ backgroundColor: 'rgba(112, 138, 88, 0.1)' }}>
                          <Grid3X3 className="w-5 h-5" style={{ color: colors.secondaryBg }} />
                        </div>
                        <h3 className="font-semibold transition-colors group-hover:text-opacity-80" style={{ color: colors.primaryText }}>Manage Teams</h3>
                      </div>
                      <p className="text-sm" style={{ color: colors.secondaryBg }}>View and manage all teams in the system.</p>
                    </Link>
                    
                    <Link
                      to="/admin/plans"
                      className="p-5 transition-all border group rounded-xl hover:shadow-md"
                      style={{ backgroundColor: colors.primaryBg, borderColor: colors.secondaryBg }}
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 transition-colors rounded-lg group-hover:bg-opacity-20" style={{ backgroundColor: 'rgba(112, 138, 88, 0.1)' }}>
                          <Layers className="w-5 h-5" style={{ color: colors.secondaryBg }} />
                        </div>
                        <h3 className="font-semibold transition-colors group-hover:text-opacity-80" style={{ color: colors.primaryText }}>Manage Plans</h3>
                      </div>
                      <p className="text-sm" style={{ color: colors.secondaryBg }}>Configure subscription plans and features.</p>
                    </Link>
                    
                    <Link
                      to="/admin/users"
                      className="p-5 transition-all border group rounded-xl hover:shadow-md"
                      style={{ backgroundColor: colors.primaryBg, borderColor: colors.secondaryBg }}
                    >
                      <div className="flex items-center gap-3 mb-3">
                        <div className="p-2 transition-colors rounded-lg group-hover:bg-opacity-20" style={{ backgroundColor: 'rgba(112, 138, 88, 0.1)' }}>
                          <User className="w-5 h-5" style={{ color: colors.secondaryBg }} />
                        </div>
                        <h3 className="font-semibold transition-colors group-hover:text-opacity-80" style={{ color: colors.primaryText }}>View All Users</h3>
                      </div>
                      <p className="text-sm" style={{ color: colors.secondaryBg }}>Manage user accounts and permissions.</p>
                    </Link>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                <div className="p-6 border shadow-sm rounded-2xl" style={{ backgroundColor: colors.primaryBg, borderColor: colors.secondaryBg }}>
                  <h3 className="mb-4 text-lg font-semibold" style={{ color: colors.primaryText }}>Recent Activity</h3>
                  <div className="space-y-4">
                    {recentActivities.map((activity, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className="p-2 mt-1 rounded-full" style={{ backgroundColor: 'rgba(112, 138, 88, 0.1)' }}>
                          <Clock className="w-4 h-4" style={{ color: colors.secondaryBg }} />
                        </div>
                        <div>
                          <p className="text-sm font-medium" style={{ color: colors.primaryText }}>{activity.action}</p>
                          {activity.entity && <p className="text-sm" style={{ color: colors.secondaryBg }}>{activity.entity}</p>}
                          <p className="text-xs" style={{ color: colors.secondaryBg }}>{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                <div className="p-6 border shadow-sm rounded-2xl" style={{ backgroundColor: colors.primaryBg, borderColor: colors.secondaryBg }}>
                  <h3 className="mb-4 text-lg font-semibold" style={{ color: colors.primaryText }}>Quick Actions</h3>
                  <div className="space-y-3">
                    <button className="flex items-center w-full gap-3 p-3 text-left transition-all border rounded-xl hover:shadow-sm" style={{ backgroundColor: colors.primaryBg, borderColor: colors.secondaryBg }}>
                      <BarChart3 className="w-5 h-5" style={{ color: colors.secondaryBg }} />
                      <span className="text-sm font-medium" style={{ color: colors.primaryText }}>Generate Reports</span>
                    </button>
                    <button className="flex items-center w-full gap-3 p-3 text-left transition-all border rounded-xl hover:shadow-sm" style={{ backgroundColor: colors.primaryBg, borderColor: colors.secondaryBg }}>
                      <Settings className="w-5 h-5" style={{ color: colors.secondaryBg }} />
                      <span className="text-sm font-medium" style={{ color: colors.primaryText }}>System Settings</span>
                    </button>
                    <button className="flex items-center w-full gap-3 p-3 text-left transition-all border rounded-xl hover:shadow-sm" style={{ backgroundColor: colors.primaryBg, borderColor: colors.secondaryBg }}>
                      <Users className="w-5 h-5" style={{ color: colors.secondaryBg }} />
                      <span className="text-sm font-medium" style={{ color: colors.primaryText }}>User Management</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            /* User Dashboard */
            <div className="space-y-6">
              <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                <div className="lg:col-span-2">
                  <div className="overflow-hidden border shadow-sm rounded-2xl" style={{ backgroundColor: colors.primaryBg, borderColor: colors.secondaryBg }}>
                    <div className="px-6 py-5 border-b" style={{ borderColor: colors.secondaryBg }}>
                      <h2 className="flex items-center gap-3 text-xl font-semibold" style={{ color: colors.primaryText }}>
                        <User className="w-6 h-6" style={{ color: colors.secondaryBg }} />
                        Quick Access
                      </h2>
                      <p className="mt-1" style={{ color: colors.secondaryBg }}>
                        Access your tools to streamline your tendering process and win more bids.
                      </p>
                    </div>
                    
                    <div className="p-6">
                      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        <Link
                          to="/search"
                          className="p-5 transition-all border group rounded-xl hover:shadow-md"
                          style={{ backgroundColor: colors.primaryBg, borderColor: colors.secondaryBg }}
                        >
                          <div className="flex items-center gap-3 mb-3">
                            <div className="p-2 transition-colors rounded-lg group-hover:bg-opacity-20" style={{ backgroundColor: 'rgba(112, 138, 88, 0.1)' }}>
                              <Search className="w-5 h-5" style={{ color: colors.secondaryBg }} />
                            </div>
                            <h3 className="font-semibold transition-colors group-hover:text-opacity-80" style={{ color: colors.primaryText }}>Search for Tenders</h3>
                          </div>
                          <p className="text-sm" style={{ color: colors.secondaryBg }}>Find new opportunities matching your business.</p>
                        </Link>
                        
                        <Link
                          to="/companies"
                          className="p-5 transition-all border group rounded-xl hover:shadow-md"
                          style={{ backgroundColor: colors.primaryBg, borderColor: colors.secondaryBg }}
                        >
                          <div className="flex items-center gap-3 mb-3">
                            <div className="p-2 transition-colors rounded-lg group-hover:bg-opacity-20" style={{ backgroundColor: 'rgba(112, 138, 88, 0.1)' }}>
                              <Building className="w-5 h-5" style={{ color: colors.secondaryBg }} />
                            </div>
                            <h3 className="font-semibold transition-colors group-hover:text-opacity-80" style={{ color: colors.primaryText }}>View My Company</h3>
                          </div>
                          <p className="text-sm" style={{ color: colors.secondaryBg }}>Manage your company profile and details.</p>
                        </Link>
                        
                        <Link
                          to="/user/summaries"
                          className="p-5 transition-all border group rounded-xl hover:shadow-md"
                          style={{ backgroundColor: colors.primaryBg, borderColor: colors.secondaryBg }}
                        >
                          <div className="flex items-center gap-3 mb-3">
                            <div className="p-2 transition-colors rounded-lg group-hover:bg-opacity-20" style={{ backgroundColor: 'rgba(112, 138, 88, 0.1)' }}>
                              <FileText className="w-5 h-5" style={{ color: colors.secondaryBg }} />
                            </div>
                            <h3 className="font-semibold transition-colors group-hover:text-opacity-80" style={{ color: colors.primaryText }}>Tender Summaries</h3>
                          </div>
                          <p className="text-sm" style={{ color: colors.secondaryBg }}>View and manage your tender applications.</p>
                        </Link>
                        
                        <Link
                          to="/user/readiness"
                          className="p-5 transition-all border group rounded-xl hover:shadow-md"
                          style={{ backgroundColor: colors.primaryBg, borderColor: colors.secondaryBg }}
                        >
                          <div className="flex items-center gap-3 mb-3">
                            <div className="p-2 transition-colors rounded-lg group-hover:bg-opacity-20" style={{ backgroundColor: 'rgba(112, 138, 88, 0.1)' }}>
                              <Target className="w-5 h-5" style={{ color: colors.secondaryBg }} />
                            </div>
                            <h3 className="font-semibold transition-colors group-hover:text-opacity-80" style={{ color: colors.primaryText }}>Check Readiness</h3>
                          </div>
                          <p className="text-sm" style={{ color: colors.secondaryBg }}>Evaluate your preparedness for new tenders.</p>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-6">
                  <div className="p-6 border shadow-sm rounded-2xl" style={{ backgroundColor: colors.primaryBg, borderColor: colors.secondaryBg }}>
                    <h3 className="mb-4 text-lg font-semibold" style={{ color: colors.primaryText }}>Recent Activity</h3>
                    <div className="space-y-4">
                      {recentActivities.map((activity, index) => (
                        <div key={index} className="flex items-start gap-3">
                          <div className="p-2 mt-1 rounded-full" style={{ backgroundColor: 'rgba(112, 138, 88, 0.1)' }}>
                            <Clock className="w-4 h-4" style={{ color: colors.secondaryBg }} />
                          </div>
                          <div>
                            <p className="text-sm font-medium" style={{ color: colors.primaryText }}>{activity.action}</p>
                            {activity.entity && <p className="text-sm" style={{ color: colors.secondaryBg }}>{activity.entity}</p>}
                            <p className="text-xs" style={{ color: colors.secondaryBg }}>{activity.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="p-6 border shadow-sm rounded-2xl" style={{ backgroundColor: colors.primaryBg, borderColor: colors.secondaryBg }}>
                    <h3 className="mb-4 text-lg font-semibold" style={{ color: colors.primaryText }}>Recommended Tenders</h3>
                    <div className="space-y-3">
                      <div className="p-3 border rounded-xl" style={{ backgroundColor: 'rgba(112, 138, 88, 0.1)', borderColor: colors.secondaryBg }}>
                        <div className="flex items-center gap-2 mb-1">
                          <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                          <span className="text-sm font-medium" style={{ color: colors.primaryText }}>Infrastructure Project</span>
                        </div>
                        <p className="mb-2 text-xs" style={{ color: colors.secondaryBg }}>Closing in 5 days</p>
                        <div className="flex items-center justify-between">
                          <span className="px-2 py-1 text-xs rounded-full" style={{ backgroundColor: 'rgba(112, 138, 88, 0.2)', color: colors.primaryText }}>High Match</span>
                          <button className="text-xs font-medium hover:underline" style={{ color: colors.secondaryBg }}>View →</button>
                        </div>
                      </div>
                      
                      <div className="p-3 border rounded-xl" style={{ backgroundColor: colors.primaryBg, borderColor: colors.secondaryBg }}>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-sm font-medium" style={{ color: colors.primaryText }}>Healthcare System Upgrade</span>
                        </div>
                        <p className="mb-2 text-xs" style={{ color: colors.secondaryBg }}>Closing in 12 days</p>
                        <div className="flex items-center justify-between">
                          <span className="px-2 py-1 text-xs rounded-full" style={{ backgroundColor: 'rgba(112, 138, 88, 0.2)', color: colors.primaryText }}>Medium Match</span>
                          <button className="text-xs font-medium hover:underline" style={{ color: colors.secondaryBg }}>View →</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}