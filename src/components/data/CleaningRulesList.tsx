
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Shield } from "lucide-react";

interface CleaningRule {
  name: string;
  status: string;
}

export const CleaningRulesList = () => {
  const cleaningRules: CleaningRule[] = [
    { name: 'Remove Duplicates', status: 'active' },
    { name: 'Handle Missing Values', status: 'completed' },
    { name: 'Standardize Format', status: 'pending' }
  ];

  return (
    <div className="space-y-4">
      {cleaningRules.map((rule, index) => (
        <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
          <div className="flex items-center">
            <Shield className="h-5 w-5 mr-2 text-blue-500" />
            <div>
              <p className="font-medium">{rule.name}</p>
              <p className="text-sm text-gray-500">Applied to all data sources</p>
            </div>
          </div>
          <Badge variant={
            rule.status === 'active' ? 'default' :
            rule.status === 'completed' ? 'success' : 'secondary'
          }>{rule.status}</Badge>
        </div>
      ))}
    </div>
  );
};
