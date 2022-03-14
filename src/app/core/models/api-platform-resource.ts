import {AssociativeArray} from '../types/associative-array';
import {IApiPlatformResource} from '../interfaces/i-api-platform-resource';

export abstract class ApiPlatformResource implements IApiPlatformResource {

  protected _id?: number | undefined;
  protected _uri?: string | undefined;

  protected constructor(
    protected _json: AssociativeArray
  ) {
    this.deserialize(_json);
  }

  deserialize(json: AssociativeArray): void {
    this._id = json['id'];
    this._uri = json['@id'];
  }

  serialize(): AssociativeArray {
    return {
      '@id': this.uri,
      id: this.id
    };
  }

  get id(): number | undefined {
    return this._id;
  }

  set id(value: number | undefined) {
    this._id = value;
  }

  get uri(): string | undefined {
    return this._uri;
  }

  set uri(value: string | undefined) {
    this._uri = value;
  }
}
