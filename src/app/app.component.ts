import { Component, OnDestroy } from '@angular/core';
import { interval, Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy{
  title = 'ngTimer';
  counter = 0;
  timeInput = 60;
  time2 !: number;
  timeCounter : Subscription;
  counterStored : {counter : string}={counter : "0"};
  counterString = "intervalCounter";

  constructor(){
    this.timeCounter = Subscription.EMPTY;
    if (localStorage.getItem(this.counterString)){
      this.counterStored =  JSON.parse( <string>localStorage.getItem(this.counterString) )
      this.counter = parseInt(this.counterStored.counter);
    }
  }

  ngOnDestroy(): void {
    this.timeCounter.unsubscribe();
  }

  updateChange(event:Event){
    const change = event.target;
    this.timeInput = (change as HTMLInputElement).valueAsNumber
  }


  startTimer(){
    this.timeCounter.unsubscribe();
    this.time2 = this.timeInput;
    this.timeCounter = interval(1000).subscribe( x =>{
      if (this.time2>0){
        this.time2--;
      }
      else {
        this.timeCounter.unsubscribe();
      }
    })
  }

  resetTimer(){
    this.timeCounter.unsubscribe();
    this.time2 = this.timeInput;
  }


  addCounter(){
    this.counter++;
    this.saveBikesInfo(this.counter);
  }

  minusCounter(){
    if (this.counter>0){
      this.counter--;
      this.saveBikesInfo(this.counter);
    }
  }

  resetCounter(){
    this.counter = 0;
    this.saveBikesInfo(this.counter);
  }

  saveBikesInfo( counter: number ):void {
    this.counterStored.counter = counter.toString();
    localStorage.setItem( this.counterString, JSON.stringify(this.counterStored) );
  }
}
