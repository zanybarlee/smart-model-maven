
import React, { useState } from 'react';
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Database, 
  GitBranch, 
  AlertCircle, 
  CheckCircle2, 
  Clock, 
  BarChart,
  Shield, 
  Activity,
  FileCode,
  Settings,
  Upload,
  ArrowUpRight,
  Tags,
  Wand2
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

const Data = () => {
  const [activeTab, setActiveTab] = useState('collection');
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [dataSourceName, setDataSourceName] = useState('');
  const [sourceType, setSourceType] = useState('');
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  const handleDataSourceSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { error } = await supabase
        .from('data_sources')
        .insert([
          {
            name: dataSourceName,
            source_type: sourceType,
            connection_details: { file: uploadedFile?.name }
          }
        ]);

      if (error) throw error;

      toast({
        title: "Data source added successfully",
        description: "Your data source has been registered and is ready for processing."
      });

      setDataSourceName('');
      setSourceType('');
      setUploadedFile(null);
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Error adding data source",
        description: error.message
      });
    }

    setLoading(false);
  };

  const dataSources = [
    { name: 'Customer Dataset', type: 'CSV', status: 'active' },
    { name: 'Product Catalog', type: 'JSON', status: 'processing' },
    { name: 'Sales Transactions', type: 'Database', status: 'completed' }
  ];

  const cleaningRules = [
    { name: 'Remove Duplicates', status: 'active' },
    { name: 'Handle Missing Values', status: 'completed' },
    { name: 'Standardize Format', status: 'pending' }
  ];

  const labelingTasks = [
    { name: 'Sentiment Analysis', progress: 75 },
    { name: 'Image Classification', progress: 45 },
    { name: 'Text Categorization', progress: 90 }
  ];

  const features = [
    { name: 'Feature Extraction', status: 'completed' },
    { name: 'Dimensionality Reduction', status: 'in_progress' },
    { name: 'Feature Selection', status: 'pending' }
  ];

  return (
    <SidebarProvider>
      <div className="min-h-screen flex">
        <AppSidebar />
        <main className="flex-1 overflow-auto bg-slate-50">
          <div className="p-6">
            <div className="max-w-[1800px] mx-auto space-y-6">
              <div>
                <h1 className="text-3xl font-bold mb-2">Data Engineering</h1>
                <p className="text-gray-600">Manage and process your data through various stages</p>
              </div>

              <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
                <TabsList>
                  <TabsTrigger value="collection">Data Collection</TabsTrigger>
                  <TabsTrigger value="cleaning">Data Cleaning</TabsTrigger>
                  <TabsTrigger value="labeling">Data Labeling</TabsTrigger>
                  <TabsTrigger value="features">Feature Engineering</TabsTrigger>
                </TabsList>

                {/* Data Collection Tab */}
                <TabsContent value="collection">
                  <div className="grid gap-4 md:grid-cols-2">
                    <Card>
                      <CardHeader>
                        <CardTitle>Add New Data Source</CardTitle>
                        <CardDescription>Register a new data source for processing</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <form onSubmit={handleDataSourceSubmit} className="space-y-4">
                          <div className="space-y-2">
                            <Input
                              placeholder="Data Source Name"
                              value={dataSourceName}
                              onChange={(e) => setDataSourceName(e.target.value)}
                            />
                            <Input
                              placeholder="Source Type (CSV, JSON, Database)"
                              value={sourceType}
                              onChange={(e) => setSourceType(e.target.value)}
                            />
                            <Input
                              type="file"
                              onChange={(e) => setUploadedFile(e.target.files?.[0] || null)}
                            />
                          </div>
                          <Button type="submit" disabled={loading}>
                            <Upload className="mr-2 h-4 w-4" />
                            {loading ? 'Adding...' : 'Add Data Source'}
                          </Button>
                        </form>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Data Sources</CardTitle>
                        <CardDescription>Currently registered data sources</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {dataSources.map((source, index) => (
                            <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                              <div>
                                <p className="font-medium">{source.name}</p>
                                <p className="text-sm text-gray-500">{source.type}</p>
                              </div>
                              <Badge>{source.status}</Badge>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                {/* Data Cleaning Tab */}
                <TabsContent value="cleaning">
                  <Card>
                    <CardHeader>
                      <CardTitle>Data Cleaning Rules</CardTitle>
                      <CardDescription>Manage and monitor data cleaning processes</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {cleaningRules.map((rule, index) => (
                          <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                            <div className="flex items-center">
                              <Shield className="h-5 w-5 mr-2 text-blue-500" />
                              <div>
                                <p className="font-medium">{rule.name}</p>
                                <p className="text-sm text-gray-500">Applied to all data sources</p>
                              </div>
                            </div>
                            <Badge variant={
                              rule.status === 'active' ? 'default' :
                              rule.status === 'completed' ? 'success' : 'secondary'
                            }>{rule.status}</Badge>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Data Labeling Tab */}
                <TabsContent value="labeling">
                  <Card>
                    <CardHeader>
                      <CardTitle>Labeling Tasks</CardTitle>
                      <CardDescription>Track data labeling progress</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-6">
                        {labelingTasks.map((task, index) => (
                          <div key={index} className="space-y-2">
                            <div className="flex justify-between items-center">
                              <div className="flex items-center">
                                <Tags className="h-5 w-5 mr-2 text-blue-500" />
                                <span className="font-medium">{task.name}</span>
                              </div>
                              <span className="text-sm text-gray-500">{task.progress}%</span>
                            </div>
                            <Progress value={task.progress} />
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Feature Engineering Tab */}
                <TabsContent value="features">
                  <Card>
                    <CardHeader>
                      <CardTitle>Feature Engineering</CardTitle>
                      <CardDescription>Transform and generate new features</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {features.map((feature, index) => (
                          <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                            <div className="flex items-center">
                              <Wand2 className="h-5 w-5 mr-2 text-blue-500" />
                              <div>
                                <p className="font-medium">{feature.name}</p>
                                <p className="text-sm text-gray-500">Automated feature generation</p>
                              </div>
                            </div>
                            <Badge variant={
                              feature.status === 'completed' ? 'success' :
                              feature.status === 'in_progress' ? 'default' : 'secondary'
                            }>{feature.status}</Badge>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Data;
