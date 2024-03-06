import { Routes } from '@angular/router';
import { LoginComponent } from './public/login/login.component';
import { RegisterComponent } from './public/register/register.component';
import { PostsComponent } from './client/posts/posts.component';
import { NotFoundComponent } from './shared/not-found/not-found.component';
import {  authGuard, authLoginGuard,  logoutGuard } from './auth-guard.service';
import { MainComponent } from './client/main/main.component';
import { ProfileComponent } from './client/profile/profile.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent , canActivate: [authLoginGuard] },
    { path: 'register', component: RegisterComponent , canActivate: [authLoginGuard] },
    { path: 'logout' , component: MainComponent, canActivate: [logoutGuard]  },
    { path: '',  loadChildren: () => import('./client/client.module').then(m => m.ClientModule)},
    
    {
        path: '', component: MainComponent, children: [
            { path: '', redirectTo: 'client', pathMatch: 'full' },
            { path: 'notfound' , component: NotFoundComponent},
            { path: ':nick', component: ProfileComponent  },
        ] , canActivate: [authGuard] // Redirige cualquier ruta no definida a /login
    },
    { path: '**', component: NotFoundComponent }
    
    
];
