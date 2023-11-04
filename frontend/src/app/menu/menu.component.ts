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
  items: MenuItem[] = [
    { label: 'LogIn', routerLink: '/login' },
    { label: 'Home', routerLink: '' },
    { label: 'My department conferences', routerLink: '/my-conferences' },
    { label: 'Create conference', routerLink: '/create-conference' },
    { label: 'Public conferences', routerLink: '/public-conferences' },
  ];

  ngOnInit() {
    this.items = [
      {
        label: 'LogIn',
      },
      {
        label: 'Home',
      },
      {
        label: 'My department conferences',
      },
      {
        label: 'Create conference',
      },
      {
        label: 'Public conferences',
      },
    ];
    this.activeItem = this.items[0];
  }

  onMenuItemSelect(event: MenuItem) {
    // Handle item selection here
    this.activeItem = event;
  }
}
