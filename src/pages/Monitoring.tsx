
import { AppSidebar } from "@/components/AppSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import SystemHealthOverview from "@/components/monitoring/SystemHealthOverview";
import PerformanceCharts from "@/components/monitoring/PerformanceCharts";
import SystemAlerts from "@/components/monitoring/SystemAlerts";

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

              <SystemHealthOverview />
              <PerformanceCharts data={performanceData} />
              <SystemAlerts />
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Monitoring;
