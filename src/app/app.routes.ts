import { Routes } from '@angular/router';

import { HomeLayoutComponent } from './layout/home-layout/home-layout.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AuthGuardService } from './login/auth.guard.service';

export const route: Routes = [
	{path: '', component: HomeLayoutComponent, children:[
		{path: '', component: HomeComponent, canActivate: [AuthGuardService]},
		{path: 'login', component: LoginComponent}
	]},
];