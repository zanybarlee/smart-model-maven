
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { GitFork, Activity, History } from "lucide-react";
import { Card } from "@/components/ui/card";

interface PipelineConfig {
  name: string;
  toolType: string;
  status: string;
  lastRun: string;
  validationStatus: string;
}

export const PipelineConfigList = () => {
  const pipelines: PipelineConfig[] = [
    {
      name: 'Data Validation Pipeline',
      toolType: 'github_actions',
      status: 'active',
      lastRun: '2024-03-15 10:30',
      validationStatus: 'passed'
    },
    {
      name: 'Feature Engineering Pipeline',
      toolType: 'gitlab_ci',
      status: 'active',
      lastRun: '2024-03-15 09:45',
      validationStatus: 'warning'
    }
  ];

  const getToolTypeIcon = (toolType: string) => {
    switch (toolType) {
      case 'github_actions':
        return <GitFork className="h-5 w-5 text-purple-500" />;
      case 'gitlab_ci':
        return <GitFork className="h-5 w-5 text-orange-500" />;
      default:
        return <Activity className="h-5 w-5 text-blue-500" />;
    }
  };

  return (
    <div className="space-y-4">
      {pipelines.map((pipeline, index) => (
        <Card key={index} className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {getToolTypeIcon(pipeline.toolType)}
              <div>
                <h3 className="font-medium">{pipeline.name}</h3>
                <p className="text-sm text-gray-500">
                  Tool: {pipeline.toolType.replace('_', ' ').toUpperCase()}
                </p>
              </div>
            </div>
            <Badge 
              variant={pipeline.validationStatus === 'passed' ? 'success' : 'warning'}
              className="capitalize"
            >
              {pipeline.validationStatus}
            </Badge>
          </div>
          <div className="mt-4 flex items-center text-sm text-gray-500">
            <History className="h-4 w-4 mr-1" />
            Last run: {pipeline.lastRun}
          </div>
        </Card>
      ))}
    </div>
  );
};
