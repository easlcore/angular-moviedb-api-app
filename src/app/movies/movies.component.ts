import { Component, OnInit }        from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { skipWhile, tap } from 'rxjs/operators';

import { IMovie } from './IMovie'; 
import { MoviesService } from './movies.service';


@Component({
    selector: 'app-movies',
    templateUrl: './movies.component.html',
    styleUrls: ['./movies.component.css'],
})
export class MoviesComponent implements OnInit {
    public movies: IMovie[] = [];
    public httpReqestInProgress: boolean = false;
    private currentPage = 1;
    private query: string = '';

    public constructor(
        // private router: Router,
        private route: ActivatedRoute,
        private moviesService: MoviesService
    ) {}

    public ngOnInit() {
        this.route.params.subscribe(
            params => {
                this.query = params['query'];
                if (this.query) {
                    this.moviesService.searchMovies(this.query)
                        .subscribe(res => {
                            this.movies = res;
                        });
                } else {
                    this.getMovies(
                        this.currentPage,
                        (movies) => {
                            this.movies = [...this.movies, ...movies];
                        }
                    );
                }
            }
        );
    }

    public onScroll (): void {
        this.getMovies(
            this.currentPage,
            (movies) => {
                this.movies = [...this.movies, ...movies];
            }
        );
    }

    private getMovies(page: number = 1, cb: (movies: IMovie[]) => void) {
        this.moviesService.getMovies(page)
            .pipe(
                skipWhile(() => this.httpReqestInProgress),
                tap(() => { this.httpReqestInProgress = true; })
            ).subscribe((movies: IMovie[]) => {
                this.currentPage++;
                cb(movies);
                this.httpReqestInProgress = false;
            });
    }
}
