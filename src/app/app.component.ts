import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { map, Observable, of } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  mockedData$: Observable<any> = of({
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
