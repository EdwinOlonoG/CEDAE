import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AlertModule } from 'ngx-bootstrap/alert';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { LogInComponent } from './log-in/log-in.component';
import { CalendarioComponent } from './calendario/calendario.component';
import { RouterModule } from '@angular/router';
import { CarouselModule } from 'ngx-bootstrap/carousel';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { GeneradorExpedienteComponent } from './generador-expediente/generador-expediente.component';
import { GenerarCitaComponent } from './generar-cita/generar-cita.component';
import { SidebarMedicoComponent } from './sidebar-medico/sidebar-medico.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { ProgressbarModule } from 'ngx-bootstrap/progressbar';
import { CarouselComponent } from './carousel/carousel.component';
import { RegistrarUsuarioComponent } from './registrar-usuario/registrar-usuario.component';
import { PacientesComponent } from './pacientes/pacientes.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { AgendaComponent } from './agenda/agenda.component';
import { RecetaComponent } from './receta/receta.component';
import { CitasComponent } from './citas/citas.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ExpedientesComponent } from './expedientes/expedientes.component';
import { FarmaciaComponent } from './farmacia/farmacia.component';
import { SidebarRecepcionistaComponent } from './sidebar-recepcionista/sidebar-recepcionista.component';
import { RecepcionistaComponent } from './recepcionista/recepcionista.component';


@NgModule({
  declarations: [
    AppComponent,
    LogInComponent,
    CalendarioComponent,
    GeneradorExpedienteComponent,
    GenerarCitaComponent,
    SidebarMedicoComponent,
    CarouselComponent,
    RegistrarUsuarioComponent,
    PacientesComponent,
    WelcomeComponent,
    AgendaComponent,
    RecetaComponent,
    CitasComponent,
    ExpedientesComponent,
    FarmaciaComponent,
    SidebarRecepcionistaComponent,
    RecepcionistaComponent,

  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      { path: 'expediente', component: GeneradorExpedienteComponent},
      { path: '', component: WelcomeComponent },
      { path: 'Login', component: LogInComponent},
      { path: 'cita', component: GenerarCitaComponent},
      { path: 'registrar', component: RegistrarUsuarioComponent},
      { path: 'Mispacientes', component: PacientesComponent},
      { path: 'agenda', component: AgendaComponent},
      { path: 'receta', component: RecetaComponent},
      { path: 'citas', component: CitasComponent},
      { path: 'tablaexpedientes', component: ExpedientesComponent},
      { path: 'farmacia', component: FarmaciaComponent},
      { path: 'recepcionista', component: RecepcionistaComponent},
    ]),
    BrowserAnimationsModule,
    BsDropdownModule.forRoot(),
    CarouselModule.forRoot(),
    AlertModule.forRoot(),
    TabsModule.forRoot(),
    TimepickerModule.forRoot(),
    ProgressbarModule.forRoot(),
    ReactiveFormsModule,
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
