import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-user-model',
  templateUrl: './user-model.component.html',
  styleUrls: ['./user-model.component.css']
})
export class UserModelComponent implements OnInit {
save() {
throw new Error('Method not implemented.');
}

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private ref: MatDialogRef<UserModelComponent>) { }
  inputdata: any
  ngOnInit(): void {
    this.inputdata=this.data;
  }
  closePopup() {
    this.ref.close()
  }
}
