
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
      <div className="grid lg:grid-cols-[280px_1fr] min-h-screen">
        <AppSidebar />
        <main className="p-4 md:p-6 overflow-y-auto">
          <div className="max-w-4xl mx-auto space-y-6 md:space-y-8">
            <div className="text-left">
              <h1 className="text-2xl md:text-3xl font-bold mb-2 md:mb-4">Code Generation</h1>
              <p className="text-sm md:text-base text-gray-600">
                AI-powered code generation and optimization tools
              </p>
            </div>

            <div className="space-y-6">
              <TextToApp />

              <Tabs defaultValue="generate" className="space-y-6">
                <TabsList className="grid w-full grid-cols-2 max-w-[400px]">
                  <TabsTrigger value="generate">Generate Code</TabsTrigger>
                  <TabsTrigger value="optimize">Optimize Code</TabsTrigger>
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
