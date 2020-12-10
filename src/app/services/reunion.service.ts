import { Injectable, Inject, PLATFORM_ID } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ReunionDto } from '../common/reunion.dto';


@Injectable({
  providedIn: 'root'
})
export class ReunionService {
  constructor(private readonly http: HttpClient, @Inject(PLATFORM_ID) private platformId: object) {
  }


  postId;
  errorMessage;

 

  getByAsistentes(name: string): Observable<ReunionDto[]> {
    return this.http.get<any>(`http://localhost:8080/reunion/get?asistentes=${name}`)
    .pipe(
      map((reunionesDto: ReunionDto[]) => {
        console.log(reunionesDto);
        return reunionesDto;
      })
    );
  }


}
