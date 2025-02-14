
import React from 'react';
import { CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus, Search } from "lucide-react";
import { KanbanBoard } from '../types/kanban-types';

interface BoardHeaderProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
  onAddColumn: () => void;
}

export const BoardHeader: React.FC<BoardHeaderProps> = ({
  searchQuery,
  onSearchChange,
  onAddColumn,
}) => {
  return (
    <CardHeader className="flex flex-row items-center justify-between">
      <div>
        <CardTitle>Kanban Board</CardTitle>
        <CardDescription>
          Visualize and manage work items across different stages
        </CardDescription>
      </div>
      <div className="flex items-center gap-2">
        <div className="relative">
          <Search className="h-4 w-4 absolute left-3 top-3 text-gray-400" />
          <Input
            placeholder="Search cards..."
            className="pl-9"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
        <Button 
          onClick={onAddColumn}
          variant="outline" 
          size="sm"
        >
          <Plus className="h-4 w-4 mr-2" />
          Add Column
        </Button>
      </div>
    </CardHeader>
  );
};
