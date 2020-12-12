import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TubeResponse } from '../models/tube.models';
import { map } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class TubeService {

  private url = 'https://www.googleapis.com/youtube/v3/';
  private apikey = 'AIzaSyCqIk7PTsHzXiCRcYrd268NUgphRE54x4I';
  private playlist = 'UUfknJn7W2MRC25I0b5nHdDw';
  private nextPageToken = '';
  private prevPageToken = '';

  constructor( private http: HttpClient ) {}

  // https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&key=AIzaSyCqIk7PTsHzXiCRcYrd268NUgphRE54x4I&playlistId=UUuaPTYj15JSkETGnEseaFFg&maxResults=10

  getVideos( opcion: string ) {

    console.log(opcion);

    const url = `${ this.url }playlistItems`;

    if(opcion === 'adelante') {

      const params = new HttpParams()
      .set('part', 'snippet')
      .set('maxResults', '8')
      .set('playlistId', this.playlist)
      .set('key', this.apikey)
      .set('pageToken', this.nextPageToken)

    return this.http.get<TubeResponse>( url, { params: params })
      .pipe(

        map( res => {

          // console.log( res );

          this.nextPageToken = res.nextPageToken;
          if( res.prevPageToken ) {
            this.prevPageToken = res.prevPageToken;
          };

          return res.items;
        }),
        map( items => {

          return items.map( video => video.snippet )
        })
      )
    }else if( opcion === 'atras' && this.prevPageToken ) {

      const params = new HttpParams()
      .set('part', 'snippet')
      .set('maxResults', '8')
      .set('playlistId', this.playlist)
      .set('key', this.apikey)
      .set('pageToken', this.prevPageToken)

    return this.http.get<TubeResponse>( url, { params: params })
      .pipe(

        map( res => {

          // console.log( res );

          this.nextPageToken = res.nextPageToken;
          if( res.prevPageToken ) {this.prevPageToken = res.prevPageToken};

          return res.items;
        }),
        map( items => {

          return items.map( video => video.snippet )
        })
      )
    }


  }
}
