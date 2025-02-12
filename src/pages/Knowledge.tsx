
import React, { useState } from 'react';
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Search,
  Upload,
  FileText,
  Settings,
  Database,
  Shield,
  Activity,
  Tags,
  Clock,
  AlertCircle,
  CheckCircle2,
  Timer,
  Zap,
} from "lucide-react";

// Mock data for demonstration
const documents = [
  { id: 1, title: 'System Architecture', type: 'PDF', status: 'indexed', date: '2024-02-20', tags: ['technical', 'architecture'] },
  { id: 2, title: 'API Documentation', type: 'Markdown', status: 'processing', date: '2024-02-19', tags: ['api', 'documentation'] },
  { id: 3, title: 'Security Guidelines', type: 'Word', status: 'indexed', date: '2024-02-18', tags: ['security', 'compliance'] },
];

const metrics = [
  { name: 'Query Latency', value: '156ms', trend: '-12ms', icon: Timer },
  { name: 'Documents Indexed', value: '1,234', trend: '+45', icon: FileText },
  { name: 'Query Success Rate', value: '99.9%', trend: '+0.1%', icon: CheckCircle2 },
  { name: 'Avg Response Time', value: '189ms', trend: '-8ms', icon: Zap },
];

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
              {/* Header */}
              <div>
                <h1 className="text-3xl font-bold mb-2">Knowledge Management</h1>
                <p className="text-gray-600">RAG-powered knowledge base and document management</p>
              </div>

              {/* Search Bar */}
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  className="pl-10 h-12"
                  placeholder="Search knowledge base..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              {/* Metrics Overview */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {metrics.map((metric, i) => (
                  <Card key={i}>
                    <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                      <CardTitle className="text-sm font-medium">{metric.name}</CardTitle>
                      <metric.icon className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{metric.value}</div>
                      <p className="text-xs text-muted-foreground">{metric.trend} from last week</p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Main Content */}
              <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
                <TabsList>
                  <TabsTrigger value="documents">Documents</TabsTrigger>
                  <TabsTrigger value="vectors">Vector Store</TabsTrigger>
                  <TabsTrigger value="analytics">Analytics</TabsTrigger>
                  <TabsTrigger value="settings">Settings</TabsTrigger>
                </TabsList>

                {/* Documents Tab */}
                <TabsContent value="documents">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                      <div>
                        <CardTitle>Document Repository</CardTitle>
                        <CardDescription>Manage and track indexed documents</CardDescription>
                      </div>
                      <Button>
                        <Upload className="mr-2 h-4 w-4" /> Upload Document
                      </Button>
                    </CardHeader>
                    <CardContent>
                      <ScrollArea className="h-[400px]">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead>Title</TableHead>
                              <TableHead>Type</TableHead>
                              <TableHead>Status</TableHead>
                              <TableHead>Date Added</TableHead>
                              <TableHead>Tags</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {documents.map((doc) => (
                              <TableRow key={doc.id}>
                                <TableCell className="font-medium">{doc.title}</TableCell>
                                <TableCell>{doc.type}</TableCell>
                                <TableCell>
                                  <Badge variant={doc.status === 'indexed' ? 'success' : 'secondary'}>
                                    {doc.status}
                                  </Badge>
                                </TableCell>
                                <TableCell>{doc.date}</TableCell>
                                <TableCell>
                                  <div className="flex gap-1">
                                    {doc.tags.map((tag, i) => (
                                      <Badge key={i} variant="outline">
                                        {tag}
                                      </Badge>
                                    ))}
                                  </div>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </ScrollArea>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Vector Store Tab */}
                <TabsContent value="vectors">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card>
                      <CardHeader>
                        <div className="flex items-center gap-2">
                          <Database className="h-5 w-5" />
                          <CardTitle>Vector Database</CardTitle>
                        </div>
                        <CardDescription>Vector store status and metrics</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {[
                            { metric: 'Vector DB Size', value: '2.3GB', progress: 45 },
                            { metric: 'Total Vectors', value: '156K', progress: 78 },
                            { metric: 'Index Health', value: '98%', progress: 98 }
                          ].map((item, i) => (
                            <div key={i} className="space-y-2">
                              <div className="flex justify-between">
                                <span className="text-sm font-medium">{item.metric}</span>
                                <span className="text-sm text-muted-foreground">{item.value}</span>
                              </div>
                              <Progress value={item.progress} />
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <div className="flex items-center gap-2">
                          <Activity className="h-5 w-5" />
                          <CardTitle>Query Performance</CardTitle>
                        </div>
                        <CardDescription>Vector search metrics</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {[
                            { metric: 'Avg Query Time', value: '45ms' },
                            { metric: 'Cache Hit Rate', value: '89%' },
                            { metric: 'Index Updates', value: '1.2K/hour' }
                          ].map((item, i) => (
                            <div key={i} className="flex items-center justify-between p-2 border rounded">
                              <span className="font-medium">{item.metric}</span>
                              <Badge variant="secondary">{item.value}</Badge>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                {/* Analytics Tab */}
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

                {/* Settings Tab */}
                <TabsContent value="settings">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card>
                      <CardHeader>
                        <div className="flex items-center gap-2">
                          <Settings className="h-5 w-5" />
                          <CardTitle>System Configuration</CardTitle>
                        </div>
                        <CardDescription>Knowledge base settings</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {[
                            { setting: 'Max Document Size', value: '10MB' },
                            { setting: 'Vector Dimensions', value: '1,536' },
                            { setting: 'Update Frequency', value: 'Real-time' }
                          ].map((item, i) => (
                            <div key={i} className="flex items-center justify-between p-2 border rounded">
                              <span className="font-medium">{item.setting}</span>
                              <span className="text-muted-foreground">{item.value}</span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

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
