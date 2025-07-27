import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Users } from '../../core/services/users';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule , CommonModule ],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register  implements OnInit , OnDestroy{

  registerForm! : FormGroup
  registerFormSubmit! : Subscription
  private _userService = inject(Users)
  isLoading : Boolean = false
  msgError : string = ''

  constructor(private _builder : FormBuilder , private _router : Router) { }


  ngOnInit(): void {
    this.CallForm()
    
  }


  CallForm (){
    this.registerForm = this._builder.group({
      name: ['' , [Validators.required , Validators.minLength(2) ,Validators.maxLength(20)]],
      email: ['',[Validators.required , Validators.email]],
      password: ['' , Validators.required],
      confirmPassword: ['' ,Validators.required],
      phone: [''],
      gender: ['', Validators.required],       
      date: ['', Validators.required] 
    },
  {
    validator: [this.ConfirmPassword]
  })
  }


  registerSubmit() : void{
    console.log('registerSubmit called'); 

    console.log(this.registerForm.valid);
    console.log(this.registerForm.value);
    console.log(this.registerForm);

    if(this.registerForm.valid){
      this.registerFormSubmit = this._userService.signUp(this.registerForm.value).subscribe({
        next:(res)=>{
           this.isLoading = false
           console.log(" Form is valid " , this.registerForm.value);
           
           if(res.message == 'success'){
            setTimeout(() => {
              this._router.navigate(['/login']);
            }, 3000);
           }
        },
        error :(err : HttpErrorResponse) =>{
         this.msgError = err.error.message,
         this.isLoading = true,
         console.log(err);
         
        }
        
      })
    }else{
      this.registerForm.markAllAsTouched()
    }

  }
  
  ConfirmPassword (b : AbstractControl){
    const password = b.get('password')?.value;
    const confirmPassword = b.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { notmatch: true };
   }

   ngOnDestroy(): void {
    this.registerFormSubmit?.unsubscribe()
   }

}
