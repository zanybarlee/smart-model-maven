
import { useCallback } from 'react';
import { Node } from 'reactflow';
import { Entity } from '@/types/domain';
import { useToast } from '@/hooks/use-toast';

export const useModelGeneration = (
  setEntities: (value: React.SetStateAction<Entity[]>) => void,
  setNodes: (value: React.SetStateAction<Node[]>) => void,
  handlers: {
    handleEditEntity: (id: string) => void;
    handleDeleteEntity: (id: string) => void;
    handleDuplicateEntity: (id: string) => void;
    handleSaveEntity: (id: string, newData: { label: string; attributes: string[] }) => void;
  }
) => {
  const { toast } = useToast();

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
        onEdit: handlers.handleEditEntity,
        onDelete: handlers.handleDeleteEntity,
        onDuplicate: handlers.handleDuplicateEntity,
        onSave: handlers.handleSaveEntity,
      },
    }));

    setNodes(flowNodes);
    toast({
      title: "Model Generated",
      description: "Your domain model has been generated successfully.",
    });
  }, [handlers, setEntities, setNodes, toast]);

  return { handleGenerateModel };
};
