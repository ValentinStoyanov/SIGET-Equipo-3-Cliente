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
    return this.http.post<any>(`http://localhost:8080/api/auth/signin`,{ type : "Login",
     username : username,
      password : password});
  }


//
  getLogin(usuario: UsuarioDto): any {
    return this.http.post<any>(`https://siget-grupo2.herokuapp.com/usuarios/login?username=${usuario.username}&password=${usuario.password}`, {});
  }


  getAll(): Observable<UsuarioDto[]> {
    return this.http.get<any>(`https://siget-grupo2.herokuapp.com/usuarios/getAll`)
    .pipe(
      map((usuarioDto: UsuarioDto[]) => {
        return usuarioDto;
      })
    );
  }

  createUsuario(usuario: UsuarioDto): any {
    return this.http.post<any>(`https://siget-grupo2.herokuapp.com/usuarios/createUsuario?username=${usuario.username}&password=${usuario.password}&nombre=${usuario.nombre}&apellidos=${usuario.apellidos}&email=${usuario.email}&telefono=${usuario.telefono}
    `, {}).subscribe({
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
