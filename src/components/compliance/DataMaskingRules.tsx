
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { EyeOff, Database, Table2 } from "lucide-react";
import { Card } from "@/components/ui/card";

interface MaskingRule {
  tableName: string;
  columnName: string;
  maskingType: string;
  isActive: boolean;
}

export const DataMaskingRules = () => {
  const rules: MaskingRule[] = [
    {
      tableName: 'users',
      columnName: 'email',
      maskingType: 'partial',
      isActive: true
    },
    {
      tableName: 'transactions',
      columnName: 'credit_card',
      maskingType: 'full',
      isActive: true
    }
  ];

  const getMaskingTypeColor = (type: string) => {
    switch (type) {
      case 'full':
        return 'text-red-500';
      case 'partial':
        return 'text-yellow-500';
      case 'hash':
        return 'text-blue-500';
      default:
        return 'text-gray-500';
    }
  };

  return (
    <div className="space-y-4">
      {rules.map((rule, index) => (
        <Card key={index} className="p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-3">
              <EyeOff className={`h-5 w-5 ${getMaskingTypeColor(rule.maskingType)}`} />
              <div>
                <div className="flex items-center space-x-2">
                  <h3 className="font-medium">{rule.columnName}</h3>
                  <Badge variant={rule.isActive ? 'success' : 'secondary'} className="text-xs">
                    {rule.isActive ? 'Active' : 'Inactive'}
                  </Badge>
                </div>
                <p className="text-sm text-gray-500">Type: {rule.maskingType}</p>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <div className="flex items-center">
              <Database className="h-4 w-4 mr-1" />
              {rule.tableName}
            </div>
            <div className="flex items-center">
              <Table2 className="h-4 w-4 mr-1" />
              {rule.columnName}
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
};
