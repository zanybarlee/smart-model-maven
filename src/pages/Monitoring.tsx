import { AppSidebar } from "@/components/AppSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, AlertCircle, BarChart3, Cpu, Database, Gauge, HardDrive, LineChart, Signal } from "lucide-react";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from "recharts";

const performanceData = [
  { time: '00:00', cpu: 45, memory: 62, latency: 120 },
  { time: '04:00', cpu: 55, memory: 65, latency: 124 },
  { time: '08:00', cpu: 75, memory: 78, latency: 145 },
  { time: '12:00', cpu: 85, memory: 82, latency: 155 },
  { time: '16:00', cpu: 70, memory: 75, latency: 135 },
  { time: '20:00', cpu: 60, memory: 68, latency: 125 },
];

const Monitoring = () => {
  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <main className="flex-1 overflow-auto bg-slate-50">
          <div className="p-6">
            <div className="max-w-[1800px] mx-auto space-y-6">
              <div>
                <h1 className="text-3xl font-bold mb-2">System Monitoring</h1>
                <p className="text-gray-600">
                  Monitor system performance, resources, and health status
                </p>
              </div>

              {/* System Health Overview */}
              <div className="grid gap-6 md:grid-cols-4">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">CPU Usage</CardTitle>
                    <Cpu className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">75%</div>
                    <p className="text-xs text-muted-foreground">
                      +12% from last hour
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Memory Usage</CardTitle>
                    <HardDrive className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">82%</div>
                    <p className="text-xs text-muted-foreground">
                      +5% from last hour
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Response Time</CardTitle>
                    <Signal className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">145ms</div>
                    <p className="text-xs text-muted-foreground">
                      +15ms from last hour
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">System Health</CardTitle>
                    <Activity className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold text-green-600">Good</div>
                    <p className="text-xs text-muted-foreground">
                      All systems operational
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Performance Charts */}
              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <LineChart className="h-5 w-5" />
                      <CardTitle>System Performance</CardTitle>
                    </div>
                    <CardDescription>
                      CPU and Memory usage over time
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px]">
                      <ChartContainer
                        config={{
                          cpu: { color: "#2563eb" },
                          memory: { color: "#16a34a" },
                        }}
                      >
                        <AreaChart data={performanceData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="time" />
                          <YAxis />
                          <ChartTooltip />
                          <Area
                            type="monotone"
                            dataKey="cpu"
                            stroke="#2563eb"
                            fill="#2563eb"
                            fillOpacity={0.2}
                            name="CPU Usage (%)"
                          />
                          <Area
                            type="monotone"
                            dataKey="memory"
                            stroke="#16a34a"
                            fill="#16a34a"
                            fillOpacity={0.2}
                            name="Memory Usage (%)"
                          />
                        </AreaChart>
                      </ChartContainer>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <BarChart3 className="h-5 w-5" />
                      <CardTitle>Response Time</CardTitle>
                    </div>
                    <CardDescription>
                      System latency measurements
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="h-[300px]">
                      <ChartContainer
                        config={{
                          latency: { color: "#d946ef" },
                        }}
                      >
                        <AreaChart data={performanceData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="time" />
                          <YAxis />
                          <ChartTooltip />
                          <Area
                            type="monotone"
                            dataKey="latency"
                            stroke="#d946ef"
                            fill="#d946ef"
                            fillOpacity={0.2}
                            name="Response Time (ms)"
                          />
                        </AreaChart>
                      </ChartContainer>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* System Alerts */}
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <AlertCircle className="h-5 w-5" />
                    <CardTitle>System Alerts</CardTitle>
                  </div>
                  <CardDescription>
                    Recent system alerts and notifications
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 p-4 bg-yellow-50 text-yellow-700 rounded-lg">
                      <AlertCircle className="h-5 w-5" />
                      <div>
                        <p className="font-medium">High Memory Usage Warning</p>
                        <p className="text-sm">Memory usage exceeded 80% threshold</p>
                        <p className="text-xs text-yellow-600">2 hours ago</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 p-4 bg-green-50 text-green-700 rounded-lg">
                      <AlertCircle className="h-5 w-5" />
                      <div>
                        <p className="font-medium">System Update Completed</p>
                        <p className="text-sm">Successfully updated to version 2.1.0</p>
                        <p className="text-xs text-green-600">5 hours ago</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Monitoring;
