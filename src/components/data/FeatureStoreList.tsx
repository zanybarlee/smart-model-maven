
import React from 'react';
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Database, Clock, FileJson } from "lucide-react";

interface Feature {
  name: string;
  type: string;
  version: string;
  lastUpdated: string;
  status: 'active' | 'deprecated' | 'validating';
}

export const FeatureStoreList = () => {
  const features: Feature[] = [
    {
      name: 'document_embeddings',
      type: 'vector',
      version: '1.0.0',
      lastUpdated: '2024-03-15',
      status: 'active'
    },
    {
      name: 'semantic_features',
      type: 'tensor',
      version: '2.0.0',
      lastUpdated: '2024-03-14',
      status: 'active'
    }
  ];

  return (
    <div className="space-y-4">
      {features.map((feature, index) => (
        <Card key={index} className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Database className="h-5 w-5 text-blue-500" />
              <div>
                <h3 className="font-medium">{feature.name}</h3>
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <FileJson className="h-4 w-4" />
                  <span>{feature.type}</span>
                </div>
              </div>
            </div>
            <Badge variant={feature.status === 'active' ? 'success' : 'secondary'}>
              {feature.status}
            </Badge>
          </div>
          <div className="mt-4 flex items-center space-x-2 text-sm text-gray-500">
            <Clock className="h-4 w-4" />
            <span>Last updated: {feature.lastUpdated}</span>
            <Badge variant="outline">v{feature.version}</Badge>
          </div>
        </Card>
      ))}
    </div>
  );
};
