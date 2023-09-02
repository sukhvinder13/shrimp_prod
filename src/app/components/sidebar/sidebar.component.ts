import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Dashboard',  icon: 'dashboard', class: '' },
    // { path: '/registration', title: 'Register Farm Owner',  icon: 'person_add', class: '' },
    // { path: '/add-farm', title: 'Add Farm ',  icon: 'group_add', class: '' },
    // { path: '/feed-input', title: 'Feed Input ',  icon: 'input', class: '' },
    { path: '/customers-data', title: 'Customer ',  icon: 'person', class: '' },
    { path: '/inspection-data', title: 'Inspections ',  icon: 'search', class: '' },
    { path: '/tweets-data', title: 'Tweets ',  icon: 'notifications', class: '' },
    { path: '/sales-data', title: 'Sales ',  icon: 'library_books', class: '' },
    { path: '/accounts-data', title: 'Accounts ',  icon: 'add_circle', class: '' },
    { path: '/transaction-data', title: 'Transaction ',  icon: 'track_changes', class: '' },
    { path: '/user-chat-data', title: 'User Chat ',  icon: 'bubble_chart', class: '' },
    { path: '/user-stories', title: 'User Stories ',  icon: 'dynamic_feed', class: '' },
    
    // { path: '/user-profile', title: 'Tasks',  icon:'dns', class: '' },
    // { path: '/selection-of-farm', title: 'Selection of Farm',  icon:'select_all', class: '' },
    // { path: '/reports', title: 'Reports',  icon:'dynamic_feed', class: '' },
    // { path: '/change-phase', title: 'Change Phase',  icon:'track_changes', class: '' },
    // { path: '/check-previous-records', title: 'Check previous Records',  icon:'chevron_left', class: '' },
    // { path: '/add-prescription', title: 'Add Prescription',  icon:'add_circle', class: '' },
    // { path: '/user-profile', title: 'User Profile',  icon:'person', class: '' },
    // { path: '/table-list', title: 'Table List',  icon:'content_paste', class: '' },
    // { path: '/typography', title: 'Typography',  icon:'library_books', class: '' },
    // { path: '/icons', title: 'Icons',  icon:'bubble_chart', class: '' },
    // { path: '/maps', title: 'Maps',  icon:'location_on', class: '' },
    // { path: '/notifications', title: 'Notifications',  icon:'notifications', class: '' }/
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[]; 
  userInfo:any;

  constructor(private router:Router) { }

  ngOnInit() {
   this.userInfo= localStorage.getItem('userInfo');
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
  logout(){
    localStorage.clear();
    localStorage.clear();
    this.router.navigate(['/login'])
  }
}
