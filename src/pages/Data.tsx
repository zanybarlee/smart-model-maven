
import React, { useState } from 'react';
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DataCollectionTab } from "@/components/data/DataCollectionTab";
import { DataQualityTab } from "@/components/data/DataQualityTab";
import { DataCleaningTab } from "@/components/data/DataCleaningTab";
import { DataLabelingTab } from "@/components/data/DataLabelingTab";
import { FeatureEngineeringTab } from "@/components/data/FeatureEngineeringTab";
import { ComplianceTab } from "@/components/compliance/ComplianceTab";
import { DataEngineering } from "@/components/flow/DataEngineering";

const Data = () => {
  const [activeTab, setActiveTab] = useState('flow');

  return (
    <SidebarProvider>
      <div className="min-h-screen flex">
        <AppSidebar />
        <main className="flex-1 overflow-auto bg-slate-50">
          <div className={activeTab === 'flow' ? 'p-6 h-full' : 'p-6'}>
            <div className="h-full">
              <div className="mb-6">
                <h1 className="text-3xl font-bold mb-2">Data Engineering</h1>
                <p className="text-gray-600">Manage and process your data through various stages</p>
              </div>

              <Tabs value={activeTab} onValueChange={setActiveTab} className="h-[calc(100%-5rem)]">
                <TabsList className="mb-4">
                  <TabsTrigger value="flow">Data Flow Design</TabsTrigger>
                  <TabsTrigger value="collection">Data Collection</TabsTrigger>
                  <TabsTrigger value="quality">Data Quality</TabsTrigger>
                  <TabsTrigger value="cleaning">Data Cleaning</TabsTrigger>
                  <TabsTrigger value="labeling">Data Labeling</TabsTrigger>
                  <TabsTrigger value="features">Feature Engineering</TabsTrigger>
                  <TabsTrigger value="compliance">Compliance</TabsTrigger>
                </TabsList>

                <TabsContent value="flow" className="m-0 h-full">
                  <DataEngineering />
                </TabsContent>

                <TabsContent value="collection">
                  <DataCollectionTab />
                </TabsContent>

                <TabsContent value="quality">
                  <DataQualityTab />
                </TabsContent>

                <TabsContent value="cleaning">
                  <DataCleaningTab />
                </TabsContent>

                <TabsContent value="labeling">
                  <DataLabelingTab />
                </TabsContent>

                <TabsContent value="features">
                  <FeatureEngineeringTab />
                </TabsContent>

                <TabsContent value="compliance">
                  <ComplianceTab />
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
