export interface Action {
  type: string
}

export type PrimaryKey = number;
export interface StoreRootState {
  todo: TodoState
}

export interface TodoState {
  todos: TodoCategorized
  groups: TodoGroupInfo

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
  user: number
}


export type TodoCategorized = Record<PrimaryKey, Todo[]>
export type TodoGroupInfo = Record<PrimaryKey, TodoGroup>