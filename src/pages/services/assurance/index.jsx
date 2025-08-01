import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import MainSidebar from '../../../components/ui/MainSidebar';

const AssuranceCreditPage = () => {
  const navigate = useNavigate();
  const [sidebarOffset, setSidebarOffset] = useState(288);
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');
  const [formData, setFormData] = useState({
    companyName: '',
    contactPerson: '',
    email: '',
    telephone: '',
    address: '',
    sector: '',
    activityDescription: '',
    annualTurnover: '150000',
    topCustomers: ''
  });

  // Handle sidebar offset for responsive layout
  React.useEffect(() => {
    const handleSidebarToggle = (e) => {
      const { isCollapsed } = e.detail;
      const mobile = window.innerWidth < 768;
      const tablet = window.innerWidth >= 768 && window.innerWidth < 1024;
      setIsMobile(mobile);
      setIsTablet(tablet);

      if (mobile) {
        setSidebarOffset(0);
      } else if (tablet) {
        // On tablet, sidebar is always collapsed
        setSidebarOffset(80);
      } else {
        // On desktop, respond to sidebar state
    setSidebarOffset(isCollapsed ? 64 : 288);
      }
    };
    
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      const tablet = window.innerWidth >= 768 && window.innerWidth < 1024;
      setIsMobile(mobile);
      setIsTablet(tablet);

      if (mobile) {
        setSidebarOffset(0);
      } else if (tablet) {
        // On tablet, sidebar is always collapsed
        setSidebarOffset(80);
      } else {
        // On desktop, check sidebar state
        const savedCollapsed = localStorage.getItem('sidebar-collapsed');
        const isCollapsed = savedCollapsed ? JSON.parse(savedCollapsed) : false;
        setSidebarOffset(isCollapsed ? 64 : 288);
      }
    };

    const handleStorage = () => {
      const mobile = window.innerWidth < 768;
      const tablet = window.innerWidth >= 768 && window.innerWidth < 1024;
      
      if (!mobile && !tablet) {
        const savedCollapsed = localStorage.getItem('sidebar-collapsed');
        const isCollapsed = savedCollapsed ? JSON.parse(savedCollapsed) : false;
        setSidebarOffset(isCollapsed ? 64 : 288);
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    window.addEventListener('storage', handleStorage);
    window.addEventListener('sidebar-toggle', handleSidebarToggle);
    return () => {
      window.removeEventListener('storage', handleStorage);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('sidebar-toggle', handleSidebarToggle);
    };
  }, []);

  const sectorOptions = [
    { value: 'construction', label: 'Construction' },
    { value: 'manufacturing', label: 'Manufacturing' },
    { value: 'retail', label: 'Retail' },
    { value: 'services', label: 'Services' },
    { value: 'technology', label: 'Technology' },
    { value: 'healthcare', label: 'Healthcare' },
    { value: 'finance', label: 'Finance' },
    { value: 'other', label: 'Other' }
  ];

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
    alert('Your request has been sent successfully!');
  };

  const renderOverview = () => (
    <div className="space-y-6 sm:space-y-8">
      {/* Credit Insurance Overview */}
      <div className="bg-card border border-border rounded-lg p-4 sm:p-6 lg:p-8">
        <div className="flex items-center space-x-3 sm:space-x-4 mb-4 sm:mb-6">
          <div className="w-12 h-12 sm:w-16 sm:h-16 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
            <Icon name="Umbrella" size={24} className="sm:w-8 sm:h-8 text-blue-500" />
          </div>
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-2">Credit Insurance</h1>
            <p className="text-sm sm:text-lg text-muted-foreground">Protect your cash flow against unpaid customers.</p>
          </div>
        </div>

        {/* Highlight Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
          <div className="flex items-center space-x-3 p-3 sm:p-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <Icon name="Percent" size={20} className="sm:w-6 sm:h-6 text-green-500" />
            </div>
            <div>
              <h3 className="font-bold text-base sm:text-lg text-foreground">Coverage 90%</h3>
              <p className="text-xs sm:text-sm text-muted-foreground">Of the unpaid amount</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 p-3 sm:p-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <Icon name="Building" size={20} className="sm:w-6 sm:h-6 text-blue-500" />
            </div>
            <div>
              <h3 className="font-bold text-base sm:text-lg text-foreground">Clients B2B</h3>
              <p className="text-xs sm:text-sm text-muted-foreground">Businesses Only</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-3 p-3 sm:p-4">
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
              <Icon name="Zap" size={20} className="sm:w-6 sm:h-6 text-purple-500" />
            </div>
            <div>
              <h3 className="font-bold text-base sm:text-lg text-foreground">Quick Claims</h3>
              <p className="text-xs sm:text-sm text-muted-foreground">Processed in 48h</p>
            </div>
          </div>
        </div>

        {/* Service Description */}
        <div>
          <div className="flex items-center space-x-2 mb-3 sm:mb-4">
            <Icon name="FileText" size={16} className="sm:w-5 sm:h-5 text-primary" />
            <h2 className="text-lg sm:text-xl font-semibold text-foreground">Service Description</h2>
          </div>

          {/* Risk Protection */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 sm:p-6 mb-4 sm:mb-6">
            <div className="flex items-start space-x-2 sm:space-x-3">
              <div className="w-5 h-5 sm:w-6 sm:h-6 bg-orange-100 rounded-full flex items-center justify-center flex-shrink-0">
                <Icon name="AlertTriangle" size={12} className="sm:w-3.5 sm:h-3.5 text-orange-500" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">Risk protection</h3>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  This insurance covers up to 90% of the outstanding amount in the event of bankruptcy or prolonged non-payment of a B2B customer. It allows you to maintain your cash flow and continue your activity serenely, even in the event of the failure of an important customer.
                </p>
              </div>
            </div>
          </div>

          {/* Benefits and Conditions */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
            <div>
              <div className="flex items-center space-x-2 mb-3 sm:mb-4">
                <Icon name="CheckCircle" size={16} className="sm:w-5 sm:h-5 text-green-500" />
                <h3 className="font-semibold text-foreground">Benefits</h3>
              </div>
              <ul className="space-y-2">
                <li className="flex items-center space-x-2">
                  <Icon name="CheckCircle" size={14} className="sm:w-4 sm:h-4 text-green-500" />
                  <span className="text-xs sm:text-sm text-foreground">Coverage of up to 90% of receivables</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Icon name="CheckCircle" size={14} className="sm:w-4 sm:h-4 text-green-500" />
                  <span className="text-xs sm:text-sm text-foreground">Customer Bankruptcy Protection</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Icon name="CheckCircle" size={14} className="sm:w-4 sm:h-4 text-green-500" />
                  <span className="text-xs sm:text-sm text-foreground">Legal support included</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Icon name="CheckCircle" size={14} className="sm:w-4 sm:h-4 text-green-500" />
                  <span className="text-xs sm:text-sm text-foreground">Responsiveness in the event of a disaster</span>
                </li>
              </ul>
            </div>

            <div>
              <div className="flex items-center space-x-2 mb-3 sm:mb-4">
                <Icon name="FileText" size={16} className="sm:w-5 sm:h-5 text-primary" />
                <h3 className="font-semibold text-foreground">Conditions</h3>
              </div>
              <ul className="space-y-2">
                <li className="flex items-center space-x-2">
                  <Icon name="Building" size={14} className="sm:w-4 sm:h-4 text-blue-500" />
                  <span className="text-xs sm:text-sm text-foreground">B2B customers only (companies)</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Icon name="Euro" size={14} className="sm:w-4 sm:h-4 text-green-500" />
                  <span className="text-xs sm:text-sm text-foreground">Invoices over €500</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Icon name="Calendar" size={14} className="sm:w-4 sm:h-4 text-orange-500" />
                  <span className="text-xs sm:text-sm text-foreground">Maximum payment term 90 days</span>
                </li>
                <li className="flex items-center space-x-2">
                  <Icon name="Clock" size={14} className="sm:w-4 sm:h-4 text-red-500" />
                  <span className="text-xs sm:text-sm text-foreground">Declaration within 30 days maximum</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="bg-card border border-border rounded-lg p-6 sm:p-8">
        <div className="text-center">
          <h2 className="text-xl sm:text-2xl font-bold text-foreground mb-3">Demander un devis personnalisé</h2>
          <p className="text-muted-foreground mb-6">
            Obtenez une proposition d'assurance crédit adaptée à votre activité
          </p>
          <Button
            onClick={() => setActiveTab('application')}
            variant="default"
            size="lg"
            className="px-8 py-3"
            iconName="ArrowRight"
            iconPosition="right"
          >
            Demander mon devis
          </Button>
        </div>
      </div>
    </div>
  );

  const renderApplicationForm = () => (
    <div className="space-y-6 sm:space-y-8">
      {/* Application Form */}
      <div className="bg-card border border-border rounded-lg p-4 sm:p-6 lg:p-8">
        <div className="mb-4 sm:mb-6">
          <h1 className="text-xl sm:text-2xl font-bold text-foreground mb-2">Applying for credit insurance</h1>
          <p className="text-xs sm:text-sm text-muted-foreground">Fill out this form to receive a personalized proposal</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
          {/* Company Contact Information */}
          <div className="space-y-3 sm:space-y-4">
            <h2 className="text-base sm:text-lg font-semibold text-foreground">Company contact information</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
              <Input
                label="Company Name *"
                type="text"
                value={formData.companyName}
                onChange={(e) => handleChange('companyName', e.target.value)}
                placeholder="Ex: Artisan Dupont SARL"
                required
              />
              
              <Input
                label="Contact person *"
                type="text"
                value={formData.contactPerson}
                onChange={(e) => handleChange('contactPerson', e.target.value)}
                placeholder="Ex: Jean Dupont"
                required
              />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4">
              <Input
                label="Email *"
                type="email"
                value={formData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                placeholder="contact@entreprise.com"
                required
              />
              
              <Input
                label="Telephone *"
                type="tel"
                value={formData.telephone}
                onChange={(e) => handleChange('telephone', e.target.value)}
                placeholder="06 12 34 56 78"
                required
              />
            </div>

            <Input
              label="Full address *"
              type="textarea"
              value={formData.address}
              onChange={(e) => handleChange('address', e.target.value)}
              placeholder="123 Rue de l'Artisan, 1000 Bruxelles"
              required
            />
          </div>

          {/* Industry */}
          <div className="space-y-3 sm:space-y-4">
            <h2 className="text-base sm:text-lg font-semibold text-foreground">Industry</h2>
            
            <Select
              label="Main sector *"
              options={sectorOptions}
              value={formData.sector}
              onChange={(e) => handleChange('sector', e.target.value)}
              placeholder="Select your sector"
              required
            />
            
            <Input
              label="Description of the activity *"
              type="textarea"
              value={formData.activityDescription}
              onChange={(e) => handleChange('activityDescription', e.target.value)}
              placeholder="Décrivez votre activité principale, vos services, votre zone d'intervention..."
              required
            />
          </div>

          {/* Financial Information */}
          <div className="space-y-3 sm:space-y-4">
            <h2 className="text-base sm:text-lg font-semibold text-foreground">Financial Information</h2>
            
            <div className="relative">
              <Input
                label="Annual turnover *"
                type="text"
                value={formData.annualTurnover}
                onChange={(e) => handleChange('annualTurnover', e.target.value)}
                placeholder="150000"
                required
                prefix="€"
              />
            </div>
            
            <Input
              label="Top B2B Customers *"
              type="textarea"
              value={formData.topCustomers}
              onChange={(e) => handleChange('topCustomers', e.target.value)}
              placeholder="Listez vos principaux clients entreprises (nom, secteur, montant moyen des factures...)"
              required
            />
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            variant="default"
            className="w-full"
            iconName="Send"
            iconPosition="left"
          >
            Send my request
          </Button>
        </form>

        {/* Security Message */}
        <div className="flex items-center space-x-2 mt-4 sm:mt-6 pt-4 sm:pt-6 border-t border-border">
          <Icon name="Shield" size={14} className="sm:w-4 sm:h-4 text-muted-foreground" />
          <p className="text-xs sm:text-sm text-muted-foreground">
            Your data is secure and used only for the study of your file.
          </p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <MainSidebar />
      
      <div
        className="flex-1 flex flex-col pb-20 md:pb-6"
        style={{ marginLeft: `${sidebarOffset}px` }}
      >
        <main className="flex-1 px-4 sm:px-6 pt-0 pb-4 sm:pb-6 space-y-4 sm:space-y-6">
          {/* Header */}
          <header className="bg-card border-b border-border px-4 sm:px-6 py-4 mb-4 sm:mb-6">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
            <div>
                <div className="flex items-center">
                  <Icon name="Umbrella" size={24} className="text-primary mr-3" />
                  <h1 className="text-xl sm:text-2xl font-bold text-foreground">Assurance Crédit</h1>
                </div>
                <p className="text-xs sm:text-sm text-muted-foreground mt-1">
                Protégez votre trésorerie contre les impayés clients
              </p>
            </div>
              <div className="flex items-center space-x-2 sm:space-x-3">
            <div className="flex items-center gap-2">
              <Button 
                variant={activeTab === 'overview' ? 'default' : 'outline'}
                onClick={() => setActiveTab('overview')}
                    size="sm"
                    className="text-xs sm:text-sm"
              >
                    Aperçu
              </Button>
              <Button 
                variant={activeTab === 'application' ? 'default' : 'outline'}
                onClick={() => setActiveTab('application')}
                    size="sm"
                    className="text-xs sm:text-sm"
              >
                Application
              </Button>
                </div>

            </div>
          </div>
          </header>

          {/* Content */}
          {activeTab === 'overview' && renderOverview()}
          {activeTab === 'application' && renderApplicationForm()}
        </main>
      </div>
    </div>
  );
};

export default AssuranceCreditPage;
