import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export interface Entry { 'desc' : string, 'phone' : Phone }
export type Name = string;
export interface NewsSource {
  'domain' : string,
  'source' : string,
  'bias' : string,
  'accuracy' : string,
}
export type Phone = string;
export interface _SERVICE {
  'greet' : ActorMethod<[string], string>,
  'insert' : ActorMethod<[string, string, string, string], undefined>,
  'insertOld' : ActorMethod<[Name, Entry], undefined>,
  'lookup' : ActorMethod<[string], [] | [NewsSource]>,
  'lookupOld' : ActorMethod<[Name], [] | [Entry]>,
}
