import { Component, OnInit } from '@angular/core';
import { User } from '../constant-data';
import { PageEvent } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { UserModelComponent } from '../models/edit-user/user-model.component';
import { AddUserComponent } from '../models/add-user/add-user.component';
import { DeleteUserComponent } from '../models/delete-user/delete-user.component';

@Component({
  selector: 'app-user-config',
  templateUrl: './user-config.component.html',
  styleUrls: ['./user-config.component.css']
})
export class UserConfigComponent implements OnInit {
  filteredUsers: User[] = [];
  allUsers: User[] = [];

  // Pagination variables
  pageSize = 10; // Default page size
  pageIndex = 0; // Default current page
  pagedUsers: User[] = [];

  searchName: string = '';
  searchEmail: string = '';
  sortBy: string = '';

  constructor(public dialog: MatDialog) {}

  ngOnInit() {
    this.getUsers();
  }

  getUsers() {
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

      { name: "sayli", email: "sayli@123", role: "User" },
      { name: "akshada", email: "akshada@123", role: "User" },
      { name: "vaibhavi", email: "vaibhavi@123", role: "Admin" },
      { name: "aditya", email: "aditya@123", role: "User" },
    ];

    this.filteredUsers = [...this.allUsers];
    this.updatePagedUsers();
  }

    updatePagedUsers() {
    const startIndex = this.pageIndex * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.pagedUsers = this.filteredUsers.slice(startIndex, endIndex);
  }

  handlePageEvent(event: PageEvent) {
    
    this.pageSize = event.pageSize;
    this.pageIndex = event.pageIndex;
    console.log(event.pageSize," ",event.pageIndex);

    this.updatePagedUsers();
  }

  showAll() {
    this.filteredUsers = [...this.allUsers];
    this.pageIndex = 0;
    this.updatePagedUsers();
  }

  searchUsers() {
    this.filteredUsers = this.allUsers.filter(user =>
      (this.searchName === '' || user.name.toLowerCase().includes(this.searchName.toLowerCase())) &&
      (this.searchEmail === '' || user.email.toLowerCase().includes(this.searchEmail.toLowerCase()))
    );
    this.pageIndex = 0;
    this.updatePagedUsers();
  }

  sort() {
    const property: keyof User = this.sortBy as keyof User;
    this.filteredUsers.sort((a, b) => {
      let valA = a[property]?.toString().toLowerCase() || '';
      let valB = b[property]?.toString().toLowerCase() || '';
      return valA.localeCompare(valB);
    });
    this.updatePagedUsers();
  }

  deleteUser(deleteUser: User, i: number) {
    let deleteUserModel = this.dialog.open(DeleteUserComponent, {
      width: '30%',
      height: '170px',
      data: { user: deleteUser, index: i }
    });

    deleteUserModel.afterClosed().subscribe((res) => {
      if (res?.isDelete) {
        this.allUsers.splice(res.index, 1);
        this.filteredUsers = this.allUsers;
        this.updatePagedUsers();
      }
    });
  }

  addUserPopup() {
    let addModel = this.dialog.open(AddUserComponent, {
      width: '30%',
      height: '320px',
      data: {}
    });

    addModel.afterClosed().subscribe((user) => {
      if (user) {
        this.allUsers.push(user);
        this.filteredUsers = this.allUsers;
        this.updatePagedUsers();
      }
    });
  }

  openEditPoppup(oneuser: User, i: number) {
    let popup = this.dialog.open(UserModelComponent, {
      width: '30%',
      height: '320px',
      data: { user: oneuser, index: i }
    });

    popup.afterClosed().subscribe((modelRes) => {
      if (modelRes) {
        this.allUsers[modelRes.index] = modelRes.editedUser;
        this.filteredUsers = this.allUsers;
        this.updatePagedUsers();
      }
    });
  }
}
