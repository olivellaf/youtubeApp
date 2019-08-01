import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import 'rxjs/Rx';

@Injectable({
  providedIn: 'root'
})
export class YoutubeService {

  private youtubeUrl: string = "https://www.googleapis.com/youtube/v3";
  private apiKey: string = "AIzaSyAwNGymibaiJsjmNKqlIKVIlb11c50ZU8g";
  private playlist: string =  "UUK59dYVs3Wgwoe73nDTH6jw";

  private nextPageToken = "";

  constructor(public _http: Http) {  }

  getVideos() {
    let url = `${this.youtubeUrl}/playlistItems`;
    let params = new URLSearchParams();

    params.set('part', 'snippet');
    params.set('maxResults', '9');
    params.set('playlistId', this.playlist);
    params.set('key', this.apiKey);

    if( this.nextPageToken ) {
      params.set('pageToken', this.nextPageToken);
    }

    return this._http.get( url, { search: params } )
        .map( res => {
          //console.log(res.json());
          this.nextPageToken = res.json().nextPageToken;

          let videos: any[] = [];
          for (let video of res.json().items) {
              let snippet = video.snippet;
              videos.push(snippet);
          }

          return videos;
        });
  }
}
