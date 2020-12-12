import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsuarioDto } from '../common/usuario.dto';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  postId: any;
  errorMessage: any;
  constructor(private readonly http: HttpClient) {
  }

  SingIn(username: string, password: string):any {
    return this.http.post<any>(`https://sigetequipo3.herokuapp.com/api/auth/signin`,{ type : "Login",
     username : username,
      password : password});
  }




  createUsuario(username: string, email: string, password: string): any {
    return this.http.post<any>(`https://sigetequipo3.herokuapp.com/api/auth/signup
    `, {type: "Register",
    username: username,
    email: email,
    password: password}).subscribe({
      next: data => {
          this.postId = data.id;
      },
      error: error => {
          this.errorMessage = error.message;
          console.error('There was an error!', error);
      }
  });
  }
  
}
