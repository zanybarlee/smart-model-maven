
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Priority, Label as LabelType } from '../types/kanban-types';

interface AddCardDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  newCard: {
    title: string;
    description: string;
    priority: Priority;
    assignees: string;
    labels: LabelType[];
  };
  setNewCard: (card: {
    title: string;
    description: string;
    priority: Priority;
    assignees: string;
    labels: LabelType[];
  }) => void;
  onSubmit: () => void;
  labels: LabelType[];
}

export const AddCardDialog: React.FC<AddCardDialogProps> = ({
  isOpen,
  onOpenChange,
  newCard,
  setNewCard,
  onSubmit,
  labels
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Card</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          <div>
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              value={newCard.title}
              onChange={(e) => setNewCard({ ...newCard, title: e.target.value })}
              placeholder="Enter card title"
            />
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={newCard.description}
              onChange={(e) => setNewCard({ ...newCard, description: e.target.value })}
              placeholder="Enter card description"
            />
          </div>
          <div>
            <Label htmlFor="priority">Priority</Label>
            <select
              id="priority"
              className="w-full p-2 border rounded-md"
              value={newCard.priority}
              onChange={(e) => setNewCard({ ...newCard, priority: e.target.value as Priority })}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </select>
          </div>
          <div>
            <Label htmlFor="assignees">Assignees</Label>
            <Input
              id="assignees"
              value={newCard.assignees}
              onChange={(e) => setNewCard({ ...newCard, assignees: e.target.value })}
              placeholder="Enter assignees (comma-separated)"
            />
          </div>
          <div>
            <Label>Labels</Label>
            <div className="flex flex-wrap gap-2 mt-2">
              {labels.map(label => (
                <Badge
                  key={label.id}
                  style={{ backgroundColor: label.color }}
                  className="cursor-pointer"
                  onClick={() => {
                    const isSelected = newCard.labels.some(l => l.id === label.id);
                    setNewCard({
                      ...newCard,
                      labels: isSelected
                        ? newCard.labels.filter(l => l.id !== label.id)
                        : [...newCard.labels, label]
                    });
                  }}
                >
                  {label.name}
                </Badge>
              ))}
            </div>
          </div>
          <Button onClick={onSubmit} className="w-full">
            Add Card
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
