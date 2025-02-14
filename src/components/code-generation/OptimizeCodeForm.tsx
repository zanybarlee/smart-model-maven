
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
    <Card className="bg-gray-900 border-gray-800">
      <CardHeader className="space-y-1">
        <CardTitle className="text-xl md:text-2xl text-white">Optimize Existing Code</CardTitle>
        <CardDescription className="text-gray-400">
          Paste your existing code, and our AI will suggest optimizations for better performance and readability.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 md:space-y-6">
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm md:text-base text-gray-200">Code to Optimize</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Paste your code here..."
                      className="min-h-[200px] md:min-h-[240px] font-mono text-sm md:text-base bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription className="text-xs md:text-sm text-gray-400">
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
                  <FormLabel className="text-sm md:text-base text-gray-200">Optimization Requirements (Optional)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Specify any particular optimization goals... (e.g., improve performance, reduce memory usage)"
                      className="min-h-[100px] md:min-h-[120px] text-sm md:text-base bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700">Optimize Code</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
