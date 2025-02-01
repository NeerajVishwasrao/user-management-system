import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.css']
})
export class DeleteUserComponent implements OnInit {
// first argument for getting data and second argument for sending data in this component
  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private ref: MatDialogRef<DeleteUserComponent>) { }

  ngOnInit(): void {
    this.data.User
    this.data.index
  }
  deleteUser(isDelete1: boolean) {
    let res={
      isDelete:isDelete1,
      index:  this.data.index

    }
    this.ref.close(res)
  }
}
