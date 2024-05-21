import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MessageService, MegaMenuItem } from 'primeng/api';
import { AvatarModule } from 'primeng/avatar';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { ButtonModule } from 'primeng/button';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { MenubarModule } from 'primeng/menubar';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { Subscription } from 'rxjs';
import { Documento } from '../../../../app.component';
import { ApiService } from '../../../../service/documento.service';
import { SharedService } from '../../../../service/shared.service';
import { CreateDocumentoComponent } from '../create-documento/create-documento.component';

@Component({
  selector: 'app-list-documento',
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
  templateUrl: './list-documento.component.html',
  styleUrl: './list-documento.component.scss'
})
export class ListDocumentoComponent implements OnInit, OnDestroy {

  documentos: Documento[] = [];
  ref: DynamicDialogRef | undefined;

  items: MegaMenuItem[] = [];
  mensaje: string = '';
  subscription: Subscription | null = null;
  constructor(private apiService: ApiService,
    public dialogService: DialogService,
    public messageService: MessageService,
    private sharedService: SharedService,

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
        return 'info';
      case 2:
        return 'warning';
      case 3:
        return 'danger';
      case 4:
        return 'success';
    }
    return 'info';
  }
  ngOnDestroy() {
    // Es importante desuscribirse para evitar fugas de memoria
    if (this.subscription)
      this.subscription.unsubscribe();
  }
}