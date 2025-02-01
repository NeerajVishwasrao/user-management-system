import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserModelComponent } from '../edit-user/user-model.component';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {
  constructor(private ref: MatDialogRef<UserModelComponent>) { }

  ngOnInit(): void {
  }

  save() {
    if (this.User.valid) {
      console.log(this.User.value);
      this.ref.close(this.User.value);
    } else {
      this.User.markAllAsTouched();
    }

  }
  
  close() {
    this.ref.close()
  }



  User: FormGroup = new FormGroup({
    name: new FormControl("", [Validators.required]),
    email: new FormControl("", [Validators.required, Validators.email]),
    role: new FormControl("", [Validators.required]),
  })

}
