
import React from 'react';
import { Input } from "@/components/ui/input";

interface NodeInputsProps {
  isEditing: boolean;
  dataSource: string;
  connectionString: string;
  onInputChange: (field: string, value: string) => void;
}

export const NodeInputs = ({
  isEditing,
  dataSource,
  connectionString,
  onInputChange
}: NodeInputsProps) => {
  return (
    <div>
      <div className="text-xs font-medium text-slate-700 mb-2">Inputs</div>
      <div className="space-y-3">
        <div>
          <div className="text-xs text-slate-500 mb-1">Data Source</div>
          <div className="nodrag">
            <Input 
              placeholder="Data Source"
              className="h-8 text-sm bg-white border border-gray-200"
              value={dataSource}
              onChange={(e) => onInputChange('dataSource', e.target.value)}
              readOnly={!isEditing}
            />
          </div>
        </div>
        <div>
          <div className="text-xs text-slate-500 mb-1">Connection String</div>
          <div className="nodrag">
            <Input 
              placeholder="Connection String"
              className="h-8 text-sm bg-white border border-gray-200"
              value={connectionString}
              onChange={(e) => onInputChange('connectionString', e.target.value)}
              readOnly={!isEditing}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
