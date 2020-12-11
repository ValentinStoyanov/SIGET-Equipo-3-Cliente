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
  tituloConvocar: string;
  descripcionConvocar: string;
  horaFin: string;
  fechaconvocar: string;
  asistentesConvocar: string[] = []
  indexAdd: number = null;
  indexDelete: number = null;



  ngOnInit(): void{
        this.usuarioServicio.getAll().subscribe({
      next: (usuariosReceived: UsuarioDto[]) =>{
        (this.asistentesConvocar = asistentesConvocar);
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
      this.asistentesConvocar.push(this.asistentesConvocar[this.indexDelete]);
      this.asistentesConvocar.splice(this.indexDelete, 1);
      this.asistentesConvocar.splice(this.indexDelete, 1);
    }
  }

  addAsistente(): void{
    if (this.indexAdd != null){
      this.asistentesConvocar.push(this.asistentesConvocar[this.indexAdd]);
      this.asistentesConvocar.push(this.asistentesConvocar[this.indexAdd].username);
      this.asistentesConvocar.splice(this.indexAdd, 1);

    }
  }
  actualizarIndexAdd(index: number): void {
    this.indexAdd = index;
  }

  actualizarIndexDelete(index: number): void {
    this.indexDelete = index;
  }
}
