import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageRecipeListComponent } from './manage-recipe-list.component';

describe('ManageRecipeListComponent', () => {
  let component: ManageRecipeListComponent;
  let fixture: ComponentFixture<ManageRecipeListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ManageRecipeListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageRecipeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
