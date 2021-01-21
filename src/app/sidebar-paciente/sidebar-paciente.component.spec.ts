import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SidebarPacienteComponent } from './sidebar-paciente.component';

describe('SidebarPacienteComponent', () => {
  let component: SidebarPacienteComponent;
  let fixture: ComponentFixture<SidebarPacienteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SidebarPacienteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SidebarPacienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
