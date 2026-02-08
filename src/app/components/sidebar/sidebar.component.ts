import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare interface RouteInfo {
  path: string;
  title: string;
  icon: string;
  class: string;
}

export const ROUTES: RouteInfo[] = [
  { path: '/dashboard', title: 'Dashboard', icon: 'dashboard', class: '' },
  { path: '/customers-data', title: 'Customer', icon: 'person', class: '' },
  { path: '/inspection-data', title: 'Inspections', icon: 'search', class: '' },
  { path: '/tweets-data', title: 'Tweets', icon: 'notifications', class: '' },
  { path: '/sales-data', title: 'Sales', icon: 'library_books', class: '' },
  { path: '/accounts-data', title: 'Accounts', icon: 'add_circle', class: '' },
  { path: '/transaction-data', title: 'Transaction', icon: 'track_changes', class: '' },
  { path: '/user-chat-data', title: 'User Chat', icon: 'bubble_chart', class: '' },
  { path: '/user-stories', title: 'User Stories', icon: 'dynamic_feed', class: '' }
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: RouteInfo[] = [];
  userInfo: string;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.menuItems = ROUTES;
    this.userInfo = localStorage.getItem('userInfo') || '';
  }

  isMobileMenu(): boolean {
    return window.innerWidth <= 991;
  }

  logout(): void {
    localStorage.clear();
    this.router.navigate(['/login']);
  }
}
