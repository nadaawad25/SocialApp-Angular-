import { Component, OnInit, inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Users } from '../../core/services/users';
import { HttpErrorResponse } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule , CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login implements OnInit {

  loginForm!: FormGroup;
  isLoading: boolean = false;
  msgError: string = '';

  private _UsersService = inject(Users);

  constructor(private _Router: Router, private _builder: FormBuilder) {}

  ngOnInit(): void {
    this.CallForm();
  }

  CallForm() {
    this.loginForm = this._builder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, Validators.required],
    });
  }

  loginSubmit() : void{
    console.log("Login called ");
    
    if (this.loginForm.valid) {
      this.isLoading = true;

      this._UsersService.signIn(this.loginForm.value).subscribe({
        next: (res) => {
          this.isLoading = false;

          if (res.message === 'success') {
            localStorage.setItem('token', res.token); 
           // this._Router.navigate(['/posts']); 
          }
        },
        error: (err: HttpErrorResponse) => {
          this.isLoading = false;
          this.msgError = err.error.message;
          console.error(err);
        }
      });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }

  get f(): { [key: string]: AbstractControl } {
    return this.loginForm.controls;
  }
}
