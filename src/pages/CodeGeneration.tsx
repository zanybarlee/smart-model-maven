
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
      <div className="grid lg:grid-cols-[280px_1fr] h-screen">
        <AppSidebar />
        <main className="p-6 overflow-y-auto">
          <div className="max-w-4xl mx-auto space-y-8">
            <div>
              <h1 className="text-3xl font-bold mb-4">Code Generation</h1>
              <p className="text-gray-600">
                AI-powered code generation and optimization tools
              </p>
            </div>

            <TextToApp />

            <Tabs defaultValue="generate" className="space-y-6">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="generate">Generate Code</TabsTrigger>
                <TabsTrigger value="optimize">Optimize Code</TabsTrigger>
              </TabsList>

              <TabsContent value="generate">
                <GenerateCodeForm onCodeGenerated={setGeneratedCode} />
                <CodeDisplay code={generatedCode} title="Generated Code" />
              </TabsContent>

              <TabsContent value="optimize">
                <OptimizeCodeForm onCodeOptimized={setOptimizedCode} />
                <CodeDisplay code={optimizedCode} title="Optimized Code" />
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default CodeGeneration;
