import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGifsResponse } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private _apiKey: string = 'xcuV5mg5h2XPEBT4ot9lYNdLwaA3WTlA';
  private _url: string = `https://api.giphy.com/v1/gifs`;
  private _history: string[] = [];

  public results: Gif[] = [];

  get history() {
    return [...this._history];
  }

  constructor(private http: HttpClient) {
    this._history = JSON.parse(localStorage.getItem('historial')!) ?? [];
    this.results = JSON.parse(localStorage.getItem('resultados')!) ?? [];


  }

  searchGifs(query: string) {

    query = query.trim().toLowerCase();

    if (!this._history.includes(query)) {
      this._history = this._history.splice(0, 9);
      this._history.unshift(query);

      localStorage.setItem('historial', JSON.stringify(this._history));
    }

    const params = new HttpParams()
      .set('api_key', this._apiKey)
      .set('limit', 10)
      .set('q', query);

    this.http.get<SearchGifsResponse>(`${this._url}/search`, {params})
      .subscribe(response => {
        console.log(response.data);
        this.results = response.data;
        localStorage.setItem('resultados', JSON.stringify(this.results));
      });


  }
}
