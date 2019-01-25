import { Component, OnInit } from '@angular/core';
import { Router }                   from '@angular/router';
import { MoviesService } from '../movies/movies.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: [
        './header.component.css'
    ]
})
export class HeaderComponent implements OnInit {
    title = 'MovieDB App';

    public constructor(
        // private moviesService: MoviesService,
        private router: Router
    ) {}

    ngOnInit() {}

    public search(query: string) {
        if (/\S/.test(query)) {
            this.router.navigate(['/search', query]);
        }
    }
}
