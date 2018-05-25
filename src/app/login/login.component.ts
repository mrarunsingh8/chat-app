import { Component, OnInit, Input, AfterContentInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HomeService } from './../home.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, AfterContentInit {
  userData: {username: string} = {username: null};
  form: FormGroup;
  @Input() socket:any;
  constructor(private homeService: HomeService, private formBuilder: FormBuilder, private router: Router) {

  }

  ngOnInit() {
  	this.form = this.formBuilder.group({
      username: ['', [Validators.required, Validators.minLength(4)]],
      password: ['', [Validators.required, Validators.minLength(4)]],
  	});
  }

  ngAfterContentInit(){
    this.homeService.socket.on("onAuthenticate", (data)=>{
      if(data.success){
        this.homeService.doLogin(data.token);
        this.router.navigateByUrl('/');
      }
    });
  }



  getNgClass(formControlELm: any){
  	return {'login-form-field': true, 'has-error': !formControlELm.valid && (formControlELm.dirty || formControlELm.touched)};  	
  }

  submitLogin(){
  	if (this.form.valid) {
      this.homeService.socket.emit("auth", this.form.value);
	  }
  }

}
