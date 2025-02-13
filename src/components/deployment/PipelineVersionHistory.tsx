
import React from 'react';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GitCommit, Clock, User } from "lucide-react";

interface PipelineVersion {
  versionNumber: number;
  changesDescription: string;
  createdAt: string;
  createdBy: string;
  isActive: boolean;
}

export const PipelineVersionHistory = () => {
  const versions: PipelineVersion[] = [
    {
      versionNumber: 3,
      changesDescription: 'Added new data validation steps',
      createdAt: '2024-03-15 14:30',
      createdBy: 'Sarah Johnson',
      isActive: true
    },
    {
      versionNumber: 2,
      changesDescription: 'Updated transformation logic',
      createdAt: '2024-03-14 11:20',
      createdBy: 'Mike Smith',
      isActive: false
    }
  ];

  return (
    <div className="space-y-4">
      {versions.map((version, index) => (
        <Card key={index} className="p-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <GitCommit className="h-5 w-5 text-blue-500" />
                <div>
                  <div className="flex items-center space-x-2">
                    <h3 className="font-medium">Version {version.versionNumber}</h3>
                    {version.isActive && (
                      <Badge variant="success" className="text-xs">
                        Current
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-gray-500">{version.changesDescription}</p>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4 text-sm text-gray-500">
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                {version.createdAt}
              </div>
              <div className="flex items-center">
                <User className="h-4 w-4 mr-1" />
                {version.createdBy}
              </div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};
