
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
    <Card>
      <CardHeader>
        <CardTitle>Generate New Code</CardTitle>
        <CardDescription>
          Describe the functionality you want to implement, and our AI will generate the code for you.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
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
              control={form.control}
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
      </CardContent>
    </Card>
  );
};
