
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';
import { Plus, Trash } from 'lucide-react';

interface OutOfStockItem {
  id: string;
  itemName: string;
  dateMarked: string;
  notes: string;
}

const OutOfStockList = () => {
  const [items, setItems] = useState<OutOfStockItem[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newItem, setNewItem] = useState({
    itemName: '',
    dateMarked: new Date().toISOString().split('T')[0],
    notes: ''
  });

  const handleAddItem = () => {
    if (!newItem.itemName.trim()) {
      toast({
        title: "Error",
        description: "Please enter an item name",
        variant: "destructive",
      });
      return;
    }

    const item: OutOfStockItem = {
      id: Date.now().toString(),
      ...newItem
    };

    setItems([item, ...items]);
    setNewItem({
      itemName: '',
      dateMarked: new Date().toISOString().split('T')[0],
      notes: ''
    });
    setShowAddForm(false);

    toast({
      title: "Item Added",
      description: `${newItem.itemName} marked as out of stock`,
    });
  };

  const handleDeleteItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
    toast({
      title: "Item Removed",
      description: "Item removed from out of stock list",
    });
  };

  return (
    <div className="space-y-4">
      <Card className="card-shadow">
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-lg font-semibold text-gray-800">Out of Stock Items</CardTitle>
              <CardDescription>Track items that need restocking</CardDescription>
            </div>
            <Button
              onClick={() => setShowAddForm(!showAddForm)}
              className="medical-gradient text-white rounded-xl"
              size="sm"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Item
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          {showAddForm && (
            <div className="p-4 bg-gray-50 rounded-xl space-y-4">
              <div className="space-y-2">
                <Label htmlFor="itemName">Item Name</Label>
                <Input
                  id="itemName"
                  placeholder="Enter item name"
                  value={newItem.itemName}
                  onChange={(e) => setNewItem({ ...newItem, itemName: e.target.value })}
                  className="rounded-xl"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="dateMarked">Date Marked Out of Stock</Label>
                <Input
                  id="dateMarked"
                  type="date"
                  value={newItem.dateMarked}
                  onChange={(e) => setNewItem({ ...newItem, dateMarked: e.target.value })}
                  className="rounded-xl"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="notes">Notes (Optional)</Label>
                <Textarea
                  id="notes"
                  placeholder="Additional notes..."
                  value={newItem.notes}
                  onChange={(e) => setNewItem({ ...newItem, notes: e.target.value })}
                  className="rounded-xl"
                />
              </div>
              <div className="flex space-x-2">
                <Button onClick={handleAddItem} className="medical-gradient text-white rounded-xl">
                  Add Item
                </Button>
                <Button 
                  onClick={() => setShowAddForm(false)} 
                  variant="outline"
                  className="rounded-xl"
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}

          {items.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <p>No items out of stock</p>
              <p className="text-sm">Great job keeping inventory stocked!</p>
            </div>
          ) : (
            <div className="space-y-3">
              {items.map((item) => (
                <div key={item.id} className="p-4 bg-white border border-gray-200 rounded-xl">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-800">{item.itemName}</h3>
                      <p className="text-sm text-gray-600">Out since: {item.dateMarked}</p>
                      {item.notes && (
                        <p className="text-sm text-gray-500 mt-1">{item.notes}</p>
                      )}
                    </div>
                    <Button
                      onClick={() => handleDeleteItem(item.id)}
                      variant="outline"
                      size="sm"
                      className="text-red-600 hover:text-red-700 hover:bg-red-50"
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

export default OutOfStockList;
