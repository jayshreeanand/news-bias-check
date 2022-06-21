import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export type Domain = string;
export interface NewsSource {
  'domain' : string,
  'source' : string,
  'bias' : string,
  'accuracy' : string,
}
export interface _SERVICE {
  'getNewsSources' : ActorMethod<[], Array<[Domain, NewsSource]>>,
  'insert' : ActorMethod<[string, string, string, string], undefined>,
  'lookup' : ActorMethod<[string], [] | [NewsSource]>,
}
