
import React from 'react';
import { Badge } from "@/components/ui/badge";

interface DataSource {
  name: string;
  type: string;
  status: string;
}

export const DataSourceList = () => {
  const dataSources: DataSource[] = [
    { name: 'Customer Dataset', type: 'CSV', status: 'active' },
    { name: 'Product Catalog', type: 'JSON', status: 'processing' },
    { name: 'Sales Transactions', type: 'Database', status: 'completed' }
  ];

  return (
    <div className="space-y-4">
      {dataSources.map((source, index) => (
        <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
          <div>
            <p className="font-medium">{source.name}</p>
            <p className="text-sm text-gray-500">{source.type}</p>
          </div>
          <Badge>{source.status}</Badge>
        </div>
      ))}
    </div>
  );
};
