import {Component, OnInit} from '@angular/core';
import {MenuItem} from 'primeng/api';
import {NgModel} from "@angular/forms";
import {RouterLinkActive} from '@angular/router';
import {Router} from '@angular/router';

@Component({
  selector: 'app-menu-admin',
  templateUrl: './menu-admin.component.html',
  styleUrls: ['./menu-admin.component.css']
})
export class MenuAdminComponent implements OnInit {
  activeItem!: MenuItem;
  items: MenuItem[] = [];

  ngOnInit(): void {
    this.items = [{
      label: 'LogIn', routerLink: [''], routerLinkActiveOptions: "active"
    }];
  }

}
