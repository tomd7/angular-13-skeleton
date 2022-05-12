import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
import { IUser } from '../../interfaces/i-user';
import { LocalStorageKey } from '../../enums/local-storage-key';

@Injectable({
  providedIn: 'root'
})
export class UserStorageService extends StorageService<IUser> {

  /** Key for the user that is logged in */
  protected readonly _key: LocalStorageKey = LocalStorageKey.USER;

}
