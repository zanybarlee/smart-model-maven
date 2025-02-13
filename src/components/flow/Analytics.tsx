
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart2, Users } from "lucide-react";

export const Analytics = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <BarChart2 className="h-5 w-5" />
            <CardTitle>Performance Metrics</CardTitle>
          </div>
          <CardDescription>Key performance indicators and trends</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              {['Deployment Frequency', 'Change Failure Rate', 'MTTR'].map((metric) => (
                <div key={metric} className="flex items-center justify-between p-4 border rounded-lg">
                  <span>{metric}</span>
                  <span className="text-sm text-green-600">↑ Improving</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            <CardTitle>Team Collaboration</CardTitle>
          </div>
          <CardDescription>Cross-functional team metrics</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="space-y-2">
              {['Code Review Time', 'Handover Efficiency', 'Team Velocity'].map((metric) => (
                <div key={metric} className="flex items-center justify-between p-4 border rounded-lg">
                  <span>{metric}</span>
                  <span className="text-sm text-blue-600">On Track</span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
