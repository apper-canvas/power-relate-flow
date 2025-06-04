import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import ApperIcon from '../components/ApperIcon'

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center px-4">
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-md"
      >
        <div className="mb-8">
          <div className="w-24 h-24 mx-auto bg-gradient-to-br from-primary to-primary-dark rounded-full flex items-center justify-center mb-6">
            <ApperIcon name="AlertTriangle" size={48} className="text-white" />
          </div>
          <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-4">404</h1>
          <h2 className="text-xl lg:text-2xl font-semibold text-gray-700 mb-2">Page Not Found</h2>
          <p className="text-gray-600 mb-8">
            The page you're looking for doesn't exist. Let's get you back to managing your relationships.
          </p>
        </div>
        
        <Link 
          to="/" 
          className="inline-flex items-center space-x-2 bg-primary hover:bg-primary-dark text-white px-6 py-3 rounded-lg font-medium transition-colors"
        >
          <ApperIcon name="Home" size={18} />
          <span>Back to Dashboard</span>
        </Link>
      </motion.div>
    </div>
  )
}

export default NotFound