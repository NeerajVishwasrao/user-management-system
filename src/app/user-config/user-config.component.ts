import { Component, Inject, OnInit } from '@angular/core';
import { User } from '../constant-data';
import { PageEvent } from '@angular/material/paginator';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { UserModelComponent } from '../models/edit-user/user-model.component';
import { AddUserComponent } from '../models/add-user/add-user.component';
import { DeleteUserComponent } from '../models/delete-user/delete-user.component';

@Component({
  selector: 'app-user-config',
  templateUrl: './user-config.component.html',
  styleUrls: ['./user-config.component.css']
})

export class UserConfigComponent implements OnInit {
  // Declare arrays for storing users and filtered users
  filteredUsers: User[] = [] // Start with all users
  allUsers: User[] = []
  
  // Declare variables for search and sorting
  searchName: string = ''; // Store the search query for name
  sortBy: string = ''; // Store the selected sorting property
  searchEmail: string = ''; // Store the search query for email
  
  // Declare variables for pagination and user editing
  name: string = "";
  pageSize = 5; // Default page size
  currentPage = 0; // Default current page
  pagedUsers: any[] = [];
  editedUser: User | undefined
  editedUserIndex: number = 0
  
  constructor(public dialog: MatDialog) { }

  ngOnInit() {
    this.getUsers()
  }

  // Function to load users into allUsers array
  getUsers(){
    this.allUsers = [
      { name: "niraj", email: "niraj@123", role: "Admin" },
      { name: "ankush", email: "ankush@123", role: "User" },
      { name: "jayesh", email: "jayesh@123", role: "Admin" },
      { name: "kajal", email: "kajal@123", role: "User" },
      { name: "avni", email: "avni@123", role: "User" },
      { name: "ashwini", email: "ashwini@123", role: "Admin" },
      { name: "subhash", email: "subhash@123", role: "User" },
      { name: "dinesh", email: "dinesh@123", role: "User" },
      { name: "rahul", email: "rahul@123", role: "Admin" },
      { name: "aryan", email: "aryan@123", role: "User" },
    ]

    // Initialize filteredUsers as a copy of allUsers
    this.filteredUsers = [...this.allUsers];
  }

  // Sort the users based on the selected property
  sort() {
    console.log("sort");
    let property: keyof User = this.sortBy as keyof User;
    this.filteredUsers.sort((a, b) => {
      let valA = a[property]?.toString().toLowerCase() || '';
      let valB = b[property]?.toString().toLowerCase() || '';
      return valA.localeCompare(valB);
    });
  }

  // Show all users without any filter
  showAll() {
    this.filteredUsers = [...this.allUsers];
  }

  // Delete user and handle dialog for confirmation
  deleteUser(deleteUser: User, i: number) {
    let deleteUserModel = this.dialog.open(DeleteUserComponent, {
      width: '60%',
      height: '400px',
      data: {
        user: deleteUser, index: i
      }
    })

    // After dialog closes, handle the deletion process
    deleteUserModel.afterClosed().subscribe((res) => {
      if (res.isDelete) {
        this.allUsers.splice(res.index, 1) 
        this.filteredUsers = this.allUsers 
      } else {
        console.log("not deleted");
      }
    })
  }

  // Open a dialog to add a new user
  addUserPopup() {
    let addModel = this.dialog.open(AddUserComponent, {
      width: '60%',
      height: '400px',
      data: {}
    })

    // After dialog closes, add the new user to allUsers
    addModel.afterClosed().subscribe((user) => {
      if (user) {
        this.allUsers.push(user) 
        this.filteredUsers = this.allUsers 
      }
    })
  }

  // Function to search users based on name and email
  searchUsers() {
    this.filteredUsers = this.allUsers.filter(user =>
      (this.searchName === '' || user.name.toLowerCase().includes(this.searchName.toLowerCase())) &&
      (this.searchEmail === '' || user.email.toLowerCase().includes(this.searchEmail.toLowerCase()))
    );
  }

  // Open the edit user dialog and update user data
  openEditPoppup(oneuser: User, i: number) {
    let popup = this.dialog.open(UserModelComponent, {
      width: '60%',
      height: '400px',
      data: {
        user: oneuser, index: i
      }
    })

    // After dialog closes, update the user data if edited
    popup.afterClosed().subscribe((modelRes) => {
      if (modelRes) {
        this.editedUser = modelRes.editedUser
        this.editedUserIndex = modelRes.index

        this.allUsers[modelRes.index] = modelRes.editedUser 
        this.filteredUsers = this.allUsers 
    })
  }
}
