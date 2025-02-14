
import React, { useState } from 'react';
import Board from '@asseinfo/react-kanban';
import '@asseinfo/react-kanban/dist/styles.css';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Users, AlertCircle } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";

const initialBoard = {
  columns: [
    {
      id: 1,
      title: "Backlog",
      cards: [
        {
          id: 1,
          title: "Add authentication",
          description: "Implement user authentication flow",
          priority: "high",
          assignees: ["John", "Sarah"]
        },
        {
          id: 2,
          title: "Create API endpoints",
          description: "Design and implement REST API endpoints",
          priority: "medium",
          assignees: ["Mike"]
        }
      ]
    },
    {
      id: 2,
      title: "In Progress",
      cards: [
        {
          id: 3,
          title: "Update documentation",
          description: "Update API documentation with new endpoints",
          priority: "low",
          assignees: ["Sarah"]
        }
      ]
    },
    {
      id: 3,
      title: "Testing",
      cards: [
        {
          id: 4,
          title: "Unit tests",
          description: "Write unit tests for new features",
          priority: "medium",
          assignees: ["John"]
        }
      ]
    },
    {
      id: 4,
      title: "Done",
      cards: [
        {
          id: 5,
          title: "Setup project",
          description: "Initial project setup and configuration",
          priority: "high",
          assignees: ["Mike", "Sarah"]
        }
      ]
    }
  ]
};

const priorityColors = {
  high: "bg-red-100 text-red-800",
  medium: "bg-yellow-100 text-yellow-800",
  low: "bg-green-100 text-green-800"
};

export const KanbanBoard = () => {
  const [board, setBoard] = useState(initialBoard);
  const [newCard, setNewCard] = useState({ title: "", description: "", priority: "medium", assignees: "" });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedColumn, setSelectedColumn] = useState(null);
  const { toast } = useToast();

  const handleColumnAdd = () => {
    const newColumn = {
      id: Date.now(),
      title: "New Column",
      cards: []
    };
    setBoard({
      ...board,
      columns: [...board.columns, newColumn]
    });
    toast({
      title: "Column added",
      description: "A new column has been added to the board"
    });
  };

  const handleCardAdd = (columnId) => {
    setSelectedColumn(columnId);
    setNewCard({ title: "", description: "", priority: "medium", assignees: "" });
    setIsDialogOpen(true);
  };

  const handleCardSubmit = () => {
    if (!newCard.title) {
      toast({
        title: "Error",
        description: "Title is required",
        variant: "destructive"
      });
      return;
    }

    const updatedBoard = {
      ...board,
      columns: board.columns.map(column => {
        if (column.id === selectedColumn) {
          return {
            ...column,
            cards: [...column.cards, {
              id: Date.now(),
              title: newCard.title,
              description: newCard.description,
              priority: newCard.priority,
              assignees: newCard.assignees.split(',').map(a => a.trim()).filter(a => a)
            }]
          };
        }
        return column;
      })
    };

    setBoard(updatedBoard);
    setIsDialogOpen(false);
    toast({
      title: "Card added",
      description: "A new card has been added to the board"
    });
  };

  const renderCard = (props) => {
    const { title, description, priority, assignees } = props;
    return (
      <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-200">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-medium">{title}</h3>
          <span className={`text-xs px-2 py-1 rounded-full ${priorityColors[priority]}`}>
            {priority}
          </span>
        </div>
        <p className="text-gray-600 text-sm mb-2">{description}</p>
        {assignees?.length > 0 && (
          <div className="flex items-center gap-1 text-sm text-gray-500">
            <Users className="h-4 w-4" />
            <span>{assignees.join(', ')}</span>
          </div>
        )}
      </div>
    );
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Kanban Board</CardTitle>
          <CardDescription>
            Visualize and manage work items across different stages
          </CardDescription>
        </div>
        <Button onClick={handleColumnAdd} variant="outline" size="sm">
          <Plus className="h-4 w-4 mr-2" />
          Add Column
        </Button>
      </CardHeader>
      <CardContent className="overflow-x-auto">
        <Board
          initialBoard={board}
          allowRemoveLane
          allowRenameLabel
          allowRemoveCard
          onLaneRemove={console.log}
          onCardRemove={console.log}
          onLaneRename={console.log}
          onCardDragEnd={console.log}
          renderCard={renderCard}
          renderColumnHeader={({ title, id }) => (
            <div className="flex items-center justify-between p-2">
              <span className="font-medium">{title}</span>
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => handleCardAdd(id)}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          )}
        />

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
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
                  onChange={(e) => setNewCard({ ...newCard, priority: e.target.value })}
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
              <Button onClick={handleCardSubmit} className="w-full">
                Add Card
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};
