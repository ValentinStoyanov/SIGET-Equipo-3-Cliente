import { Component, OnInit } from '@angular/core';
import { ReunionDto } from 'src/app/common/reunion.dto';
import { Router } from '@angular/router';
import { ReunionService } from 'src/app/services/reunion.service';
import { UsuarioDto } from 'src/app/common/usuario.dto';
import { UsuarioService } from 'src/app/services/usuario.service';
import { AsistenteDto } from 'src/app/common/asistente.dto';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {ReactiveFormsModule,FormsModule} from '@angular/forms';

@Component({
  selector: 'app-modificar-reuniones',
  templateUrl: './modificar-reuniones.component.html',
  styleUrls: ['./modificar-reuniones.component.css']
})
export class ModificarReunionesComponent implements OnInit {
  constructor(public router: Router, private formBuilder: FormBuilder, private reunionServicio: ReunionService, private usuarioServicio: UsuarioService) { }
  titulo: string;
  descripcion: string;
  dia: number;
  mes: number;
  ano: number;
  hora: string;
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
  reuniones :ReunionDto[];
  loading = false;


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
    this.updateTable();
}

  reunion(): void {
    console.log(this.asistentes);


    alert('Creando reunion')

    const fecha: string = this.form.controls.fecha.value.substring(0,4)+"-"+ this.form.controls.fecha.value.substring(5,7)+"-"+this.form.controls.fecha.value.substring(8,10);
    const hora: string = this.form.controls.fecha.value.substring(11,16);
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


  updateReunion(): void {
    const dia: string = this.form.controls.fecha.value.substring(0,4)
    const mes: string =this.form.controls.fecha.value.substring(5,7)
    const ano:string =this.form.controls.fecha.value.substring(8,10);
    const hora: string = this.form.controls.fecha.value.substring(11,16);
    this.reunionServicio
    .updateReunion(this.form.controls.titulo.value, dia,mes,ano, hora,this.form.controls.descripcion.value,this.asistentes);
  }



  updateTable(): void{
    this.reunionServicio
     .getByAsistentes(this.nombreUsuario)
     .subscribe({
      next: (reunionesReceived: ReunionDto[]) => {
        this.reuniones = reunionesReceived;
      },
      error: (err) => {
        console.error(err);
      },
      complete: () => (this.loading = false),
    });
  }

  setValues(reunion: ReunionDto): void {
    this.titulo = reunion.titulo;
    this.descripcion = reunion.descripcion;
    this.dia = reunion.dia;
    this.mes = reunion.mes;
    this.ano = reunion.ano;
    this.hora = reunion.hora;
    //this.asistentes = reunion.asistentes;
    
  }
}