
import { AppSidebar } from "@/components/AppSidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Check, Play, Rocket, Settings2 } from "lucide-react";

interface DeploymentConfigForm {
  name: string;
  environment: string;
  region: string;
  resources: string;
}

interface PipelineConfigForm {
  name: string;
  trigger: string;
  steps: string;
}

const Deployment = () => {
  const { toast } = useToast();
  const [isDeploying, setIsDeploying] = useState(false);
  const [deploymentStatus, setDeploymentStatus] = useState<string>("");

  const deploymentForm = useForm<DeploymentConfigForm>({
    defaultValues: {
      name: "",
      environment: "",
      region: "",
      resources: "",
    },
  });

  const pipelineForm = useForm<PipelineConfigForm>({
    defaultValues: {
      name: "",
      trigger: "",
      steps: "",
    },
  });

  const onDeploymentSubmit = (data: DeploymentConfigForm) => {
    setIsDeploying(true);
    // Simulated deployment process
    setTimeout(() => {
      setDeploymentStatus("Deployment successful!");
      setIsDeploying(false);
      toast({
        title: "Deployment Completed",
        description: "Your application has been deployed successfully.",
      });
    }, 2000);
  };

  const onPipelineSubmit = (data: PipelineConfigForm) => {
    toast({
      title: "Pipeline Created",
      description: "CI/CD pipeline has been configured successfully.",
    });
  };

  return (
    <SidebarProvider>
      <div className="grid lg:grid-cols-[280px_1fr] h-screen">
        <AppSidebar />
        <main className="p-6 overflow-y-auto">
          <div className="max-w-4xl mx-auto space-y-8">
            <div>
              <h1 className="text-3xl font-bold mb-4">Deployment</h1>
              <p className="text-gray-600">
                Manage your deployment configurations and CI/CD pipelines
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Rocket className="h-5 w-5" />
                    <CardTitle>Quick Deploy</CardTitle>
                  </div>
                  <CardDescription>
                    Deploy your application to production with one click
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Button 
                    className="w-full"
                    disabled={isDeploying}
                    onClick={() => onDeploymentSubmit(deploymentForm.getValues())}
                  >
                    {isDeploying ? "Deploying..." : "Deploy to Production"}
                  </Button>
                  {deploymentStatus && (
                    <div className="mt-4 p-4 bg-green-50 text-green-700 rounded-lg flex items-center gap-2">
                      <Check className="h-4 w-4" />
                      {deploymentStatus}
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Play className="h-5 w-5" />
                    <CardTitle>Latest Deployments</CardTitle>
                  </div>
                  <CardDescription>
                    Monitor your recent deployments
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                      <div>
                        <p className="font-medium">Production</p>
                        <p className="text-sm text-gray-500">5 minutes ago</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="h-2 w-2 bg-green-500 rounded-full"></span>
                        <span className="text-sm text-gray-600">Successful</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-slate-50 rounded-lg">
                      <div>
                        <p className="font-medium">Staging</p>
                        <p className="text-sm text-gray-500">1 hour ago</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="h-2 w-2 bg-green-500 rounded-full"></span>
                        <span className="text-sm text-gray-600">Successful</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Tabs defaultValue="deployment" className="space-y-6">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="deployment">Deployment Configuration</TabsTrigger>
                <TabsTrigger value="pipeline">Pipeline Configuration</TabsTrigger>
              </TabsList>

              <TabsContent value="deployment">
                <Card>
                  <CardHeader>
                    <div className="flex items-center gap-2">
                      <Settings2 className="h-5 w-5" />
                      <CardTitle>Deployment Configuration</CardTitle>
                    </div>
                    <CardDescription>
                      Configure your deployment settings and resources
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Form {...deploymentForm}>
                      <form onSubmit={deploymentForm.handleSubmit(onDeploymentSubmit)} className="space-y-4">
                        <FormField
                          control={deploymentForm.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Deployment Name</FormLabel>
                              <FormControl>
                                <Input placeholder="e.g., production-v1" {...field} />
                              </FormControl>
                              <FormDescription>
                                A unique name for this deployment configuration
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={deploymentForm.control}
                          name="environment"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Environment</FormLabel>
                              <FormControl>
                                <Input placeholder="e.g., production, staging, development" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={deploymentForm.control}
                          name="region"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Region</FormLabel>
                              <FormControl>
                                <Input placeholder="e.g., us-east-1" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={deploymentForm.control}
                          name="resources"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Resources Configuration</FormLabel>
                              <FormControl>
                                <Textarea 
                                  placeholder="Specify resource requirements..."
                                  className="min-h-[100px]"
                                  {...field}
                                />
                              </FormControl>
                              <FormDescription>
                                Define compute, memory, and other resource requirements
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <Button type="submit">Save Configuration</Button>
                      </form>
                    </Form>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="pipeline">
                <Card>
                  <CardHeader>
                    <CardTitle>Pipeline Configuration</CardTitle>
                    <CardDescription>
                      Set up your CI/CD pipeline steps and triggers
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Form {...pipelineForm}>
                      <form onSubmit={pipelineForm.handleSubmit(onPipelineSubmit)} className="space-y-4">
                        <FormField
                          control={pipelineForm.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Pipeline Name</FormLabel>
                              <FormControl>
                                <Input placeholder="e.g., main-pipeline" {...field} />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={pipelineForm.control}
                          name="trigger"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Trigger</FormLabel>
                              <FormControl>
                                <Input placeholder="e.g., on push to main branch" {...field} />
                              </FormControl>
                              <FormDescription>
                                When should this pipeline run?
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={pipelineForm.control}
                          name="steps"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Pipeline Steps</FormLabel>
                              <FormControl>
                                <Textarea
                                  placeholder="Define your pipeline steps..."
                                  className="min-h-[200px]"
                                  {...field}
                                />
                              </FormControl>
                              <FormDescription>
                                Define the steps in your CI/CD pipeline
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <Button type="submit">Create Pipeline</Button>
                      </form>
                    </Form>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
};

export default Deployment;
