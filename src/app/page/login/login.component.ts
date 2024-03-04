import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink,HttpClientModule,FormsModule,CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  private baseUrl:String="http://localhost:8081/login/";
  loginObj:any={
    "email":"",
    "password":""
  }

  constructor(private http:HttpClient,private router:Router){}

  login(){
    console.log(this.loginObj);
    
    this.http.post(this.baseUrl+"request-login",this.loginObj).subscribe((res:any)=>{
      console.log(res);
      if(res){
        this.router.navigate(['/view-all-books'])
      }else{
        alert("Details are incorrect");
      }
    })
    
  }
}
