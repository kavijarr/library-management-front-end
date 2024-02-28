import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Component,OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NavComponent } from '../../common/nav/nav.component';

@Component({
  selector: 'app-view-all-users',
  standalone: true,
  imports: [HttpClientModule,FormsModule,CommonModule,NavComponent],
  templateUrl: './view-all-users.component.html',
  styleUrl: './view-all-users.component.css'
})
export class ViewAllUsersComponent {

  public userList:any={
    "id":null,
    "firstName":null,
    "lastName":null,
    "userName":null,
    "email":null,
    "address":null,
    "address2":null,
    "country":null,
    "phoneNumber":null
  };
  public selectedUser:any;

  private baseUrl:String="http://localhost:8081";

  constructor(private http:HttpClient){
  }

  ngOnInit():void{
    this.loadUsers();
  }

  loadUsers(){
    this.http.get(this.baseUrl+"/user/get").subscribe((res:any)=>{
      console.log(res);
      this.userList=res;
    })
  }

  deleteUser(){
    this.http.delete(this.baseUrl+"/user/delete/"+this.selectedUser.id,{responseType:'text'}).subscribe((res:String)=>{
      console.log(res);
      this.loadUsers();
    })
  }

  saveUser(){
    this.http.post(this.baseUrl+"/user/add",this.selectedUser).subscribe((res)=>{
      this.loadUsers();
      console.log(this.selectedUser);
      
    })
  }

  setSelectedUser(user:any){
    this.selectedUser=user;
    console.log(user);
    
  }
}
