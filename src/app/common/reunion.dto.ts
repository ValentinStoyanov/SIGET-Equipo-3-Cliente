import { IsString, IsNotEmpty } from 'class-validator';
import { AsistenteDto } from './asistente.dto';

export class ReunionDto {
  
  @IsNotEmpty()
  @IsString()
  organizador: string;
  titulo:string;
  estado: string;
  dia: number;
  mes: number;
  ano: number;
  hora: string;
  descripcion: string;
  asistentes: AsistenteDto[];

}