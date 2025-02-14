
import React, { useState } from 'react';
import Board from '@asseinfo/react-kanban';
import '@asseinfo/react-kanban/dist/styles.css';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Search } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { KanbanCard as KanbanCardComponent } from './components/KanbanCard';
import { useKanbanBoard } from './hooks/useKanbanBoard';
import { KanbanCard, Priority, KanbanBoard as KanbanBoardType } from './types/kanban-types';

export const KanbanBoard = () => {
  const { board, setBoard, labels, saveBoard } = useKanbanBoard();
  const [newCard, setNewCard] = useState<{
    title: string;
    description: string;
    priority: Priority;
    assignees: string;
    labels: typeof labels;
  }>({ 
    title: "", 
    description: "", 
    priority: "medium", 
    assignees: "",
    labels: []
  });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [selectedColumn, setSelectedColumn] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCard, setSelectedCard] = useState<KanbanCard | null>(null);
  const [isCommentDialogOpen, setIsCommentDialogOpen] = useState(false);
  const [newComment, setNewComment] = useState("");
  const { toast } = useToast();

  const handleCardAdd = (columnId: number) => {
    setSelectedColumn(columnId);
    setNewCard({ 
      title: "", 
      description: "", 
      priority: "medium", 
      assignees: "",
      labels: []
    });
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

    const newBoard = {
      ...board,
      columns: board.columns.map(column => {
        if (column.id === selectedColumn) {
          return {
            ...column,
            cards: [...column.cards, {
              id: Date.now().toString(),
              title: newCard.title,
              description: newCard.description,
              priority: newCard.priority,
              assignees: newCard.assignees.split(',').map(a => a.trim()).filter(a => a),
              labels: newCard.labels,
              comments: []
            }]
          };
        }
        return column;
      })
    };

    setBoard(newBoard);
    saveBoard(newBoard);
    setIsDialogOpen(false);
    toast({
      title: "Card added",
      description: "A new card has been added to the board"
    });
  };

  const handleCommentAdd = async () => {
    if (!selectedCard || !newComment.trim()) return;

    try {
      const updatedBoard = {
        ...board,
        columns: board.columns.map(column => ({
          ...column,
          cards: column.cards.map(card => 
            card.id === selectedCard.id
              ? {
                  ...card,
                  comments: [...(card.comments || []), {
                    id: Date.now().toString(),
                    comment: newComment,
                    created_at: new Date().toISOString(),
                    user_id: 'current-user'
                  }]
                }
              : card
          )
        }))
      };

      setBoard(updatedBoard);
      saveBoard(updatedBoard);
      setNewComment("");
      setIsCommentDialogOpen(false);
      toast({
        title: "Comment added",
        description: "Your comment has been added to the card"
      });
    } catch (error) {
      console.error('Error adding comment:', error);
      toast({
        title: "Error",
        description: "Failed to add comment",
        variant: "destructive"
      });
    }
  };

  const handleDragEnd = (card: KanbanCard, source: any, destination: any) => {
    if (!destination) {
      return;
    }

    const updatedBoard = {
      ...board,
      columns: board.columns.map(column => {
        // Remove from source column
        if (column.id === source.fromColumnId) {
          return {
            ...column,
            cards: column.cards.filter(c => c.id !== card.id)
          };
        }
        // Add to destination column
        if (column.id === destination.toColumnId) {
          const destinationCards = [...column.cards];
          destinationCards.splice(destination.toPosition, 0, card);
          return {
            ...column,
            cards: destinationCards
          };
        }
        return column;
      })
    };

    setBoard(updatedBoard);
    saveBoard(updatedBoard);
    toast({
      title: "Card moved",
      description: "The card has been moved to a new position"
    });
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
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="h-4 w-4 absolute left-3 top-3 text-gray-400" />
            <Input
              placeholder="Search cards..."
              className="pl-9"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button 
            onClick={() => {
              const newColumn = {
                id: Date.now(),
                title: "New Column",
                cards: []
              };
              const newBoard = {
                ...board,
                columns: [...board.columns, newColumn]
              };
              setBoard(newBoard);
              saveBoard(newBoard);
              toast({
                title: "Column added",
                description: "A new column has been added to the board"
              });
            }} 
            variant="outline" 
            size="sm"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Column
          </Button>
        </div>
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
          onCardDragEnd={handleDragEnd}
          renderCard={(props: KanbanCard) => (
            <KanbanCardComponent
              {...props}
              onCommentClick={() => {
                setSelectedCard(props);
                setIsCommentDialogOpen(true);
              }}
            />
          )}
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
              <Button onClick={handleCardSubmit} className="w-full">
                Add Card
              </Button>
            </div>
          </DialogContent>
        </Dialog>

        <Dialog open={isCommentDialogOpen} onOpenChange={setIsCommentDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{selectedCard?.title} - Comments</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="max-h-60 overflow-y-auto space-y-2">
                {selectedCard?.comments?.map((comment) => (
                  <div key={comment.id} className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-sm">{comment.comment}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {new Date(comment.created_at).toLocaleString()}
                    </p>
                  </div>
                ))}
              </div>
              <div className="flex gap-2">
                <Input
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder="Add a comment..."
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      handleCommentAdd();
                    }
                  }}
                />
                <Button onClick={handleCommentAdd}>
                  Add
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};
