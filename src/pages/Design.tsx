
import { AppSidebar } from "@/components/AppSidebar";

const Design = () => {
  return (
    <div className="grid lg:grid-cols-[280px_1fr] h-screen">
      <AppSidebar />
      <main className="p-6">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-4">Design & Planning</h1>
          <p className="text-gray-600 mb-6">
            AI-assisted requirements gathering and architecture planning
          </p>
          
          <div className="grid gap-6">
            <section>
              <h2 className="text-xl font-semibold mb-3">Requirements Gathering</h2>
              <div className="bg-white p-6 rounded-lg border">
                <p>Input your high-level project requirements in natural language.</p>
              </div>
            </section>
            
            <section>
              <h2 className="text-xl font-semibold mb-3">Architecture Recommendations</h2>
              <div className="bg-white p-6 rounded-lg border">
                <p>Get AI-powered suggestions for technology stacks and design patterns.</p>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Design;
