
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { useToast } from "@/hooks/use-toast";

interface GenerateCodeFormProps {
  onCodeGenerated: (code: string) => void;
}

interface CodeGenerationForm {
  description: string;
  context?: string;
}

export const GenerateCodeForm = ({ onCodeGenerated }: GenerateCodeFormProps) => {
  const { toast } = useToast();
  
  const form = useForm<CodeGenerationForm>({
    defaultValues: {
      description: "",
      context: "",
    },
  });

  const onSubmit = (data: CodeGenerationForm) => {
    const generatedCode = "// Generated code will appear here\nfunction example() {\n  console.log('Hello World');\n}";
    onCodeGenerated(generatedCode);
    toast({
      title: "Code Generation Started",
      description: "Processing your request. Generated code will appear below.",
    });
  };

  return (
    <Card className="bg-gray-900 border-gray-800">
      <CardHeader className="space-y-1">
        <CardTitle className="text-xl md:text-2xl text-white">Generate New Code</CardTitle>
        <CardDescription className="text-gray-400">
          Describe the functionality you want to implement, and our AI will generate the code for you.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 md:space-y-6">
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm md:text-base text-gray-200">Functionality Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Describe what you want the code to do... (e.g., Create a function that sorts an array of objects by a specific property)"
                      className="min-h-[100px] md:min-h-[120px] text-sm md:text-base bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
                      {...field}
                    />
                  </FormControl>
                  <FormDescription className="text-xs md:text-sm text-gray-400">
                    Be specific about the desired functionality, inputs, and outputs.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="context"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm md:text-base text-gray-200">Additional Context (Optional)</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Provide any additional context or requirements... (e.g., specific libraries to use, performance considerations)"
                      className="min-h-[80px] md:min-h-[100px] text-sm md:text-base bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700">Generate Code</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
