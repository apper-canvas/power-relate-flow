import { useState } from 'react'
import { motion } from 'framer-motion'
import MainFeature from '../components/MainFeature'
import ApperIcon from '../components/ApperIcon'

const Home = () => {
  const [darkMode, setDarkMode] = useState(false)
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [activeView, setActiveView] = useState('dashboard')

  const navigationItems = [
    { id: 'dashboard', label: 'Dashboard', icon: 'BarChart3', active: true },
    { id: 'contacts', label: 'Contacts', icon: 'Users', active: true },
    { id: 'deals', label: 'Deals', icon: 'TrendingUp', active: true },
    { id: 'activities', label: 'Activities', icon: 'Clock', active: true },
    { id: 'tasks', label: 'Tasks', icon: 'CheckSquare', active: false },
    { id: 'analytics', label: 'Analytics', icon: 'PieChart', active: false },
    { id: 'reports', label: 'Reports', icon: 'FileText', active: false },
    { id: 'settings', label: 'Settings', icon: 'Settings', active: true }
  ]

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
    document.documentElement.classList.toggle('dark')
  }

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'dark bg-gray-900' : 'bg-gray-50'}`}>
      {/* Top Navigation */}
      <motion.nav 
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="fixed top-0 left-0 right-0 z-50 h-14 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 shadow-sm"
      >
        <div className="flex items-center justify-between h-full px-4 lg:px-6">
          {/* Left Section */}
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors lg:hidden"
            >
              <ApperIcon name="Menu" size={20} />
            </button>
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-primary-dark rounded-lg flex items-center justify-center">
                <ApperIcon name="Zap" size={18} className="text-white" />
              </div>
              <span className="text-xl font-bold text-gray-900 dark:text-white hidden sm:block">RelateFlow</span>
            </div>
          </div>

          {/* Center - Search */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <ApperIcon name="Search" size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search contacts, deals..."
                className="w-full pl-10 pr-4 py-2 bg-gray-100 dark:bg-gray-700 border-0 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary focus:bg-white dark:focus:bg-gray-600 transition-all"
              />
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-3">
            <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors hidden sm:block">
              <ApperIcon name="Plus" size={18} />
            </button>
            <button className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
              <ApperIcon name="Bell" size={18} />
            </button>
            <button
              onClick={toggleDarkMode}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <ApperIcon name={darkMode ? "Sun" : "Moon"} size={18} />
            </button>
          </div>
        </div>
      </motion.nav>

      <div className="flex pt-14">
        {/* Sidebar */}
        <motion.aside
          initial={{ x: -240, opacity: 0 }}
          animate={{ 
            x: 0, 
            opacity: 1,
            width: sidebarCollapsed ? 0 : 240
          }}
          className={`fixed left-0 top-14 bottom-0 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 transition-all duration-300 z-40 lg:relative lg:translate-x-0 ${
            sidebarCollapsed ? 'w-0 overflow-hidden lg:w-16' : 'w-60'
          }`}
        >
          <div className="p-4 space-y-2">
            {navigationItems.map((item) => (
              <motion.button
                key={item.id}
                onClick={() => setActiveView(item.id)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-left transition-all ${
                  activeView === item.id
                    ? 'bg-primary text-white shadow-lg'
                    : item.active
                    ? 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                    : 'text-gray-400 dark:text-gray-500 cursor-not-allowed'
                }`}
                disabled={!item.active}
              >
                <ApperIcon name={item.icon} size={18} />
                {!sidebarCollapsed && (
                  <span className="font-medium">{item.label}</span>
                )}
                {!item.active && !sidebarCollapsed && (
                  <span className="ml-auto text-xs bg-amber-100 text-amber-700 px-2 py-1 rounded-full">
                    Soon
                  </span>
                )}
              </motion.button>
            ))}
          </div>
        </motion.aside>

        {/* Main Content */}
        <main className={`flex-1 transition-all duration-300 ${sidebarCollapsed ? 'lg:ml-0' : 'lg:ml-0'}`}>
          <div className="p-4 lg:p-6">
            <MainFeature activeView={activeView} />
          </div>
        </main>
      </div>

      {/* Mobile Sidebar Overlay */}
      {!sidebarCollapsed && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setSidebarCollapsed(true)}
        />
      )}
    </div>
  )
}

export default Home