import { Component, OnInit, Input } from '@angular/core';

// This import is used to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';
import { UpdateUserService } from '../fetch-api-data.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-user-profile.component.html',
  styleUrls: ['./update-user-profile.component.scss']
})

export class UpdateUserProfileComponent implements OnInit {

  @Input() userData = { Username: '', Password: '', Email: '', Birthday: '' };

  constructor(
    public snackBar: MatSnackBar,
    public fetchApiData: UpdateUserService,
    public dialogRef: MatDialogRef<UpdateUserProfileComponent>
  ) { }

  ngOnInit(): void {
  }

  /**
 * Sends updated user information to the database and refreshes the page so the user can view updated information automatically
 */
  updateUser(): void {
    this.fetchApiData.updateUser(this.userData).subscribe((response) => {
      this.dialogRef.close();
      localStorage.setItem('user', response.Username);
      this.snackBar.open('Profile updated successfully!', 'OK', {
        duration: 2000,
      });
    }, (response) => {
      console.log(response);
      this.snackBar.open(response, 'OK', {
        duration: 2000,
      });
    });
  }
}

