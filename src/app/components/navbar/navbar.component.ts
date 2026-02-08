import { Component, OnInit, ElementRef } from '@angular/core';
import { ROUTES } from '../sidebar/sidebar.component';
import { Location } from '@angular/common';
import { Router, NavigationStart } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  private listTitles = ROUTES.filter(route => route);
  private toggleButton: HTMLElement;
  private sidebarVisible = false;
  private mobileMenuVisible = false;

  constructor(
    private location: Location,
    private element: ElementRef,
    private router: Router
  ) {}

  ngOnInit() {
    this.initializeToggleButton();
    this.subscribeToRouterEvents();
  }

  private initializeToggleButton(): void {
    const navbar = this.element.nativeElement;
    this.toggleButton = navbar.querySelector('.navbar-toggler');
  }

  private subscribeToRouterEvents(): void {
    this.router.events
      .pipe(filter(event => event instanceof NavigationStart))
      .subscribe(() => this.sidebarClose());
  }

  sidebarOpen(): void {
    const body = document.body;
    this.toggleButton?.classList.add('toggled');
    body.classList.add('nav-open');
    this.sidebarVisible = true;
  }

  sidebarClose(): void {
    const body = document.body;
    this.toggleButton?.classList.remove('toggled');
    this.sidebarVisible = false;
    body.classList.remove('nav-open');
  }

  sidebarToggle(): void {
    this.sidebarVisible ? this.sidebarClose() : this.sidebarOpen();
    this.toggleMobileMenu();
  }

  private toggleMobileMenu(): void {
    const body = document.body;
    const closeLayer = document.querySelector('.close-layer') as HTMLElement;

    if (this.mobileMenuVisible) {
      this.closeMobileMenu(closeLayer);
    } else {
      this.openMobileMenu(body);
    }
  }

  private closeMobileMenu(closeLayer: HTMLElement): void {
    const body = document.body;
    body.classList.remove('nav-open');
    closeLayer?.remove();
    this.toggleButton?.classList.remove('toggled');
    this.mobileMenuVisible = false;
  }

  private openMobileMenu(body: HTMLElement): void {
    const layer = this.createCloseLayer(body);
    body.classList.add('nav-open');
    this.toggleButton?.classList.add('toggled');
    this.mobileMenuVisible = true;
    this.attachLayerClickHandler(layer, body);
  }

  private createCloseLayer(body: HTMLElement): HTMLElement {
    const layer = document.createElement('div');
    layer.className = 'close-layer';
    
    const mainPanel = document.querySelector('.main-panel');
    const wrapperFullPage = document.querySelector('.wrapper-full-page');
    
    (mainPanel || wrapperFullPage)?.appendChild(layer);
    layer.classList.add('visible');
    return layer;
  }

  private attachLayerClickHandler(layer: HTMLElement, body: HTMLElement): void {
    layer.addEventListener('click', () => {
      body.classList.remove('nav-open');
      this.mobileMenuVisible = false;
      layer.classList.remove('visible');
      setTimeout(() => {
        layer.remove();
        this.toggleButton?.classList.remove('toggled');
      }, 400);
    });
  }

  getTitle(): string {
    let path = this.location.prepareExternalUrl(this.location.path());
    if (path.startsWith('#')) path = path.slice(1);

    const route = this.listTitles.find(item => item.path === path);
    return route?.title || 'Dashboard';
  }
}
