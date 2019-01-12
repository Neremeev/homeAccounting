import {Component, OnDestroy, OnInit} from '@angular/core';
import {combineLatest, Subscription} from "rxjs";
import {Category} from "../shared/models/category.models";
import {EventsService} from "../shared/services/events.service";
import {CategoriesService} from "../shared/services/categories.service";

@Component({
  selector: 'app-history-page',
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.scss']
})
export class HistoryPageComponent implements OnInit, OnDestroy {

    constructor(private categoriesService: CategoriesService,
                private eventService: EventsService) {
    }

    isLoaded = false;
    s1: Subscription;

    categories: Category[] = [];
    events = [];

    chartData = [];

    ngOnInit() {
        this.s1 = combineLatest(
            this.categoriesService.getCategories(),
            this.eventService.getEvents()
        ).subscribe((data) => {
            this.categories = data[0];
            this.events = data[1];

            this.calculateChartData();

            this.isLoaded = true;
        });
    }

    calculateChartData(): void {
        this.chartData = [];

        this.categories.forEach((cat) => {
            const catEvent = this.events.filter((e) => e.category === cat.id && e.type === 'outcome');
            this.chartData.push({
                name: cat.name,
                value: catEvent.reduce((total, e) => {
                    total += e.amount;
                    return total;
                }, 0)
            });
        });
    }

    ngOnDestroy() {
        if (this.s1) {
            this.s1.unsubscribe();
        }
    }

}
