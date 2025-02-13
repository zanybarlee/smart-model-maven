
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, AlertCircle, Workflow } from "lucide-react";

export const Automation = () => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Workflow className="h-5 w-5" />
          <CardTitle>Pipeline Status</CardTitle>
        </div>
        <CardDescription>CI/CD and automation overview</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between p-4 bg-green-50 text-green-700 rounded-lg">
              <div className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                <span>Production Pipeline</span>
              </div>
              <span className="text-sm">Healthy</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-yellow-50 text-yellow-700 rounded-lg">
              <div className="flex items-center gap-2">
                <AlertCircle className="h-5 w-5" />
                <span>Staging Pipeline</span>
              </div>
              <span className="text-sm">Warning</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
