import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import  { MessageBoxComponent } from '../message-box/message-box.component';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent {

  movies: any[] = [];
  constructor(
    public fetchApiData: FetchApiDataService,
    public router: Router,
    public dialog: MatDialog

  ) { }

  ngOnInit(): void {
    this.getMovies();
  }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((response: any) => {
      this.movies = response;
      console.log(this.movies);
      return this.movies;
    });
  }

  logoutUser(): void {
    this.router.navigate(["welcome"]);
    localStorage.removeItem("user");
  }

  redirectProfile(): void {
    this.router.navigate(["profile"]);
  }

  showGenre(movie: any): void {
    this.dialog.open(MessageBoxComponent, {
      data: {
        title: movie.genre.name,
        content: movie.genre.description
      },
      width: "400px"
    })
  }

  showDirector(movie: any): void {
    this.dialog.open(MessageBoxComponent, {
      data: {
        title: movie.director.name,
        content: movie.director.bio
      },
      width: "400px"
    })
  }

  showDetails(movie: any): void {
    this.dialog.open(MessageBoxComponent, {
      data: {
        title: movie.title,
        content: movie.description
      },
      width: "400px"
    })
  }



}
