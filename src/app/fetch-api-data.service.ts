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
    return this.http.post(apiUrl + 'users', userDetails).pipe(
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

@Injectable ({
  providedIn: 'root',
})
export class UserLoginService {
  constructor(private http: HttpClient) {}

  public userLogin(userDetails: any): Observable<any> {
    console.log(userDetails);
    return this.http
    .post(apiUrl + 'login', userDetails)
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

@Injectable({
  providedIn: 'root',
})
export class GetDirectorService {
  constructor(private http: HttpClient) {}

  getDirector(): Observable <any> {
    const token = localStorage.getItem('token');
    return this.http.get(apiUrl + 'movies/directors/:Name', {headers: new HttpHeaders (
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

@Injectable({
  providedIn: 'root',
})
export class GetUserService {
  constructor(private http: HttpClient) {}

  getUser(): Observable <any> {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');

    return this.http.get(apiUrl + 'users/:Username', {headers: new HttpHeaders (
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

@Injectable({
  providedIn: 'root',
})
export class GetFavoritesService {
  constructor(private http: HttpClient) {}

  getFavorites(): Observable <any> {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');

    return this.http.post(apiUrl + 'users/:Username/:movies/:MovieID', {headers: new HttpHeaders (
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

@Injectable({
  providedIn: 'root',
})
export class AddFavoritesService {
  constructor(private http: HttpClient) {}

  addFavorites(id:string): Observable <any> {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');

    return this.http.post(apiUrl + 'users/:Username/:movies/:MovieID', id, {headers: new HttpHeaders (
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

@Injectable({
  providedIn: 'root',
})
export class EditUserService {
  constructor(private http: HttpClient) {}

  updateUser(userDetails:any): Observable <any> {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');

    return this.http.put(apiUrl + 'users/:Username', userDetails, {headers: new HttpHeaders (
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

@Injectable({
  providedIn: 'root',
})
export class DeleteUserService {
  constructor(private http: HttpClient) {}

  deleteUser(): Observable <any> {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');

    return this.http.delete(apiUrl + 'users/:Username', {headers: new HttpHeaders (
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

@Injectable({
  providedIn: 'root',
})
export class RemoveFavoritesService {
  constructor(private http: HttpClient) {}

  removeFavorites(): Observable <any> {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');

    return this.http.post(apiUrl + 'users/:Username/:movies/:MovieID', {headers: new HttpHeaders (
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


