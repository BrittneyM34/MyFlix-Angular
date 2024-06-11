import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';

//Declaring the api url that will provide data for the client app
const apiUrl = 'https://my-movies-8ed51d856f3e.herokuapp.com/';
@Injectable({
  providedIn: 'root'
})
export class FetchApiDataService {
  // Inject the HttpClient module to the constructor params
  // This will provide HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient) {
  }

  /**
   * create new user
   * @param {Object} userDetails must include username, password, email, and birthday
   * @returns 
   */
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'users', userDetails).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * login
   * @param {Object} userDetails must include username and password
   * @returns 
   */
  public userLogin(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'login', userDetails).pipe(
      catchError(this.handleError)
    );
  }

  /**
   * get all movies
   * @returns array of movies, if token is false, status 401
   */
  getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies', {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

// Non-typed response extraction
  private extractResponseData(res: Object): any {
    const body = res;
    return body || {};
  }
  
  /**
   * get movie with title
   * @param {string} title 
   * @returns movie object. if movie doesn't exist, 'no such movie'. if token is false, 'unauthorized'
   */
  getOneMovie(title: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies/' + title, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * get director with name
   * @param {string} directorName 
   * @returns director object. if director doesn't exist, 'no such director'. if token is false, 'unauthorized'
   */
  getDirector(directorName: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies/directors/' + directorName, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * get genre with name
   * @param {string} genreName 
   * @returns genre object. if genre doesn't exist, 'no such genre'. if token is false, 'unauthorized'
   */
  getGenre(genreName: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies/genres' + genreName, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * get user with username
   * @param {string} username 
   * @returns user object. if user doesn't exist, 'no such user'. if token is false, 'unauthorized'
   */
  getUser(username: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'users/' + username, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * get favorite movie
   * @param username 
   * @returns favorite movies object. if favorite movies don't exist, 'no favorite movies'. if token is false, 'unauthorized'
   */
  getFavoriteMovie(username: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'users/' + username, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      map((data) => data.favoriteMovies),
      catchError(this.handleError)
    );
  }

  /**
   * add movie to user's favorites list
   * @param username 
   * @param movieID 
   * @returns if add movie is successful 'user object'. if movie doesn't exist, 'no such movie'. if token is false, 'unauthorized'
   */
  addFavoriteMovie(username: string, movieID: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.post(apiUrl + 'users/' + username + '/movies/' + movieID, {}, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * edit user
   * @param username must incluse username
   * @returns if update user's details is successful, user object. if token is false, 'unauthorized'
   */
  editUser(username: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.put(apiUrl + 'users/' + username, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        }
      )
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * delete user
   * @param username 
   * @returns if delete user was successful, '${username} was deleted'. if token is false, 'unauthorized'
   */
  deleteUser(username: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.delete(apiUrl + 'users/' + username, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        }
      )
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  /**
   * delete a movie from favorites
   * @param username 
   * @param movieID 
   * @returns if delete movie was successfully, user object. if token is false, 'unauthorized'
   */
  // Making the api call for the Delete a Movie from Favorites endpoint
  deleteFavoriteMovie(username: string, movieID: string): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.delete(apiUrl + 'users/' + username + '/movies/' + movieID, {
      headers: new HttpHeaders(
        {
          Authorization: 'Bearer ' + token,
        }
      )
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('Some error occurred:', error.error.message);
    } else {
      console.error(
        `Error Status code ${error.status}, ` +
        `Error body is: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  }
}
