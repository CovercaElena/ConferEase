import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import {NgModel} from "@angular/forms";
import { RouterLinkActive } from '@angular/router';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  activeItem!: MenuItem;
  items: MenuItem[]=[];

  ngOnInit() {
    this.items = [
      {
        label: 'LogIn',routerLink:['/login'],routerLinkActiveOptions:"active"
      },
      {
        label: 'Home', routerLink:[''],routerLinkActiveOptions:"active"
      },
      {
        label: 'My department conferences',routerLink:['/department'],routerLinkActiveOptions:"active-link"
      },
      {
        label: 'Create conference',routerLink:['/create'],routerLinkActiveOptions:"active"
      },
      {
        label: 'Public conferences',routerLink:['/public'],routerLinkActiveOptions:"active"
      },
    ];

  }

  onMenuItemSelect(event: MenuItem) {
    // Handle item selection here
    this.activeItem = event;
  }
}
