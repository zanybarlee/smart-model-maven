
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface Entity {
  id: string;
  name: string;
  attributes: string[];
}

const Index = () => {
  const [modelDescription, setModelDescription] = useState('');
  const [entities, setEntities] = useState<Entity[]>([]);
  const { toast } = useToast();

  const handleGenerateModel = () => {
    if (!modelDescription.trim()) {
      toast({
        title: "Description Required",
        description: "Please enter a description of your domain model.",
        variant: "destructive",
      });
      return;
    }

    // This is a mock response - in a real app, this would come from an AI service
    const mockEntities: Entity[] = [
      {
        id: '1',
        name: 'Customer',
        attributes: ['id', 'name', 'email', 'phoneNumber']
      },
      {
        id: '2',
        name: 'Order',
        attributes: ['id', 'orderDate', 'totalAmount', 'status']
      }
    ];

    setEntities(mockEntities);
    toast({
      title: "Model Generated",
      description: "Your domain model has been generated successfully.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 p-6">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl font-bold text-slate-900">AI Domain Model Generator</h1>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Transform your business requirements into a comprehensive domain model using AI-powered analysis
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Input Section */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle>Describe Your Domain</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <textarea
                  value={modelDescription}
                  onChange={(e) => setModelDescription(e.target.value)}
                  className="w-full h-40 p-4 border rounded-md bg-white/80 resize-none focus:outline-none focus:ring-2 focus:ring-primary"
                  placeholder="Describe your business domain in natural language... 
                  For example: I need a system to manage an online bookstore with customers, orders, and books."
                />
                <Button 
                  onClick={handleGenerateModel}
                  className="w-full bg-primary hover:bg-primary/90"
                >
                  Generate Domain Model
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Suggestions Panel */}
          <Card>
            <CardHeader>
              <CardTitle>AI Suggestions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm text-slate-600">
                <p>• Add validation rules for email addresses</p>
                <p>• Consider adding timestamps for auditing</p>
                <p>• Include soft delete functionality</p>
              </div>
            </CardContent>
          </Card>

          {/* Generated Model Display */}
          {entities.length > 0 && (
            <Card className="lg:col-span-3">
              <CardHeader>
                <CardTitle>Generated Domain Model</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {entities.map((entity) => (
                    <div 
                      key={entity.id}
                      className="p-4 bg-white rounded-lg shadow-sm border border-slate-100"
                    >
                      <h3 className="text-lg font-semibold text-primary mb-2">
                        {entity.name}
                      </h3>
                      <ul className="space-y-1">
                        {entity.attributes.map((attr, index) => (
                          <li key={index} className="text-sm text-slate-600">
                            {attr}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
