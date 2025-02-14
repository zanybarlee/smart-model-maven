
import { useCallback } from 'react';
import { Node } from 'reactflow';
import { Entity } from '@/types/domain';
import { useToast } from '@/hooks/use-toast';

export const useEntityActions = (
  entities: Entity[],
  nodes: Node[],
  setEntities: (value: React.SetStateAction<Entity[]>) => void,
  setNodes: (value: React.SetStateAction<Node[]>) => void,
  setSelectedEntity: (value: Entity | null) => void
) => {
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
      };

      setNodes(prev => [...prev, newNode]);

      toast({
        title: "Entity Duplicated",
        description: "A copy of the entity has been created.",
      });
    }
  }, [entities, nodes, setEntities, setNodes, toast]);

  const handleEditEntity = useCallback((id: string) => {
    const entity = entities.find(e => e.id === id);
    if (entity) {
      setSelectedEntity(entity);
    }
  }, [entities, setSelectedEntity]);

  const handleDeleteEntity = useCallback((id: string) => {
    setEntities(prev => prev.filter(e => e.id !== id));
    setNodes(prev => prev.filter(node => node.id !== id));
    toast({
      title: "Entity Deleted",
      description: "The entity has been removed from the model.",
    });
  }, [setEntities, setNodes, toast]);

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
  }, [entities, setEntities, setNodes, setSelectedEntity, toast]);

  return {
    handleDuplicateEntity,
    handleEditEntity,
    handleDeleteEntity,
    handleSaveEntity,
  };
};
