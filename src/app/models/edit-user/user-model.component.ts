import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-user-model',
  templateUrl: './user-model.component.html',
  styleUrls: ['./user-model.component.css']
})
export class UserModelComponent implements OnInit {
  inputdata: any
  editedUser!: FormGroup

  constructor(@Inject(MAT_DIALOG_DATA) public data: any, private ref: MatDialogRef<UserModelComponent>) { }

  ngOnInit(): void {
    this.inputdata = this.data;

    this.editedUser = new FormGroup({
      name: new FormControl(this.inputdata.user.name, [Validators.required]),
      email: new FormControl(this.inputdata.user.email, [Validators.required, Validators.email]),
      role: new FormControl(this.inputdata.user.role, [Validators.required]),
    })
  }
  save(user: any) {
    console.log(this.editedUser.value);
    console.log(this.inputdata.index);

    if (this.editedUser.valid) {

      let dialogueRes = {
        editedUser: this.editedUser.value,
        index: this.inputdata.index
      }

      this.ref.close(dialogueRes)

    } else {
      this.editedUser.markAllAsTouched();
    }

  }

  closePopup() {
    this.ref.close()
  }
}
