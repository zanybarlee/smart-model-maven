
import { AppSidebar } from "@/components/AppSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";

interface RequirementsForm {
  requirements: string;
}

interface ArchitectureForm {
  context: string;
}

const Design = () => {
  const { toast } = useToast();
  const [requirements, setRequirements] = useState<string>("");
  const [architecture, setArchitecture] = useState<string>("");

  const requirementsForm = useForm<RequirementsForm>({
    defaultValues: {
      requirements: "",
    },
  });

  const architectureForm = useForm<ArchitectureForm>({
    defaultValues: {
      context: "",
    },
  });

  const onRequirementsSubmit = (data: RequirementsForm) => {
    setRequirements(data.requirements);
    toast({
      title: "Requirements Submitted",
      description: "Your requirements have been processed. Check the analysis below.",
    });
  };

  const onArchitectureSubmit = (data: ArchitectureForm) => {
    setArchitecture(data.context);
    toast({
      title: "Architecture Analysis Requested",
      description: "Processing your architecture requirements...",
    });
  };

  return (
    <SidebarProvider>
      <div className="grid lg:grid-cols-[280px_1fr] h-screen">
        <AppSidebar />
        <main className="p-6 overflow-y-auto">
          <div className="max-w-4xl mx-auto space-y-8">
            <div>
              <h1 className="text-3xl font-bold mb-4">Design & Planning</h1>
              <p className="text-gray-600">
                AI-assisted requirements gathering and architecture planning
              </p>
            </div>
            
            <div className="grid gap-8">
              {/* Requirements Gathering Section */}
              <section>
                <Card>
                  <CardHeader>
                    <CardTitle>Requirements Gathering</CardTitle>
                    <CardDescription>
                      Describe your project requirements in natural language, and our AI will help analyze and structure them.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Form {...requirementsForm}>
                      <form onSubmit={requirementsForm.handleSubmit(onRequirementsSubmit)} className="space-y-4">
                        <FormField
                          control={requirementsForm.control}
                          name="requirements"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Project Requirements</FormLabel>
                              <FormControl>
                                <Textarea
                                  placeholder="Describe your project requirements... (e.g., I need a web application that allows users to...)"
                                  className="min-h-[150px]"
                                  {...field}
                                />
                              </FormControl>
                              <FormDescription>
                                Be as specific as possible about your project's goals and features.
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <Button type="submit">Analyze Requirements</Button>
                      </form>
                    </Form>

                    {requirements && (
                      <div className="mt-6 p-4 bg-slate-50 rounded-lg">
                        <h3 className="font-semibold mb-2">Analysis Results</h3>
                        <p className="text-sm text-slate-600 whitespace-pre-wrap">{requirements}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </section>

              {/* Architecture Recommendations Section */}
              <section>
                <Card>
                  <CardHeader>
                    <CardTitle>Architecture Recommendations</CardTitle>
                    <CardDescription>
                      Get AI-powered suggestions for technology stacks and design patterns based on your requirements.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Form {...architectureForm}>
                      <form onSubmit={architectureForm.handleSubmit(onArchitectureSubmit)} className="space-y-4">
                        <FormField
                          control={architectureForm.control}
                          name="context"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Project Context</FormLabel>
                              <FormControl>
                                <Textarea
                                  placeholder="Provide additional context about your project's technical needs... (e.g., scalability requirements, performance constraints)"
                                  className="min-h-[150px]"
                                  {...field}
                                />
                              </FormControl>
                              <FormDescription>
                                Include any specific technical requirements or constraints.
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <Button type="submit">Get Recommendations</Button>
                      </form>
                    </Form>

                    {architecture && (
                      <div className="mt-6 p-4 bg-slate-50 rounded-lg">
                        <h3 className="font-semibold mb-2">Architecture Recommendations</h3>
                        <p className="text-sm text-slate-600 whitespace-pre-wrap">{architecture}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </section>
            </div>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Design;
