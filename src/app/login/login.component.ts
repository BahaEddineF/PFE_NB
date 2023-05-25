import { Subscription } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationRequest } from 'app/models/AuthenticationRequest';
import { AuthService } from 'app/services/AuthService.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  private _router: Subscription;
  submitted:boolean = false ; 
  formLogin:FormGroup;
  constructor(private authService:AuthService,private router:Router,
    private toastr: ToastrService , private fb:FormBuilder) { 
      this.formLogin = this.fb.group({
        login:['' , Validators.required],
        password:['' , Validators.required]
      })
    }
  authenticationRequest:AuthenticationRequest = new AuthenticationRequest()

  ngOnInit(): void {
    localStorage.clear()
  }

  get login() { return this.formLogin.get('login'); }
  get password() { return this.formLogin.get('password'); }

  onSubmit()
  {
    this.submitted = true ;
    if(this.formLogin.invalid)
    {
      return ;
    }
    this.authenticationRequest.login = this.login.value ; 
    this.authenticationRequest.password = this.password.value ; 

    this.authService.login(this.authenticationRequest).subscribe(
      res => {
        localStorage.setItem("accessToken" , res.accessToken)
        localStorage.setItem("role" , res.role)
        localStorage.setItem("login" , res.login)

        this.router.navigate(['dashboard'])
      } , error =>  {
        console.error(error)
        this.toastr.error('Wrong', 'Sorry', {
        timeOut: 3000,
      } ,
    )}

    )
  }
}
