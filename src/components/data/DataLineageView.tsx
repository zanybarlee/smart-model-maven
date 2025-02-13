
import React from 'react';
import { GitBranch, ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";

interface LineageNode {
  name: string;
  type: string;
  level: number;
}

export const DataLineageView = () => {
  const lineageNodes: LineageNode[] = [
    { name: 'Raw Data Input', type: 'source', level: 0 },
    { name: 'Data Cleaning', type: 'transformation', level: 1 },
    { name: 'Feature Engineering', type: 'transformation', level: 2 },
    { name: 'Final Dataset', type: 'output', level: 3 }
  ];

  return (
    <div className="space-y-2">
      {lineageNodes.map((node, index) => (
        <div key={index} className="relative">
          <Card className={`p-4 ${index < lineageNodes.length - 1 ? 'mb-8' : ''}`}>
            <div className="flex items-center space-x-3">
              <GitBranch className="h-5 w-5 text-blue-500" />
              <div>
                <h3 className="font-medium">{node.name}</h3>
                <p className="text-sm text-gray-500">{node.type}</p>
              </div>
            </div>
          </Card>
          {index < lineageNodes.length - 1 && (
            <div className="absolute left-6 -bottom-6 text-gray-400">
              <ArrowRight className="h-4 w-4 rotate-90" />
            </div>
          )}
        </div>
      ))}
    </div>
  );
};
