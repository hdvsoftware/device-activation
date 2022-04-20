import { Component, Input } from '@angular/core';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @Input() title: string;

  constructor(
    public authService: AuthService) { 
  }

  onLogout() {
    this.authService.logout();
  }

}
