import { Component, Inject, OnInit } from '@angular/core';
import { User } from '../constant-data';
import { PageEvent } from '@angular/material/paginator';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { UserModelComponent } from '../models/user-model/user-model.component';
@Component({
  selector: 'app-user-config',
  templateUrl: './user-config.component.html',
  styleUrls: ['./user-config.component.css']
})
export class UserConfigComponent implements OnInit {
  animal: any;

  constructor(public dialog: MatDialog) { }




  allUsers: User[] = [
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
    { name: "aditya", email: "aditya@123", role: "Admin" },
    { name: "sayli", email: "sayli@123", role: "User" },
    { name: "akshada", email: "akshada@123", role: "Admin" },
    { name: "swapnali", email: "swapnali@123", role: "User" },

  ]
  name: string = "";

  pageSize = 5;
  currentPage = 0;
  pagedUsers: any[] = [];

  ngOnInit() {
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

  openPoppup(oneuser: User, i: number) {
    let popup = this.dialog.open(UserModelComponent, {
      width: '60%',
      height: '400px',

      data: {
        user: oneuser, index: i
      }
    })
    popup.afterClosed().subscribe((modelRes) => {
      this.editedUser = modelRes.editedUser
      this.editedUserIndex = modelRes.index

      this.allUsers[modelRes.index]=modelRes.editedUser
    })
  }
}




