import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/internal/operators';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map } from 'rxjs/operators';
import { inject } from '@angular/core/testing';

@Injectable({
  providedIn: 'root'
})
export class FetchApiDataService {

  constructor() { }
}

//Declaring the api url that will provide data for the client app
const apiUrl = 'https://findamovieflix.herokuapp.com/';

// register user
@Injectable({
  providedIn: 'root'
})
export class UserRegistrationService {
  // Inject the HttpClient module to the constructor params
 // This will provide HttpClient to the entire class, making it available via this.http
  constructor(private http: HttpClient) {}
 // Making the api call for the user registration endpoint
  public userRegistration(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'users', userDetails)
    .pipe(
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

// user login
@Injectable ({
  providedIn: 'root',
})
export class LoginUserService {
  constructor(private http: HttpClient) {}

  public userLogin(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http.post(apiUrl + 'login', userDetails)
    .pipe(catchError(this.handleError));
  }
  private handleError(error: HttpErrorResponse):any {
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

// get all movies
@Injectable({
  providedIn: 'root',
})
export class GetAllMoviesService {
  constructor(private http: HttpClient) {}
  getAllMovies(): Observable<any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies', {headers: new HttpHeaders(
      {
        Authorization: 'Bearer ' + token,
      })
    })
    .pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }
// Non-typed response extraction
  private extractResponseData(res: Response | Object): any {
    const body = res;
    return body || { };
  }
  private handleError(error: HttpErrorResponse):any {
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

// get movie by title
@Injectable({
  providedIn: 'root',
})
export class GetOneMovieService {
  constructor(private http: HttpClient) {}

  getMovieByTitle(): Observable <any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies/:Name', {headers: new HttpHeaders(
      {
        Authorization: 'Bearer' + token,
      })
    }).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    );
  }
  private extractResponseData(res: Response | Object): any {
    const body = res;
    return body || { };
  }
  private handleError(error: HttpErrorResponse):any {
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

// get director
@Injectable({
  providedIn: 'root',
})
export class GetDirectorService {
  constructor(private http: HttpClient) {}

  getDirector(): Observable <any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies/director/:Name', {headers: new HttpHeaders (
      {
        Authorization: 'Bearer' + token,
      }
    )}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    )
  }
  private extractResponseData(res: Response | Object): any {
    const body = res;
    return body || { };
  }
  private handleError(error: HttpErrorResponse):any {
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

// get genre
@Injectable({
  providedIn: 'root',
})
export class GetGenreService {
  constructor(private http: HttpClient) {}

  getGenre(): Observable <any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies/genre/:Name', {headers: new HttpHeaders (
      {
        Authorization: 'Bearer' + token,
      }
    )}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    )
  }
  private extractResponseData(res: Response | Object): any {
    const body = res;
    return body || { };
  }
  private handleError(error: HttpErrorResponse):any {
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

// get users
@Injectable({
  providedIn: 'root',
})
export class GetUsersService {
  constructor(private http: HttpClient) {}

  getUser(): Observable <any> {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');

    return this.http.get(apiUrl + `user/${user}`, {headers: new HttpHeaders (
      {
        Authorization: 'Bearer' + token,
      }
    )}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    )
  }
  private extractResponseData(res: Response | Object): any {
    const body = res;
    return body || { };
  }
  private handleError(error: HttpErrorResponse):any {
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

// get favorite movies
@Injectable({
  providedIn: 'root',
})
export class GetFavoritesService {
  constructor(private http: HttpClient) {}

  getFavorites(id:string): Observable <any> {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');

    return this.http.get(apiUrl + `users/${user}/movies/${id}`, {headers: new HttpHeaders (
      {
        Authorization: 'Bearer' + token,
      }
    )}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    )
  }
  private extractResponseData(res: Response | Object): any {
    const body = res;
    return body || { };
  }
  private handleError(error: HttpErrorResponse):any {
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

// add a favorite movie
@Injectable({
  providedIn: 'root',
})
export class AddFavoritesService {
  constructor(private http: HttpClient) {}

  addFavorites(id:string): Observable <any> {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');

    return this.http.post(apiUrl + `users/${user}/movies/${id}`, id, {headers: new HttpHeaders (
      {
        Authorization: 'Bearer' + token,
      }
    )}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    )
  }
  private extractResponseData(res: Response | Object): any {
    const body = res;
    return body || { };
  }
  private handleError(error: HttpErrorResponse):any {
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

// update user
@Injectable({
  providedIn: 'root',
})
export class UpdateUserService {
  constructor(private http: HttpClient) {}

  updateUser(userDetails:any): Observable <any> {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');

    return this.http.put(apiUrl + `user/${user}`, userDetails, {headers: new HttpHeaders (
      {
        Authorization: 'Bearer' + token,
      }
    )}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    )
  }
  private extractResponseData(res: Response | Object): any {
    const body = res;
    return body || { };
  }
  private handleError(error: HttpErrorResponse):any {
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

// delete user
@Injectable({
  providedIn: 'root',
})
export class DeleteUserService {
  constructor(private http: HttpClient) {}

  deleteUser(): Observable <any> {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');

    return this.http.delete(apiUrl + `users/${user}`, {headers: new HttpHeaders (
      {
        Authorization: 'Bearer' + token,
      }
    )}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    )
  }
  private extractResponseData(res: Response | Object): any {
    const body = res;
    return body || { };
  }
  private handleError(error: HttpErrorResponse):any {
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

// remove favorite movie
@Injectable({
  providedIn: 'root',
})
export class RemoveFavoritesService {
  constructor(private http: HttpClient) {}

  removeFavorites(id:string): Observable <any> {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');

    return this.http.delete(apiUrl + `users/${user}/movies/${id}`, {headers: new HttpHeaders (
      {
        Authorization: 'Bearer' + token,
      }
    )}).pipe(
      map(this.extractResponseData),
      catchError(this.handleError)
    )
  }
  private extractResponseData(res: Response | Object): any {
    const body = res;
    return body || { };
  }
  private handleError(error: HttpErrorResponse):any {
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




