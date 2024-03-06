import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { PostsComponent } from './posts/posts.component';
import { PostsService } from './services/posts.service';
import { SharedModule } from '../shared/shared.module';
import { MainComponent } from './main/main.component';

import { RouterModule } from '@angular/router';
import { MainRoutingModule } from './main/main-routing.module';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JwtInterceptor } from './services/jwt.interceptor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PostcardComponent } from './posts/postcard/postcard.component';
import { PostmodalComponent } from './posts/postmodal/postmodal.component';
import { ProfileComponent } from './profile/profile.component';



@NgModule({
  declarations: [ 
    MainComponent,
    PostsComponent,
    PostcardComponent,
    PostmodalComponent,
    ProfileComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    MainRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    PostsService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    },
    DatePipe
  ]
})
export class ClientModule { }
