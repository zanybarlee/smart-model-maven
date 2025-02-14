
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, LineChart } from "lucide-react";
import { ChartContainer, ChartTooltip } from "@/components/ui/chart";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid } from "recharts";

interface PerformanceChartsProps {
  data: Array<{
    time: string;
    cpu: number;
    memory: number;
    latency: number;
  }>;
}

const PerformanceCharts = ({ data }: PerformanceChartsProps) => {
  return (
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
              <AreaChart data={data}>
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
              <AreaChart data={data}>
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
  );
};

export default PerformanceCharts;
