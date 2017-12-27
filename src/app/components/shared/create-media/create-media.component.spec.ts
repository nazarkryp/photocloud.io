import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateMediaComponent } from './create-media.component';

describe('CreateMediaComponent', () => {
  let component: CreateMediaComponent;
  let fixture: ComponentFixture<CreateMediaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateMediaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateMediaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
