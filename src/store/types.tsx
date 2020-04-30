export interface Action {
  type: string;
}

export type PrimaryKey = number;
export interface StoreRootState {
  todo: TodoState;
}

export interface TodoState {
  groups: Todos;
  todosLoading: boolean;
  todosLoadingFailed: boolean;
  todoCreating: boolean;
  todoCreatingFailed: boolean;
  todoDeleting: boolean;
  todoDeletingFailed: boolean;
  groupCreating: boolean;
  groupCreatingFailed: boolean;
  todoEditing: boolean;
  todoEditingFailed: boolean;
}
export interface Todo {
  id: PrimaryKey;
  content: string;
  created_at: string;
  remind_at: string | null;
  position: number;
  group: PrimaryKey;
  completed: boolean;
}
export interface TodoFetch {
  content: string;
  remind_at: string | null;
  group: PrimaryKey;
  position: number;
}
export interface TodoGroup {
  id: PrimaryKey;
  title: string;
  todos: Todo[];
  user: number;
}

export interface UserState {
  token: string
  userLogin: boolean
  userLoginFailed: boolean
}

export type Todos = Record<PrimaryKey, TodoGroup>;
