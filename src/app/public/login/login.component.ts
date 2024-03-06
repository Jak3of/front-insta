import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { User } from '../../models/user.model';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.sass'
})
export class LoginComponent {

  myForm = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required]
  })

  constructor(private fb: FormBuilder ,private loginService: AuthService, private router: Router) { }
    
  submit(){
    if (this.myForm.valid){
      const val = this.myForm.value;

      const username = val.email || '';
      const password = val.password || '';
      const json = {
        "email": username,
        "password": password
      }

      this.loginService.login(json).subscribe(
        {
          next: (res: any) => {
            this.router.navigate(['/']);
          },
          error: (err: any) => {
            console.log(err)
          }
        }
      )
    }
  }
}
