Parent to Child: Sharing Data via Input
It works by using the @Input() decorator to allow data to be passed via the template. Create the child component.

Another way to share data is to emit data from the child, which can be listed to by the parent. This approach is ideal when you want to share data changes that occur on things like button clicks, and other user events.

    ng g component movieinfo
    app.component.ts

    import { Component } from '@angular/core';
    import { Subject } from 'rxjs';

    @Component({
      selector: 'app-root',
      templateUrl: './app.component.html',
      styleUrls: ['./app.component.css']
    })
    export class AppComponent {
      title = 'app';

      message: string;
      id: number; 
      name?: string; 
      movies: any[] = []; 
      selectedMovie: any[];

      constructor() { 
       this.movies = [
         {
            id:1,
            name: "Avatar",
            year: 2014,
            intro: "Avatar, marketed as James Cameron's Avatar, is a 2009 American epic science fiction film directed, written, produced, and co-edited by James Cameron"
         },
         {
           id:2,
           name: "Titanic",
           year: 1998,
           intro: "Titanic is a 1997 American epic romance-disaster film directed, written, co-produced and co-edited by James Cameron"
         },
         {
            id:3,
            name: "Patriot",
            year: 2000,
            intro: "The Patriot is a 2000 American epic historical fiction war film directed by Roland Emmerich, written by Robert Rodat"
         }
       ];
       this.selectedMovie = this.movies[0];
      }

      getselect(list){
        this.selectedMovie = list;
      }

      recievemsg($event){
        this.message = $event;
        console.log("Msg send by child to parent : "+$event);
      }


    }

app.component.html

this.selectedMovie = this.movies[0] is used for selecting first link of left panel on load. selectedMovie variable is used to store value which i have selected onclick. on click a function is called "getselect(list)" and passing the selected list value as a parameter which value is stored in this.selectedMovie. Now check using "list === selectedMovie", if true then "selected" class will be added in a tag using [class.selected]. Now i am sending "selectedMovie" value from parent component to child movieinfo component using [list]="slectedMovie".

    <div style="text-align:center"><h1>
        Welcome to {{ title }}!
      </h1>
    </div>


    <div class="col-md-3"><div class="text-right">{{message}}</div><ul class="links"><li *ngFor="let list of movies"><a (click)="getselect(list)" [class.selected]="list === selectedMovie" href="javascript:void(0)"><span>{{list.id}}.</span><span>{{list.name}}</span>        
            </a>  
          </li></ul>
    </div>

    <div class="col-md-9"><app-movieinfo  [list]="selectedMovie" (MessageEvent)="recievemsg($event)"></app-movieinfo>
    </div>

app.component.css

    .links{ list-style: none;}
    .links a{
        background: #EEE;
        padding: 10px 20px;
        display: block;
        margin-bottom: 5px;
    }
    .links a.selected{
        background: #444;
        color: #FFF;
    }

movieinfo.component.ts

    import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
    import { Subject } from 'rxjs';

    @Component({
      selector: 'app-movieinfo',
      templateUrl: './movieinfo.component.html',
      styleUrls: ['./movieinfo.component.css']
    })
    export class MovieinfoComponent implements OnInit {

      constructor() { }

      @Input() list : Subject<any>;

      @Output() MessageEvent = new EventEmitter();

      ngOnInit() {
      }

      sendmsg(name){
        this.MessageEvent.emit("Selected Movie "+name);
      }

    }
    
    
movieinfo.component.html

    <div *ngIf="list"><h2>{{list.id}}. {{list.name | uppercase}}</h2><h4>Year : {{list.year}}</h4><h4>Intro : {{list.intro}}</h4>

      <button class="btn btn=primary" (click)="sendmsg(list.name)">Send Message to Parent</button>
    </div>
    
we create a private Behavior Subject that will hold the list value of the message. Subject is used for sharing data. You have to declare this list variable using @Input decorator.

we create a private Behavior Subject that will hold the list value of the message. Subject is used for sharing data. You have to declare this list variable using @Input decorator.

In the child, we declare a messageEvent variable with the Output decorator and set it equal to a new event emitter. Then we create a function named sendmsg(list.name) that calls emit on this event with the message we want to send. Lastly, we create a button to trigger this function.

The parent can now subscribe to this messageEvent that’s outputted by the child component, then run the receive message function whenever this event occurs.
