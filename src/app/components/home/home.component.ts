import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MapService } from 'src/app/service/map.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  @ViewChild('myInput', { static: true })
  myInput!: ElementRef;

  @ViewChild('scrollMe')  
  myScrollContainer!: ElementRef;

  text : string = 'Bang sue'; 
  line : string [] = [];
  locList :any[] = [];
  constructor(
    private map : MapService
  ) { }

  ngOnInit(): void {
   
  //  this.myInput.nativeElement.focus();
  }

 
  ngAfterViewInit() {
    // this.myInput.nativeElement.focus();
    setTimeout(() => this.myInput.nativeElement.focus(), 0);
  }

  onSearch(){
    this.line.push(`> ${this.text}`);
    this.map.search(this.text).then(res =>{
      // console.log(res);
      // this.line.push(`> ${res.result}`);
      this.text = '';
      this.scrollToBottom();
      this.locList = res.result
    }
      );

  }

  scrollToBottom(): void {
    try {
        this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch(err) { }                 
}

  onEnter()
  {
    this.onSearch();
  }

}
