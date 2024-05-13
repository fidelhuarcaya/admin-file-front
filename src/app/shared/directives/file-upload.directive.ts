import { NgForOf } from '@angular/common';
import { Directive, HostListener, HostBinding, Output, EventEmitter, Input, TemplateRef, ViewContainerRef, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';

@Directive({
  selector: '[fileUpload]'
})
export class FileUploadDirective {
  @Input() allowedExtensions: string[] = ['pdf', 'doc', 'docx', 'jpg', 'png'];
  @Input() maxFileSize: number = 1024 * 1024; // Default max file size is 1MB

  @Output() private filesChangeEmiter: EventEmitter<File[]> = new EventEmitter();
  @HostBinding('style.background') private background = '#ffffff';
  @HostBinding('style:hover') private hover = '#F5F9FF';
  @HostBinding('style.border-radius') private borderRadius = '5px';
  @HostBinding('style.background-color') private backgroundColor = '#FFFFFF';

  constructor(
    private messageService: MessageService,) { }

  @HostListener('mouseenter') public onHover() {
    this.backgroundColor = '#F5F9FF';
  }
  @HostListener('mouseleave') public onLeave() {
    this.backgroundColor = '#FFFFFF';
  }
  @HostListener('dragover', ['$event']) public onDragOver(evt: any) {
    evt.preventDefault();
    evt.stopPropagation();
    this.background = '#F5F9FF';
  }

  @HostListener('dragleave', ['$event']) public onDragLeave(evt: any) {
    evt.preventDefault();
    evt.stopPropagation();
    this.background = '#FFFFFF';
  }

  @HostListener('drop', ['$event']) public onDrop(evt: any) {
    evt.preventDefault();
    evt.stopPropagation();
    this.background = '#FFFFFF';
    let files = evt.dataTransfer.files;
    let valid_files: Array<File> = [];
    for (let i = 0; i < files.length; i++) {
      let file = files[i];
      let ext = file.name.split('.')[1];
      if (this.allowedExtensions.indexOf(ext) > -1 && file.size <= this.maxFileSize) {
        valid_files.push(file);
      }
    }
    if (valid_files.length === 0) {
      this.showError()
    }
    this.filesChangeEmiter.emit(valid_files);
  }
  showError() {
    let maxSizeInMB = this.maxFileSize / (1024 * 1024);
    this.messageService.add({ severity: 'error', 
    detail: `Solo se puede subir archivos con extensión ${this.allowedExtensions} y tamaño menor o igual a ${maxSizeInMB} MB.` })
    setTimeout(() => this.messageService.clear(), 5000);
  }

}
