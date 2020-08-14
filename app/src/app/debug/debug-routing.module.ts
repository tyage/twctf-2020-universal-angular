import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FlagComponent } from './flag/flag.component';

const routes: Routes = [
  { path: 'debug/flag', component: FlagComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DebugRoutingModule { }