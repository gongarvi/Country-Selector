import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { DiscordService } from '../services/discord.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  conectado:boolean = false;
  loading:boolean = true;


  formControl!:UntypedFormGroup;

  constructor(
    private router:ActivatedRoute,
    private route:Router,
    private discordService:DiscordService,
    private formBuilder:UntypedFormBuilder
  ) { }
  ngOnInit():void{
    if(this.discordService.hasSessionSaved()){
      this.startDiscordSession();
    }else{
      this.router.queryParams.forEach(params=>{
        var code:string = "";
        var param_key = Object.keys(params).find(name=>name === "code");
        if(param_key){
          code = params[param_key];
        }
        if(code !== ""){
          this.discordService.changeCodeToken(code).subscribe(
            response=>{
              this.startDiscordSession();
            }
          )
        }else{
          this.loading = false;
        }
      });
    }

    this.formControl = this.formBuilder.group({
      documentId: new UntypedFormControl("", [Validators.required, Validators.minLength(2)])
    })
  }

  startDiscordSession(){
    this.discordService.getCurrentUser()?.subscribe(
      async response=>{
        this.conectado = true;
        response.avatarBlob = await this.discordService.getUserAvatar(response.id, response.avatar);
        this.loading = false;
      }
    );
  }

  submit(){
    if(this.formControl.invalid){
      return;
    }
    this.route.navigate(["mapa"],{state:{documentId:this.formControl.value}})
  }
}
