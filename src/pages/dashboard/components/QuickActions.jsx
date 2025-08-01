import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';

const QuickActions = () => {
  const navigate = useNavigate();

  const actions = [
    {
      id: 'create-quote',
      label: 'Créer un devis',
      description: 'Nouveau devis avec IA',
      icon: 'Plus',
      variant: 'default',
      path: '/quote-creation'
    },
    {
      id: 'follow-clients',
      label: 'Relancer clients',
      description: 'Suggestions IA disponibles',
      icon: 'Phone',
      variant: 'outline',
      path: '/quotes-management'
    },
    {
      id: 'view-invoices',
      label: 'Gérer factures',
      description: 'Paiements en attente',
      icon: 'Receipt',
      variant: 'secondary',
      path: '/invoices-management'
    }
  ];

  const handleActionClick = (path) => {
    navigate(path);
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 sm:p-6 shadow-professional">
      <h3 className="text-base sm:text-lg font-semibold text-foreground mb-4 sm:mb-6">Actions rapides</h3>
      <div className="space-y-3 sm:space-y-4">
        {actions.map((action) => (
          <Button
            key={action.id}
            variant={action.variant}
            fullWidth
            iconName={action.icon}
            iconPosition="left"
            onClick={() => handleActionClick(action.path)}
            className="justify-start h-auto p-3 sm:p-4 text-sm"
          >
            <div className="text-left">
              <div className="font-medium">{action.label}</div>
              <div className="text-xs opacity-75 mt-1">{action.description}</div>
            </div>
          </Button>
        ))}
      </div>
      <div className="mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-border">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>Raccourcis clavier</span>
          <div className="flex items-center space-x-1 sm:space-x-2">
            <kbd className="px-1.5 sm:px-2 py-0.5 sm:py-1 bg-muted rounded text-xs">Ctrl</kbd>
            <span>+</span>
            <kbd className="px-1.5 sm:px-2 py-0.5 sm:py-1 bg-muted rounded text-xs">N</kbd>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuickActions;