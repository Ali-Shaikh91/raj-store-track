
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';
import { Plus, Trash } from 'lucide-react';

interface StockRecord {
  id: string;
  itemName: string;
  quantity: number;
  action: 'added' | 'removed' | 'moved';
  date: string;
  notes: string;
}

const StockWorkRecord = () => {
  const [records, setRecords] = useState<StockRecord[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newRecord, setNewRecord] = useState({
    itemName: '',
    quantity: '',
    action: 'added' as 'added' | 'removed' | 'moved',
    date: new Date().toISOString().split('T')[0],
    notes: ''
  });

  const handleAddRecord = () => {
    if (!newRecord.itemName.trim() || !newRecord.quantity) {
      toast({
        title: "Error",
        description: "Please fill in item name and quantity",
        variant: "destructive",
      });
      return;
    }

    const record: StockRecord = {
      id: Date.now().toString(),
      itemName: newRecord.itemName,
      quantity: parseInt(newRecord.quantity),
      action: newRecord.action,
      date: newRecord.date,
      notes: newRecord.notes
    };

    setRecords([record, ...records]);
    setNewRecord({
      itemName: '',
      quantity: '',
      action: 'added',
      date: new Date().toISOString().split('T')[0],
      notes: ''
    });
    setShowAddForm(false);

    toast({
      title: "Record Added",
      description: `Stock record for ${newRecord.itemName} has been saved`,
    });
  };

  const handleDeleteRecord = (id: string) => {
    setRecords(records.filter(record => record.id !== id));
    toast({
      title: "Record Deleted",
      description: "Stock record has been removed",
    });
  };

  const getActionColor = (action: string) => {
    switch (action) {
      case 'added': return 'text-green-300 bg-green-900/30';
      case 'removed': return 'text-red-300 bg-red-900/30';
      case 'moved': return 'text-blue-300 bg-blue-900/30';
      default: return 'text-slate-300 bg-slate-700';
    }
  };

  const getActionText = (action: string) => {
    switch (action) {
      case 'added': return 'Added to Stock';
      case 'removed': return 'Removed from Stock';
      case 'moved': return 'Stock Moved';
      default: return action;
    }
  };

  return (
    <div className="space-y-4">
      <Card className="card-shadow dark-card">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-lg font-semibold text-slate-100">Stock Work Record</CardTitle>
              <CardDescription className="text-slate-300">Track all stock movements and activities</CardDescription>
            </div>
            <Button
              onClick={() => setShowAddForm(!showAddForm)}
              className="medical-gradient text-white rounded-xl"
              size="sm"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Record
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {showAddForm && (
            <div className="p-4 bg-slate-700 rounded-xl space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="itemName" className="text-slate-200">Item Name</Label>
                  <Input
                    id="itemName"
                    placeholder="Enter item name"
                    value={newRecord.itemName}
                    onChange={(e) => setNewRecord({ ...newRecord, itemName: e.target.value })}
                    className="rounded-xl form-input"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="quantity" className="text-slate-200">Quantity</Label>
                  <Input
                    id="quantity"
                    type="number"
                    placeholder="Enter quantity"
                    value={newRecord.quantity}
                    onChange={(e) => setNewRecord({ ...newRecord, quantity: e.target.value })}
                    className="rounded-xl form-input"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="action" className="text-slate-200">Action</Label>
                  <Select value={newRecord.action} onValueChange={(value: 'added' | 'removed' | 'moved') => setNewRecord({ ...newRecord, action: value })}>
                    <SelectTrigger className="rounded-xl bg-slate-700 border-slate-600 text-slate-100">
                      <SelectValue placeholder="Select action" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-700 border-slate-600">
                      <SelectItem value="added" className="text-slate-100 hover:bg-slate-600">Added to Stock</SelectItem>
                      <SelectItem value="removed" className="text-slate-100 hover:bg-slate-600">Removed from Stock</SelectItem>
                      <SelectItem value="moved" className="text-slate-100 hover:bg-slate-600">Stock Moved</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="date" className="text-slate-200">Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={newRecord.date}
                    onChange={(e) => setNewRecord({ ...newRecord, date: e.target.value })}
                    className="rounded-xl form-input"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="notes" className="text-slate-200">Notes (Optional)</Label>
                <Textarea
                  id="notes"
                  placeholder="Additional notes about this stock activity..."
                  value={newRecord.notes}
                  onChange={(e) => setNewRecord({ ...newRecord, notes: e.target.value })}
                  className="rounded-xl form-input"
                />
              </div>
              <div className="flex space-x-2">
                <Button onClick={handleAddRecord} className="medical-gradient text-white rounded-xl">
                  Add Record
                </Button>
                <Button 
                  onClick={() => setShowAddForm(false)} 
                  variant="outline"
                  className="rounded-xl bg-slate-600 text-slate-200 border-slate-500 hover:bg-slate-500"
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}

          {records.length === 0 ? (
            <div className="text-center py-8 text-slate-300">
              <p>No stock records yet</p>
              <p className="text-sm">Start tracking your stock activities</p>
            </div>
          ) : (
            <div className="space-y-3">
              {records.map((record) => (
                <div key={record.id} className="p-4 bg-slate-700 border border-slate-600 rounded-xl">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="font-medium text-slate-100">{record.itemName}</h3>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getActionColor(record.action)}`}>
                          {getActionText(record.action)}
                        </span>
                      </div>
                      <div className="flex items-center gap-4 text-sm text-slate-300">
                        <span>Quantity: {record.quantity}</span>
                        <span>Date: {record.date}</span>
                      </div>
                      {record.notes && (
                        <p className="text-sm text-slate-400 mt-2">{record.notes}</p>
                      )}
                    </div>
                    <Button
                      onClick={() => handleDeleteRecord(record.id)}
                      variant="outline"
                      size="sm"
                      className="text-red-400 hover:text-red-300 hover:bg-red-900/20 border-red-600"
                    >
                      <Trash className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default StockWorkRecord;
