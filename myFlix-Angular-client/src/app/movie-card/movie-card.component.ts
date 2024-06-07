import { Component, OnInit } from '@angular/core';
import { FetchApiDataService } from '../fetch-api-data.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MessageBoxComponent } from '../message-box/message-box.component';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent implements OnInit {
  movies: any[] = [];
  constructor(
    public fetchApiData: FetchApiDataService,
    public router: Router,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,

  ) { }

  ngOnInit(): void {
    this.getMovies();
  }

  getMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((result: any) => {
      this.movies = result;

      let user = JSON.parse(localStorage.getItem("user") || "");
      this.movies.forEach((movie: any) => {
        movie.isFavorite = user.favoriteMovies.includes(movie._id);
      })
      return this.movies;
    }, error => {
      console.error(error)
    })
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

  modifyFavoriteMovies(movie: any): void {
    let user = JSON.parse(localStorage.getItem("user") || "");
    let icon = document.getElementById(`${movie._id}-favorite-icon`);

    if (user.favoriteMovies.includes(movie._id)) {
      this.fetchApiData.deleteFavoriteMovie(user.username, movie._id).subscribe(result => {
        icon?.setAttribute("fontIcon", "favorite_border");

        console.log("delete successful");
        console.log(result);
        user.favoriteMovies = result.favoriteMovies;
        localStorage.setItem("user", JSON.stringify(user));
        this.snackBar.open('Movie deleted from favorites', 'OK', {
          duration: 2000
        });
      }, error => {
        console.error(error)
      })
    } else {
      this.fetchApiData.addFavoriteMovie(user.username, movie._id).subscribe(result => {
        icon?.setAttribute("fontIcon", "favorite");

        console.log("add successful")
        console.log(result);
        user.favoriteMovies = result.favoriteMovies;
        localStorage.setItem("user", JSON.stringify(user));
        this.snackBar.open('Movie added to favorites', 'OK', {
          duration: 2000
        });
      }, error => {
        console.error(error)
      })
    }
    localStorage.setItem("user", JSON.stringify(user));
  }
  
}
