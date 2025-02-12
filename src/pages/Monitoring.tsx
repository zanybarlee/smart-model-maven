
import { AppSidebar } from "@/components/AppSidebar";

const Monitoring = () => {
  return (
    <div className="grid lg:grid-cols-[280px_1fr] h-screen">
      <AppSidebar />
      <main className="p-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-4">Monitoring</h1>
          <p className="text-gray-600 mb-6">
            System monitoring and maintenance
          </p>
          
          <div className="grid gap-6">
            <section>
              <h2 className="text-xl font-semibold mb-3">System Monitoring</h2>
              <div className="bg-white p-6 rounded-lg border">
                <p>Monitor system performance and track issues.</p>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Monitoring;
