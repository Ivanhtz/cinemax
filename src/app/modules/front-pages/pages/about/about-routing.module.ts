import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutMainComponent } from './about-main/about-main.component';
import { HistoryComponent } from './history/history.component';
import { MissionComponent } from './mission/mission.component';

const routes: Routes = [
  {
    path: '', component: AboutMainComponent, children: [
      { path: '', pathMatch: 'full', redirectTo: 'history' },
      { path: 'history', component: HistoryComponent },
      { path: 'mission', component: MissionComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AboutRoutingModule { }
