import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ApiService } from './service/documento.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { MegaMenuItem, MenuItem, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ListDocumentoComponent } from './pages/home/components/list-documento/list-documento.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CreateDocumentoComponent } from './pages/home/components/create-documento/create-documento.component';
import { MenubarModule } from 'primeng/menubar';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { TagModule } from 'primeng/tag';
import { FileUploadDirective } from './shared/directives/file-upload.directive';
import { SharedService } from './service/shared.service';
import { Subscription } from 'rxjs';

export interface Documento {
  id: number;
  nombre: string;
  hash: string;
  estado:number;
}
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    CommonModule,
    HttpClientModule,
    ButtonModule,
    TableModule,
    MenubarModule,
    AvatarModule,
    AvatarGroupModule,
    TagModule,
    
  ],
  providers: [ApiService, DialogService, MessageService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, OnDestroy {

  documentos: Documento[] = [];
  ref: DynamicDialogRef | undefined;

  items: MegaMenuItem[] = [];
  mensaje: string='';
  subscription: Subscription|null=null;
  constructor(private apiService: ApiService,
    public dialogService: DialogService, 
    public messageService: MessageService,
    private sharedService:SharedService,

  ) { }

  ngOnInit(): void {
    this.obtenerDocumentos();
    this.subscription = this.sharedService.accionRealizada$.subscribe(
      mensaje => {
        this.mensaje = mensaje;
        this.obtenerDocumentos();
      }
    );
  }

  obtenerDocumentos(): void {
    this.apiService.obtenerDocumentos().subscribe(documentos => {
      this.documentos = documentos;
    });
  }

  show() {
    this.ref = this.dialogService.open(CreateDocumentoComponent, {
      header: 'Seleccione el documento',
      width: '70%',
      contentStyle: { overflow: 'auto' },
      baseZIndex: 10000,
      maximizable: true
    });

    this.ref.onClose.subscribe((product: any) => {
      if (product) {
        this.messageService.add({ severity: 'info', summary: 'Product Selected', detail: product.name });
      }
    });
  }

  getSeverity(status: number) {
    switch (status) {
      case 1:
        return 'success';
      case 2:
        return 'warning';
      case 3:
        return 'danger';
    }
    return 'success'; 
  }
  ngOnDestroy() {
    // Es importante desuscribirse para evitar fugas de memoria
    if(this.subscription)
    this.subscription.unsubscribe();
  }
}