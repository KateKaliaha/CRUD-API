export interface IUser {
  id: string;
  username: string;
  age: number;
  hobbies: string[];
}

export type BodyPost = Omit<IUser, 'id'>;
