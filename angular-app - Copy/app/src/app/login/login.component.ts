import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AppService } from '../servicse/app.service';

declare var $:any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  checkedError:any;
  formLogion: FormGroup = new FormGroup({
    email: new FormControl('',[Validators.required,Validators.email,Validators.minLength(12)]),
    password: new FormControl('',Validators.required),
  });
  formRegister: FormGroup = new FormGroup({
    name: new FormControl('',[Validators.required,Validators.minLength(5)]),
    email: new FormControl('',[Validators.required,Validators.email,Validators.minLength(12)]),
    password: new FormControl('',Validators.required),
  });
  constructor(private app:AppService) { }
  get f(){
    return this.formLogion.controls;
  }
  get r(){
    return this.formRegister.controls;
  }
  ngOnInit(): void {
    
  }
  onlogin(){
    this.app.checkLogin(this.formLogion.value).subscribe((res:any)=>{
      if(res.result){
        sessionStorage.setItem('login',JSON.stringify(res.result));
        location.assign('/')
      }else{
        this.checkedError = 'tai khoan k phu hop'
      }
    });
  }
  register(){
    this.app.register(this.formRegister.value).subscribe((res:any)=>{
        if(res.status == false){
          this.checkedError = 'tai khoan da duoc su dung';
        }else{
          location.assign('/login')
        }
        
    });
  }
  eventClickRegis(){
      $('.veen .wrapper').addClass('move');
      $('.body').css('background', '#e0b722');
      $(".veen .login-btn button").removeClass('active');
      $(this).addClass('active');
  }
  eventClickLogin(){
    $('.veen .wrapper').removeClass('move');
    $('.body').css('background', '#ff4931');
    $(".veen .rgstr-btn button").removeClass('active');
    $(this).addClass('active');
  }
}

