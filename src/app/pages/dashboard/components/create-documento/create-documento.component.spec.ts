import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDocumentoComponent } from './create-documento.component';

describe('CreateDocumentoComponent', () => {
  let component: CreateDocumentoComponent;
  let fixture: ComponentFixture<CreateDocumentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateDocumentoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateDocumentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
