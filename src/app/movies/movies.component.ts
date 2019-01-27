import { Component, OnInit }        from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { skipWhile, tap } from 'rxjs/operators';

import { IMovie } from './IMovie'; 
import { MoviesService } from './movies.service';
import { IGenre } from './IGenre';
import { ISearch } from './ISearch';


@Component({
    selector: 'app-movies',
    templateUrl: './movies.component.html',
    styleUrls: ['./movies.component.css'],
})
export class MoviesComponent implements OnInit {
    public movies: IMovie[] = [];
    public httpReqestInProgress: boolean = false;
    public genres: IGenre[];
    private currentPage = 1;
    private query: string = '';
    private totalPages: number = 0;

    public constructor(
        // private router: Router,
        private route: ActivatedRoute,
        private moviesService: MoviesService
    ) {}

    public async ngOnInit() {
        this.genres = await this.moviesService.getGenres();
        this.getOrSearchMovies();
    }

    public onScroll (): void {
        this.totalPages >= this.currentPage && this.getMovies(
            this.currentPage,
            (res) => {
                this.movies = [...this.movies, ...res.results].map(movie => {
                    return {
                        ...movie,
                        genres: this.genres.filter(genre => movie.genre_ids.some(id => id === genre.id))
                    }
                });
            }
        );
    }

    private getMovies(page: number = 1, cb: (movies: ISearch) => void) {
        if (this.query) {
            this.moviesService.searchMovies(this.query, this.currentPage)
                .pipe(
                    skipWhile(() => this.httpReqestInProgress),
                    tap(() => { this.httpReqestInProgress = true; })
                )
                .subscribe(res => {
                    this.currentPage++;
                    cb(res);
                    this.httpReqestInProgress = false;
                });
        } else {
            this.moviesService.getMovies(page)
                .pipe(
                    skipWhile(() => this.httpReqestInProgress),
                    tap(() => { this.httpReqestInProgress = true; })
                ).subscribe(res => {
                    this.currentPage++;
                    cb(res);
                    this.httpReqestInProgress = false;
                });
        }
    }

    private getOrSearchMovies() {
        this.route.params.subscribe(
            params => {
                this.query = params['query'];
                this.getMovies(
                    this.currentPage,
                    (res) => {
                        this.movies = (!this.query ?
                                [...this.movies, ...res.results] :
                                res.results).map(movie => {
                            return {
                                ...movie,
                                genres: this.genres.filter(genre => movie.genre_ids.some(id => id === genre.id))
                            }
                        });

                        this.totalPages = res.total_pages;
                    }
                );
            }
        );
    }
}
