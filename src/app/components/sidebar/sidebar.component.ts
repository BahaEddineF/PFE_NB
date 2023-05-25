import { Component, OnInit } from '@angular/core';
import { Role } from 'app/models/role';
import { admin } from 'googleapis/build/src/apis/admin';

declare const $: any;
declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}


export const ROUTESADMIN: RouteInfo[] = [
  { path: '/dashboard', title: 'Accueil', icon: 'dashboard', class: '' },
  { path: '/campagnymailing', title: 'Campany Mailing', icon: 'content_paste', class: '' },
  { path: '/configuration', title: 'configuration', icon: 'settings', class: '' },
  { path: '/modelemail', title: 'Modele', icon: 'view_timeline', class: '' },

  { path: '/users', title: 'Users', icon: 'group', class: '' },
  { path: '/user-profile', title: 'User Profile', icon: 'person', class: 'active-pro' },
];
export const ROUTESUSER: RouteInfo[] = [
  {path: '/dashboard', title: 'Accueil', icon: 'dashboard', class: ''},
{ path: '/campagnymailing', title: 'Campany Mailing', icon: 'content_paste', class: '' },
{ path: '/user-profile', title: 'User Profile', icon: 'person', class: 'active-pro' },
];
@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})



export class SidebarComponent implements OnInit {
  menuItems: any[];
  role: string = "";
  constructor() { }

  ngOnInit() {
    this.role = "" + localStorage.getItem("role");
    console.log('role ', this.role)
    console.log('role 2 ', this.role == 'User')
    if (this.role == 'Admin') {
      this.menuItems = ROUTESADMIN.filter(menuItem => menuItem);

    }
    if (this.role == 'User') {
      console.log('enter condition')
      this.menuItems = ROUTESUSER.filter(menuItem => menuItem);

    }

  }
  isMobileMenu() {
    if ($(window).width() > 991) {
      return false;
    }
    return true;
  };
}
