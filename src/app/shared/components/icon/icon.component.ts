import { Component, Input } from '@angular/core';
import { IconType } from '../../../core/types/icon.type';

@Component({
  selector: 'app-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss']
})
export class IconComponent {

  private _type: IconType = 'round';
  private readonly _class: string = 'material-icons-';

  get type(): IconType {
    return this._type;
  }

  @Input()
  set type(value: IconType) {
    this._type = value;
  }

  get class() {
    return this._class + this.type;
  }

}
