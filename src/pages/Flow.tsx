
import React from 'react';
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { KPIDashboard } from "@/components/flow/KPIDashboard";
import { ValueStream } from "@/components/flow/ValueStream";
import { Chatflow } from "@/components/flow/Chatflow";
import { ContinuousImprovement } from "@/components/flow/ContinuousImprovement";
import { Automation } from "@/components/flow/Automation";
import { Analytics } from "@/components/flow/Analytics";
import { DataEngineering } from "@/components/flow/DataEngineering";
import '@xyflow/react/dist/style.css';

const Flow: React.FC = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <main className="flex-1 overflow-auto bg-slate-50">
          <div className="p-6">
            <div className="max-w-[1800px] mx-auto space-y-6">
              <div>
                <h1 className="text-3xl font-bold mb-2">Flow Engineering</h1>
                <p className="text-gray-600">Optimize value delivery through visualization and continuous improvement</p>
              </div>

              <KPIDashboard />

              <Tabs defaultValue="chatflow" className="space-y-4">
                <TabsList>
                  <TabsTrigger value="chatflow">Chatflow Designer</TabsTrigger>
                  <TabsTrigger value="data-flow">Dataflow Designer</TabsTrigger>
                  <TabsTrigger value="value-stream">Value Stream</TabsTrigger>
                  <TabsTrigger value="continuous-improvement">Continuous Improvement</TabsTrigger>
                  <TabsTrigger value="automation">Automation</TabsTrigger>
                  <TabsTrigger value="analytics">Analytics</TabsTrigger>
                </TabsList>

                <TabsContent value="chatflow" className="space-y-4">
                  <Chatflow />
                </TabsContent>

                <TabsContent value="data-flow" className="space-y-4">
                  <DataEngineering />
                </TabsContent>

                <TabsContent value="value-stream" className="space-y-4">
                  <ValueStream />
                </TabsContent>

                <TabsContent value="continuous-improvement">
                  <ContinuousImprovement />
                </TabsContent>

                <TabsContent value="automation">
                  <Automation />
                </TabsContent>

                <TabsContent value="analytics">
                  <Analytics />
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Flow;
