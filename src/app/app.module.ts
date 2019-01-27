import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule }    from '@angular/common/http';

import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { MoviesComponent } from './movies/movies.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { MoviesService } from './movies/movies.service';
import { FavoritesService } from './movies/favorites.service';

const appRoutes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full'},
    { path: 'home', component: MoviesComponent },
    { path: 'search/:query', component: MoviesComponent },
    { path: 'movie/:id', component: MovieDetailsComponent },
    { path: '**', component: PageNotFoundComponent },
]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    MoviesComponent,
    PageNotFoundComponent,
    MovieDetailsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes, { useHash: true }),
    HttpClientModule,
    InfiniteScrollModule
  ],
  exports: [ RouterModule ],
  providers: [
    MoviesService,
    FavoritesService
  ],
  bootstrap: [
      AppComponent
    ]
})
export class AppModule { }
