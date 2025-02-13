
import React from 'react';
import { useForm } from "react-hook-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Settings2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface GeneralSettingsFormData {
  appName: string;
  language: string;
  darkMode: boolean;
}

export const GeneralSettingsForm = () => {
  const { toast } = useToast();
  const form = useForm<GeneralSettingsFormData>({
    defaultValues: {
      appName: "Domain Modeler",
      language: "English",
      darkMode: false,
    },
  });

  const onSubmit = (data: GeneralSettingsFormData) => {
    toast({
      title: "General Settings Updated",
      description: "Your preferences have been saved successfully.",
    });
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Settings2 className="h-5 w-5" />
          <CardTitle>General Settings</CardTitle>
        </div>
        <CardDescription>
          Configure basic application settings and preferences
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="appName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Application Name</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="language"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Language</FormLabel>
                  <FormControl>
                    <Input {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="darkMode"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Dark Mode</FormLabel>
                    <CardDescription>
                      Enable dark mode for better visibility in low light
                    </CardDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button type="submit">Save General Settings</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
