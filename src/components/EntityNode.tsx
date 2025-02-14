
import React, { useState } from 'react';
import { Handle, Position, NodeToolbar } from 'reactflow';
import { Edit2, Copy, Trash2, Save, Info } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";

interface EntityNodeProps {
  data: { 
    label: string; 
    attributes: string[];
    onEdit: (id: string) => void;
    onDelete: (id: string) => void;
    onDuplicate: (id: string) => void;
    onSave?: (id: string, newData: { label: string; attributes: string[] }) => void;
  };
  id: string;
}

const EntityNode = ({ data, id }: EntityNodeProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [tempLabel, setTempLabel] = useState(data.label);
  const [tempAttribute, setTempAttribute] = useState('');
  const [tempAttributes, setTempAttributes] = useState(data.attributes);
  const [showInfo, setShowInfo] = useState(false);

  const handleSave = () => {
    if (data.onSave) {
      data.onSave(id, {
        label: tempLabel,
        attributes: tempAttributes
      });
    }
    setIsEditing(false);
  };

  const handleAddAttribute = () => {
    if (tempAttribute.trim()) {
      setTempAttributes([...tempAttributes, tempAttribute.trim()]);
      setTempAttribute('');
    }
  };

  const handleRemoveAttribute = (index: number) => {
    setTempAttributes(tempAttributes.filter((_, i) => i !== index));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleAddAttribute();
    }
  };

  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <div className="relative">
          <NodeToolbar className="flex gap-2" isVisible={!isEditing}>
            <button
              onClick={() => setIsEditing(true)}
              className="p-1 bg-white rounded shadow hover:bg-slate-50"
              title="Edit"
            >
              <Edit2 className="h-4 w-4" />
            </button>
            <button
              onClick={() => data.onDuplicate(id)}
              className="p-1 bg-white rounded shadow hover:bg-slate-50"
              title="Duplicate"
            >
              <Copy className="h-4 w-4" />
            </button>
            <button
              onClick={() => data.onDelete(id)}
              className="p-1 bg-white rounded shadow hover:bg-slate-50"
              title="Delete"
            >
              <Trash2 className="h-4 w-4" />
            </button>
            <button
              onClick={() => setShowInfo(!showInfo)}
              className="p-1 bg-white rounded shadow hover:bg-slate-50"
              title="Info"
            >
              <Info className="h-4 w-4" />
            </button>
          </NodeToolbar>

          <div className="bg-white p-4 rounded-lg shadow-lg border border-slate-200 min-w-[200px]">
            <Handle
              type="target"
              position={Position.Top}
              className="w-2 h-1 !bg-slate-500 border-none"
            />

            <div className="space-y-2">
              {isEditing ? (
                <div className="space-y-2">
                  <Input
                    value={tempLabel}
                    onChange={(e) => setTempLabel(e.target.value)}
                    className="font-semibold"
                    placeholder="Entity name"
                  />
                  <div className="flex gap-2">
                    <Input
                      value={tempAttribute}
                      onChange={(e) => setTempAttribute(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Add attribute"
                      className="text-sm"
                    />
                    <button
                      onClick={handleAddAttribute}
                      className="px-2 py-1 bg-primary text-white rounded text-sm hover:bg-primary/90"
                    >
                      Add
                    </button>
                  </div>
                  <div className="space-y-1">
                    {tempAttributes.map((attr, index) => (
                      <div key={index} className="flex justify-between items-center py-1 border-b border-slate-100 last:border-0">
                        <span className="text-sm">{attr}</span>
                        <button
                          onClick={() => handleRemoveAttribute(index)}
                          className="text-red-500 hover:text-red-600"
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>
                  <div className="flex justify-end">
                    <button
                      onClick={handleSave}
                      className="px-2 py-1 bg-green-500 text-white rounded text-sm hover:bg-green-600"
                    >
                      Save
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="font-semibold text-lg text-primary">{data.label}</div>
                  <div className="space-y-1">
                    {tempAttributes.map((attr, index) => (
                      <div key={index} className="text-sm py-1 border-b border-slate-100 last:border-0">
                        {attr}
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>

            <Handle
              type="source"
              position={Position.Bottom}
              className="w-2 h-1 !bg-slate-500 border-none"
            />
          </div>
        </div>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem onClick={() => data.onDuplicate(id)}>
          <Copy className="mr-2 h-4 w-4" />
          Duplicate Node
        </ContextMenuItem>
        <ContextMenuItem onClick={() => data.onDelete(id)}>
          <Trash2 className="mr-2 h-4 w-4" />
          Delete Node
        </ContextMenuItem>
        <ContextMenuItem onClick={() => setShowInfo(!showInfo)}>
          <Info className="mr-2 h-4 w-4" />
          View Details
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
};

export default EntityNode;
