export interface IStorage {
  save(data: any): void;
  get(): any;
  clear(): void;
}
