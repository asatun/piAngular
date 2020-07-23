import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListoffempComponent } from './listoffemp.component';

describe('ListoffempComponent', () => {
  let component: ListoffempComponent;
  let fixture: ComponentFixture<ListoffempComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListoffempComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListoffempComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
