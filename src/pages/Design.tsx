
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
import { ValueStream } from "@/components/flow/ValueStream";
import { KanbanBoard } from "@/components/flow/KanbanBoard";
import { FullScreenDialog } from "@/components/flow/components/FullScreenDialog";

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
  const [isValueStreamDetached, setIsValueStreamDetached] = useState(false);

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
      <div className="min-h-screen flex w-full">
        <AppSidebar />
        <main className="flex-1 overflow-auto bg-slate-50">
          <div className="p-6">
            <div className="max-w-[1800px] mx-auto space-y-6">
              <div>
                <h1 className="text-3xl font-bold mb-2">Design & Planning</h1>
                <p className="text-gray-600">
                  AI-assisted requirements gathering and architecture planning
                </p>
              </div>
              
              <Tabs defaultValue="value-stream" className="space-y-6">
                <TabsList>
                  <TabsTrigger value="value-stream">Value Stream</TabsTrigger>
                  <TabsTrigger value="kanban">Kanban Board</TabsTrigger>
                  <TabsTrigger value="requirements">Requirements</TabsTrigger>
                  <TabsTrigger value="architecture">Architecture</TabsTrigger>
                </TabsList>

                <TabsContent value="value-stream">
                  <ValueStream onDetach={() => setIsValueStreamDetached(true)} />
                </TabsContent>

                <TabsContent value="kanban">
                  <KanbanBoard />
                </TabsContent>

                <TabsContent value="requirements">
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
                </TabsContent>

                <TabsContent value="architecture">
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
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </main>
      </div>

      <FullScreenDialog
        isOpen={isValueStreamDetached}
        onClose={() => setIsValueStreamDetached(false)}
        title="Value Stream Map"
      >
        <div className="h-full">
          <ValueStream />
        </div>
      </FullScreenDialog>
    </SidebarProvider>
  );
};

export default Design;
