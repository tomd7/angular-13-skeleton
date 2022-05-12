import { Injectable } from '@angular/core';
import { ApiResourceService } from './api-resource.service';
import { IUser } from '../interfaces/i-user';

@Injectable({
  providedIn: 'root'
})
export class UserService extends ApiResourceService<IUser> {

  protected readonly _endpoint: string = '/users';

}
