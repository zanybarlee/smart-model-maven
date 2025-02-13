
import React, { useState } from 'react';
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { DataSourceForm } from "@/components/data/DataSourceForm";
import { DataSourceList } from "@/components/data/DataSourceList";
import { CleaningRulesList } from "@/components/data/CleaningRulesList";
import { LabelingTasksList } from "@/components/data/LabelingTasksList";
import { FeaturesList } from "@/components/data/FeaturesList";

const Data = () => {
  const [activeTab, setActiveTab] = useState('collection');

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

                <TabsContent value="collection">
                  <div className="grid gap-4 md:grid-cols-2">
                    <Card>
                      <CardHeader>
                        <CardTitle>Add New Data Source</CardTitle>
                        <CardDescription>Register a new data source for processing</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <DataSourceForm />
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Data Sources</CardTitle>
                        <CardDescription>Currently registered data sources</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <DataSourceList />
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="cleaning">
                  <Card>
                    <CardHeader>
                      <CardTitle>Data Cleaning Rules</CardTitle>
                      <CardDescription>Manage and monitor data cleaning processes</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <CleaningRulesList />
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="labeling">
                  <Card>
                    <CardHeader>
                      <CardTitle>Labeling Tasks</CardTitle>
                      <CardDescription>Track data labeling progress</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <LabelingTasksList />
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="features">
                  <Card>
                    <CardHeader>
                      <CardTitle>Feature Engineering</CardTitle>
                      <CardDescription>Transform and generate new features</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <FeaturesList />
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
