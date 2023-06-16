import { YouTubeVideoInfo } from "../models/Youtube"
import RouteNames from "./RouteNames"

export type NavigationParams = {
  [RouteNames.InitialScreen]: undefined
  [RouteNames.DownloadingScreen]: {
    videoDetails: YouTubeVideoInfo
  }
}