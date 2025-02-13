
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Wand2 } from "lucide-react";

interface Feature {
  name: string;
  status: string;
}

export const FeaturesList = () => {
  const features: Feature[] = [
    { name: 'Feature Extraction', status: 'completed' },
    { name: 'Dimensionality Reduction', status: 'in_progress' },
    { name: 'Feature Selection', status: 'pending' }
  ];

  return (
    <div className="space-y-4">
      {features.map((feature, index) => (
        <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
          <div className="flex items-center">
            <Wand2 className="h-5 w-5 mr-2 text-blue-500" />
            <div>
              <p className="font-medium">{feature.name}</p>
              <p className="text-sm text-gray-500">Automated feature generation</p>
            </div>
          </div>
          <Badge variant={
            feature.status === 'completed' ? 'success' :
            feature.status === 'in_progress' ? 'default' : 'secondary'
          }>{feature.status}</Badge>
        </div>
      ))}
    </div>
  );
};
