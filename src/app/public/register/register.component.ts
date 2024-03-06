import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.sass'
})
export class RegisterComponent {

  myFormreg = this.fb.group({
    email: ['', [Validators.required, Validators.email ] ],
    name: ['', Validators.required],
    surname: ['', Validators.required],
    nick: ['', Validators.required],
    password: ['', Validators.required]
  })

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {
    
  }


  submit(){
    if (this.myFormreg.valid){
      var val = this.myFormreg.value;

      var json = {
        "name": val.name,
        "surname": val.surname,
        "nick": val.nick,
        "email": val.email,
        "password": val.password
      }

      
      this.authService.register(json).subscribe(
        {
          next: (res: any) => {
            this.router.navigate(['/login']);
          },
          error: (err: HttpErrorResponse) => {
            if (err.status == 422 ){
              
              if (err.error.data.includes("email")){
                
                this.myFormreg.get('email')?.setErrors({'duplicate': err.error.messageemail})
              } 
              if (err.error.data.includes("nick")){
                this.myFormreg.get('nick')?.setErrors({'duplicate': err.error.messagenick})
              }
              
            }
            console.log(err)
            
          }
        }
      )
    }
  }
}
