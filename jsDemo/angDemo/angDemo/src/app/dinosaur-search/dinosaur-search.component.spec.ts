import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DinosaurSearchComponent } from './dinosaur-search.component';

describe('DinosaurSearchComponent', () => {
  let component: DinosaurSearchComponent;
  let fixture: ComponentFixture<DinosaurSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DinosaurSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DinosaurSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
