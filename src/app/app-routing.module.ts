import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { JarDetailComponent } from './jar-detail/jar-detail.component';
import { JarsComponent } from './jars/jars.component';
import { TransactionComponent } from './transaction/transaction.component';

const routes: Routes = [
  { path: '', redirectTo: '/jars', pathMatch: 'full' },
  { path: 'transaction', component: TransactionComponent },
  { path: 'jars/:id', component: JarDetailComponent },
  { path: 'jars', component: JarsComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
