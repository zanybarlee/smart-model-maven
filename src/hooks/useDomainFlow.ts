
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

  const handleDuplicateEntity = (id: string) => {
    const entityToDuplicate = entities.find(e => e.id === id);
    if (entityToDuplicate) {
      const newEntity: Entity = {
        id: Date.now().toString(),
        name: `${entityToDuplicate.name} (Copy)`,
        attributes: [...entityToDuplicate.attributes]
      };

      setEntities([...entities, newEntity]);

      const originalNode = nodes.find(node => node.id === id);
      const offset = 50;

      setNodes([...nodes, {
        id: newEntity.id,
        type: 'entity',
        position: { 
          x: (originalNode?.position.x || 0) + offset, 
          y: (originalNode?.position.y || 0) + offset 
        },
        data: { 
          label: newEntity.name, 
          attributes: newEntity.attributes,
          onEdit: handleEditEntity,
          onDelete: handleDeleteEntity,
          onDuplicate: handleDuplicateEntity,
          onSave: handleSaveEntity,
        },
        draggable: true
      }]);

      toast({
        title: "Entity Duplicated",
        description: "A copy of the entity has been created.",
      });
    }
  };

  const handleEditEntity = (id: string) => {
    const entity = entities.find(e => e.id === id);
    if (entity) {
      setSelectedEntity(entity);
    }
  };

  const handleDeleteEntity = (id: string) => {
    setEntities(entities.filter(e => e.id !== id));
    setNodes(nodes.filter(node => node.id !== id));
    setEdges(edges.filter(edge => edge.source !== id && edge.target !== id));
    toast({
      title: "Entity Deleted",
      description: "The entity has been removed from the model.",
    });
  };

  const handleSaveEntity = (idOrEntity: string | Entity, newData?: { label: string; attributes: string[] }) => {
    if (typeof idOrEntity === 'string' && newData) {
      // Handle inline save
      const updatedEntity: Entity = {
        id: idOrEntity,
        name: newData.label,
        attributes: newData.attributes
      };

      setEntities(entities.map(e => e.id === idOrEntity ? updatedEntity : e));
      setNodes(nodes.map(node => 
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
      // Handle dialog save
      const entity = idOrEntity;
      setEntities(entities.map(e => e.id === entity.id ? entity : e));
      setNodes(nodes.map(node => 
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
      setSelectedEntity(null);
    }

    toast({
      title: "Entity Updated",
      description: "The entity has been updated successfully.",
    });
  };

  const handleGenerateModel = (modelDescription: string) => {
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
      type: 'entity',
      position: { x: 250 * index, y: 100 },
      data: { 
        label: entity.name, 
        attributes: entity.attributes,
        onEdit: handleEditEntity,
        onDelete: handleDeleteEntity,
        onDuplicate: handleDuplicateEntity,
        onSave: handleSaveEntity,
      },
      draggable: true
    }));

    setNodes(flowNodes);
    toast({
      title: "Model Generated",
      description: "Your domain model has been generated successfully.",
    });
  };

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
