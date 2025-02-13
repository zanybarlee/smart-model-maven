import React, { useState } from 'react';
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { KnowledgeBaseList } from "@/components/data/KnowledgeBaseList";
import { MetricsOverview } from "@/components/knowledge/MetricsOverview";
import { SearchBar } from "@/components/knowledge/SearchBar";
import { VectorStoreMetrics } from "@/components/knowledge/VectorStoreMetrics";
import { KnowledgeBaseConfig } from "@/components/knowledge/KnowledgeBaseConfig";
import { RetrievalTesting } from "@/components/knowledge/RetrievalTesting";

const Knowledge = () => {
  const [activeTab, setActiveTab] = useState('documents');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <main className="flex-1 overflow-auto bg-slate-50">
          <div className="p-6">
            <div className="max-w-[1800px] mx-auto space-y-6">
              <div>
                <h1 className="text-3xl font-bold mb-2">Knowledge Management</h1>
                <p className="text-gray-600">RAG-powered knowledge base and document management</p>
              </div>

              <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
              <MetricsOverview />

              <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
                <TabsList>
                  <TabsTrigger value="documents">Documents</TabsTrigger>
                  <TabsTrigger value="configuration">Configuration</TabsTrigger>
                  <TabsTrigger value="vectors">Vector Store</TabsTrigger>
                  <TabsTrigger value="retrieval">Retrieval Testing</TabsTrigger>
                  <TabsTrigger value="analytics">Analytics</TabsTrigger>
                  <TabsTrigger value="settings">Settings</TabsTrigger>
                </TabsList>

                <TabsContent value="documents">
                  <KnowledgeBaseList />
                </TabsContent>

                <TabsContent value="configuration">
                  <KnowledgeBaseConfig />
                </TabsContent>

                <TabsContent value="vectors">
                  <VectorStoreMetrics />
                </TabsContent>

                <TabsContent value="retrieval">
                  <RetrievalTesting />
                </TabsContent>

                <TabsContent value="analytics">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card>
                      <CardHeader>
                        <div className="flex items-center gap-2">
                          <Tags className="h-5 w-5" />
                          <CardTitle>Usage Analytics</CardTitle>
                        </div>
                        <CardDescription>Query and retrieval statistics</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {[
                            { metric: 'Total Queries', value: '45.2K' },
                            { metric: 'Successful Retrievals', value: '98.5%' },
                            { metric: 'Avg Relevance Score', value: '0.89' }
                          ].map((item, i) => (
                            <div key={i} className="flex items-center justify-between p-2 border rounded">
                              <span className="font-medium">{item.metric}</span>
                              <Badge variant="secondary">{item.value}</Badge>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <div className="flex items-center gap-2">
                          <Clock className="h-5 w-5" />
                          <CardTitle>System Health</CardTitle>
                        </div>
                        <CardDescription>Performance monitoring</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {[
                            { status: 'Vector DB', health: 'Healthy' },
                            { status: 'Indexing Service', health: 'Active' },
                            { status: 'Query Engine', health: 'Operational' }
                          ].map((item, i) => (
                            <div key={i} className="flex items-center justify-between p-2 border rounded">
                              <span className="font-medium">{item.status}</span>
                              <Badge variant="success">{item.health}</Badge>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="settings">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card>
                      <CardHeader>
                        <div className="flex items-center gap-2">
                          <Shield className="h-5 w-5" />
                          <CardTitle>Security & Compliance</CardTitle>
                        </div>
                        <CardDescription>Access control and encryption</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {[
                            { feature: 'Encryption', status: 'Enabled' },
                            { feature: 'Access Logs', status: 'Active' },
                            { feature: 'GDPR Compliance', status: 'Compliant' }
                          ].map((item, i) => (
                            <div key={i} className="flex items-center justify-between p-2 border rounded">
                              <span className="font-medium">{item.feature}</span>
                              <Badge variant="success">{item.status}</Badge>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Knowledge;
