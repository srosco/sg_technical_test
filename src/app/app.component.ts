import { CommonModule } from '@angular/common';
import { Component, DestroyRef, OnInit } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { filter, map, of } from 'rxjs';

export interface ResultData {
  id: number;
  name: string;
  about: string;
  address: string;
}

const RESULT_MOCK: ResultData[] = [
  {
    id: 1,
    name: 'Blue Ranger',
    about: 'The first one.',
    address: '1st avenue, paris',
  },
  {
    id: 2,
    name: 'Yellow Ranger',
    about: 'The second one.',
    address: '3rd avenue, Montreal',
  },
  {
    id: 3,
    name: 'Green Ranger',
    about: 'The third one.',
    address: '10th avenue, Florida',
  },
  {
    id: 4,
    name: 'Red Ranger',
    about: 'The fourth one.',
    address: '18 street, Paris',
  },
];

@Component({
  selector: 'app-root',
  imports: [CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  /// No need to type here. It will be infered directly on init (of(0) => Observable<number>)
  dataTest$ = of<number | null>(null);

  /// You know that will be an array of number. Then you can directly type it :D
  /// Anyway good reflex to init to empty your array.
  numberTabs: number[] = [];

  /// I prefer when member variables are declared before the constructor / onInit
  mockedData$ = of({
    results: RESULT_MOCK,
  }).pipe(map((data) => data.results));

  constructor(private readonly destroyRef: DestroyRef) {}

  ngOnInit() {
    // Why did you redefined this member here? :)
    this.dataTest$ = of(1, 2, 3, 4, 5, 6);
    // reset
    this.numberTabs = [];
    const filteredDataTest$ = this.dataTest$.pipe(
      filter((x) => x !== null),
      filter((value) => value % 2 === 0)
    );

    // Dont forget to unsubscribe your subs
    filteredDataTest$.pipe(takeUntilDestroyed(this.destroyRef)).subscribe({
      next: (value) => {
        if (value) {
          console.log('values ==> ', value);
          // this.numberTabs.push(value);
          this.numberTabs = [...this.numberTabs, value];
        }
      },
      complete: () => console.log('Observable is completed'),
    });
  }
}
