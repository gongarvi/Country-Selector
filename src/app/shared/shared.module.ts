import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkanderbergService } from './services/skanderberg/skanderberg.service';
import { DiscordService } from './services/discord/discord.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers:[
    SkanderbergService,
    DiscordService,
  ],
  exports:[
    FormsModule,
    ReactiveFormsModule
  ]
})
export class SharedModule { }
