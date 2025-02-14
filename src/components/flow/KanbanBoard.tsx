import React, { useState, useEffect } from 'react';
import Board from '@asseinfo/react-kanban';
import '@asseinfo/react-kanban/dist/styles.css';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Users, AlertCircle, Search, Tag, MessageSquare } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { Badge } from "@/components/ui/badge";
import debounce from 'lodash/debounce';
import type { Json } from '@/integrations/supabase/types';

type Priority = 'low' | 'medium' | 'high';

interface Comment {
  id: string;
  comment: string;
  created_at: string;
  user_id: string;
}

interface Label {
  id: string;
  name: string;
  color: string;
}

interface KanbanCard {
  id: string;
  title: string;
  description: string;
  priority: Priority;
  assignees: string[];
  labels: Label[];
  comments: Comment[];
}

interface KanbanColumn {
  id: number;
  title: string;
  cards: KanbanCard[];
}

interface KanbanBoard {
  columns: KanbanColumn[];
}

const priorityColors = {
  high: "bg-red-100 text-red-800",
  medium: "bg-yellow-100 text-yellow-800",
  low: "bg-green-100 text-green-800"
};

const defaultBoard: KanbanBoard = {
  columns: [
    {
      id: 1,
      title: "Backlog",
      cards: []
    },
    {
      id: 2,
      title: "In Progress",
      cards: []
    },
    {
      id: 3,
      title: "Testing",
      cards: []
    },
    {
      id: 4,
      title: "Done",
      cards: []
    }
  ]
};

export const KanbanBoard = () => {
  const [board, setBoard] = useState<KanbanBoard>(defaultBoard);
  const [boardId, setBoardId] = useState<string | null>(null);
  const [newCard, setNewCard] = useState<{
    title: string;
    description: string;
    priority: Priority;
    assignees: string;
    labels: Label[];
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
  const [filteredBoard, setFilteredBoard] = useState<KanbanBoard>(defaultBoard);
  const [labels, setLabels] = useState<Label[]>([]);
  const [newComment, setNewComment] = useState("");
  const [selectedCard, setSelectedCard] = useState<KanbanCard | null>(null);
  const [isCommentDialogOpen, setIsCommentDialogOpen] = useState(false);
  const { toast } = useToast();

  const loadLabels = async () => {
    try {
      const { data, error } = await supabase
        .from('card_labels')
        .select('*');

      if (error) throw error;
      if (data) {
        setLabels(data);
      }
    } catch (error) {
      console.error('Error loading labels:', error);
    }
  };

  useEffect(() => {
    loadBoard();
    loadLabels();
  }, []);

  const loadBoard = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        throw new Error('No authenticated user');
      }

      const { data: boards, error } = await supabase
        .from('kanban_boards')
        .select('*')
        .eq('user_id', user.id)
        .limit(1);

      if (error) throw error;

      if (boards && boards.length > 0) {
        setBoardId(boards[0].id);
        setBoard(boards[0].board_data as unknown as KanbanBoard);
      } else {
        const { data, error: insertError } = await supabase
          .from('kanban_boards')
          .insert({
            title: 'Main Board',
            board_data: defaultBoard as unknown as Json,
            user_id: user.id
          })
          .select()
          .single();

        if (insertError) throw insertError;
        if (data) {
          setBoardId(data.id);
          setBoard(data.board_data as unknown as KanbanBoard);
        }
      }
    } catch (error) {
      console.error('Error loading board:', error);
      toast({
        title: "Error",
        description: "Failed to load board data. Please make sure you're logged in.",
        variant: "destructive"
      });
    }
  };

  const saveBoard = debounce(async (newBoard: KanbanBoard) => {
    if (!boardId) return;

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        throw new Error('No authenticated user');
      }

      const { error } = await supabase
        .from('kanban_boards')
        .update({ 
          board_data: newBoard as unknown as Json
        })
        .eq('id', boardId)
        .eq('user_id', user.id);

      if (error) throw error;
    } catch (error) {
      console.error('Error saving board:', error);
      toast({
        title: "Error",
        description: "Failed to save board changes. Please make sure you're logged in.",
        variant: "destructive"
      });
    }
  }, 1000);

  const handleColumnAdd = () => {
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
  };

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
    if (!selectedCard || !boardId || !newComment.trim()) return;

    try {
      const { data, error } = await supabase
        .from('card_comments')
        .insert([
          {
            board_id: boardId,
            card_id: selectedCard.id,
            comment: newComment
          }
        ])
        .select()
        .single();

      if (error) throw error;

      const updatedBoard = {
        ...board,
        columns: board.columns.map(column => ({
          ...column,
          cards: column.cards.map(card => 
            card.id === selectedCard.id
              ? { ...card, comments: [...(card.comments || []), data] }
              : card
          )
        }))
      };

      setBoard(updatedBoard);
      saveBoard(updatedBoard);
      setNewComment("");
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

  const renderCard = (props: KanbanCard) => {
    const { title, description, priority, assignees, labels, comments = [] } = props;
    return (
      <div className="bg-white p-3 rounded-lg shadow-sm border border-gray-200">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-medium">{title}</h3>
          <span className={`text-xs px-2 py-1 rounded-full ${priorityColors[priority]}`}>
            {priority}
          </span>
        </div>
        <p className="text-gray-600 text-sm mb-2">{description}</p>
        {labels.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-2">
            {labels.map(label => (
              <Badge 
                key={label.id}
                style={{ backgroundColor: label.color }}
                className="text-white text-xs"
              >
                {label.name}
              </Badge>
            ))}
          </div>
        )}
        <div className="flex items-center justify-between">
          {assignees?.length > 0 && (
            <div className="flex items-center gap-1 text-sm text-gray-500">
              <Users className="h-4 w-4" />
              <span>{assignees.join(', ')}</span>
            </div>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => {
              setSelectedCard(props);
              setIsCommentDialogOpen(true);
            }}
          >
            <MessageSquare className="h-4 w-4 mr-1" />
            {comments.length}
          </Button>
        </div>
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
          <Button onClick={handleColumnAdd} variant="outline" size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add Column
          </Button>
        </div>
      </CardHeader>
      <CardContent className="overflow-x-auto">
        <Board
          initialBoard={filteredBoard}
          allowRemoveLane
          allowRenameLabel
          allowRemoveCard
          onLaneRemove={console.log}
          onCardRemove={console.log}
          onLaneRename={console.log}
          onCardDragEnd={(card, source, destination) => {
            const updatedBoard = {
              ...board,
              columns: board.columns.map(column => {
                if (column.id === source.fromColumnId) {
                  return {
                    ...column,
                    cards: column.cards.filter(c => c.id !== card.id)
                  };
                }
                if (column.id === destination.toColumnId) {
                  return {
                    ...column,
                    cards: [...column.cards, card]
                  };
                }
                return column;
              })
            };
            setBoard(updatedBoard);
            saveBoard(updatedBoard);
          }}
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
