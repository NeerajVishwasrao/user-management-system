import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
toggleSideBar() {
  this.opened = !this.opened
}
  title = 'user-management-system';

  isMobile = false;
  opened = true; // This controls the state of the sidenav
isExpanded: boolean=true;

  constructor(private breakpointObserver: BreakpointObserver) {}

  ngOnInit() {
  }

 
}
