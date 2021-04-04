import { Component, OnInit, Input } from '@angular/core';
import { 
        GetUsersService, 
        GetAllMoviesService, 
        RemoveFavoritesService, 
        DeleteUserService, 
        GetFavoritesService,
        UpdateUserService
        } from '../fetch-api-data.service';
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
  @Input() userData={Username: '', Password: '', Email: '', Birthday: ''};
  movies: any = {};
  favorites: any = [];
  currentUser:string

  constructor(
    public fetchApiDataUser: GetUsersService,
    public fetchApiDataAll: GetAllMoviesService,
    public fetchApiDataDeleteUser: DeleteUserService,
    public fetchApiDataRemFav: RemoveFavoritesService,
    public fetchApiDataGetFav: GetFavoritesService,
    public fetchApiDataUpdate: UpdateUserService,
    public snackBar: MatSnackBar,
    public dialog: MatDialog,
    public router: Router
  ) { 
    this.currentUser=localStorage.getItem('user') || '';
    
  }

  ngOnInit(): void {
  }

  getUser(): void {
    this.fetchApiDataUser.getUser().subscribe((resp: any) => {
      this.getMovies();
    });
  }
  
  // get all movies
  getMovies(): void {
    this.fetchApiDataAll.getAllMovies().subscribe((resp: any) => {
      this.movies = resp;
    });
  }

  getFavorites(id:string): void {
    this.fetchApiDataGetFav.getFavorites(id).subscribe((resp:any)=> {
      this.favorites = resp;
    })
  }
 

  // remove a favorite movie
  removeFromFavorites(id: string, name: string): void {
    this.fetchApiDataRemFav.removeFavorites(id).subscribe(() => {
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
      this.fetchApiDataDeleteUser.deleteUser().subscribe(() => {
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
