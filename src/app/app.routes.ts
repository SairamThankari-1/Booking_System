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
import { AgentComponent } from './Components/agent/agent.component';
import { UpdatePackageComponent } from './Components/update-package/update-package.component';
import { DeletePackageComponent } from './Components/delete-package/delete-package.component';
import { AdminRegisterComponent } from './Components/admin-register/admin-register.component';
import { EditProfileComponent } from './Components/edit-profile/edit-profile.component';
import { CreateAssistanceComponent } from './Components/create-assistance/create-assistance.component';
import { ReviewComponent } from './Components/reviews/reviews.component';
import { TravelAgentComponent } from './Components/travel-agent/travel-agent.component';
import { AddComponent } from './Components/add/add.component';
import { UsersComponent } from './Components/users/users.component';
import { AdminBookingsComponent } from './Components/admin-bookings/admin-bookings.component';

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
    },
    {
        path:'app-admin-register',
        component:AdminRegisterComponent
    },
    {
        path:'app-edit-profile',
        component:EditProfileComponent
    },
    {
        path:'app-create-assistance',
        component:CreateAssistanceComponent
    },
    {
        path:'app-reviews',
        component:ReviewComponent
    },
    {
        path:'app-travel-agent',
        component:TravelAgentComponent
    },
    {
        path:'app-add',
        component:AddComponent
    },
    {
        path:'app-users',
        component:UsersComponent
    },
    {
        path:'app-admin-bookings',
        component:AdminBookingsComponent
    }
];
