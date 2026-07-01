import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Recovery } from './recovery';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';

describe('Recovery', () => {
  let component: Recovery;
  let fixture: ComponentFixture<Recovery>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Recovery],
      providers: [
        provideHttpClient(),
        provideRouter([])
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(Recovery);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
