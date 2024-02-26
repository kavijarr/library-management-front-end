import { Component,OnInit } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [HttpClientModule, FormsModule, CommonModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit{

  
  
  private http;
  public countryList:any;
  public selectedCountry:any;
  public isExistUser:any;
  public userObj={
    firstName:null,
    lastName:null,
    userName:null,
    email:null,
    address:null,
    address2:null,
    country:null,
    phoneNumber:null
  }

  constructor(private httpClient:HttpClient){
    this.http=httpClient;
  }
  
  ngOnInit(): void {
      this.loadCountries();
  }

  loadCountries(){
    let api = "https://restcountries.com/v3.1/all"
    this.http.get(api).subscribe(res=>{
      this.countryList=res;
      console.log(res);
      
    })
  }

  setSelectedCountry(country:any){
    this.selectedCountry=country;
  }

  submitForm(){
    console.log(this.userObj);
    this.http.get(`http://localhost:8081/user/exist-by-userName/${this.userObj.userName}`).subscribe(data=>{
      console.log(data);
      this.isExistUser=data;
      this.registerUser(this.isExistUser);
    })
  }

  registerUser(isExistUser:any){
    if(!isExistUser){
      this.http.post("http://localhost:8081/user/add",this.userObj).subscribe(data=>{
        Swal.fire({
          title:"Success",
          text:`${this.userObj.userName} Has been registerd !`,
          icon:"success"
        })
      })
    }else{
      Swal.fire({
        title:"Cant register this user",
        text:`${this.userObj.userName} Has already been registerd !`,
        icon:"error"
      })
    }
    console.log(isExistUser);
    
  }
}
