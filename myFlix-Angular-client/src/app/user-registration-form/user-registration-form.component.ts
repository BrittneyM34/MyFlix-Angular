import { Component, OnInit, Input } from '@angular/core';

// close the dialog on success
import { MatDialogRef } from '@angular/material/dialog';

// brings in the API calls we created in 6.2
import { FetchApiDataService } from '../fetch-api-data.service';

// used to display notifications back to the user
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-registration-form',
  templateUrl: './user-registration-form.component.html',
  styleUrls: ['./user-registration-form.component.scss']
})
export class UserRegistrationFormComponent implements OnInit {

  @Input() userData = { username: '', password: '', email: '', birthday: ''};

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserRegistrationFormComponent>,
    public snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  // function is responsible for sending the form inputs to the backend
  registerUser(): void {
    this.fetchApiData.userRegistration(this.userData).subscribe((response) => {
      // Logic for a successful user registration goes here (to be implemented)

      // this will close the modal on success
      this.dialogRef.close(); 
      console.log(response);
      this.snackBar.open("Successfully created user", 'OK', {
        duration: 2000
      });
    }, (response) => {
      console.log(response);
      this.snackBar.open("Failed to create user", 'OK', {
        duration: 2000
      });
    });
  }

}
