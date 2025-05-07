import { Routes } from '@angular/router';
import { LoginComponent } from './Components/login/login.component';
import { HerosectionComponent } from './Components/herosection/herosection.component';
import { ProfileComponent } from './Components/profile/profile.component';
import { BookingsComponent } from './Components/bookings/bookings.component';
import { AssistanceComponent } from './Components/assistance/assistance.component';
import { BooknowComponent } from './Components/booknow/booknow.component';
import { PackagesComponent } from './Components/packages/packages.component';
import { RegisterComponent } from './Components/register/register.component';
import { AdmincomponentComponent } from './Components/admincomponent/admincomponent.component';
import { TravelAgentComponent } from './travel-agent/travel-agent.component';
import { AgentComponent } from './Components/agent/agent.component';
import { UpdatePackageComponent } from './Components/update-package/update-package.component';
import { DeletePackageComponent } from './Components/delete-package/delete-package.component';

export const routes: Routes = [
    {
        path:'app-herosection',
        component:HerosectionComponent
    },
    {
        path:'app-profile',
        component:ProfileComponent
    },
    {
        path:'app-bookings',
        component:BookingsComponent
    },
    {
        path:'app-assistance',
        component:AssistanceComponent
    },
    {
    path:'',
    component:LoginComponent
    },
    {
        path:'app-booknow',
        component:BooknowComponent
    },
    {
        path:'app-packages',
        component:PackagesComponent
    },
    {
        path:'app-register',
        component:RegisterComponent
    },
    {
        path:'app-admincomponent',
        component:AdmincomponentComponent
    },
    {
        path:'app-travel-agent',
        component:TravelAgentComponent
    },
    {
        path:'app-agent',
        component:AgentComponent
    },
    {
        path:'app-agent',
        component:AgentComponent
    },
    {
        path:'app-update-package',
        component:UpdatePackageComponent
    },
    {
        path:'app-delete-package',
        component:DeletePackageComponent
    }
];
