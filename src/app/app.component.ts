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
  name?: string; // interfaces allow fields to be optional
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
