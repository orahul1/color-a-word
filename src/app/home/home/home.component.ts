import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { debounceTime } from "rxjs/operators";
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  searchSubject: Subject<any> = new Subject<any>();
  searchResult:any;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.searchSubject.pipe(
      debounceTime(500)).subscribe(searchTextValue => {
        this.http.get(`https://api.unsplash.com/search/photos?client_id=${environment.ACCESS_KEY}&query=${searchTextValue}`)
        .subscribe((data:any) => {
          this.searchResult = data.results;
        })
      }
    )
  }

  searchImages(e:any){
    this.searchSubject.next(e.target.value);
  }

}
