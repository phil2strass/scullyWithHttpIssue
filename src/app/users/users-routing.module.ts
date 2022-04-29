import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersComponent } from './users.component';

const routes: Routes = [{ path: '', component: UsersComponent }, { path: ':id', loadChildren: () => import('../user/user.module').then(m => m.UserModule) }, { path: '*', loadChildren: () => import('../user-search/user-search.module').then(m => m.UserSearchModule) }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
