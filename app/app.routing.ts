import {TicketsComponent} from "./tickets.component";
import {TaskComponent} from "./task.component";
import {DashboardComponent} from "./dashboard.component";
import {Routes, RouterModule} from "@angular/router";
import {ModuleWithProviders} from "@angular/core";

export const appRoutes: Routes = [
    {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full'
    }, {
        path: 'dashboard',
        component: DashboardComponent,
    }, {
        path: 'tickets',
        component: TicketsComponent
    }, {
        path: 'ticket/:id',
        component: TaskComponent
    }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);

