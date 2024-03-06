import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PostmodalComponent } from './postmodal.component';

describe('PostmodalComponent', () => {
  let component: PostmodalComponent;
  let fixture: ComponentFixture<PostmodalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PostmodalComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PostmodalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
