// login.component.ts

import { Component } from "@angular/core";
import { Router } from '@angular/router';
import { timeout } from 'rxjs/operators';
import { UsuarioDto } from '../common/usuario.dto';
import { UsuarioService } from '../services/usuario.service';

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent {
  email: string;
  password: string;

  constructor(private servicioUsuario: UsuarioService, public router: Router,) {}
  invalid = false;
  submitted = false;
  respuesta: boolean;

  updateAddress(): void {
    console.log(this.respuesta);
    if(this.respuesta){
      localStorage.setItem("name", `${this.email}`);
      this.router.navigate(['reuniones']);
      this.invalid = false;
    }else{
      this.invalid = true;
    }
  }

  registrar(): void {
    this.router.navigate(['registro'])
  }
  

  delay(ms: number) {
    return new Promise( resolve => setTimeout(resolve, ms) );
}
  
 login() {


  this.servicioUsuario
  .SingIn(this.email,this.password)
  .subscribe({
  next: (resp: any) => {
    this.respuesta = resp;
    console.log(this.respuesta);
    localStorage.setItem('Token', 'Bearer ' + resp.accessToken);
  },
  error:  (err) => {
    console.error(err);
  },
  complete: () => (this.updateAddress()),
});

}
}

