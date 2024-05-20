import { Component, OnDestroy, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ApiService } from './service/documento.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { MegaMenuItem, MenuItem, MessageService } from 'primeng/api';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ListDocumentoComponent } from './pages/dashboard/components/list-documento/list-documento.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
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
    ListDocumentoComponent,
    RouterOutlet
  ],
  providers: [ApiService, DialogService, MessageService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  
  constructor(

  ) { }

  ngOnInit(): void {
  
  }

  
}