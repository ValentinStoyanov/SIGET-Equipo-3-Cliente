import { Component, OnInit } from '@angular/core';
import { ReunionDto } from 'src/app/common/reunion.dto';
import { Router } from '@angular/router';
import { ReunionService } from 'src/app/services/reunion.service';
import { UsuarioDto } from '../common/usuario.dto';
import { UsuarioService } from '../services/usuario.service';
import { AsistenteDto } from '../common/asistente.dto';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-crear-reunion',
  templateUrl: './crear-reunion.component.html',
  styleUrls: ['./crear-reunion.component.css']
})
export class CrearReunionComponent  {
  constructor(public router: Router, private formBuilder: FormBuilder, private reunionServicio: ReunionService, private usuarioServicio: UsuarioService) { }
  temas: string;
  descripcion: string;
  horaFin: string;
  horaInicio: string;
  asistentes: string[] = [];
  asistentesDto: AsistenteDto[] = [];
  convocante: string;
  respuesta: ReunionDto;
  nombreUsuario = localStorage.getItem("name");
  usuariosRegistrados: string[];
  usuariosElegidos: string[] = [];
  indexAdd: number = null;
  indexDelete: number = null;
  form: FormGroup;


  ngOnInit(): void{
    this.usuarioServicio.getAsistentes().subscribe({
      next: (usuariosReceived: any) =>{
        (this.usuariosRegistrados = usuariosReceived.usuarios);
      },
      error: (err) => {
        console.error(err);
      },
      complete: () => (console.log(this.usuariosRegistrados)),
    });

    this.form = this.formBuilder.group({
      titulo: ['', []],
      descripcion: ['', []],
      fecha: [[]],
    });
}

  reunion(): void {
    console.log(this.asistentes);


    alert('Creando reunion')

    const fecha: string = this.form.controls.fecha.value.substring(0,4)+"-"+ this.form.controls.fecha.value.substring(5,7)+"-"+this.form.controls.fecha.value.substring(8,10);
    console.log(fecha);
    const hora: string = this.form.controls.fecha.value.substring(11,16);
    console.log(hora);
    this.reunionServicio
    .createReunion(this.form.controls.titulo.value, this.form.controls.descripcion.value, hora, fecha, this.asistentes);

  }

  deleteAsistente(): void{
    if (this.indexDelete != null){
      this.usuariosRegistrados.push(this.usuariosElegidos[this.indexDelete]);
      this.asistentes.splice(this.indexDelete, 1);
      this.usuariosElegidos.splice(this.indexDelete, 1);
    }
  }

  addAsistente(): void{
    if (this.indexAdd != null){
      this.usuariosElegidos.push(this.usuariosRegistrados[this.indexAdd]);
      this.asistentes.push(this.usuariosRegistrados[this.indexAdd]);
      this.usuariosRegistrados.splice(this.indexAdd, 1);

    }
  }
  actualizarIndexAdd(index: number): void {
    this.indexAdd = index;
  }

  actualizarIndexDelete(index: number): void {
    this.indexDelete = index;
  }
}
