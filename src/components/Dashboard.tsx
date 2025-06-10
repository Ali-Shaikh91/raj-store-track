
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useLanguage } from '../contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import OutOfStockList from './OutOfStockList';
import StockWorkRecord from './StockWorkRecord';
import LanguageSelector from './LanguageSelector';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const { t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'outOfStock' | 'stockWork'>('outOfStock');

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="medical-gradient text-white p-4 shadow-lg">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold">{t('appTitle')}</h1>
            <p className="text-blue-100 text-sm">{t('welcomeBack')}, {user?.name}</p>
          </div>
          <div className="flex items-center space-x-3">
            <LanguageSelector />
            <Button 
              onClick={logout}
              variant="secondary"
              size="sm"
              className="bg-white/20 text-white hover:bg-white/30 border-0"
            >
              {t('logout')}
            </Button>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="max-w-4xl mx-auto p-4">
        <div className="flex space-x-2 mb-6">
          <Button
            onClick={() => setActiveTab('outOfStock')}
            variant={activeTab === 'outOfStock' ? 'default' : 'outline'}
            className={`flex-1 rounded-xl ${
              activeTab === 'outOfStock' 
                ? 'medical-gradient text-white' 
                : 'bg-slate-700 text-slate-200 hover:bg-slate-600 border-slate-600'
            }`}
          >
            {t('outOfStock')}
          </Button>
          <Button
            onClick={() => setActiveTab('stockWork')}
            variant={activeTab === 'stockWork' ? 'default' : 'outline'}
            className={`flex-1 rounded-xl ${
              activeTab === 'stockWork' 
                ? 'medical-gradient text-white' 
                : 'bg-slate-700 text-slate-200 hover:bg-slate-600 border-slate-600'
            }`}
          >
            {t('stockWork')}
          </Button>
        </div>

        {/* Content */}
        <div className="space-y-6">
          {activeTab === 'outOfStock' && <OutOfStockList />}
          {activeTab === 'stockWork' && <StockWorkRecord />}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
