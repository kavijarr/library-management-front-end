import { Component, OnInit } from '@angular/core';
import { HttpClient,HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-view-all-books',
  standalone: true,
  imports: [HttpClientModule,FormsModule,CommonModule],
  templateUrl: './view-all-books.component.html',
  styleUrl: './view-all-books.component.css'
})
export class ViewAllBooksComponent implements OnInit{
  public selectedBook : any;
  private http;
  public bookList:any={};

  constructor(private httpClient:HttpClient){
    this.http=httpClient;
  }

  ngOnInit(): void {
      this.loadBooks();
  }

  loadBooks(){
    this.http.get('http://localhost:8080/book/get').subscribe((data)=>{
      this.bookList = data;
      console.log(this.bookList);
    })
    }

    

    deleteBook(){
      let api = "http://localhost:8080/book/delete/"+this.selectedBook.id;
      this.http.delete(api,{responseType:'text'}).subscribe((response:String) =>{
        this.selectedBook=null;
        this.loadBooks();
      });
    }

    setSelectedBook(book : any){
      this.selectedBook=book;
      console.log(this.selectedBook);
      
    }
}
