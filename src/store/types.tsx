export interface Action {
  type: string
}

export type PrimaryKey = number;
export interface StoreRootState {
  todo: TodoState
}

export interface TodoState {
  groups: TodoGroup[]
  todosLoading: boolean
  todosLoadingFailed: boolean
}

export interface Todo {
  id: PrimaryKey
  content: string
  created_at: string
  remind_at: string
  position: number
  group: PrimaryKey 
  completed: boolean
}

export interface TodoGroup {
  id: PrimaryKey
  title: string
  todos: Todo[]
  user: number
}

