import { Component, OnInit } from '@angular/core';
import { GetUsersService, GetAllMoviesService, RemoveFavoritesService, DeleteUserService } from '../fetch-api-data.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { UpdateUserProfileComponent } from '../update-user-profile/update-user-profile.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {
  user: any = {};
  movies: any = {};
  favorites: any = [];

  constructor(
    public fetchApiData: GetUsersService,
    public fetchApiData1: GetAllMoviesService,
    public fetchApiData2: DeleteUserService,
    public fetchApiData3: RemoveFavoritesService,
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.getUser();
  }

  // get users
  getUser(): void {
    this.fetchApiData.getUser().subscribe((resp: any) => {
      this.user = resp;
      this.getMovies();
    });
  }
  
  // get all movies
  getMovies(): void {
    this.fetchApiData1.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
      this.filterFavorites();
    });
  }

  // filter all movies
  filterFavorites(): void {
    this.favorites = this.movies.filter((movie: any) =>
      this.user.FavoriteMovies.includes(movie._id)
    );
    return this.favorites;
  }

  // remove a favorite movie
  removeFromFavorites(id: string, title: string): void {
    this.fetchApiData3.removeFavorites().subscribe(() => {
      this.snackBar.open(
        `${name} has been removed from your Favorites`, 'OK', {
        duration: 2000,
      }
      );
      setTimeout(function () {
        window.location.reload();
      }, 1000);
    });
  }

  // creates a dialog box to update the user profile
  openUpdateProfileDialog(): void {
    this.dialog.open(UpdateUserProfileComponent, {
      width: '280px',
    });
  }

  // delete profile
  deleteProfile(): void {
    let ok = confirm("Are you sure you want to delete your profile?\nThis action cannot be undone.");
    if (ok) {
      this.fetchApiData2.deleteUser().subscribe(() => {
        console.log('Profile Deleted');
        localStorage.clear();
        this.router.navigate(['welcome']);
        this.snackBar.open('Profile Deleted', 'OK', {
          duration: 2000,
        });
      });
    } else {
      window.location.reload();
    }
  }
}
