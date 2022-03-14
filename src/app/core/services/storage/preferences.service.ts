import {Injectable} from '@angular/core';
import {StorageService} from './storage.service';
import {LocalStorageKey} from '../../enums/local-storage-key';
import {AssociativeArray} from '../../types/associative-array';

@Injectable({
  providedIn: 'root'
})
export class PreferencesService extends StorageService<AssociativeArray> {

  protected readonly _key: LocalStorageKey = LocalStorageKey.PREFERENCES;

}
