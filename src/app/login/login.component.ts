import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../shared/login.service';
import { LoginResponse } from '../shared/model/loginResponse';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errorMessage: string;

  constructor(
    private router: Router,
    private loginService: LoginService) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      'username': new FormControl(null, Validators.required),
      'password': new FormControl(null, Validators.required)
    })
    this.loginForm.setValue({
      'username': 'test',
      'password': 'test'
    });
  }

  onSubmit() {
    const username = this.loginForm.value.username;
    const password = this.loginForm.value.password;
    this.loginService.login(username, password).subscribe(
      (result: LoginResponse) => {
        if(result.succes === true) {
          this.router.navigate(['']);
        } else {
          this.errorMessage = result.errorMessage;
        }
      }
    );
  }
}
