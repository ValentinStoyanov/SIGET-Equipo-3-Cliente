import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../services/usuario.service';
import { UsuarioDto } from 'src/app/common/usuario.dto';


@Component({
    selector: 'app-registro',
    templateUrl: './registro.component.html',
    styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

    username: string;
    password: string;
    nombre: string;
    apellidos: string;
    email: string;
    telefono: number;

    constructor(private servicioUsuario: UsuarioService) { }


    ngOnInit(): void {


    }

    metodoRegistrar() {
        
        //if( !(this.password.length<8) && !(this.password===this.password.toLowerCase()) && !(this.password === this.password.toUpperCase()) && !(this.password.search(/[0-9]/)<0) ){
        if (!(this.password.length < 8) && !(this.password === this.password.toLowerCase()) && !(this.password === this.password.toUpperCase())) {
            
            this.servicioUsuario.createUsuario(this.username, this.email, this.password);
            alert('Usuario creado')
           
        } else {
            alert('La contraseña debe tener como mínimo 8 caracteres, un mayúscula y un minúscula ')
            
        }
    }

}