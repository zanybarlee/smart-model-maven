
import React, { useCallback } from 'react';
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/AppSidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, GitPullRequest, BarChart2, Users, Workflow, Settings, AlertCircle, Brain } from "lucide-react";
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';

// Initial nodes for value stream mapping
const initialNodes = [
  {
    id: '1',
    type: 'input',
    data: { label: 'Ideation' },
    position: { x: 0, y: 100 },
  },
  {
    id: '2',
    data: { label: 'Planning' },
    position: { x: 200, y: 100 },
  },
  {
    id: '3',
    data: { label: 'Development' },
    position: { x: 400, y: 100 },
  },
  {
    id: '4',
    data: { label: 'Testing' },
    position: { x: 600, y: 100 },
  },
  {
    id: '5',
    type: 'output',
    data: { label: 'Deployment' },
    position: { x: 800, y: 100 },
  },
];

// Initial edges connecting the nodes
const initialEdges = [
  { id: 'e1-2', source: '1', target: '2', animated: true },
  { id: 'e2-3', source: '2', target: '3', animated: true },
  { id: 'e3-4', source: '3', target: '4', animated: true },
  { id: 'e4-5', source: '4', target: '5', animated: true },
];

// Mock KPI data
const kpiData = [
  { title: 'Lead Time', value: '3.5 days', trend: '+12%', icon: Activity },
  { title: 'Cycle Time', value: '1.2 days', trend: '-8%', icon: GitPullRequest },
  { title: 'Throughput', value: '45/week', trend: '+15%', icon: BarChart2 },
  { title: 'Success Rate', value: '98.5%', trend: '+2%', icon: Workflow },
];

const Flow = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), []);

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

              {/* KPI Dashboard */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {kpiData.map((kpi, index) => (
                  <Card key={index}>
                    <CardHeader className="flex flex-row items-center justify-between pb-2 space-y-0">
                      <CardTitle className="text-sm font-medium">{kpi.title}</CardTitle>
                      <kpi.icon className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{kpi.value}</div>
                      <p className={`text-xs ${kpi.trend.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                        {kpi.trend} from last period
                      </p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Main Content Tabs */}
              <Tabs defaultValue="value-stream" className="space-y-4">
                <TabsList>
                  <TabsTrigger value="value-stream">Value Stream</TabsTrigger>
                  <TabsTrigger value="chatflow">Chatflow</TabsTrigger>
                  <TabsTrigger value="continuous-improvement">Continuous Improvement</TabsTrigger>
                  <TabsTrigger value="automation">Automation</TabsTrigger>
                  <TabsTrigger value="analytics">Analytics</TabsTrigger>
                </TabsList>

                {/* Value Stream Mapping Tab */}
                <TabsContent value="value-stream" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Value Stream Map</CardTitle>
                      <CardDescription>
                        Visualize and optimize your end-to-end delivery process
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="h-[600px]">
                      <ReactFlow
                        nodes={nodes}
                        edges={edges}
                        onNodesChange={onNodesChange}
                        onEdgesChange={onEdgesChange}
                        onConnect={onConnect}
                        fitView
                      >
                        <Controls />
                        <MiniMap />
                        <Background />
                      </ReactFlow>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Chatflow Tab */}
                <TabsContent value="chatflow" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Chatflow Designer</CardTitle>
                      <CardDescription>
                        Design and manage your chat workflows using the external flow design tool
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="h-[800px] p-0">
                      <iframe 
                        src="http://127.0.0.1:3001/"
                        className="w-full h-full border-0"
                        title="Chatflow Designer"
                      />
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Continuous Improvement Tab */}
                <TabsContent value="continuous-improvement">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card>
                      <CardHeader>
                        <div className="flex items-center gap-2">
                          <Brain className="h-5 w-5" />
                          <CardTitle>Kaizen Initiatives</CardTitle>
                        </div>
                        <CardDescription>Active improvement initiatives</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {/* Placeholder for Kaizen initiatives list */}
                          <div className="p-4 border rounded-lg">
                            <h3 className="font-medium">Code Review Optimization</h3>
                            <p className="text-sm text-gray-600">Reducing review cycle time</p>
                            <div className="mt-2 flex items-center gap-2">
                              <div className="h-2 flex-1 bg-gray-200 rounded-full overflow-hidden">
                                <div className="h-full w-3/4 bg-blue-500 rounded-full" />
                              </div>
                              <span className="text-sm">75%</span>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <div className="flex items-center gap-2">
                          <Settings className="h-5 w-5" />
                          <CardTitle>PDCA Cycles</CardTitle>
                        </div>
                        <CardDescription>Plan-Do-Check-Act tracking</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {/* Placeholder for PDCA cycles */}
                          <div className="p-4 border rounded-lg">
                            <h3 className="font-medium">Deployment Process</h3>
                            <p className="text-sm text-gray-600">Currently in "Check" phase</p>
                            <div className="mt-2 grid grid-cols-4 gap-1">
                              {['Plan', 'Do', 'Check', 'Act'].map((phase, i) => (
                                <div
                                  key={phase}
                                  className={`text-center p-2 rounded ${
                                    i <= 2 ? 'bg-blue-100 text-blue-700' : 'bg-gray-100'
                                  }`}
                                >
                                  {phase}
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                {/* Automation Tab */}
                <TabsContent value="automation">
                  <Card>
                    <CardHeader>
                      <div className="flex items-center gap-2">
                        <Workflow className="h-5 w-5" />
                        <CardTitle>Pipeline Status</CardTitle>
                      </div>
                      <CardDescription>CI/CD and automation overview</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {/* Placeholder for pipeline status */}
                        <div className="space-y-2">
                          <div className="flex items-center justify-between p-4 bg-green-50 text-green-700 rounded-lg">
                            <div className="flex items-center gap-2">
                              <Activity className="h-5 w-5" />
                              <span>Production Pipeline</span>
                            </div>
                            <span className="text-sm">Healthy</span>
                          </div>
                          <div className="flex items-center justify-between p-4 bg-yellow-50 text-yellow-700 rounded-lg">
                            <div className="flex items-center gap-2">
                              <AlertCircle className="h-5 w-5" />
                              <span>Staging Pipeline</span>
                            </div>
                            <span className="text-sm">Warning</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Analytics Tab */}
                <TabsContent value="analytics">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <Card>
                      <CardHeader>
                        <div className="flex items-center gap-2">
                          <BarChart2 className="h-5 w-5" />
                          <CardTitle>Performance Metrics</CardTitle>
                        </div>
                        <CardDescription>Key performance indicators and trends</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {/* Placeholder for performance metrics */}
                          <div className="space-y-2">
                            {['Deployment Frequency', 'Change Failure Rate', 'MTTR'].map((metric) => (
                              <div key={metric} className="flex items-center justify-between p-4 border rounded-lg">
                                <span>{metric}</span>
                                <span className="text-sm text-green-600">↑ Improving</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <div className="flex items-center gap-2">
                          <Users className="h-5 w-5" />
                          <CardTitle>Team Collaboration</CardTitle>
                        </div>
                        <CardDescription>Cross-functional team metrics</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {/* Placeholder for collaboration metrics */}
                          <div className="space-y-2">
                            {['Code Review Time', 'Handover Efficiency', 'Team Velocity'].map((metric) => (
                              <div key={metric} className="flex items-center justify-between p-4 border rounded-lg">
                                <span>{metric}</span>
                                <span className="text-sm text-blue-600">On Track</span>
                              </div>
                            ))}
                          </div>
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

export default Flow;
