import { Injectable } from '@angular/core';
import { HttpClient, HttpResponseBase, HttpResponse } from '@angular/common/http';
import { Observable, from } from 'rxjs';
import { map } from  'rxjs/operators';

import { IMovie } from './IMovie';
import { ISearch } from './ISearch';

@Injectable()
export class MoviesService {
    private url = 'https://api.themoviedb.org/3/movie/';
    private searchUrl = 'https://api.themoviedb.org/3/search/movie';
    private apiKey = '4f274e286c0dcca47936de60a193f303';
    private language = 'ru';

    public constructor(
        private http: HttpClient
    ) {}

    public getMovies(page: number = 1) {
        const moviesUrl = `${this.url}popular?api_key=${this.apiKey}&language=${this.language}&page=${page}`;

        return this.http.get<ISearch>(moviesUrl)
            .pipe(
                map(res => res.results || [])
            )
            
    }

    public searchMovies(query: string, page: number = 1) {
        const searchUrl = `${this.searchUrl}?api_key=${this.apiKey}&language=${this.language}&query=${query}`;

        return this.http.get<ISearch>(searchUrl)
            .pipe(
                map(res => res.results || [])
            );
    }
    
}
