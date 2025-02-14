
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search } from "lucide-react";
import { createNodeConfig } from '../types/flow-types';

interface FlowSidebarProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onAddNode: (type: string) => void;
}

export const FlowSidebar = ({ searchQuery, onSearchChange, onAddNode }: FlowSidebarProps) => {
  const nodeTypes = {
    dataIngestion: { data: createNodeConfig('dataIngestion', 'Data Ingestion') },
    dataCleaning: { data: createNodeConfig('dataCleaning', 'Data Cleaning') },
    dataQuality: { data: createNodeConfig('dataQuality', 'Data Quality') },
    dataLabeling: { data: createNodeConfig('dataLabeling', 'Data Labeling') },
    featureEngineering: { data: createNodeConfig('featureEngineering', 'Feature Engineering') },
  };

  const filteredNodeTypes = Object.entries(nodeTypes)
    .filter(([key]) => key.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <div className="w-64 border-r pr-4 overflow-auto">
      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search components..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-8"
          />
        </div>
        <div className="space-y-2">
          {filteredNodeTypes.map(([key, value]) => (
            <Button
              key={key}
              variant="outline"
              className="w-full justify-start"
              onClick={() => onAddNode(key)}
            >
              <Plus className="mr-2 h-4 w-4" />
              {value.data.label}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};
