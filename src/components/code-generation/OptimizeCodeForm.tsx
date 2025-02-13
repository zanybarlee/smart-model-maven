
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";

interface OptimizeCodeFormProps {
  onCodeOptimized: (code: string) => void;
}

interface OptimizationForm {
  code: string;
  requirements?: string;
}

export const OptimizeCodeForm = ({ onCodeOptimized }: OptimizeCodeFormProps) => {
  const { toast } = useToast();
  
  const form = useForm<OptimizationForm>({
    defaultValues: {
      code: "",
      requirements: "",
    },
  });

  const onSubmit = (data: OptimizationForm) => {
    const optimizedCode = "// Optimized code will appear here\nfunction optimizedExample() {\n  // Optimized implementation\n}";
    onCodeOptimized(optimizedCode);
    toast({
      title: "Code Optimization Started",
      description: "Analyzing and optimizing your code...",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Optimize Existing Code</CardTitle>
        <CardDescription>
          Paste your existing code, and our AI will suggest optimizations for better performance and readability.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
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
              control={form.control}
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
      </CardContent>
    </Card>
  );
};
