
import React from 'react';
import { Badge } from "@/components/ui/badge";
import { FileCheck, AlertCircle } from "lucide-react";
import { Card } from "@/components/ui/card";

interface DataContract {
  name: string;
  status: string;
  nullThreshold: number;
  lastValidated: string;
}

export const DataContractsList = () => {
  const contracts: DataContract[] = [
    { 
      name: 'Customer Schema',
      status: 'valid',
      nullThreshold: 0.05,
      lastValidated: '2024-03-15'
    },
    { 
      name: 'Transaction Data',
      status: 'warning',
      nullThreshold: 0.1,
      lastValidated: '2024-03-14'
    }
  ];

  return (
    <div className="space-y-4">
      {contracts.map((contract, index) => (
        <Card key={index} className="p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <FileCheck className={`h-5 w-5 ${contract.status === 'valid' ? 'text-green-500' : 'text-yellow-500'}`} />
              <div>
                <h3 className="font-medium">{contract.name}</h3>
                <p className="text-sm text-gray-500">
                  Null threshold: {contract.nullThreshold * 100}%
                </p>
              </div>
            </div>
            <Badge variant={contract.status === 'valid' ? 'success' : 'warning'}>
              {contract.status}
            </Badge>
          </div>
        </Card>
      ))}
    </div>
  );
};
