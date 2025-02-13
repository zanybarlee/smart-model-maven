
import { AppSidebar } from "@/components/AppSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Code2 } from "lucide-react";
import { GenerateCodeForm } from "@/components/code-generation/GenerateCodeForm";
import { OptimizeCodeForm } from "@/components/code-generation/OptimizeCodeForm";
import { CodeDisplay } from "@/components/code-generation/CodeDisplay";

const CodeGeneration = () => {
  const [generatedCode, setGeneratedCode] = useState<string>("");
  const [optimizedCode, setOptimizedCode] = useState<string>("");
  const [isAICoderOpen, setIsAICoderOpen] = useState(false);

  return (
    <SidebarProvider>
      <div className="grid lg:grid-cols-[280px_1fr] h-screen">
        <AppSidebar />
        <main className="p-6 overflow-y-auto">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-3xl font-bold mb-4">Code Generation</h1>
                <p className="text-gray-600">
                  AI-powered code generation and optimization tools
                </p>
              </div>
              <Button 
                variant="outline" 
                className="flex items-center gap-2"
                onClick={() => setIsAICoderOpen(true)}
              >
                <Code2 className="h-4 w-4" />
                Text to App (AI Coder Assistant)
              </Button>
            </div>

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

      <Dialog open={isAICoderOpen} onOpenChange={setIsAICoderOpen}>
        <DialogContent className="max-w-[100vw] w-[100vw] h-[100vh] p-0">
          <iframe
            src="https://lovable.dev/"
            className="w-full h-full border-0"
            title="AI Coder Assistant"
          />
        </DialogContent>
      </Dialog>
    </SidebarProvider>
  );
};

export default CodeGeneration;
