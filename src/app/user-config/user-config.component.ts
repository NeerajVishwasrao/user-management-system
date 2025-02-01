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
  filteredUsers: User[] = [] // Start with all users
  allUsers: User[] = []
  searchName: string = ''; // Store the search query
  sortBy: string = ''; // Store the selected sorting property
  searchEmail: string = '';
  animal: any;

  // Search Function
  sort() {
    console.log("sort");

    let property: keyof User = this.sortBy as keyof User;

    this.filteredUsers.sort((a, b) => {
      let valA = a[property]?.toString().toLowerCase() || '';
      let valB = b[property]?.toString().toLowerCase() || '';

      return valA.localeCompare(valB);
    });
  }

  showAll() {
    this.filteredUsers = [...this.allUsers];

  }
  deleteUser(deleteUser: User, i: number) {
    let deleteUserModel = this.dialog.open(DeleteUserComponent, {
      width: '60%',
      height: '400px',

      data: {
        user: deleteUser, index: i
      }
    })
    deleteUserModel.afterClosed().subscribe((res) => {
      if (res.isDelete) {
        this.allUsers.splice(res.index, 1)
        this.filteredUsers = this.allUsers

      } else {
        console.log("not deleted");

      }
    })
  }
  addUserPopup() {
    let addModel = this.dialog.open(AddUserComponent, {
      width: '60%',
      height: '400px',

      data: {
      }
    })
    addModel.afterClosed().subscribe((user) => {
      if (user) {
        this.allUsers.push(user)
        this.filteredUsers = this.allUsers

      }
    })
  }

  constructor(public dialog: MatDialog) { }




  searchUsers() {
    this.filteredUsers = this.allUsers.filter(user =>
      (this.searchName === '' || user.name.toLowerCase().includes(this.searchName.toLowerCase())) &&
      (this.searchEmail === '' || user.email.toLowerCase().includes(this.searchEmail.toLowerCase()))
    );
  }


  name: string = "";

  pageSize = 5;
  currentPage = 0;
  pagedUsers: any[] = [];

  ngOnInit() {
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
    this.filteredUsers = [...this.allUsers];


    this.loadPageData();
  }

  loadPageData() {
    // Slice the array to show only the current page's data
    const startIndex = this.currentPage * this.pageSize;
    this.pagedUsers = this.allUsers.slice(startIndex, startIndex + this.pageSize);
  }

  pageChanged(event: PageEvent) {
    this.currentPage = event.pageIndex;
    this.pageSize = event.pageSize;
    this.loadPageData();
  }
  editedUser: User | undefined
  editedUserIndex: number = 0

  openEditPoppup(oneuser: User, i: number) {
    let popup = this.dialog.open(UserModelComponent, {
      width: '60%',
      height: '400px',

      data: {
        user: oneuser, index: i
      }
    })
    popup.afterClosed().subscribe((modelRes) => {

      if (modelRes) {
        this.editedUser = modelRes.editedUser
        this.editedUserIndex = modelRes.index

        this.allUsers[modelRes.index] = modelRes.editedUser
        this.filteredUsers = this.allUsers
      }

    })
  }
}




