import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { filter, map, Observable, of } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  dataTest$: Observable<number> = of(0);
  numberTabs: any[] = [];
  ngOnInit() {
    this.dataTest$ = of(1, 2, 3, 4, 5, 6);
  
    const filteredDataTest$ = this.dataTest$.pipe(
      filter((value) => value % 2 === 0)
    );

    filteredDataTest$.subscribe({
      next: (value) => {
        console.log('values ==> ', value),
        this.numberTabs.push(value)
      },
      complete: () => console.log('Observable is completed')
    })
  } 
  

  mockedData$: Observable<any[]> = of({
    results: [
      {
        "id": "1",
        "name": "Blue Ranger",
        "about": "The first one.",
        "address": "1st avenue, paris"
      },
      {
        "id": "2",
        "name": "Yellow Ranger",
        "about": "The second one.",
        "address": "3rd avenue, Montreal"
      },
      {
        "id": "3",
        "name": "Green Ranger",
        "about": "The third one.",
        "address": "10th avenue, Florida"
      },
      {
        "id": "4",
        "name": "Red Ranger",
        "about": "The fourth one.",
        "address": "18 street, Paris"
      }
    ]
  }).pipe(
    map((data) => {
      return data.results
    })
  );
  
}
