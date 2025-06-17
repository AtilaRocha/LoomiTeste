export interface IBaseApplication<T = void, R = void> {
  execute(input: T): R;
}
