import { Component, OnInit } from '@angular/core';
import { Router }                   from '@angular/router';

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
        private router: Router
    ) {}

    ngOnInit() {}

    public search(query: string) {
        if (/\S/.test(query)) {
            this.router.navigate(['/search', query]);
        }
    }
}
