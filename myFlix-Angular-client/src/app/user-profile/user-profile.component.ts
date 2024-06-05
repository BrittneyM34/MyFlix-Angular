import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FetchApiDataService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  userData: any = {};
  favoriteMovies: any[] = [];
  constructor(
    public fetchApiData: FetchApiDataService,
    private router: Router) {
    this.userData = JSON.parse(localStorage.getItem("user") || "");
  }

  ngOnInit(): void {
    this.getUser();
  }

  updateUser(): void {
    this.fetchApiData.editUser(this.userData).subscribe((result: any) => {
      this.userData = {
        ...result,
        id: result.id,
        password: this.userData.password,
        token: this.userData.token
      };
      localStorage.setItem("user", JSON.stringify(this.userData));
      this.getFavoriteMovies();
    }, (error: any) => {
      console.error(error)
    });
  }

  resetUser(): void {
    this.userData = JSON.parse(localStorage.getItem("user") || "");
  }
  backToMovies(): void {
    this.router.navigate(["movies"]);
  }

  getFavoriteMovies(): void {
    this.fetchApiData.getAllMovies().subscribe((result: any) => {
      this.favoriteMovies = result.filter((movie: any) => {
        return this.userData.favoriteMovies.includes(movie._id)
      })
    }, (error: any) => {
      console.error(error);
    });
  }

  getUser(): void {
    this.fetchApiData.getUser(this.userData).subscribe((result: any) => {
      this.userData = {
        ...result,
        id: result._id,
        password: this.userData.password,
        token: this.userData.token
      };
      localStorage.setItem("user", JSON.stringify(this.userData));
      this.getFavoriteMovies();
    })
  }

  deleteUser(): void {
    this.fetchApiData.getUser(this.userData).subscribe((result: any) => {
      this.userData = {
        ...result,
        id: result._id,
        password: this.userData.password,
        token: this.userData.token
      };
      localStorage.deleteItem("user", JSON.stringify(this.userData));
    })
  }

  deleteFavoriteMovie(movie: any): void {
    this.fetchApiData.deleteFavoriteMovie(this.userData.id, movie.title).subscribe((result: any) => {
      this.userData.favoriteMovies = result.favoriteMovies;
      this.getFavoriteMovies();
    }, (error: any) => {
      console.error(error)
    })
  }

  logoutUser(): void {
    this.router.navigate(["welcome"]);
    localStorage.removeItem("user");
  }

}
