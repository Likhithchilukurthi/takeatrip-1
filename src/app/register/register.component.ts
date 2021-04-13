import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { UserService } from './../user.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  isvalid:any
  constructor(private userobj:UserService,private router:Router,private toastr:ToastrService) { }

  ngOnInit(): void {
  }
  onSubmit(data:any){
    if(!data.form.invalid){console.log(data.value)}
    if(data.form.invalid){
      this.isvalid=0
    }
    else if(data.value.password!=data.value.password1){
    this.toastr.error("Passwords did not match");
    }
    else{
     this.userobj.createuser(data.value).subscribe(res=>{
       if(res["message"]=="User already exists"){
this.toastr.warning("User name already exists please try another username");
this.router.navigateByUrl("/register")
       }
       if(res["message"]=="User sucessfully created"){
        this.toastr.success("User sucessfully created");
        this.router.navigateByUrl("/login")
               }
        else{this.toastr.error("Something went wrong");}
       
     })
    }
  }
}
