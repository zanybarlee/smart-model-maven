import React, { useState } from 'react';
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
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
  ArrowUpRight
} from "lucide-react";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

// Mock data for pipeline metrics
const pipelineMetrics = [
  { time: '00:00', throughput: 2400, latency: 35, errorRate: 2 },
  { time: '04:00', throughput: 1398, latency: 42, errorRate: 3 },
  { time: '08:00', throughput: 9800, latency: 28, errorRate: 1 },
  { time: '12:00', throughput: 3908, latency: 38, errorRate: 4 },
  { time: '16:00', throughput: 4800, latency: 31, errorRate: 2 },
  { time: '20:00', throughput: 3800, latency: 37, errorRate: 3 },
];

const pipelines = [
  {
    name: 'Customer Data ETL',
    status: 'running',
    progress: 78,
    type: 'batch',
    lastRun: '2 mins ago',
    nextRun: 'in 28 mins'
  },
  {
    name: 'Product Analytics Stream',
    status: 'healthy',
    progress: 100,
    type: 'streaming',
    lastRun: 'continuous',
    nextRun: 'continuous'
  },
  {
    name: 'ML Feature Generation',
    status: 'warning',
    progress: 65,
    type: 'batch',
    lastRun: '15 mins ago',
    nextRun: 'in 45 mins'
  }
];

const Data = () => {
  const [activeTab, setActiveTab] = useState('pipelines');

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <main className="flex-1 overflow-auto bg-slate-50">
          <div className="p-6">
            <div className="max-w-[1800px] mx-auto space-y-6">
              {/* Header */}
              <div>
                <h1 className="text-3xl font-bold mb-2">Data Engineering</h1>
                <p className="text-gray-600">Manage and monitor data pipelines, quality, and infrastructure</p>
              </div>

              {/* Overview Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  { title: 'Active Pipelines', value: '12', icon: GitBranch, trend: '+2 this week' },
                  { title: 'Data Quality Score', value: '98.5%', icon: CheckCircle2, trend: '+0.5% from last week' },
                  { title: 'Avg. Latency', value: '235ms', icon: Clock, trend: '-12ms this week' },
                  { title: 'Total Storage', value: '1.2TB', icon: Database, trend: '+100GB this month' }
                ].map((item, i) => (
                  <Card key={i}>
                    <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                      <CardTitle className="text-sm font-medium">{item.title}</CardTitle>
                      <item.icon className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{item.value}</div>
                      <p className="text-xs text-muted-foreground">{item.trend}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Main Content */}
              <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
                <TabsList>
                  <TabsTrigger value="pipelines">Pipelines</TabsTrigger>
                  <TabsTrigger value="quality">Data Quality</TabsTrigger>
                  <TabsTrigger value="infrastructure">Infrastructure</TabsTrigger>
                  <TabsTrigger value="monitoring">Monitoring</TabsTrigger>
                </TabsList>

                {/* Pipelines Tab */}
                <TabsContent value="pipelines" className="space-y-4">
                  {/* Pipeline List */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Data Pipelines</CardTitle>
                      <CardDescription>Active data processing workflows</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {pipelines.map((pipeline, index) => (
                          <div key={index} className="border rounded-lg p-4">
                            <div className="flex items-center justify-between mb-2">
                              <div className="flex items-center gap-2">
                                <h3 className="font-medium">{pipeline.name}</h3>
                                <Badge variant={
                                  pipeline.status === 'running' ? 'default' :
                                  pipeline.status === 'healthy' ? 'success' : 'warning'
                                }>
                                  {pipeline.status}
                                </Badge>
                              </div>
                              <span className="text-sm text-muted-foreground">{pipeline.type}</span>
                            </div>
                            <Progress value={pipeline.progress} className="mb-2" />
                            <div className="flex justify-between text-sm text-muted-foreground">
                              <span>Last run: {pipeline.lastRun}</span>
                              <span>Next run: {pipeline.nextRun}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Pipeline Metrics */}
                  <Card>
                    <CardHeader>
                      <CardTitle>Pipeline Metrics</CardTitle>
                      <CardDescription>Performance over the last 24 hours</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={pipelineMetrics}>
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="time" />
                            <YAxis />
                            <Tooltip />
                            <Line type="monotone" dataKey="throughput" stroke="#8884d8" />
                            <Line type="monotone" dataKey="latency" stroke="#82ca9d" />
                            <Line type="monotone" dataKey="errorRate" stroke="#ff7300" />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Data Quality Tab */}
                <TabsContent value="quality">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card>
                      <CardHeader>
                        <div className="flex items-center gap-2">
                          <Shield className="h-5 w-5" />
                          <CardTitle>Quality Metrics</CardTitle>
                        </div>
                        <CardDescription>Data validation and cleansing status</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {[
                            { metric: 'Completeness', score: 98.5 },
                            { metric: 'Accuracy', score: 95.2 },
                            { metric: 'Consistency', score: 97.8 }
                          ].map((item, i) => (
                            <div key={i} className="space-y-2">
                              <div className="flex justify-between">
                                <span className="text-sm font-medium">{item.metric}</span>
                                <span className="text-sm text-muted-foreground">{item.score}%</span>
                              </div>
                              <Progress value={item.score} />
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <div className="flex items-center gap-2">
                          <AlertCircle className="h-5 w-5" />
                          <CardTitle>Data Issues</CardTitle>
                        </div>
                        <CardDescription>Recent quality alerts and violations</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {[
                            { issue: 'Missing Values', count: 127, severity: 'low' },
                            { issue: 'Schema Violations', count: 23, severity: 'medium' },
                            { issue: 'Duplicate Records', count: 45, severity: 'low' }
                          ].map((item, i) => (
                            <div key={i} className="flex items-center justify-between p-2 border rounded">
                              <span>{item.issue}</span>
                              <Badge variant={
                                item.severity === 'low' ? 'secondary' :
                                item.severity === 'medium' ? 'warning' : 'destructive'
                              }>
                                {item.count}
                              </Badge>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                {/* Infrastructure Tab */}
                <TabsContent value="infrastructure">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card>
                      <CardHeader>
                        <div className="flex items-center gap-2">
                          <Database className="h-5 w-5" />
                          <CardTitle>Storage & Compute</CardTitle>
                        </div>
                        <CardDescription>Resource utilization metrics</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {[
                            { resource: 'Data Lake Storage', usage: 72 },
                            { resource: 'Warehouse Compute', usage: 45 },
                            { resource: 'Stream Processing', usage: 83 }
                          ].map((item, i) => (
                            <div key={i} className="space-y-2">
                              <div className="flex justify-between">
                                <span className="text-sm font-medium">{item.resource}</span>
                                <span className="text-sm text-muted-foreground">{item.usage}%</span>
                              </div>
                              <Progress value={item.usage} className={
                                item.usage > 80 ? 'text-red-500' :
                                item.usage > 60 ? 'text-yellow-500' : ''
                              } />
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <div className="flex items-center gap-2">
                          <Settings className="h-5 w-5" />
                          <CardTitle>Infrastructure Health</CardTitle>
                        </div>
                        <CardDescription>System status and availability</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {[
                            { service: 'ETL Cluster', status: 'operational' },
                            { service: 'Data Warehouse', status: 'operational' },
                            { service: 'Stream Processing', status: 'degraded' }
                          ].map((item, i) => (
                            <div key={i} className="flex items-center justify-between p-2 border rounded">
                              <span>{item.service}</span>
                              <Badge variant={item.status === 'operational' ? 'success' : 'warning'}>
                                {item.status}
                              </Badge>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                {/* Monitoring Tab */}
                <TabsContent value="monitoring">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card>
                      <CardHeader>
                        <div className="flex items-center gap-2">
                          <Activity className="h-5 w-5" />
                          <CardTitle>Real-Time Metrics</CardTitle>
                        </div>
                        <CardDescription>Current system performance</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="h-[300px]">
                          <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={pipelineMetrics}>
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis dataKey="time" />
                              <YAxis />
                              <Tooltip />
                              <Line type="monotone" dataKey="throughput" stroke="#8884d8" />
                              <Line type="monotone" dataKey="errorRate" stroke="#ff7300" />
                            </LineChart>
                          </ResponsiveContainer>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <div className="flex items-center gap-2">
                          <FileCode className="h-5 w-5" />
                          <CardTitle>System Logs</CardTitle>
                        </div>
                        <CardDescription>Recent events and alerts</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {[
                            { message: 'Pipeline ETL-001 completed successfully', type: 'info' },
                            { message: 'High latency detected in data warehouse', type: 'warning' },
                            { message: 'New data quality rule applied', type: 'success' }
                          ].map((log, i) => (
                            <div key={i} className="flex items-center gap-2 p-2 border rounded text-sm">
                              <Badge variant={
                                log.type === 'info' ? 'secondary' :
                                log.type === 'warning' ? 'warning' : 'success'
                              }>
                                {log.type}
                              </Badge>
                              <span>{log.message}</span>
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

export default Data;
