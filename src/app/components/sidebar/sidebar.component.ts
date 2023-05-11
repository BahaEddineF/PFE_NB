import { Component, OnInit } from '@angular/core';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Accueil',  icon: 'dashboard', class: '' },
    { path: '/campagnymailing', title: 'Campany Mailing',  icon:'content_paste', class: '' },
    { path: '/configuration', title: 'configuration',  icon:'settings', class: '' },
    { path: '/modelemail', title: 'Modele',  icon:'view_timeline', class: '' },
  
    { path: '/users', title: 'users',  icon:'group', class: '' },
    { path: '/user-profile', title: 'User Profile',  icon:'person', class: 'active-pro' },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];

  constructor() { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
}
