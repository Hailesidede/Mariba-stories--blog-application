import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AddPostComponent } from './add-post/add-post.component';
import { PostComponent } from './post/post.component';
import { LoginComponent } from './_auth/login/login/login.component';
import { RegisterComponent } from './_auth/login/register/register.component';
import { AboutComponent } from './about/about.component';
import { AuthGuard } from './_auth/login/auth.guard';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'addPost', component: AddPostComponent, canActivate: [AuthGuard], data:{roles:['Admin']}},
  {path : 'post/:id', component: PostComponent},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'about', component: AboutComponent}
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
