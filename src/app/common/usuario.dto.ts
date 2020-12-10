import { IsString, IsNotEmpty } from 'class-validator';

export class UsuarioDto {


  username: string;
  email: string;
  password: string; 
  roles: string[];
}