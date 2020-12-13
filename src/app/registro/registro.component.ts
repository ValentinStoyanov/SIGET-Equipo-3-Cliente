import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../services/usuario.service';
import { UsuarioDto } from 'src/app/common/usuario.dto';
import { NONE_TYPE } from '@angular/compiler';


@Component({
    selector: 'app-registro',
    templateUrl: './registro.component.html',
    styleUrls: ['./registro.component.css']
})
export class RegistroComponent implements OnInit {

    username: string;
    password: string;
    email: string;

    constructor(private servicioUsuario: UsuarioService) { }


    ngOnInit(): void {


    }

    metodoRegistrar() {
        
        //if( !(this.password.length<8) && !(this.password===this.password.toLowerCase()) && !(this.password === this.password.toUpperCase()) && !(this.password.search(/[0-9]/)<0) ){
        if (!(this.password.length < 8) && !(this.password === this.password.toLowerCase()) && !(this.password === this.password.toUpperCase())) {

            if(!(this.username == null) && !(this.email == null)){
                this.servicioUsuario.createUsuario(this.username, this.email, this.password);
                alert ('Usuario creado')
            }else{
                alert ('Rellene todos los campos')
            }            
        } else {
            alert('La contraseña debe tener como mínimo 8 caracteres, un mayúscula y un minúscula ')
        }
    }

}