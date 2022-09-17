import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatsuriListComponent } from './matsuri-list.component';

describe('MatsuriListComponent', () => {
  let component: MatsuriListComponent;
  let fixture: ComponentFixture<MatsuriListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatsuriListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MatsuriListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
