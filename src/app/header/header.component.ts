import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../shared/login.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  @Input() title: string;

  constructor(
    private loginService: LoginService) { 
    
  }

  ngOnInit(): void {
  }

  isLoggedIn() {
    return this.loginService.isLoggedIn();
  }

  onLogout() {
    this.loginService.logout();
  }

}
