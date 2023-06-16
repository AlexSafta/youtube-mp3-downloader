export interface YouTubeVideoInfo {
  videoId: string;
  video_url: string;
  title: string;
  description: string;
  thumbnails: {
    url: string;
    width: number;
    height: number;
  }[];
  viewCount: number;
  lengthSeconds: number;
  likes: number | null;
}

export enum STEPS {
  DOWNLOAD,
  CONVERT,
  SAVE,
  SUCCESS,
  FAIL,
}
