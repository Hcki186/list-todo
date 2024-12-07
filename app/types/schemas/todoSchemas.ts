import { z } from 'zod';

export const todoItemSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  deadline: z.string().refine((date) => new Date(date) > new Date(), {
    message: 'Deadline must be a future date',
  }),
  completed: z.boolean().default(false),
});

export type TodoItemForm = z.infer<typeof todoItemSchema>;


export const todoListSchema = z.object({
  title: z.string().min(1, 'Title is required'),
});

export type TodoListForm = z.infer<typeof todoListSchema>;