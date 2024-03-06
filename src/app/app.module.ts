import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PublicModule } from './public/public.module';
import { ClientModule } from './client/client.module';
import { RouterModule, RouterOutlet } from '@angular/router';
import { routes } from './app.routes';
import { SharedModule } from './shared/shared.module';
import { ProfileComponent } from './client/profile/profile.component';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    PublicModule,
    ClientModule,
    SharedModule,
    RouterOutlet,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
