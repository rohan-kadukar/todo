export interface Task {
  id?: string;
  title: string;
  description?: string;
  category: string;
  priority: 'Low' | 'Medium' | 'High';
  dueDate: Date;
  completed: boolean;
  recurring?: {
    type: 'daily' | 'weekly' | 'monthly';
    interval: number;
  };
  subtasks?: SubTask[];
  assignedTo?: string[];
  tags?: string[];
  progress: number;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
}

export interface SubTask {
  id: string;
  title: string;
  completed: boolean;
}
