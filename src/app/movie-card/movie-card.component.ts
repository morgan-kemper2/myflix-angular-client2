import { Component, OnInit } from '@angular/core';
import { GetAllMoviesService,  } from '../fetch-api-data.service'
import { MatDialog } from '@angular/material/dialog';

// This import is used to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatButtonModule } from '@angular/material/button';

import {DirectorDetailsComponent} from '../director-details/director-details.component';
import { MovieDetailsComponent } from '../movie-details/movie-details.component';
import { GenreDetailsComponent } from '../genre-details/genre-details.component';

@Component({
  selector: 'app-movie-card',
  templateUrl: './movie-card.component.html',
  styleUrls: ['./movie-card.component.scss']
})
export class MovieCardComponent {
  movies: any[] = [];
  constructor(
    public fetchApiData: GetAllMoviesService,
    public dialog: MatDialog,
    public snackbar: MatSnackBar,
    public buttonModule: MatButtonModule
    ) { }

ngOnInit(): void {
  this.getMovies();
}

//all movies
getMovies(): void {
  this.fetchApiData.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      console.log(this.movies);
      return this.movies;
    });
  }

  // creates a dialog box that displays information like name, bio, dob, and dod, 
  showDirectorDialog(name:string, bio:string, birth: Date, death: Date): void {
    this.dialog.open(DirectorDetailsComponent, {
      data: {
        name, bio, birth, death
      },
      width: '350px'
    })
  }
  
  // creates a dialog box that displays genre information
  showGenreDialog(name:string, description:string):void{
    this.dialog.open(GenreDetailsComponent, {
      data: {name, description},
      width: '350px'
    })
  }

  // creates a dialog box that displays all movie details
  showDetailsDialog(name:string, imageurl:string, description:string, director:string, genre:string): void {
    this.dialog.open(MovieDetailsComponent, {
      data: {name, imageurl, description, director, genre },
      width: '350px'
    })
  }
}

