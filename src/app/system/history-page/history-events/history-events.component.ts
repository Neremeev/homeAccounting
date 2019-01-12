import {Component, Input, OnInit} from '@angular/core';
import {Category} from "../../shared/models/category.models";

@Component({
  selector: 'app-history-events',
  templateUrl: './history-events.component.html',
  styleUrls: ['./history-events.component.scss']
})
export class HistoryEventsComponent implements OnInit {

  @Input() categories: Category[] = [];
  @Input() events = [];

  constructor() { }

  ngOnInit() {
      this.events.forEach((e)=> {
         e.catName = this.categories.find(c => c.id === e.category).name
      });
  }

  getEventClass(e) {
      return {
          'label': true,
          'label-danger': e.type === 'outcome',
          'label-success': e.type === 'income',
      }
  }

}
