import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { toast } from 'react-toastify';
import ApperIcon from '../ApperIcon'; // Keep ApperIcon in its original place
import contactService from '../../services/api/contactService';
import dealService from '../../services/api/dealService';
import activityService from '../../services/api/activityService';

// Atomic Components
import Modal from '../atoms/Modal';
import Button from '../atoms/Button';
import SearchBar from '../molecules/SearchBar';
import Text from '../atoms/Text';
import FeatureCard from '../molecules/FeatureCard';

// Organisms
import DashboardStats from './DashboardStats';
import ContactsTable from './ContactsTable';
import DealsPipeline from './DealsPipeline';
import ContactForm from './ContactForm';
import DealForm from './DealForm';
import ActivityForm from './ActivityForm';
import ActivitiesTimeline from './ActivitiesTimeline';

const MainContent = ({ activeView }) => {
  const [contacts, setContacts] = useState([]);
  const [deals, setDeals] = useState([]);
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [showContactModal, setShowContactModal] = useState(false);
  const [showDealModal, setShowDealModal] = useState(false);
  const [showActivityModal, setShowActivityModal] = useState(false);
  const [editingContact, setEditingContact] = useState(null);
  const [editingDeal, setEditingDeal] = useState(null);
  const [sortField, setSortField] = useState('firstName');
  const [sortDirection, setSortDirection] = useState('asc');

  // Form states
  const [contactForm, setContactForm] = useState({
    firstName: '', lastName: '', email: '', phone: '', company: '', position: '', notes: ''
  });
  const [dealForm, setDealForm] = useState({
    title: '', value: '', stage: 'prospect', contactId: '', probability: 50, expectedCloseDate: '', notes: ''
  });
  const [activityForm, setActivityForm] = useState({
    type: 'call', subject: '', description: '', contactId: '', dealId: '', duration: 30
  });

  const dealStages = ['prospect', 'qualified', 'proposal', 'negotiation', 'closed'];

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        switch (activeView) {
          case 'contacts':
            setContacts(await contactService.getAll() || []);
            break;
          case 'deals':
            setDeals(await dealService.getAll() || []);
            setContacts(await contactService.getAll() || []); // For deal creation/display
            break;
          case 'activities':
            setActivities(await activityService.getAll() || []);
            setContacts(await contactService.getAll() || []); // For activity creation/display
            setDeals(await dealService.getAll() || []); // For activity creation/display
            break;
          case 'dashboard':
            setContacts(await contactService.getAll() || []);
            setDeals(await dealService.getAll() || []);
            setActivities(await activityService.getAll() || []);
            break;
          default:
            // For placeholder views, no data needed
            break;
        }
      } catch (err) {
        setError(err.message);
        toast.error(`Failed to load ${activeView}`);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [activeView]);

  // --- Contact Handlers ---
  const handleContactSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingContact) {
        await contactService.update(editingContact.id, contactForm);
        toast.success('Contact updated successfully');
      } else {
        await contactService.create(contactForm);
        toast.success('Contact created successfully');
      }
      setShowContactModal(false);
      setEditingContact(null);
      setContactForm({ firstName: '', lastName: '', email: '', phone: '', company: '', position: '', notes: '' });
      setContacts(await contactService.getAll() || []); // Reload contacts
    } catch (err) {
      toast.error('Failed to save contact');
    }
  };

  const handleDeleteContact = async (id) => {
    if (window.confirm('Are you sure you want to delete this contact?')) {
      try {
        await contactService.delete(id);
        toast.success('Contact deleted successfully');
        setContacts(await contactService.getAll() || []); // Reload contacts
      } catch (err) {
        toast.error('Failed to delete contact');
      }
    }
  };

  const handleEditContact = (contact) => {
    setEditingContact(contact);
    setContactForm(contact);
    setShowContactModal(true);
  };

  const handleSortContacts = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const filteredContacts = contacts
    .filter(contact =>
      contact?.firstName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact?.lastName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact?.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact?.company?.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      const aVal = a?.[sortField] || '';
      const bVal = b?.[sortField] || '';
      if (sortDirection === 'asc') {
        return aVal.localeCompare(bVal);
      }
      return bVal.localeCompare(aVal);
    });

  // --- Deal Handlers ---
  const handleDealSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingDeal) {
        await dealService.update(editingDeal.id, dealForm);
        toast.success('Deal updated successfully');
      } else {
        await dealService.create(dealForm);
        toast.success('Deal created successfully');
      }
      setShowDealModal(false);
      setEditingDeal(null);
      setDealForm({ title: '', value: '', stage: 'prospect', contactId: '', probability: 50, expectedCloseDate: '', notes: '' });
      setDeals(await dealService.getAll() || []); // Reload deals
    } catch (err) {
      toast.error('Failed to save deal');
    }
  };

  const getStageDeals = (stage) => {
    return deals.filter(deal => deal?.stage === stage) || [];
  };

  const getStageTotal = (stage) => {
    return getStageDeals(stage).reduce((sum, deal) => sum + (deal?.value || 0), 0);
  };

  // --- Activity Handlers ---
  const handleActivitySubmit = async (e) => {
    e.preventDefault();
    try {
      await activityService.create(activityForm);
      toast.success('Activity logged successfully');
      setShowActivityModal(false);
      setActivityForm({ type: 'call', subject: '', description: '', contactId: '', dealId: '', duration: 30 });
      setActivities(await activityService.getAll() || []); // Reload activities
    } catch (err) {
      toast.error('Failed to log activity');
    }
  };

  const getContactName = (contactId) => {
    const contact = contacts.find(c => c?.id === contactId);
    return contact ? `${contact.firstName || ''} ${contact.lastName || ''}`.trim() : 'Unknown Contact';
  };

  const getDealTitle = (dealId) => {
    const deal = deals.find(d => d?.id === dealId);
    return deal?.title || 'Unknown Deal';
  };

  const renderDashboard = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <Text as="h1" className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">Dashboard</Text>
        <div className="flex space-x-3 mt-4 sm:mt-0">
          <Button onClick={() => setShowContactModal(true)} icon="Plus">
            Add Contact
          </Button>
        </div>
      </div>
      <DashboardStats
        contactsCount={contacts.length}
        dealsCount={deals.length}
        pipelineTotal={deals.reduce((sum, deal) => sum + (deal?.value || 0), 0)}
        activitiesCount={activities.length}
      />
      {/* Could add more dashboard specific components here */}
    </motion.div>
  );

  const renderContacts = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <Text as="h1" className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">Contacts</Text>
        <Button onClick={() => setShowContactModal(true)} icon="Plus" className="mt-4 sm:mt-0">
          Add Contact
        </Button>
      </div>
      <SearchBar
        placeholder="Search contacts..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <ContactsTable
        contacts={filteredContacts}
        onEdit={handleEditContact}
        onDelete={handleDeleteContact}
        isLoading={loading}
        onAddContact={() => setShowContactModal(true)}
        sortField={sortField}
        sortDirection={sortDirection}
        onSort={handleSortContacts}
      />
    </motion.div>
  );

  const renderDeals = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <Text as="h1" className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">Deal Pipeline</Text>
        <Button onClick={() => setShowDealModal(true)} icon="Plus" className="mt-4 sm:mt-0">
          Add Deal
        </Button>
      </div>
      <DealsPipeline
        deals={deals}
        dealStages={dealStages}
        getStageDeals={getStageDeals}
        getStageTotal={getStageTotal}
        getContactName={getContactName}
      />
    </motion.div>
  );

  const renderActivities = () => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="space-y-6"
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
        <Text as="h1" className="text-2xl lg:text-3xl font-bold text-gray-900 dark:text-white">Activities</Text>
        <Button onClick={() => setShowActivityModal(true)} icon="Plus" className="mt-4 sm:mt-0">
          Log Activity
        </Button>
      </div>
      <ActivitiesTimeline
        activities={activities}
        isLoading={loading}
        onLogActivity={() => setShowActivityModal(true)}
        getContactName={getContactName}
        getDealTitle={getDealTitle}
      />
    </motion.div>
  );

  const renderPlaceholderView = (title, icon, message) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center py-16"
    >
      <FeatureCard title={title} message={message} icon={icon} />
    </motion.div>
  );

  const renderActiveView = () => {
    switch (activeView) {
      case 'dashboard':
        return renderDashboard();
      case 'contacts':
        return renderContacts();
      case 'deals':
        return renderDeals();
      case 'activities':
        return renderActivities();
      case 'tasks':
        return renderPlaceholderView(
          'Task Management',
          'CheckSquare',
          'Keep track of your to-dos and follow-ups with integrated task management.'
        );
      case 'analytics':
        return renderPlaceholderView(
          'Analytics Dashboard',
          'PieChart',
          'Get insights into your sales performance with detailed analytics and reporting.'
        );
      case 'reports':
        return renderPlaceholderView(
          'Custom Reports',
          'FileText',
          'Generate custom reports and export your CRM data for deeper analysis.'
        );
      case 'settings':
        return renderPlaceholderView(
          'Settings',
          'Settings',
          'Customize your CRM experience with user preferences and system settings.'
        );
      default:
        return renderDashboard();
    }
  };

  return (
    <>
      <AnimatePresence mode="wait">
        {renderActiveView()}
      </AnimatePresence>

      <Modal
        isOpen={showContactModal}
        onClose={() => { setShowContactModal(false); setEditingContact(null); setContactForm({ firstName: '', lastName: '', email: '', phone: '', company: '', position: '', notes: '' }); }}
        title={editingContact ? 'Edit Contact' : 'Add New Contact'}
      >
        <ContactForm
          formState={contactForm}
          setFormState={setContactForm}
          onSubmit={handleContactSubmit}
          onCancel={() => { setShowContactModal(false); setEditingContact(null); setContactForm({ firstName: '', lastName: '', email: '', phone: '', company: '', position: '', notes: '' }); }}
          isEditing={!!editingContact}
        />
      </Modal>

      <Modal
        isOpen={showDealModal}
        onClose={() => { setShowDealModal(false); setEditingDeal(null); setDealForm({ title: '', value: '', stage: 'prospect', contactId: '', probability: 50, expectedCloseDate: '', notes: '' }); }}
        title={editingDeal ? 'Edit Deal' : 'Add New Deal'}
      >
        <DealForm
          formState={dealForm}
          setFormState={setDealForm}
          contacts={contacts}
          onSubmit={handleDealSubmit}
          onCancel={() => { setShowDealModal(false); setEditingDeal(null); setDealForm({ title: '', value: '', stage: 'prospect', contactId: '', probability: 50, expectedCloseDate: '', notes: '' }); }}
          isEditing={!!editingDeal}
        />
      </Modal>

      <Modal
        isOpen={showActivityModal}
        onClose={() => { setShowActivityModal(false); setActivityForm({ type: 'call', subject: '', description: '', contactId: '', dealId: '', duration: 30 }); }}
        title="Log Activity"
      >
        <ActivityForm
          formState={activityForm}
          setFormState={setActivityForm}
          contacts={contacts}
          deals={deals}
          onSubmit={handleActivitySubmit}
          onCancel={() => { setShowActivityModal(false); setActivityForm({ type: 'call', subject: '', description: '', contactId: '', dealId: '', duration: 30 }); }}
        />
      </Modal>
    </>
  );
};

export default MainContent;