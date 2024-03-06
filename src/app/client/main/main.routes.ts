import { Routes } from '@angular/router';
import { PostsComponent } from '../posts/posts.component';
import { MainComponent } from './main.component';
import {  authGuard } from '../../auth-guard.service';
import { ProfileComponent } from '../profile/profile.component';
import { NotFoundComponent } from '../../shared/not-found/not-found.component';



export const clientRoutes: Routes = [
    
    {
        path: '', component: MainComponent, children: [
            { path: '', redirectTo: 'posts', pathMatch: 'full' },
            { path: 'posts', component: PostsComponent  },
            
        ] , canActivate: [authGuard] // Redirige cualquier ruta no definida a /login
    }
    
    
    
];