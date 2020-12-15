import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ReunionDto } from '../common/reunion.dto';
import { AsistenteDto } from '../common/asistente.dto';


@Injectable({
  providedIn: 'root'
})
export class ReunionService {
  constructor(private readonly http: HttpClient, @Inject(PLATFORM_ID) private platformId: object) {
  }


  postId;
  errorMessage;



  getByAsistentes(name: string): Observable<ReunionDto[]> {
    return this.http.get<any>(`https://sigetequipo3.herokuapp.com/reunion/get?asistentes=${name}`)
    .pipe(
      map((reunionesDto: ReunionDto[]) => {
        console.log(reunionesDto);
        return reunionesDto;
      })
    );
  }


  delete(dia: number, mes: number, ano: number, hora: string) {
    this.http.post<any>(`https://sigetequipo3.herokuapp.com/reunion/delete?dia=${dia}&mes=${mes}&ano=${ano}&hora=${hora}`, { title: 'Angular POST delete' }).subscribe({
        next: data => {
            this.postId = data.id;
        },
        error: error => {
            this.errorMessage = error.message;
            console.error('There was an error!', error);
        }
    })

  }

  createReunion(titulo: string, descripcion: string, hora: string, fecha: string, asistentes: string[]): void {
    console.log(titulo);
    console.log(descripcion);
    console.log(hora);
    console.log(fecha);
    console.log(asistentes);
    const headerDict = {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Headers': 'Content-Type',
      'Authorization': localStorage.getItem("Token"),
    }
    const requestOptions = {
      headers: new HttpHeaders(headerDict),
    };
    this.http.post<any>(`https://sigetequipo3.herokuapp.com/reunion/convocar
    `, {type: "ConvocarReunion",
    titulo: titulo,
    descripcion: descripcion,
    hora: hora,
    fecha: fecha,
    asistentes: asistentes,
  },requestOptions).subscribe({
    next: data => {
    },
    error: error => {
        console.error('There was an error!', error);
    }
  });
  }

}
