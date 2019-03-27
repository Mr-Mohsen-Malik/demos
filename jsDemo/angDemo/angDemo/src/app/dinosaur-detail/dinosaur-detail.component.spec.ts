import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DinosaurDetailComponent } from './dinosaur-detail.component';

describe('DinosaurDetailComponent', () => {
  let component: DinosaurDetailComponent;
  let fixture: ComponentFixture<DinosaurDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DinosaurDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DinosaurDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
