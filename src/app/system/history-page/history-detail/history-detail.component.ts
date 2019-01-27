import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {EventsService} from "../../shared/services/events.service";
import {CategoriesService} from "../../shared/services/categories.service";
import {mergeMap} from "rxjs/operators";
import {MyEvent} from "../../shared/models/event.models";
import {Category} from "../../shared/models/category.models";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-history-detail',
  templateUrl: './history-detail.component.html',
  styleUrls: ['./history-detail.component.scss']
})
export class HistoryDetailComponent implements OnInit, OnDestroy {

  event: MyEvent;
  category: Category;

  isLoaded = false;

  s1: Subscription;


  constructor(private route: ActivatedRoute,
              private eventServise: EventsService,
              private categoriesService: CategoriesService) {

  }

  ngOnInit() {

    this.s1 = this.route.params.pipe(
        mergeMap((params: Params) => this.eventServise.getEventById(params['id'])),
        mergeMap((event:MyEvent) => {
          this.event = event;
          return this.categoriesService.getCategoryById(event.category);
        })
    ).subscribe((category) => {
      this.category = category;
      this.isLoaded = true;
    })

  }

  ngOnDestroy() {
    if(this.s1) {
      this.s1.unsubscribe();
    }
  }

}
