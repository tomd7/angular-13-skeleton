import { IUser } from '../interfaces/i-user';

export class User implements IUser {

  private _id: number;
  private _email: string;
  private _password: string;
  private _roles: string[];
  private _username: string;

  constructor(id: number, email: string, password: string, roles: string[], username: string) {
    this._id = id;
    this._email = email;
    this._password = password;
    this._roles = roles;
    this._username = username;
  }

  get id(): number {
    return this._id;
  }

  set id(value: number) {
    this._id = value;
  }

  get email(): string {
    return this._email;
  }

  set email(value: string) {
    this._email = value;
  }

  get password(): string {
    return this._password;
  }

  set password(value: string) {
    this._password = value;
  }

  get roles(): string[] {
    return this._roles;
  }

  set roles(value: string[]) {
    this._roles = value;
  }

  get username(): string {
    return this._username;
  }

  set username(value: string) {
    this._username = value;
  }
}
