import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AsistenteDto } from '../common/asistente.dto';


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
  getAsistentes(): Observable<AsistenteDto[]> {
    const headerDict = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Authorization': localStorage.getItem("Token"),
    }
    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };
    return this.http.post<any>(`https://sigetequipo3.herokuapp.com/reunion/getAsistentes`,{type: "getAsistentes",}, requestOptions)
    .pipe(
      map((asistenteDto: AsistenteDto[]) => {
        console.log(asistenteDto);
        return asistenteDto;
      })
    );
  }

}
