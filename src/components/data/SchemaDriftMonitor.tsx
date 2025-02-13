
import React from 'react';
import { AlertCircle, CheckCircle } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface SchemaCheck {
  tableName: string;
  status: 'stable' | 'drift_detected' | 'warning';
  lastChecked: string;
  changes?: string[];
}

export const SchemaDriftMonitor = () => {
  const schemaChecks: SchemaCheck[] = [
    {
      tableName: 'customers',
      status: 'stable',
      lastChecked: '2024-03-15 14:30',
    },
    {
      tableName: 'transactions',
      status: 'drift_detected',
      lastChecked: '2024-03-15 14:25',
      changes: ['New column added: tax_code', 'Data type changed: amount']
    }
  ];

  return (
    <div className="space-y-4">
      {schemaChecks.map((check, index) => (
        <Card key={index} className="p-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                {check.status === 'stable' ? (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                ) : (
                  <AlertCircle className="h-5 w-5 text-red-500" />
                )}
                <div>
                  <h3 className="font-medium">{check.tableName}</h3>
                  <p className="text-sm text-gray-500">Last checked: {check.lastChecked}</p>
                </div>
              </div>
              <Badge variant={check.status === 'stable' ? 'success' : 'destructive'}>
                {check.status === 'stable' ? 'Stable' : 'Drift Detected'}
              </Badge>
            </div>
            {check.changes && check.changes.length > 0 && (
              <div className="bg-red-50 p-3 rounded-md">
                <p className="text-sm font-medium text-red-800 mb-1">Changes detected:</p>
                <ul className="text-sm text-red-700 list-disc list-inside">
                  {check.changes.map((change, changeIndex) => (
                    <li key={changeIndex}>{change}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </Card>
      ))}
    </div>
  );
};
