import { Provider } from './Provider';

/**constants */
export const API_KEY = 'AIzaSyCC2XbO06o4qYUPKe1aXvs49leWqfe6SmE';
const BASE_URL = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=`;
const CHANNEL_ID = 'UCJ9YXN2McAbVn8c3qVar-8A';
export const NEUROTRENING_ID = 'PLFhHSWU8pednOeXAoKjkVDDLCMP-Jsy9D';
export const RELAKASACJA_ID = 'PLFhHSWU8pedn4pVtC9b3tutT3N31syfV1';
export const WZMOCNIENIE_ID = 'PLFhHSWU8pedm6Sk64wzl4E53NyCUrug6B';

export interface Playlist {
  kind: string;
  etag: string;
  items: Video[];
}
/**video structure used in the app */
export interface Video {
  id: string;
  title: string;
  position: number;
}
const fetchPlaylist = async (url: string) => {
  const res = await fetch(
    `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&playlistId=${url}&key=${API_KEY}`,
    {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    }
  );
  console.log();
  const r = res.json();
  console.log('fetch response' + r);
  return r;
};

class YouTubeProvider extends Provider {
  static async numberOfVideos(url: string) {
    const apiResponse = await fetchPlaylist(url);
    const response: number = apiResponse.pageInfo.totalResults;
    return { response };
  }
  static async getVideoList(url: string) {
    const apiResponse = await fetchPlaylist(url);
    const response: Video[] = apiResponse.items
      .slice(0)
      .reverse()
      .map(
        (video: {
          snippet: {
            position: number;
            resourceId: { videoId: string };
            title: string;
          };
        }) => ({
          id: video.snippet.resourceId.videoId,
          position: video.snippet.position,
          title: video.snippet.title,
        })
      );
    return { response };
  }
  static async getLastVideo(url: string) {
    const apiResponse = await fetchPlaylist(url);
    const max = await YouTubeProvider.numberOfVideos(url);
    const response: Video = {
      id: apiResponse.items[max.response - 1].snippet.resourceId.videoId,
      position: apiResponse.items[max.response - 1].snippet.position,
      title: apiResponse.items[max.response - 1].snippet.title,
    };
    return { response };
  }
  static async getVideoByTitle(url: string, videoTitle: string) {
    const apiResponse = await fetchPlaylist(url);
    const v = apiResponse.items.indexOf(
      apiResponse.items.snippet.title === videoTitle
    );
    const response: Video = {
      title: v.snippet.title,
      id: v.snippet.resourceId.videoId,
      position: v.snippet.position,
    };
    return { response };
  }
}

export default YouTubeProvider;
