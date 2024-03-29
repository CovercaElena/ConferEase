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
        label: 'LogOut',routerLink:['/logout'],routerLinkActiveOptions:"active"
      },
      {
        label: 'Home', routerLink:['/home'],routerLinkActiveOptions:"active"
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
      {label:'Calendar',routerLink:['/calendar'],routerLinkActiveOptions:"active"},
    ];

  }

  onMenuItemSelect(event: MenuItem) {
    // Handle item selection here
    this.activeItem = event;
  }
}
