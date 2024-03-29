import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogoutHomeComponent } from './logout-home.component';

describe('LogoutHomeComponent', () => {
  let component: LogoutHomeComponent;
  let fixture: ComponentFixture<LogoutHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LogoutHomeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LogoutHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
