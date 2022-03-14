import {Injectable} from '@angular/core';
import {StorageService} from './storage.service';
import {LocalStorageKey} from '../../enums/local-storage-key';
import {Theme} from '../../enums/theme';

@Injectable({
  providedIn: 'root'
})
export class ThemeService extends StorageService<Theme> {

  protected readonly _key: LocalStorageKey = LocalStorageKey.THEME;

  public override save(theme: Theme) {
    if (theme === Theme.SYSTEM) {
      this.clear();
    } else {
      super.save(theme);
    }
  }

}
