import { Query } from '~/types';

declare module 'qs' {
  export interface ParsedQs extends Query<T> {
    [key: string]: undefined | string | string[] | ParsedQs | ParsedQs[];
  }
}
