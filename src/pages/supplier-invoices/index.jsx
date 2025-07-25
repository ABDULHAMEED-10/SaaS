import React, { useState, useEffect } from 'react';
import MainSidebar from '../../components/ui/MainSidebar';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import SupplierInvoicesSummaryBar from './components/SupplierInvoicesSummaryBar';
import SupplierInvoicesFilterToolbar from './components/SupplierInvoicesFilterToolbar';
import SupplierInvoicesDataTable from './components/SupplierInvoicesDataTable';
import PaymentAnalyticsSidebar from './components/PaymentAnalyticsSidebar';
import QuickSupplierInvoiceCreation from './components/QuickSupplierInvoiceCreation';

const SupplierInvoicesManagement = () => {
  const [supplierInvoices, setSupplierInvoices] = useState([]);
  const [filteredSupplierInvoices, setFilteredSupplierInvoices] = useState([]);
  const [selectedSupplierInvoices, setSelectedSupplierInvoices] = useState([]);
  const [isAnalyticsSidebarVisible, setIsAnalyticsSidebarVisible] = useState(false);
  const [isQuickCreateOpen, setIsQuickCreateOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Mock data for supplier invoices
  const mockSupplierInvoices = [
    {
      id: 1,
      number: "FOURN-2024-001",
      supplierName: "Materiaux Pro",
      supplierEmail: "contact@materiaux-pro.fr",
      amount: 850.00,
      status: "paid",
      issueDate: "2024-07-01",
      dueDate: "2024-07-31",
      paymentMethod: "Virement bancaire",
      category: "Matériaux",
      invoiceFile: "facture-materiaux-001.pdf"
    },
    {
      id: 2,
      number: "FOURN-2024-002",
      supplierName: "Outillage Express",
      supplierEmail: "info@outillage-express.fr",
      amount: 1250.00,
      status: "pending",
      issueDate: "2024-07-05",
      dueDate: "2024-08-04",
      paymentMethod: "Chèque",
      category: "Outillage",
      invoiceFile: "facture-outillage-002.pdf"
    },
    {
      id: 3,
      number: "FOURN-2024-003",
      supplierName: "Électricité Plus",
      supplierEmail: "facturation@electricite-plus.fr",
      amount: 320.00,
      status: "overdue",
      issueDate: "2024-06-15",
      dueDate: "2024-07-15",
      paymentMethod: "Prélèvement",
      category: "Services",
      invoiceFile: "facture-electricite-003.pdf"
    },
    {
      id: 4,
      number: "FOURN-2024-004",
      supplierName: "Plomberie Direct",
      supplierEmail: "comptabilite@plomberie-direct.fr",
      amount: 680.00,
      status: "paid",
      issueDate: "2024-07-10",
      dueDate: "2024-08-09",
      paymentMethod: "Virement bancaire",
      category: "Fournitures",
      invoiceFile: "facture-plomberie-004.pdf"
    },
    {
      id: 5,
      number: "FOURN-2024-005",
      supplierName: "Assurance Artisan",
      supplierEmail: "factures@assurance-artisan.fr",
      amount: 450.00,
      status: "pending",
      issueDate: "2024-07-12",
      dueDate: "2024-08-11",
      paymentMethod: "Prélèvement",
      category: "Assurance",
      invoiceFile: "facture-assurance-005.pdf"
    },
    {
      id: 6,
      number: "FOURN-2024-006",
      supplierName: "Transport Rapide",
      supplierEmail: "facturation@transport-rapide.fr",
      amount: 180.00,
      status: "overdue",
      issueDate: "2024-06-20",
      dueDate: "2024-07-20",
      paymentMethod: "Chèque",
      category: "Transport",
      invoiceFile: "facture-transport-006.pdf"
    },
    {
      id: 7,
      number: "FOURN-2024-007",
      supplierName: "Comptabilité Pro",
      supplierEmail: "factures@comptabilite-pro.fr",
      amount: 280.00,
      status: "paid",
      issueDate: "2024-07-15",
      dueDate: "2024-08-14",
      paymentMethod: "Virement bancaire",
      category: "Services",
      invoiceFile: "facture-comptabilite-007.pdf"
    },
    {
      id: 8,
      number: "FOURN-2024-008",
      supplierName: "Marketing Digital",
      supplierEmail: "facturation@marketing-digital.fr",
      amount: 350.00,
      status: "pending",
      issueDate: "2024-07-18",
      dueDate: "2024-08-17",
      paymentMethod: "Virement bancaire",
      category: "Marketing",
      invoiceFile: "facture-marketing-008.pdf"
    }
  ];

  // Mock summary data for supplier invoices
  const summaryData = {
    totalExpenses: 4370.00,
    paidExpenses: 1810.00,
    outstandingAmount: 2560.00,
    expensesGrowth: -8.2,
    overdueCount: 2
  };

  // Mock analytics data for supplier invoices
  const analyticsData = {
    avgPaymentTime: 12,
    paymentRate: 88,
    overdueCount: 2,
    upcomingDeadlines: [
      {
        invoiceNumber: "FOURN-2024-002",
        supplierName: "Outillage Express",
        amount: 1250.00,
        daysLeft: 3
      },
      {
        invoiceNumber: "FOURN-2024-005",
        supplierName: "Assurance Artisan",
        amount: 450.00,
        daysLeft: 7
      },
      {
        invoiceNumber: "FOURN-2024-008",
        supplierName: "Marketing Digital",
        amount: 350.00,
        daysLeft: 12
      }
    ]
  };

  useEffect(() => {
    // Simulate loading
    const loadData = async () => {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      setSupplierInvoices(mockSupplierInvoices);
      setFilteredSupplierInvoices(mockSupplierInvoices);
      setIsLoading(false);
    };

    loadData();
  }, []);

  const handleFiltersChange = (filters) => {
    let filtered = [...supplierInvoices];

    // Search filter
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      filtered = filtered.filter(invoice =>
        invoice.number.toLowerCase().includes(searchTerm) ||
        invoice.supplierName.toLowerCase().includes(searchTerm) ||
        invoice.supplierEmail.toLowerCase().includes(searchTerm)
      );
    }

    // Status filter
    if (filters.status) {
      filtered = filtered.filter(invoice => invoice.status === filters.status);
    }

    // Category filter
    if (filters.category) {
      filtered = filtered.filter(invoice => invoice.category === filters.category);
    }

    // Date range filter
    if (filters.dateRange) {
      const today = new Date();
      const filterDate = new Date();

      switch (filters.dateRange) {
        case 'today':
          filterDate.setHours(0, 0, 0, 0);
          filtered = filtered.filter(invoice => 
            new Date(invoice.issueDate) >= filterDate
          );
          break;
        case 'week':
          filterDate.setDate(today.getDate() - 7);
          filtered = filtered.filter(invoice => 
            new Date(invoice.issueDate) >= filterDate
          );
          break;
        case 'month':
          filterDate.setMonth(today.getMonth() - 1);
          filtered = filtered.filter(invoice => 
            new Date(invoice.issueDate) >= filterDate
          );
          break;
        case 'quarter':
          filterDate.setMonth(today.getMonth() - 3);
          filtered = filtered.filter(invoice => 
            new Date(invoice.issueDate) >= filterDate
          );
          break;
        case 'year':
          filterDate.setFullYear(today.getFullYear() - 1);
          filtered = filtered.filter(invoice => 
            new Date(invoice.issueDate) >= filterDate
          );
          break;
      }
    }

    // Payment method filter
    if (filters.paymentMethod) {
      filtered = filtered.filter(invoice => 
        invoice.paymentMethod === filters.paymentMethod
      );
    }

    // Amount range filter
    if (filters.amountRange) {
      const [min, max] = filters.amountRange.split('-').map(v => 
        v === '5000+' ? Infinity : parseInt(v)
      );
      filtered = filtered.filter(invoice => 
        invoice.amount >= min && (max === Infinity || invoice.amount <= max)
      );
    }

    setFilteredSupplierInvoices(filtered);
  };

  const handleBulkAction = (action) => {
    if (selectedSupplierInvoices.length === 0) {
      alert('Veuillez sélectionner au moins une facture fournisseur');
      return;
    }

    switch (action) {
      case 'send_to_accountant':
        alert(`${selectedSupplierInvoices.length} facture(s) envoyée(s) à votre comptable`);
        break;
      case 'mark_paid':
        const updatedInvoices = supplierInvoices.map(invoice =>
          selectedSupplierInvoices.includes(invoice.id)
            ? { ...invoice, status: 'paid' }
            : invoice
        );
        setSupplierInvoices(updatedInvoices);
        setFilteredSupplierInvoices(updatedInvoices);
        setSelectedSupplierInvoices([]);
        break;
      case 'export':
        alert(`Export de ${selectedSupplierInvoices.length} facture(s) en cours...`);
        break;
      case 'delete':
        if (confirm(`Êtes-vous sûr de vouloir supprimer ${selectedSupplierInvoices.length} facture(s) ?`)) {
          const updatedInvoices = supplierInvoices.filter(invoice =>
            !selectedSupplierInvoices.includes(invoice.id)
          );
          setSupplierInvoices(updatedInvoices);
          setFilteredSupplierInvoices(updatedInvoices);
          setSelectedSupplierInvoices([]);
        }
        break;
    }
  };

  const handleSupplierInvoiceAction = (action, invoice) => {
    switch (action) {
      case 'view':
        alert(`Affichage de la facture fournisseur ${invoice.number}`);
        break;
      case 'edit':
        alert(`Édition de la facture fournisseur ${invoice.number}`);
        break;
      case 'send_to_accountant':
        alert(`Facture ${invoice.number} envoyée à votre comptable`);
        break;
      case 'download':
        alert(`Téléchargement de ${invoice.invoiceFile}`);
        break;
      case 'markPaid':
        const paidInvoices = supplierInvoices.map(inv =>
          inv.id === invoice.id ? { ...inv, status: 'paid' } : inv
        );
        setSupplierInvoices(paidInvoices);
        setFilteredSupplierInvoices(paidInvoices);
        break;
    }
  };

  const handleCreateSupplierInvoice = (newInvoice) => {
    const updatedInvoices = [...supplierInvoices, newInvoice];
    setSupplierInvoices(updatedInvoices);
    setFilteredSupplierInvoices(updatedInvoices);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <MainSidebar />
        <div className="ml-16 lg:ml-72 p-6">
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <Icon name="Loader2" size={48} color="var(--color-primary)" className="animate-spin mx-auto mb-4" />
              <p className="text-muted-foreground">Chargement des factures fournisseurs...</p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <MainSidebar />
      
      <div className={`transition-all duration-300 ${isAnalyticsSidebarVisible ? 'mr-80' : 'mr-0'} ml-16 lg:ml-72`}>
        <div className="p-6">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Factures fournisseurs</h1>
              <p className="text-muted-foreground">
                Gérez vos factures fournisseurs, suivez vos dépenses et envoyez-les à votre comptable
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Button
                variant="outline"
                iconName="BarChart3"
                iconPosition="left"
                onClick={() => setIsAnalyticsSidebarVisible(!isAnalyticsSidebarVisible)}
              >
                Analyses
              </Button>
              <Button
                iconName="Plus"
                iconPosition="left"
                onClick={() => setIsQuickCreateOpen(true)}
              >
                Ajouter facture
              </Button>
            </div>
          </div>

          {/* Summary Bar */}
          <SupplierInvoicesSummaryBar summaryData={summaryData} />

          {/* Filter Toolbar */}
          <SupplierInvoicesFilterToolbar
            onFiltersChange={handleFiltersChange}
            onBulkAction={handleBulkAction}
          />

          {/* Data Table */}
          <SupplierInvoicesDataTable
            supplierInvoices={filteredSupplierInvoices}
            onSupplierInvoiceAction={handleSupplierInvoiceAction}
            selectedSupplierInvoices={selectedSupplierInvoices}
            onSelectionChange={setSelectedSupplierInvoices}
          />

          {/* Pagination */}
          {filteredSupplierInvoices.length > 0 && (
            <div className="flex items-center justify-between mt-6">
              <p className="text-sm text-muted-foreground">
                Affichage de {filteredSupplierInvoices.length} facture(s) sur {supplierInvoices.length}
              </p>
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm" iconName="ChevronLeft">
                  Précédent
                </Button>
                <Button variant="outline" size="sm" iconName="ChevronRight">
                  Suivant
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Payment Analytics Sidebar */}
      <PaymentAnalyticsSidebar
        analyticsData={analyticsData}
        isVisible={isAnalyticsSidebarVisible}
        onToggle={() => setIsAnalyticsSidebarVisible(!isAnalyticsSidebarVisible)}
      />

      {/* Quick Supplier Invoice Creation Modal */}
      <QuickSupplierInvoiceCreation
        isOpen={isQuickCreateOpen}
        onClose={() => setIsQuickCreateOpen(false)}
        onCreateSupplierInvoice={handleCreateSupplierInvoice}
      />
    </div>
  );
};

export default SupplierInvoicesManagement; 