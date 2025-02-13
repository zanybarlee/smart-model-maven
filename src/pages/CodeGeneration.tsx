
import { AppSidebar } from "@/components/AppSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Code2 } from "lucide-react";

interface CodeGenerationForm {
  description: string;
  context?: string;
}

interface OptimizationForm {
  code: string;
  requirements?: string;
}

const CodeGeneration = () => {
  const { toast } = useToast();
  const [generatedCode, setGeneratedCode] = useState<string>("");
  const [optimizedCode, setOptimizedCode] = useState<string>("");
  const [isAICoderOpen, setIsAICoderOpen] = useState(false);

  const generationForm = useForm<CodeGenerationForm>({
    defaultValues: {
      description: "",
      context: "",
    },
  });

  const optimizationForm = useForm<OptimizationForm>({
    defaultValues: {
      code: "",
      requirements: "",
    },
  });

  const onGenerateSubmit = (data: CodeGenerationForm) => {
    setGeneratedCode("// Generated code will appear here\nfunction example() {\n  console.log('Hello World');\n}");
    toast({
      title: "Code Generation Started",
      description: "Processing your request. Generated code will appear below.",
    });
  };

  const onOptimizeSubmit = (data: OptimizationForm) => {
    setOptimizedCode("// Optimized code will appear here\nfunction optimizedExample() {\n  // Optimized implementation\n}");
    toast({
      title: "Code Optimization Started",
      description: "Analyzing and optimizing your code...",
    });
  };

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
                <Card>
                  <CardHeader>
                    <CardTitle>Generate New Code</CardTitle>
                    <CardDescription>
                      Describe the functionality you want to implement, and our AI will generate the code for you.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Form {...generationForm}>
                      <form onSubmit={generationForm.handleSubmit(onGenerateSubmit)} className="space-y-4">
                        <FormField
                          control={generationForm.control}
                          name="description"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Functionality Description</FormLabel>
                              <FormControl>
                                <Textarea
                                  placeholder="Describe what you want the code to do... (e.g., Create a function that sorts an array of objects by a specific property)"
                                  className="min-h-[100px]"
                                  {...field}
                                />
                              </FormControl>
                              <FormDescription>
                                Be specific about the desired functionality, inputs, and outputs.
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={generationForm.control}
                          name="context"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Additional Context (Optional)</FormLabel>
                              <FormControl>
                                <Textarea
                                  placeholder="Provide any additional context or requirements... (e.g., specific libraries to use, performance considerations)"
                                  className="min-h-[100px]"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <Button type="submit">Generate Code</Button>
                      </form>
                    </Form>

                    {generatedCode && (
                      <div className="mt-6">
                        <h3 className="font-semibold mb-2">Generated Code</h3>
                        <div className="bg-slate-900 text-slate-50 p-4 rounded-lg">
                          <pre className="whitespace-pre-wrap">{generatedCode}</pre>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="optimize">
                <Card>
                  <CardHeader>
                    <CardTitle>Optimize Existing Code</CardTitle>
                    <CardDescription>
                      Paste your existing code, and our AI will suggest optimizations for better performance and readability.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Form {...optimizationForm}>
                      <form onSubmit={optimizationForm.handleSubmit(onOptimizeSubmit)} className="space-y-4">
                        <FormField
                          control={optimizationForm.control}
                          name="code"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Code to Optimize</FormLabel>
                              <FormControl>
                                <Textarea
                                  placeholder="Paste your code here..."
                                  className="min-h-[200px] font-mono"
                                  {...field}
                                />
                              </FormControl>
                              <FormDescription>
                                Paste the code you want to optimize.
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={optimizationForm.control}
                          name="requirements"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Optimization Requirements (Optional)</FormLabel>
                              <FormControl>
                                <Textarea
                                  placeholder="Specify any particular optimization goals... (e.g., improve performance, reduce memory usage)"
                                  className="min-h-[100px]"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <Button type="submit">Optimize Code</Button>
                      </form>
                    </Form>

                    {optimizedCode && (
                      <div className="mt-6">
                        <h3 className="font-semibold mb-2">Optimized Code</h3>
                        <div className="bg-slate-900 text-slate-50 p-4 rounded-lg">
                          <pre className="whitespace-pre-wrap">{optimizedCode}</pre>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
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
