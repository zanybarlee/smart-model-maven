
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
      cards: [
        {
          id: "1",
          title: "Design User Authentication Flow",
          description: "Create wireframes and user flow diagrams for the authentication process including login, registration, and password recovery.",
          priority: "high",
          assignees: ["Sarah Miller", "John Chen"],
          labels: [
            { id: "1", name: "Design", color: "#0ea5e9" },
            { id: "2", name: "UX", color: "#8b5cf6" }
          ],
          comments: [
            {
              id: "1",
              comment: "Should we include social authentication options?",
              created_at: "2024-03-15T10:00:00Z",
              user_id: "user1"
            }
          ]
        },
        {
          id: "2",
          title: "Implement API Rate Limiting",
          description: "Add rate limiting to prevent API abuse and ensure service stability.",
          priority: "medium",
          assignees: ["Alex Thompson"],
          labels: [
            { id: "3", name: "Backend", color: "#22c55e" }
          ],
          comments: []
        }
      ]
    },
    {
      id: 2,
      title: "In Progress",
      cards: [
        {
          id: "3",
          title: "Develop Dashboard Analytics",
          description: "Create interactive charts and graphs for the main dashboard using Recharts.",
          priority: "high",
          assignees: ["Maria Garcia"],
          labels: [
            { id: "4", name: "Frontend", color: "#f97316" },
            { id: "5", name: "Analytics", color: "#06b6d4" }
          ],
          comments: [
            {
              id: "2",
              comment: "Added initial chart components, need review",
              created_at: "2024-03-14T15:30:00Z",
              user_id: "user2"
            }
          ]
        }
      ]
    },
    {
      id: 3,
      title: "Testing",
      cards: [
        {
          id: "4",
          title: "User Profile Settings Page",
          description: "Test all functionality of the user profile settings including avatar upload and preference saving.",
          priority: "medium",
          assignees: ["David Kim", "Emma Wilson"],
          labels: [
            { id: "6", name: "Testing", color: "#a855f7" },
            { id: "7", name: "Frontend", color: "#f97316" }
          ],
          comments: [
            {
              id: "3",
              comment: "Found a bug in avatar upload",
              created_at: "2024-03-13T09:15:00Z",
              user_id: "user3"
            }
          ]
        }
      ]
    },
    {
      id: 4,
      title: "Done",
      cards: [
        {
          id: "5",
          title: "Setup CI/CD Pipeline",
          description: "Configure GitHub Actions for automated testing and deployment.",
          priority: "high",
          assignees: ["Chris Anderson"],
          labels: [
            { id: "8", name: "DevOps", color: "#ec4899" }
          ],
          comments: [
            {
              id: "4",
              comment: "Pipeline is working successfully",
              created_at: "2024-03-12T16:45:00Z",
              user_id: "user4"
            }
          ]
        },
        {
          id: "6",
          title: "Database Schema Migration",
          description: "Update database schema to support new user preferences.",
          priority: "low",
          assignees: ["Rachel Lee"],
          labels: [
            { id: "9", name: "Database", color: "#14b8a6" }
          ],
          comments: []
        }
      ]
    }
  ]
};
