import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-toastify'
import ApperIcon from './ApperIcon'
import contactService from '../services/api/contactService'
import dealService from '../services/api/dealService'
import activityService from '../services/api/activityService'

const MainFeature = ({ activeView }) => {
  const [contacts, setContacts] = useState([])
  const [deals, setDeals] = useState([])
  const [activities, setActivities] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [showModal, setShowModal] = useState(false)
  const [editingContact, setEditingContact] = useState(null)
  const [sortField, setSortField] = useState('firstName')
  const [sortDirection, setSortDirection] = useState('asc')

  // Contact form state
  const [contactForm, setContactForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    position: '',
    notes: ''
  })

  // Deal form state
  const [dealForm, setDealForm] = useState({
    title: '',
    value: '',
    stage: 'prospect',
    contactId: '',
    probability: 50,
    expectedCloseDate: '',
    notes: ''
  })

  // Activity form state
  const [activityForm, setActivityForm] = useState({
    type: 'call',
    subject: '',
    description: '',
    contactId: '',
    dealId: '',
    duration: 30
  })

  const [showDealModal, setShowDealModal] = useState(false)
  const [showActivityModal, setShowActivityModal] = useState(false)
  const [editingDeal, setEditingDeal] = useState(null)

  useEffect(() => {
    if (activeView === 'contacts') {
      loadContacts()
    } else if (activeView === 'deals') {
      loadDeals()
      loadContacts() // Need contacts for deal creation
    } else if (activeView === 'activities') {
      loadActivities()
      loadContacts() // Need contacts for activity creation
      loadDeals() // Need deals for activity creation
    }
  }, [activeView])

  const loadContacts = async () => {
    setLoading(true)
    try {
      const result = await contactService.getAll()
      setContacts(result || [])
    } catch (err) {
      setError(err.message)
      toast.error('Failed to load contacts')
    } finally {
      setLoading(false)
    }
  }

  const loadDeals = async () => {
    setLoading(true)
    try {
      const result = await dealService.getAll()
      setDeals(result || [])
    } catch (err) {
      setError(err.message)
      toast.error('Failed to load deals')
    } finally {
      setLoading(false)
    }
  }

  const loadActivities = async () => {
    setLoading(true)
    try {
      const result = await activityService.getAll()
      setActivities(result || [])
    } catch (err) {
      setError(err.message)
      toast.error('Failed to load activities')
    } finally {
      setLoading(false)
    }
  }

  const handleContactSubmit = async (e) => {
    e.preventDefault()
    try {
      if (editingContact) {
        await contactService.update(editingContact.id, contactForm)
        toast.success('Contact updated successfully')
      } else {
        await contactService.create(contactForm)
        toast.success('Contact created successfully')
      }
      setShowModal(false)
      setEditingContact(null)
      setContactForm({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        company: '',
        position: '',
        notes: ''
      })
      loadContacts()
    } catch (err) {
      toast.error('Failed to save contact')
    }
  }

  const handleDeleteContact = async (id) => {
    if (window.confirm('Are you sure you want to delete this contact?')) {
      try {
        await contactService.delete(id)
        toast.success('Contact deleted successfully')
        loadContacts()
      } catch (err) {
        toast.error('Failed to delete contact')
      }
    }
  }

  const handleEditContact = (contact) => {
    setEditingContact(contact)
    setContactForm(contact)
    setShowModal(true)
  }

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('asc')
    }
  }

  const filteredContacts = contacts
    .filter(contact => 
      contact?.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact?.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact?.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact?.company?.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      const aVal = a?.[sortField] || ''
      const bVal = b?.[sortField] || ''
      if (sortDirection === 'asc') {
        return aVal.localeCompare(bVal)
      }
      return bVal.localeCompare(aVal)
    })

  const handleDealSubmit = async (e) => {
    e.preventDefault()
    try {
      if (editingDeal) {
        await dealService.update(editingDeal.id, dealForm)
        toast.success('Deal updated successfully')
      } else {
        await dealService.create(dealForm)
        toast.success('Deal created successfully')
      }
      setShowDealModal(false)
      setEditingDeal(null)
      setDealForm({
        title: '',
        value: '',
        stage: 'prospect',
        contactId: '',
        probability: 50,
        expectedCloseDate: '',
        notes: ''
      })
      loadDeals()
    } catch (err) {
      toast.error('Failed to save deal')
    }
  }

  const handleActivitySubmit = async (e) => {
    e.preventDefault()
    try {
      await activityService.create(activityForm)
      toast.success('Activity logged successfully')
      setShowActivityModal(false)
      setActivityForm({
        type: 'call',
        subject: '',
        description: '',
        contactId: '',
        dealId: '',
        duration: 30
      })
      loadActivities()
    } catch (err) {
      toast.error('Failed to log activity')
    }
  }

  const dealStages = ['prospect', 'qualified', 'proposal', 'negotiation', 'closed']
  
  const getStageDeals = (stage) => {
    return deals.filter(deal => deal?.stage === stage) || []
  }

  const getStageTotal = (stage) => {
    return getStageDeals(stage).reduce((sum, deal) => sum + (deal?.value || 0), 0)
  }

  const getContactName = (contactId) => {
    const contact = contacts.find(c => c?.id === contactId)
    return contact ? `${contact.firstName || ''} ${contact.lastName || ''}`.trim() : 'Unknown Contact'
  }

  const renderDashboard = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
        <div className="flex space-x-3 mt-4 sm:mt-0">
          <button
            onClick={() => setShowModal(true)}
            className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2"
          >
            <ApperIcon name="Plus" size={16} />
            <span>Add Contact</span>
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Contacts</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{contacts.length || 0}</p>
            </div>
            <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-lg">
              <ApperIcon name="Users" size={24} className="text-blue-600 dark:text-blue-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Active Deals</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{deals.length || 0}</p>
            </div>
            <div className="bg-green-100 dark:bg-green-900 p-3 rounded-lg">
              <ApperIcon name="TrendingUp" size={24} className="text-green-600 dark:text-green-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Total Pipeline</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                ${deals.reduce((sum, deal) => sum + (deal?.value || 0), 0).toLocaleString()}
              </p>
            </div>
            <div className="bg-purple-100 dark:bg-purple-900 p-3 rounded-lg">
              <ApperIcon name="DollarSign" size={24} className="text-purple-600 dark:text-purple-400" />
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">Activities</p>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{activities.length || 0}</p>
            </div>
            <div className="bg-orange-100 dark:bg-orange-900 p-3 rounded-lg">
              <ApperIcon name="Clock" size={24} className="text-orange-600 dark:text-orange-400" />
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  )

  const renderContacts = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">Contacts</h1>
        <button
          onClick={() => setShowModal(true)}
          className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2 mt-4 sm:mt-0"
        >
          <ApperIcon name="Plus" size={16} />
          <span>Add Contact</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-card">
        <div className="relative">
          <ApperIcon name="Search" size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search contacts..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-50 dark:bg-gray-700 border-0 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-primary transition-all"
          />
        </div>
      </div>

      {/* Contacts Table */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-card overflow-hidden">
        {loading ? (
          <div className="p-8 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
            <p className="text-gray-500 mt-2">Loading contacts...</p>
          </div>
        ) : filteredContacts.length === 0 ? (
          <div className="p-8 text-center">
            <ApperIcon name="Users" size={48} className="text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No contacts found</h3>
            <p className="text-gray-500 mb-4">Get started by adding your first contact.</p>
            <button
              onClick={() => setShowModal(true)}
              className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg font-medium transition-colors"
            >
              Add Contact
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  {[
                    { field: 'firstName', label: 'Name' },
                    { field: 'company', label: 'Company' },
                    { field: 'email', label: 'Email' },
                    { field: 'phone', label: 'Phone' }
                  ].map(({ field, label }) => (
                    <th
                      key={field}
                      onClick={() => handleSort(field)}
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-600"
                    >
                      <div className="flex items-center space-x-1">
                        <span>{label}</span>
                        {sortField === field && (
                          <ApperIcon 
                            name={sortDirection === 'asc' ? "ChevronUp" : "ChevronDown"} 
                            size={14} 
                          />
                        )}
                      </div>
                    </th>
                  ))}
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {filteredContacts.map((contact) => (
                  <motion.tr
                    key={contact?.id}
                    whileHover={{ backgroundColor: "rgba(249, 250, 251, 0.5)" }}
                    className="hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary-dark rounded-full flex items-center justify-center text-white font-medium">
                          {((contact?.firstName || '').charAt(0) + (contact?.lastName || '').charAt(0)) || 'U'}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900 dark:text-white">
                            {`${contact?.firstName || ''} ${contact?.lastName || ''}`.trim() || 'Unknown'}
                          </div>
                          <div className="text-sm text-gray-500">{contact?.position || 'No position'}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      {contact?.company || 'No company'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      {contact?.email || 'No email'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      {contact?.phone || 'No phone'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <div className="flex items-center justify-end space-x-2">
                        <button
                          onClick={() => handleEditContact(contact)}
                          className="text-primary hover:text-primary-dark p-1 rounded"
                        >
                          <ApperIcon name="Edit" size={16} />
                        </button>
                        <button
                          onClick={() => handleDeleteContact(contact?.id)}
                          className="text-red-600 hover:text-red-900 p-1 rounded"
                        >
                          <ApperIcon name="Trash2" size={16} />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </motion.div>
  )

  const renderDeals = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">Deal Pipeline</h1>
        <button
          onClick={() => setShowDealModal(true)}
          className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2 mt-4 sm:mt-0"
        >
          <ApperIcon name="Plus" size={16} />
          <span>Add Deal</span>
        </button>
      </div>

      {/* Pipeline Board */}
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 lg:gap-6">
        {dealStages.map((stage) => (
          <div key={stage} className="bg-white dark:bg-gray-800 rounded-xl shadow-card">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="font-semibold text-gray-900 dark:text-white capitalize">
                {stage}
              </h3>
              <p className="text-sm text-gray-500">
                ${getStageTotal(stage).toLocaleString()}
              </p>
            </div>
            <div className="p-4 space-y-3 min-h-64">
              {getStageDeals(stage).map((deal) => (
                <motion.div
                  key={deal?.id}
                  whileHover={{ scale: 1.02 }}
                  className="bg-gray-50 dark:bg-gray-700 p-3 rounded-lg border border-gray-200 dark:border-gray-600 cursor-pointer"
                >
                  <h4 className="font-medium text-gray-900 dark:text-white text-sm">
                    {deal?.title || 'Untitled Deal'}
                  </h4>
                  <p className="text-lg font-bold text-primary">
                    ${(deal?.value || 0).toLocaleString()}
                  </p>
                  <p className="text-xs text-gray-500">
                    {getContactName(deal?.contactId)}
                  </p>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-xs text-gray-500">
                      {deal?.probability || 0}% likely
                    </span>
                  </div>
                </motion.div>
              ))}
              {getStageDeals(stage).length === 0 && (
                <div className="text-center py-8">
                  <ApperIcon name="Plus" size={24} className="text-gray-400 mx-auto mb-2" />
                  <p className="text-sm text-gray-500">No deals in {stage}</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  )

  const renderActivities = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <h1 className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">Activities</h1>
        <button
          onClick={() => setShowActivityModal(true)}
          className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2 mt-4 sm:mt-0"
        >
          <ApperIcon name="Plus" size={16} />
          <span>Log Activity</span>
        </button>
      </div>

      {/* Activities Timeline */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-card">
        {loading ? (
          <div className="p-8 text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
            <p className="text-gray-500 mt-2">Loading activities...</p>
          </div>
        ) : activities.length === 0 ? (
          <div className="p-8 text-center">
            <ApperIcon name="Clock" size={48} className="text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">No activities yet</h3>
            <p className="text-gray-500 mb-4">Start logging your customer interactions.</p>
            <button
              onClick={() => setShowActivityModal(true)}
              className="bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg font-medium transition-colors"
            >
              Log Activity
            </button>
          </div>
        ) : (
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {activities.map((activity) => (
              <div key={activity?.id} className="p-6">
                <div className="flex items-start space-x-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    activity?.type === 'call' ? 'bg-blue-100 text-blue-600' :
                    activity?.type === 'meeting' ? 'bg-green-100 text-green-600' :
                    activity?.type === 'email' ? 'bg-purple-100 text-purple-600' :
                    'bg-gray-100 text-gray-600'
                  }`}>
                    <ApperIcon 
                      name={
                        activity?.type === 'call' ? 'Phone' :
                        activity?.type === 'meeting' ? 'Calendar' :
                        activity?.type === 'email' ? 'Mail' :
                        'FileText'
                      } 
                      size={18} 
                    />
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 dark:text-white">
                      {activity?.subject || 'No subject'}
                    </h4>
                    <p className="text-sm text-gray-500 mb-2">
                      {activity?.description || 'No description'}
                    </p>
                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                      <span>{getContactName(activity?.contactId)}</span>
                      <span>•</span>
                      <span>{activity?.duration || 0} minutes</span>
                      <span>•</span>
                      <span>
                        {activity?.activityDate ? 
                          new Date(activity.activityDate).toLocaleDateString() : 
                          'No date'
                        }
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  )

  const renderPlaceholderView = (title, icon, message) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center py-16"
    >
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-card p-12 max-w-md mx-auto">
        <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-6">
          <ApperIcon name={icon} size={32} className="text-gray-400" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">{title}</h2>
        <p className="text-gray-600 dark:text-gray-400 mb-6">{message}</p>
        <div className="bg-amber-50 dark:bg-amber-900 border border-amber-200 dark:border-amber-700 rounded-lg p-4">
          <p className="text-amber-800 dark:text-amber-200 text-sm font-medium">
            Coming Soon! This feature is currently in development.
          </p>
        </div>
      </div>
    </motion.div>
  )

  const renderActiveView = () => {
    switch (activeView) {
      case 'dashboard':
        return renderDashboard()
      case 'contacts':
        return renderContacts()
      case 'deals':
        return renderDeals()
      case 'activities':
        return renderActivities()
      case 'tasks':
        return renderPlaceholderView(
          'Task Management',
          'CheckSquare',
          'Keep track of your to-dos and follow-ups with integrated task management.'
        )
      case 'analytics':
        return renderPlaceholderView(
          'Analytics Dashboard',
          'PieChart',
          'Get insights into your sales performance with detailed analytics and reporting.'
        )
      case 'reports':
        return renderPlaceholderView(
          'Custom Reports',
          'FileText',
          'Generate custom reports and export your CRM data for deeper analysis.'
        )
      case 'settings':
        return renderPlaceholderView(
          'Settings',
          'Settings',
          'Customize your CRM experience with user preferences and system settings.'
        )
      default:
        return renderDashboard()
    }
  }

  return (
    <>
      <AnimatePresence mode="wait">
        {renderActiveView()}
      </AnimatePresence>

      {/* Contact Modal */}
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="glassmorphism rounded-xl p-6 w-full max-w-md max-h-96 overflow-y-auto"
            >
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                {editingContact ? 'Edit Contact' : 'Add New Contact'}
              </h2>
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="First Name"
                    value={contactForm.firstName}
                    onChange={(e) => setContactForm({...contactForm, firstName: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                  <input
                    type="text"
                    placeholder="Last Name"
                    value={contactForm.lastName}
                    onChange={(e) => setContactForm({...contactForm, lastName: e.target.value})}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                    required
                  />
                </div>
                <input
                  type="email"
                  placeholder="Email"
                  value={contactForm.email}
                  onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <input
                  type="tel"
                  placeholder="Phone"
                  value={contactForm.phone}
                  onChange={(e) => setContactForm({...contactForm, phone: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <input
                  type="text"
                  placeholder="Company"
                  value={contactForm.company}
                  onChange={(e) => setContactForm({...contactForm, company: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <input
                  type="text"
                  placeholder="Position"
                  value={contactForm.position}
                  onChange={(e) => setContactForm({...contactForm, position: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <textarea
                  placeholder="Notes"
                  value={contactForm.notes}
                  onChange={(e) => setContactForm({...contactForm, notes: e.target.value})}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <div className="flex space-x-3">
                  <button
                    type="submit"
                    className="flex-1 bg-primary hover:bg-primary-dark text-white py-2 px-4 rounded-lg font-medium transition-colors"
                  >
                    {editingContact ? 'Update' : 'Create'} Contact
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 px-4 rounded-lg font-medium transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Deal Modal */}
      <AnimatePresence>
        {showDealModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowDealModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="glassmorphism rounded-xl p-6 w-full max-w-md max-h-96 overflow-y-auto"
            >
              <h2 className="text-xl font-bold text-gray-900 mb-4">
                {editingDeal ? 'Edit Deal' : 'Add New Deal'}
              </h2>
              <form onSubmit={handleDealSubmit} className="space-y-4">
                <input
                  type="text"
                  placeholder="Deal Title"
                  value={dealForm.title}
                  onChange={(e) => setDealForm({...dealForm, title: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
                <input
                  type="number"
                  placeholder="Deal Value"
                  value={dealForm.value}
                  onChange={(e) => setDealForm({...dealForm, value: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
                <select
                  value={dealForm.stage}
                  onChange={(e) => setDealForm({...dealForm, stage: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  {dealStages.map(stage => (
                    <option key={stage} value={stage} className="capitalize">
                      {stage}
                    </option>
                  ))}
                </select>
                <select
                  value={dealForm.contactId}
                  onChange={(e) => setDealForm({...dealForm, contactId: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                >
                  <option value="">Select Contact</option>
                  {contacts.map(contact => (
                    <option key={contact?.id} value={contact?.id}>
                      {`${contact?.firstName || ''} ${contact?.lastName || ''}`.trim() || 'Unknown Contact'}
                    </option>
                  ))}
                </select>
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={dealForm.probability}
                  onChange={(e) => setDealForm({...dealForm, probability: parseInt(e.target.value)})}
                  className="w-full"
                />
                <div className="text-sm text-gray-600">
                  Probability: {dealForm.probability}%
                </div>
                <input
                  type="date"
                  value={dealForm.expectedCloseDate}
                  onChange={(e) => setDealForm({...dealForm, expectedCloseDate: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <textarea
                  placeholder="Notes"
                  value={dealForm.notes}
                  onChange={(e) => setDealForm({...dealForm, notes: e.target.value})}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <div className="flex space-x-3">
                  <button
                    type="submit"
                    className="flex-1 bg-primary hover:bg-primary-dark text-white py-2 px-4 rounded-lg font-medium transition-colors"
                  >
                    {editingDeal ? 'Update' : 'Create'} Deal
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowDealModal(false)}
                    className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 px-4 rounded-lg font-medium transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Activity Modal */}
      <AnimatePresence>
        {showActivityModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={() => setShowActivityModal(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="glassmorphism rounded-xl p-6 w-full max-w-md max-h-96 overflow-y-auto"
            >
              <h2 className="text-xl font-bold text-gray-900 mb-4">Log Activity</h2>
              <form onSubmit={handleActivitySubmit} className="space-y-4">
                <select
                  value={activityForm.type}
                  onChange={(e) => setActivityForm({...activityForm, type: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="call">Phone Call</option>
                  <option value="meeting">Meeting</option>
                  <option value="email">Email</option>
                  <option value="note">Note</option>
                </select>
                <input
                  type="text"
                  placeholder="Subject"
                  value={activityForm.subject}
                  onChange={(e) => setActivityForm({...activityForm, subject: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                />
                <textarea
                  placeholder="Description"
                  value={activityForm.description}
                  onChange={(e) => setActivityForm({...activityForm, description: e.target.value})}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <select
                  value={activityForm.contactId}
                  onChange={(e) => setActivityForm({...activityForm, contactId: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  required
                >
                  <option value="">Select Contact</option>
                  {contacts.map(contact => (
                    <option key={contact?.id} value={contact?.id}>
                      {`${contact?.firstName || ''} ${contact?.lastName || ''}`.trim() || 'Unknown Contact'}
                    </option>
                  ))}
                </select>
                <select
                  value={activityForm.dealId}
                  onChange={(e) => setActivityForm({...activityForm, dealId: e.target.value})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="">Select Deal (Optional)</option>
                  {deals.map(deal => (
                    <option key={deal?.id} value={deal?.id}>
                      {deal?.title || 'Untitled Deal'}
                    </option>
                  ))}
                </select>
                <input
                  type="number"
                  placeholder="Duration (minutes)"
                  value={activityForm.duration}
                  onChange={(e) => setActivityForm({...activityForm, duration: parseInt(e.target.value)})}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <div className="flex space-x-3">
                  <button
                    type="submit"
                    className="flex-1 bg-primary hover:bg-primary-dark text-white py-2 px-4 rounded-lg font-medium transition-colors"
                  >
                    Log Activity
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowActivityModal(false)}
                    className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 py-2 px-4 rounded-lg font-medium transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default MainFeature