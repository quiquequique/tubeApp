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
  private playlist = 'UUuaPTYj15JSkETGnEseaFFg';
  private nextPageToken = '';

  constructor( private http: HttpClient ) {}

  // https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&key=AIzaSyCqIk7PTsHzXiCRcYrd268NUgphRE54x4I&playlistId=UUuaPTYj15JSkETGnEseaFFg&maxResults=10

  getVideos() {

    const url = `${ this.url }playlistItems`;

    const params = new HttpParams()
      .set('part', 'snippet')
      .set('maxResults', '12')
      .set('playlistId', this.playlist)
      .set('key', this.apikey)
      .set('pageToken', this.nextPageToken)

    return this.http.get<TubeResponse>( url, { params: params })
      .pipe(

        map( res => {

          this.nextPageToken = res.nextPageToken;

          return res.items;
        }),
        map( items => {

          return items.map( video => video.snippet )
        })
      )

  }
}
