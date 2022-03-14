import {IApiResource} from './i-api-resource';

export interface IUser extends IApiResource {

  email: string;
  username: string;
  password?: string;
  roles: string[];

}
