import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { clientRoutes } from './main.routes';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(clientRoutes)
  ],
  exports: [RouterModule]
})
export class MainRoutingModule { }
