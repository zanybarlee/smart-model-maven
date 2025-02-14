
import React from 'react';
import { Users, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { KanbanCard as KanbanCardType, priorityColors } from '../types/kanban-types';

interface KanbanCardProps extends KanbanCardType {
  onCommentClick: () => void;
}

export const KanbanCard = ({ 
  title, 
  description, 
  priority, 
  assignees, 
  labels, 
  comments = [], 
  onCommentClick 
}: KanbanCardProps) => {
  return (
    <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-200">
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-medium">{title}</h3>
        <span className={`text-xs px-2 py-1 rounded-full ${priorityColors[priority]}`}>
          {priority}
        </span>
      </div>
      <p className="text-gray-600 text-sm mb-2">{description}</p>
      {labels.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-2">
          {labels.map(label => (
            <Badge 
              key={label.id}
              style={{ backgroundColor: label.color }}
              className="text-white text-xs"
            >
              {label.name}
            </Badge>
          ))}
        </div>
      )}
      <div className="flex items-center justify-between">
        {assignees?.length > 0 && (
          <div className="flex items-center gap-1 text-sm text-gray-500">
            <Users className="h-4 w-4" />
            <span>{assignees.join(', ')}</span>
          </div>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={onCommentClick}
        >
          <MessageSquare className="h-4 w-4 mr-1" />
          {comments.length}
        </Button>
      </div>
    </div>
  );
};
