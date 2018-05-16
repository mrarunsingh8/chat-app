import { Routes } from '@angular/router';

import { HomeLayoutComponent } from './layout/home-layout/home-layout.component';
import { HomeComponent } from './home/home.component';

export const route: Routes = [
	{path: '', component: HomeLayoutComponent, children:[
		{path: '', component: HomeComponent}
	]},
];