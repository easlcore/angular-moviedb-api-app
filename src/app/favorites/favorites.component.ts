import { Component, OnInit } from '@angular/core';
import { IMovie } from '../movies/IMovie';
import { FavoritesService } from './favorites.service';

@Component({
    selector: 'app-favorites',
    templateUrl: './favorites.component.html',
    styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {
    public favorites: IMovie[];

    constructor(
        private favoritesService: FavoritesService
    ) {}

    ngOnInit() {
        this.favoritesService.select('favorites', [])
            .subscribe(res => {
                this.favorites = res;
            });
    }

    public removeFromFavorite(event, movie: IMovie) {
        event.stopPropagation();
        const arr = this.favorites.filter(item => item.id !== movie.id);
        this.favoritesService.set('favorites', arr);
    }
}
