
import React from 'react';
import { Edit2, Save, Copy, Trash, Info } from "lucide-react";

interface NodeHeaderProps {
  label: string;
  isEditing: boolean;
  onEdit: () => void;
  onSave: () => void;
  onDuplicate: () => void;
  onDelete: () => void;
  onInfo: () => void;
}

export const NodeHeader = ({
  label,
  isEditing,
  onEdit,
  onSave,
  onDuplicate,
  onDelete,
  onInfo
}: NodeHeaderProps) => {
  return (
    <>
      <div className="absolute right-2 top-2 flex gap-2">
        {isEditing ? (
          <Save 
            className="h-4 w-4 text-green-500 hover:text-green-600 cursor-pointer nodrag" 
            onClick={onSave}
          />
        ) : (
          <>
            <Edit2 
              className="h-4 w-4 text-slate-400 hover:text-slate-600 cursor-pointer nodrag"
              onClick={onEdit}
            />
            <Copy 
              className="h-4 w-4 text-slate-400 hover:text-slate-600 cursor-pointer nodrag" 
              onClick={onDuplicate}
            />
            <Trash 
              className="h-4 w-4 text-slate-400 hover:text-slate-600 cursor-pointer nodrag" 
              onClick={onDelete}
            />
            <Info 
              className="h-4 w-4 text-slate-400 hover:text-slate-600 cursor-pointer nodrag" 
              onClick={onInfo}
            />
          </>
        )}
      </div>
      
      <div className="flex items-center gap-2 mb-4">
        <div className="p-1.5 bg-slate-100 rounded">
          <div className="w-4 h-4">⚡</div>
        </div>
        <div className="font-medium text-slate-900">{label}</div>
      </div>
    </>
  );
};
