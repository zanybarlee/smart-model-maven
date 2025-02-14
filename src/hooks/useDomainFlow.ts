
import { useState, useCallback } from 'react';
import { Node, Edge, Connection, addEdge } from 'reactflow';
import { Entity } from '@/types/domain';
import { useToast } from '@/hooks/use-toast';

export const useDomainFlow = () => {
  const [entities, setEntities] = useState<Entity[]>([]);
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [selectedEntity, setSelectedEntity] = useState<Entity | null>(null);
  const { toast } = useToast();

  const handleDuplicateEntity = useCallback((id: string) => {
    const entityToDuplicate = entities.find(e => e.id === id);
    if (entityToDuplicate) {
      const newEntity: Entity = {
        id: Date.now().toString(),
        name: `${entityToDuplicate.name} (Copy)`,
        attributes: [...entityToDuplicate.attributes]
      };

      const originalNode = nodes.find(node => node.id === id);
      if (!originalNode) return;

      setEntities(prev => [...prev, newEntity]);
      
      const newNode = {
        id: newEntity.id,
        type: 'entity' as const,
        position: { 
          x: originalNode.position.x + 50, 
          y: originalNode.position.y + 50 
        },
        data: { 
          label: newEntity.name, 
          attributes: newEntity.attributes,
          onEdit: handleEditEntity,
          onDelete: handleDeleteEntity,
          onDuplicate: handleDuplicateEntity,
          onSave: handleSaveEntity,
        },
        draggable: true,
      };

      setNodes(prev => [...prev, newNode]);

      toast({
        title: "Entity Duplicated",
        description: "A copy of the entity has been created.",
      });
    }
  }, [entities, nodes, toast]);

  const handleEditEntity = useCallback((id: string) => {
    const entity = entities.find(e => e.id === id);
    if (entity) {
      setSelectedEntity(entity);
    }
  }, [entities]);

  const handleDeleteEntity = useCallback((id: string) => {
    setEntities(prev => prev.filter(e => e.id !== id));
    setNodes(prev => prev.filter(node => node.id !== id));
    setEdges(prev => prev.filter(edge => edge.source !== id && edge.target !== id));
    toast({
      title: "Entity Deleted",
      description: "The entity has been removed from the model.",
    });
  }, [toast]);

  const handleSaveEntity = useCallback((idOrEntity: string | Entity, newData?: { label: string; attributes: string[] }) => {
    if (typeof idOrEntity === 'string' && newData) {
      // Handle inline save
      const updatedEntity: Entity = {
        id: idOrEntity,
        name: newData.label,
        attributes: newData.attributes
      };

      setEntities(prev => prev.map(e => e.id === idOrEntity ? updatedEntity : e));
      setNodes(prev => prev.map(node => 
        node.id === idOrEntity 
          ? {
              ...node,
              data: {
                ...node.data,
                label: newData.label,
                attributes: newData.attributes,
              }
            }
          : node
      ));
    } else if (typeof idOrEntity === 'object') {
      // Handle new entity creation or dialog save
      const entity = idOrEntity;
      const existingEntityIndex = entities.findIndex(e => e.id === entity.id);
      
      if (existingEntityIndex === -1) {
        // New entity
        setEntities(prev => [...prev, entity]);
        const newNode = {
          id: entity.id,
          type: 'entity' as const,
          position: { 
            x: Math.random() * 300, 
            y: Math.random() * 200 
          },
          data: {
            label: entity.name,
            attributes: entity.attributes,
            onEdit: handleEditEntity,
            onDelete: handleDeleteEntity,
            onDuplicate: handleDuplicateEntity,
            onSave: handleSaveEntity,
          },
          draggable: true,
        };
        setNodes(prev => [...prev, newNode]);
      } else {
        // Update existing entity
        setEntities(prev => prev.map(e => e.id === entity.id ? entity : e));
        setNodes(prev => prev.map(node => 
          node.id === entity.id 
            ? {
                ...node,
                data: {
                  ...node.data,
                  label: entity.name,
                  attributes: entity.attributes,
                }
              }
            : node
        ));
      }
    }

    setSelectedEntity(null);
    toast({
      title: "Entity Updated",
      description: "The entity has been updated successfully.",
    });
  }, [handleDeleteEntity, handleDuplicateEntity, handleEditEntity, toast]);

  const handleGenerateModel = useCallback((modelDescription: string) => {
    if (!modelDescription.trim()) {
      toast({
        title: "Description Required",
        description: "Please enter a description of your domain model.",
        variant: "destructive",
      });
      return;
    }

    const mockEntities: Entity[] = [
      {
        id: '1',
        name: 'Customer',
        attributes: ['id', 'name', 'email', 'phoneNumber']
      },
      {
        id: '2',
        name: 'Order',
        attributes: ['id', 'orderDate', 'totalAmount', 'status']
      }
    ];

    setEntities(mockEntities);

    const flowNodes = mockEntities.map((entity, index) => ({
      id: entity.id,
      type: 'entity' as const,
      position: { x: 250 * index, y: 100 },
      data: { 
        label: entity.name, 
        attributes: entity.attributes,
        onEdit: handleEditEntity,
        onDelete: handleDeleteEntity,
        onDuplicate: handleDuplicateEntity,
        onSave: handleSaveEntity,
      },
      draggable: true,
    }));

    setNodes(flowNodes);
    toast({
      title: "Model Generated",
      description: "Your domain model has been generated successfully.",
    });
  }, [handleDeleteEntity, handleDuplicateEntity, handleEditEntity, handleSaveEntity, toast]);

  const onConnect = useCallback((params: Connection) => {
    setEdges((eds) => addEdge(params, eds));
  }, []);

  const onNodeDragStop = useCallback((event: React.MouseEvent, node: Node) => {
    console.log('Node dragged:', node);
  }, []);

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
