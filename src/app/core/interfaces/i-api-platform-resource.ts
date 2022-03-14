import {IApiResource} from './i-api-resource';
import {AssociativeArray} from '../types/associative-array';

export interface IApiPlatformResource extends IApiResource {

  uri?: string;

  serialize(): AssociativeArray;
  deserialize(json: AssociativeArray): void;

}
