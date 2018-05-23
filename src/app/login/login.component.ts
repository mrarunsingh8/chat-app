import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  userData: {username: string} = {username: null};
  form: FormGroup;
  constructor(private formBuilder: FormBuilder) {

  }

  ngOnInit() {
  	this.form = this.formBuilder.group({
  		username: ['', [Validators.required, Validators.minLength(4)]],
  	});
  }

  getNgClass(formControlELm: any){
  	return {'login-form-field': true, 'has-error': !formControlELm.valid && (formControlELm.dirty || formControlELm.touched)};  	
  }

  submit(){
  	if (this.form.valid) {
  		
	}
  }

}
