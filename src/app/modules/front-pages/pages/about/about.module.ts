import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AboutRoutingModule } from './about-routing.module';
import { HistoryComponent } from './history/history.component';
import { MissionComponent } from './mission/mission.component';
import { AboutMainComponent } from './about-main/about-main.component';
import { MaterialModule } from 'src/app/modules/material/material.module';


@NgModule({
  declarations: [
    HistoryComponent,
    MissionComponent,
    AboutMainComponent
  ],
  imports: [
    CommonModule,
    AboutRoutingModule,
    MaterialModule
  ],
  exports: [
    AboutMainComponent
  ]
})
export class AboutModule { }
