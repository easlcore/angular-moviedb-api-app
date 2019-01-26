import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { MoviesService } from '../movies/movies.service';
import { IMovie } from '../movies/IMovie';
import { forkJoin } from 'rxjs';

@Component({
    selector: 'app-movie-details',
    templateUrl: './movie-details.component.html',
    styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit {
    public movie: IMovie;
    public recommendations: IMovie[];

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
                    const details = this.getDetails(id);
                    const recommendations = this.getRecomendations(id);

                    forkJoin([details, recommendations])
                        .subscribe(results => {
                            this.movie = results[0];
                            this.recommendations = results[1];
                            console.log(results)
                        })
                }
            }
        )
    }

    private getDetails(id: number) {
        return this.moviesService.getMovieDetails(id);
    }

    private getRecomendations(id: number) {
        return this.moviesService.getRecomendations(id);
    }
}
