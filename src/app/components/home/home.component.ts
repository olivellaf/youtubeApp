import { Component, OnInit } from '@angular/core';
import { YoutubeService } from 'src/app/services/youtube.service';

declare var $:any; // good way to use $ for jquery and more... :)

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styles: []
})
export class HomeComponent implements OnInit {

  videos: any[] = [];
  selectedVid: any;

  constructor(public _yts: YoutubeService) {
    this._yts.getVideos()
      .subscribe( videos => this.videos = videos );
  }

  ngOnInit() {
  }

  watchVideo(video: any) {
    this.selectedVid = video;
    $('#myModal').modal();
  }

  closeModal() {
    this.selectedVid = null;
    $('#myModal').modal('hide');
  }

  loadMoreVideos() {
    // uses similar getVideos, but the service are going to stay alert for pageToken
    this._yts.getVideos()
      .subscribe( videos => this.videos.push.apply( this.videos, videos ));
  }

}
