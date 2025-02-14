
import { useState } from 'react';
import { Node, Edge } from 'reactflow';
import { Entity } from '@/types/domain';
import { useEntityActions } from './domain/useEntityActions';
import { useModelGeneration } from './domain/useModelGeneration';
import { useFlowActions } from './domain/useFlowActions';

export const useDomainFlow = () => {
  const [entities, setEntities] = useState<Entity[]>([]);
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [selectedEntity, setSelectedEntity] = useState<Entity | null>(null);

  const {
    handleDuplicateEntity,
    handleEditEntity,
    handleDeleteEntity,
    handleSaveEntity
  } = useEntityActions(entities, nodes, setEntities, setNodes, setSelectedEntity);

  const { handleGenerateModel } = useModelGeneration(setEntities, setNodes, {
    handleEditEntity,
    handleDeleteEntity,
    handleDuplicateEntity,
    handleSaveEntity
  });

  const { onConnect, onNodeDragStop } = useFlowActions(setNodes, setEdges);

  return {
    entities,
    nodes,
    edges,
    selectedEntity,
    setSelectedEntity,
    handleDuplicateEntity,
    handleEditEntity,
    handleDeleteEntity,
    handleSaveEntity,
    handleGenerateModel,
    onConnect,
    onNodeDragStop
  };
};
