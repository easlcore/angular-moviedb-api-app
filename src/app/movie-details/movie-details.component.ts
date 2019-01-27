import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { MoviesService } from '../movies/movies.service';
import { IMovie } from '../movies/IMovie';
import { forkJoin } from 'rxjs';
import { FavoritesService } from '../favorites/favorites.service';

@Component({
    selector: 'app-movie-details',
    templateUrl: './movie-details.component.html',
    styleUrls: ['./movie-details.component.css']
})
export class MovieDetailsComponent implements OnInit {
    public movie: IMovie;
    public recommendations: IMovie[];
    public favorites: IMovie[];

    public constructor(
        private moviesService: MoviesService,
        private route: ActivatedRoute,
        private location: Location,
        private favoritesService: FavoritesService
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
                        })
                }
            }
        );

        this.favoritesService.select('favorites', [])
            .subscribe(res => {
                this.favorites = res;
            });
    }

    public goBack() {
        this.location.back();
    }

    public addToFavorite(event, movie: IMovie) {
        event.stopPropagation();
        const arr = [...this.favorites, movie];
        this.favoritesService.set('favorites', arr);
    }

    public removeFromFavorite(event, movie: IMovie) {
        event.stopPropagation();
        const arr = this.favorites.filter(item => item.id !== movie.id);
        this.favoritesService.set('favorites', arr);
    }

    public isInFavorites(id: number) {
        return this.favorites.some(movie => movie.id === id);
    }

    private getDetails(id: number) {
        return this.moviesService.getMovieDetails(id);
    }

    private getRecomendations(id: number) {
        return this.moviesService.getRecomendations(id);
    }
}
