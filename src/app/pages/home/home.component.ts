import { Component, OnInit } from '@angular/core';
import { TubeService } from '../../services/tube.service';
import { Video } from '../../models/tube.models';
import Swall from 'sweetalert2'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  videos: Video[] = [];

  constructor( private tubeService: TubeService ) { }

  ngOnInit(): void {

    this.cargarVideos();

  }

  cargarVideos() {

    this.tubeService.getVideos().subscribe( res => {

      this.videos.push( ...res );

      console.log( this.videos );

    })

  }

  mostrarVideo( video: Video ) {

    console.log( video );

    Swall.fire({
      html: `
      <h4> ${ video.title } </h4>
      <hr>
      <iframe width="100%"
              height="315"
              src='https://www.youtube.com/embed/${ video.resourceId.videoId }'
              frameborder="0" allow="accelerometer; autoplay;
              clipboard-write; encrypted-media;
              gyroscope;
              picture-in-picture" allowfullscreen>
      </iframe>
      `
    })

  }

}
