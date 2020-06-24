export type Response<T> = Promise<{response: T}>;

export abstract class Dictionary {
  /** returns number of videos on provided playlist */
  static getWords(letter: string): Response<string[]> {
    throw new Error('NOT IMPLEMENTED');
  }
  static numberOfWords(word: string): Response<number> {
    throw new Error('NOT IMPLEMENTED');
  }
  /** returns list of videos on provided playlist */
}
