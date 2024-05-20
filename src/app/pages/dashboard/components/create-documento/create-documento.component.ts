import { ChangeDetectorRef, Component } from '@angular/core';
import { FileUploadDirective } from '../../../../shared/directives/file-upload.directive';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ApiService } from '../../../../service/documento.service';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { SharedService } from '../../../../service/shared.service';

@Component({
  selector: 'app-create-documento',
  standalone: true,
  providers: [ApiService],
  imports: [CommonModule, ButtonModule],
  templateUrl: './create-documento.component.html',
  styleUrl: './create-documento.component.scss'
})
export class CreateDocumentoComponent {

  formData = new FormData();
  loading: boolean = false; // Flag variable
  public files: any[] = [];

  constructor(
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig,
    private apiService: ApiService,
    private cdRef: ChangeDetectorRef,
    private sharedService:SharedService,

  ) { }

  upload(file: any) {
    console.log(file);
    if (file) this.formData.append('file', file);
  }
  onFileChange(pFileList: any) {
    this.files = Array.from(pFileList);
    console.log(this.files);
    this.upload(this.files[0]);
  }
  onFileChangeEvent(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const files: FileList | null = inputElement.files;

    if (!files) {
      return;
    }
    const selectedFiles = Array.from(files).filter(file => {
      const extension = file.name.split('.').pop();
      return true;
    });
    this.files = selectedFiles;
    if (files) {
      this.upload(files[0]);
    }inputElement.value = '';
  }

  deleteFile(file: any) {
    this.files = this.files.filter(function (w) {
      return w.name != file.name;
    });
  }

  cancel() {
    this.ref.close();
  }

  updateFile() {
    if(this.files.length<1){
      return
    }

    this.apiService
      .registrarDocumento(this.formData)
      .subscribe({
        next: requisito => {
          this.ref.close();
          this.sharedService.realizarAccion('¡Acción realizada!');
        },
        error: e => {

        },
        complete: () => { },
      });
  }
}
