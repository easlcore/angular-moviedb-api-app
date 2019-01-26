import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { MoviesService } from '../movies/movies.service';
import { IMovie } from '../movies/IMovie';

@Component({
    selector: 'app-movie-details',
    templateUrl: './movie-details.component.html',
    styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit {
    public movie: IMovie;

    public constructor(
        private moviesService: MoviesService,
        private route: ActivatedRoute,
        private location: Location
    ) {}

    ngOnInit() {
        this.route.params.subscribe(
            params => {
                const id = params['id'];
                if (id) {
                    this.getDetails(id);
                }
            }
        )
    }

    private getDetails(id: number) {
        this.moviesService.getMovieDetails(id)
            .subscribe(
                res => {
                    this.movie = res;
                }
            )
    }
}
