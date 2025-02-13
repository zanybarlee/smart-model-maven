
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { Clock, User, Database, Activity } from "lucide-react";
import { Card } from "@/components/ui/card";

interface AuditLog {
  user: string;
  action: string;
  resource: string;
  timestamp: string;
  ipAddress: string;
}

export const AccessAuditLog = () => {
  const logs: AuditLog[] = [
    {
      user: 'john.doe@example.com',
      action: 'view',
      resource: 'customer_data',
      timestamp: '2024-03-15 14:30',
      ipAddress: '192.168.1.100'
    },
    {
      user: 'jane.smith@example.com',
      action: 'export',
      resource: 'sales_report',
      timestamp: '2024-03-15 13:45',
      ipAddress: '192.168.1.101'
    }
  ];

  const getActionBadgeVariant = (action: string) => {
    switch (action) {
      case 'view':
        return 'secondary';
      case 'edit':
        return 'warning';
      case 'delete':
        return 'destructive';
      case 'export':
        return 'default';
      default:
        return 'outline';
    }
  };

  return (
    <div className="space-y-4">
      {logs.map((log, index) => (
        <Card key={index} className="p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-3">
              <Activity className="h-5 w-5 text-blue-500" />
              <div>
                <div className="flex items-center space-x-2">
                  <h3 className="font-medium">{log.resource}</h3>
                  <Badge 
                    variant={getActionBadgeVariant(log.action)}
                    className="capitalize"
                  >
                    {log.action}
                  </Badge>
                </div>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <div className="flex items-center">
              <User className="h-4 w-4 mr-1" />
              {log.user}
            </div>
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              {log.timestamp}
            </div>
            <div className="flex items-center">
              <Database className="h-4 w-4 mr-1" />
              {log.ipAddress}
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};
