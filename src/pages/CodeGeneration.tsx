
import { AppSidebar } from "@/components/AppSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";

const CodeGeneration = () => {
  return (
    <SidebarProvider>
      <div className="grid lg:grid-cols-[280px_1fr] h-screen">
        <AppSidebar />
        <main className="p-6">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-4">Code Generation</h1>
            <p className="text-gray-600 mb-6">
              AI-powered code generation and optimization
            </p>
            
            <div className="grid gap-6">
              <section>
                <h2 className="text-xl font-semibold mb-3">Code Generation</h2>
                <div className="bg-white p-6 rounded-lg border">
                  <p>Generate boilerplate code and get suggestions for optimizations.</p>
                </div>
              </section>
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default CodeGeneration;
