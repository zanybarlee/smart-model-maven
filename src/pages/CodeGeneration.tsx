
import { AppSidebar } from "@/components/AppSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GenerateCodeForm } from "@/components/code-generation/GenerateCodeForm";
import { OptimizeCodeForm } from "@/components/code-generation/OptimizeCodeForm";
import { CodeDisplay } from "@/components/code-generation/CodeDisplay";
import { TextToApp } from "@/components/code-generation/TextToApp";
import { useState } from "react";

const CodeGeneration = () => {
  const [generatedCode, setGeneratedCode] = useState<string>("");
  const [optimizedCode, setOptimizedCode] = useState<string>("");

  return (
    <SidebarProvider>
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <main className="flex-1 overflow-auto bg-black">
          <div className="p-6">
            <div className="max-w-[1800px] mx-auto space-y-6">
              <div>
                <h1 className="text-3xl font-bold mb-2 text-white">Code Generation</h1>
                <p className="text-gray-400">
                  AI-powered code generation and optimization tools
                </p>
              </div>

              <TextToApp />

              <Tabs defaultValue="generate" className="space-y-6">
                <TabsList className="grid w-full grid-cols-2 max-w-[400px] bg-gray-900">
                  <TabsTrigger 
                    value="generate"
                    className="data-[state=active]:bg-gray-800"
                  >
                    Generate Code
                  </TabsTrigger>
                  <TabsTrigger 
                    value="optimize"
                    className="data-[state=active]:bg-gray-800"
                  >
                    Optimize Code
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="generate" className="space-y-6">
                  <GenerateCodeForm onCodeGenerated={setGeneratedCode} />
                  <CodeDisplay code={generatedCode} title="Generated Code" />
                </TabsContent>

                <TabsContent value="optimize" className="space-y-6">
                  <OptimizeCodeForm onCodeOptimized={setOptimizedCode} />
                  <CodeDisplay code={optimizedCode} title="Optimized Code" />
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default CodeGeneration;
