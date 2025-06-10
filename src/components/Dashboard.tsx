
import React, { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import OutOfStockList from './OutOfStockList';
import StockWorkRecord from './StockWorkRecord';

const Dashboard = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<'outOfStock' | 'stockWork'>('outOfStock');

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="medical-gradient text-white p-4 shadow-lg">
        <div className="max-w-4xl mx-auto flex justify-between items-center">
          <div>
            <h1 className="text-xl font-bold">Raj Medical & General Store</h1>
            <p className="text-blue-100 text-sm">Welcome back, {user?.name}</p>
          </div>
          <Button 
            onClick={logout}
            variant="secondary"
            size="sm"
            className="bg-white/20 text-white hover:bg-white/30 border-0"
          >
            Logout
          </Button>
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
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            Out of Stock
          </Button>
          <Button
            onClick={() => setActiveTab('stockWork')}
            variant={activeTab === 'stockWork' ? 'default' : 'outline'}
            className={`flex-1 rounded-xl ${
              activeTab === 'stockWork' 
                ? 'medical-gradient text-white' 
                : 'bg-white text-gray-700 hover:bg-gray-50'
            }`}
          >
            Stock Work
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
