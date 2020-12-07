import { Component, OnInit } from '@angular/core';
import { ReunionDto } from 'src/app/common/reunion.dto';
import { Router } from '@angular/router';
import { ReunionService } from 'src/app/services/reunion.service';
import { UsuarioDto } from '../common/usuario.dto';
import { UsuarioService } from '../services/usuario.service';

@Component({
  selector: 'app-crear-reunion',
  templateUrl: './crear-reunion.component.html',
  styleUrls: ['./crear-reunion.component.css']
})
export class CrearReunionComponent implements OnInit {
  constructor(public router: Router, private reunionServicio: ReunionService, private usuarioServicio: UsuarioService) { }
  temas: string;
  descripcion: string;
  horaFin: string;
  horaInicio: string;
  asistentes: string[] = [];
  convocante: string;
  respuesta: ReunionDto;
  nombreUsuario = localStorage.getItem("name");
  usuariosRegistrados: UsuarioDto[];
  usuariosElegidos: UsuarioDto[] = [];
  indexAdd: number = null;
  indexDelete: number = null;



  ngOnInit(): void{
        this.usuarioServicio.getAll().subscribe({
      next: (usuariosReceived: UsuarioDto[]) =>{
        (this.usuariosRegistrados = usuariosReceived);
      },
      error: (err) => {
        console.error(err);
      },
      complete: () => (console.log("OK")),
    });
  }


  reunion(): void {


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
      this.asistentes.push(this.usuariosRegistrados[this.indexAdd].username);
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
