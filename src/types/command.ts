export interface Command<T> {
  name: string;
  args: T;
}
