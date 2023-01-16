import { IUser } from './interfaces';

export let users: IUser[] = [];

export function changeUsersData(value: IUser[]) {
  users = [...value];
}
