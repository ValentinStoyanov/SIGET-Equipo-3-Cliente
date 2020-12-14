// app.routing.ts

import { NgModule } from '@angular/core';
import { RouterModule } from "@angular/router";
import { CrearReunionComponent } from './crear-reunion/crear-reunion.component';
import { LoginComponent } from "./login/login.component";
import { VerReunionesComponent } from './ver-reuniones/ver-reuniones/ver-reuniones.component';
import {RegistroComponent} from './registro/registro.component';
import {ModificarReunionesComponent } from './modificar/modificar-reuniones/modificar-reuniones.component';


const appRoutes = [
  { path: "", redirectTo: 'login', pathMatch: "full" },
  { path: "login", component: LoginComponent, pathMatch: "full" },
  { path: "crear-reunion", component: CrearReunionComponent, pathMatch: "full"},
  { path: "reuniones", component: VerReunionesComponent, pathMatch: "full"},
  { path: "registro", component: RegistroComponent, pathMatch: "full"},
  { path: "modificar", component: ModificarReunionesComponent, pathMatch: "full"}
];
@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
