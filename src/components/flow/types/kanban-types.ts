
export type Priority = 'low' | 'medium' | 'high';

export interface Comment {
  id: string;
  comment: string;
  created_at: string;
  user_id: string;
}

export interface Label {
  id: string;
  name: string;
  color: string;
}

export interface KanbanCard {
  id: string;
  title: string;
  description: string;
  priority: Priority;
  assignees: string[];
  labels: Label[];
  comments: Comment[];
}

export interface KanbanColumn {
  id: number;
  title: string;
  cards: KanbanCard[];
}

export interface KanbanBoard {
  columns: KanbanColumn[];
}

export const priorityColors = {
  high: "bg-red-100 text-red-800",
  medium: "bg-yellow-100 text-yellow-800",
  low: "bg-green-100 text-green-800"
};

export const defaultBoard: KanbanBoard = {
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
