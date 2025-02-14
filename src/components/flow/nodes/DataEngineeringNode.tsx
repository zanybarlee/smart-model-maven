import React, { useState } from 'react';
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { Copy, Trash, Info } from "lucide-react";
import { NodeData } from '../types/flow-types';
import { Handle, Position, useReactFlow } from '@xyflow/react';
import { useToast } from "@/hooks/use-toast";
import { NodeHeader } from './components/NodeHeader';
import { NodeInputs } from './components/NodeInputs';
import { NodeOutput } from './components/NodeOutput';
import { NodeInfo } from './components/NodeInfo';

export const DataEngineeringNode = ({ data, id }: { data: NodeData; id: string }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [tempInputs, setTempInputs] = useState({
    dataSource: data.config.inputs?.dataSource || '',
    connectionString: data.config.inputs?.connectionString || '',
    output: data.config.outputs?.output || ''
  });
  const { toast } = useToast();
  const { setNodes, getNode, getNodes, setEdges, getEdges } = useReactFlow();

  const handleSave = () => {
    setIsEditing(false);
    toast({
      title: "Changes saved",
      description: "Node configuration has been updated.",
    });
  };

  const handleDuplicate = () => {
    const node = getNode(id);
    if (node) {
      const position = {
        x: node.position.x + 50,
        y: node.position.y + 50,
      };

      const newNode = {
        ...node,
        id: `${node.type}-${Date.now()}`,
        position,
        data: {
          ...node.data,
          label: `${node.data.label} (Copy)`,
        },
      };

      setNodes(getNodes().concat(newNode));
      toast({
        title: "Node duplicated",
        description: "A copy of the node has been created.",
      });
    }
  };

  const handleDelete = () => {
    setNodes(getNodes().filter(node => node.id !== id));
    setEdges(getEdges().filter(edge => edge.source !== id && edge.target !== id));
    toast({
      title: "Node deleted",
      description: "The node has been removed from the flow.",
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setTempInputs(prev => ({ ...prev, [field]: value }));
  };

  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <div className="bg-white p-1.5 rounded-lg shadow-lg relative min-w-[120px] border border-gray-200">
          <Handle
            type="target"
            position={Position.Left}
            className="w-1.5 h-1.5 !bg-blue-400 border-[1.5px] border-white"
            style={{ left: -4, top: '50%' }}
            isConnectableStart={false}
          />

          <NodeHeader
            label={data.label}
            isEditing={isEditing}
            onEdit={() => setIsEditing(true)}
            onSave={handleSave}
            onDuplicate={handleDuplicate}
            onDelete={handleDelete}
            onInfo={() => setShowInfo(true)}
          />

          <div className="space-y-2">
            <NodeInputs
              isEditing={isEditing}
              dataSource={isEditing ? tempInputs.dataSource : data.config.inputs?.dataSource || ''}
              connectionString={isEditing ? tempInputs.connectionString : data.config.inputs?.connectionString || ''}
              onInputChange={handleInputChange}
            />

            <NodeOutput
              isEditing={isEditing}
              output={isEditing ? tempInputs.output : data.config.outputs?.output || ''}
              onOutputChange={(value) => handleInputChange('output', value)}
            />
          </div>

          <Handle
            type="source"
            position={Position.Right}
            className="w-1.5 h-1.5 !bg-blue-400 border-[1.5px] border-white"
            style={{ right: -4, top: '50%' }}
            isConnectableEnd={false}
          />

          <NodeInfo 
            showInfo={showInfo}
            onShowInfoChange={setShowInfo}
            data={data}
          />
        </div>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem onClick={handleDuplicate}>
          <Copy className="mr-2 h-4 w-4" />
          Duplicate Node
        </ContextMenuItem>
        <ContextMenuItem onClick={handleDelete}>
          <Trash className="mr-2 h-4 w-4" />
          Delete Node
        </ContextMenuItem>
        <ContextMenuItem onClick={() => setShowInfo(true)}>
          <Info className="mr-2 h-4 w-4" />
          View Details
        </ContextMenuItem>
      </ContextMenuContent>
    </ContextMenu>
  );
};
