import {Video} from './YouTubeProvider';

export type Response<T> = Promise<{response: T}>;

export abstract class Provider {
  /** returns number of videos on provided playlist */
  static numberOfVideos(url: string): Response<number> {
    throw new Error('NOT IMPLEMENTED');
  }
  /** returns list of videos on provided playlist */
  static getVideoList(url: string): Response<Video[]> {
    throw new Error('NOT IMPLEMENTED');
  }
  /** gets the last provided video */
  static getLastVideo(url: string): Response<Video> {
    throw new Error('NOT IMPLEMENTED');
  }
  /** returns videos by provided title */
  static getVideoByTitle(url: string, videoTitle: string): Response<Video> {
    throw new Error('NOT IMPLEMENTED');
  }
}
