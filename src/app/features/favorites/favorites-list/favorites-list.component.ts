import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'st-favorites-list',
  templateUrl: './favorites-list.component.html',
  styleUrls: ['./favorites-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FavoritesListComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
