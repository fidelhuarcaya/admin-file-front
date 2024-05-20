import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { TipoTramite } from '../../interfaces/home.interface';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { DropdownModule } from 'primeng/dropdown';
import { TipoTramiteService } from '../../services/tipo-tramite.service';
import { SolicitudService } from '../../services/solicitud.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    DropdownModule,

  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  form!: FormGroup;

  selectedItem!: TipoTramite;


  saving: boolean = false;
  deleting: boolean = false;

  comboTipoTramite: TipoTramite[] = [];
  selectedTipoTramite: TipoTramite | null = null;

  constructor(
    private tipoTramiteService: TipoTramiteService,
    private solicitudService: SolicitudService,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.form = new FormGroup({
      idTipoTramite: new FormControl(null),
      nombres: new FormControl('', Validators.required),
      apellidos: new FormControl('', Validators.required),
      dni: new FormControl('', [Validators.required, Validators.minLength(8), Validators.maxLength(8)]),
    });


    this.tipoTramiteService.buscarTodos().subscribe({
      next: (data) => {
        this.comboTipoTramite = data;
      },
    });
  }


  onChangeTipoTramiteSelect(event: any) {
    const value = event.value;
    this.selectedTipoTramite =
      this.comboTipoTramite.filter(item => item.idTipoTramite === value)[0];
  }


  saveSolicitud() {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.form.markAsDirty();
      this.form.markAsPristine()
      return;
    }

    const solicitud = this.form.getRawValue();
    this.solicitudService.registrarSolicitud(solicitud).subscribe({
      next: (data) => {
        this.router.navigate(['dashboard'])
      },
    });
  }
}
