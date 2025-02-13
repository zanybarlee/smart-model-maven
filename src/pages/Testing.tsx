import { AppSidebar } from "@/components/AppSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { RetrievalTesting } from "@/components/knowledge/RetrievalTesting";

interface TestGenerationForm {
  codeInput: string;
  testType: string;
  coverage?: string;
}

interface TestExecutionForm {
  testSuite: string;
  environment?: string;
}

const Testing = () => {
  const { toast } = useToast();
  const [generatedTests, setGeneratedTests] = useState<string>("");
  const [testResults, setTestResults] = useState<string>("");

  const generationForm = useForm<TestGenerationForm>({
    defaultValues: {
      codeInput: "",
      testType: "",
      coverage: "",
    },
  });

  const executionForm = useForm<TestExecutionForm>({
    defaultValues: {
      testSuite: "",
      environment: "development",
    },
  });

  const onGenerateTests = (data: TestGenerationForm) => {
    // Placeholder for AI test generation
    setGeneratedTests(`// Generated test suite
import { describe, it, expect } from 'vitest';

describe('ExampleComponent', () => {
  it('should render correctly', () => {
    // Test implementation
  });

  it('should handle user interactions', () => {
    // Test implementation
  });
});`);
    
    toast({
      title: "Test Generation Started",
      description: "Generating test cases based on your input...",
    });
  };

  const onExecuteTests = (data: TestExecutionForm) => {
    // Placeholder for test execution
    setTestResults(`Test Results:
✅ ExampleComponent > should render correctly
✅ ExampleComponent > should handle user interactions
2 passed, 0 failed`);
    
    toast({
      title: "Test Execution Started",
      description: "Running test suite...",
    });
  };

  return (
    <SidebarProvider>
      <div className="grid lg:grid-cols-[280px_1fr] h-screen">
        <AppSidebar />
        <main className="p-6 overflow-y-auto">
          <div className="max-w-4xl mx-auto space-y-8">
            <div>
              <h1 className="text-3xl font-bold mb-4">Testing</h1>
              <p className="text-gray-600">
                AI-powered test generation and retrieval testing platform
              </p>
            </div>

            <Tabs defaultValue="generate" className="space-y-6">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="generate">Generate Tests</TabsTrigger>
                <TabsTrigger value="execute">Execute Tests</TabsTrigger>
                <TabsTrigger value="retrieval">Retrieval Testing</TabsTrigger>
              </TabsList>

              <TabsContent value="generate">
                <Card>
                  <CardHeader>
                    <CardTitle>Generate Test Cases</CardTitle>
                    <CardDescription>
                      Generate comprehensive test suites using AI-powered analysis
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Form {...generationForm}>
                      <form onSubmit={generationForm.handleSubmit(onGenerateTests)} className="space-y-4">
                        <FormField
                          control={generationForm.control}
                          name="codeInput"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Source Code</FormLabel>
                              <FormControl>
                                <Textarea
                                  placeholder="Paste the code you want to test..."
                                  className="min-h-[200px] font-mono"
                                  {...field}
                                />
                              </FormControl>
                              <FormDescription>
                                Paste the component or function code you want to generate tests for
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={generationForm.control}
                          name="testType"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Test Type</FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="e.g., Unit Test, Integration Test, E2E Test"
                                  {...field}
                                />
                              </FormControl>
                              <FormDescription>
                                Specify the type of tests you want to generate
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={generationForm.control}
                          name="coverage"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Coverage Requirements (Optional)</FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="e.g., 80% coverage"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <Button type="submit">Generate Tests</Button>
                      </form>
                    </Form>

                    {generatedTests && (
                      <div className="mt-6">
                        <h3 className="font-semibold mb-2">Generated Test Suite</h3>
                        <div className="bg-slate-900 text-slate-50 p-4 rounded-lg">
                          <pre className="whitespace-pre-wrap">{generatedTests}</pre>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="execute">
                <Card>
                  <CardHeader>
                    <CardTitle>Execute Test Suite</CardTitle>
                    <CardDescription>
                      Run your test suite and view detailed results
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Form {...executionForm}>
                      <form onSubmit={executionForm.handleSubmit(onExecuteTests)} className="space-y-4">
                        <FormField
                          control={executionForm.control}
                          name="testSuite"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Test Suite</FormLabel>
                              <FormControl>
                                <Textarea
                                  placeholder="Paste your test suite here..."
                                  className="min-h-[200px] font-mono"
                                  {...field}
                                />
                              </FormControl>
                              <FormDescription>
                                Paste the test suite you want to execute
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={executionForm.control}
                          name="environment"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Test Environment</FormLabel>
                              <FormControl>
                                <Input 
                                  placeholder="e.g., development, staging, production"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <Button type="submit">Run Tests</Button>
                      </form>
                    </Form>

                    {testResults && (
                      <div className="mt-6">
                        <h3 className="font-semibold mb-2">Test Results</h3>
                        <div className="bg-slate-900 text-slate-50 p-4 rounded-lg">
                          <pre className="whitespace-pre-wrap">{testResults}</pre>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="retrieval">
                <RetrievalTesting />
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Testing;
