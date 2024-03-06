import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { NotFoundComponent } from './not-found/not-found.component';
import { SidebardComponent } from './sidebard/sidebard.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PostsService } from '../client/services/posts.service';
import { JwtInterceptor } from '../client/services/jwt.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';



@NgModule({
  declarations: [
    NotFoundComponent,
    SidebardComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    NotFoundComponent,
    SidebardComponent
  ],
  providers: [PostsService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    },
    DatePipe],
})
export class SharedModule {

}
