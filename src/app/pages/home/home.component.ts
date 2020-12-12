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
  hayAtras: boolean = false;

  private contador = 0;

  constructor( private tubeService: TubeService ) { }

  ngOnInit(): void {

    this.tubeService.getVideos( 'adelante' ).subscribe( res => {

      // console.log(res);

      this.videos.push( ...res );


    })

  }

  cargarVideos( opcion: string ) {

    // console.log( opcion );

    this.tubeService.getVideos( opcion ).subscribe( res => {

      // console.log(res);

      this.videos = [];

      this.videos.push( ...res );

      if(opcion === 'adelante'){
        this.contador = this.contador + 1;
      }

      if(opcion === 'atras'){
        this.contador = this.contador - 1;
      }

      if( this.contador <= 0 ) {

        this.hayAtras = false;

      } else {

        this.hayAtras = true;

      }


      // this.hayAtras = true;

      // console.log( this.contador );
      // console.log( this.hayAtras );
      

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
