import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserConfigComponent } from './user-config/user-config.component';

const routes: Routes = [
  {
    path:"", component:UserConfigComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
