
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, Settings } from "lucide-react";

export const ContinuousImprovement = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Brain className="h-5 w-5" />
            <CardTitle>Kaizen Initiatives</CardTitle>
          </div>
          <CardDescription>Active improvement initiatives</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 border rounded-lg">
              <h3 className="font-medium">Code Review Optimization</h3>
              <p className="text-sm text-gray-600">Reducing review cycle time</p>
              <div className="mt-2 flex items-center gap-2">
                <div className="h-2 flex-1 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full w-3/4 bg-blue-500 rounded-full" />
                </div>
                <span className="text-sm">75%</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Settings className="h-5 w-5" />
            <CardTitle>PDCA Cycles</CardTitle>
          </div>
          <CardDescription>Plan-Do-Check-Act tracking</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="p-4 border rounded-lg">
              <h3 className="font-medium">Deployment Process</h3>
              <p className="text-sm text-gray-600">Currently in "Check" phase</p>
              <div className="mt-2 grid grid-cols-4 gap-1">
                {['Plan', 'Do', 'Check', 'Act'].map((phase, i) => (
                  <div
                    key={phase}
                    className={`text-center p-2 rounded ${
                      i <= 2 ? 'bg-blue-100 text-blue-700' : 'bg-gray-100'
                    }`}
                  >
                    {phase}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
