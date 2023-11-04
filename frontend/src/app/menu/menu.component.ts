import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  items: MenuItem[] = [];
  activeItem!: MenuItem;

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
