import {Component, OnDestroy, OnInit} from '@angular/core';
import {combineLatest, Subscription} from "rxjs";
import {Category} from "../shared/models/category.models";
import {EventsService} from "../shared/services/events.service";
import {CategoriesService} from "../shared/services/categories.service";
import * as moment from 'moment';

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
    events: any = [];
    filteredEvents: any = [];

    chartData = [];

    isFilterVisible = false;

    ngOnInit() {
        this.s1 = combineLatest(
            this.categoriesService.getCategories(),
            this.eventService.getEvents()
        ).subscribe((data) => {
            this.categories = data[0];
            this.events = data[1];

            this.setOiginalEvents();
            this.calculateChartData();

            this.isLoaded = true;
        });
    }

    private setOiginalEvents() {
        // slice копия, concat - соединение
        this.filteredEvents = this.events.slice();
    }

    calculateChartData(): void {
        this.chartData = [];

        this.categories.forEach((cat) => {
            const catEvent = this.filteredEvents.filter((e) => e.category === cat.id && e.type === 'outcome');
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

    private toggleFilterVisibility(dir: boolean) {
        this.isFilterVisible = dir;
    }

    openFilter() {
        this.toggleFilterVisibility(true);
    }

    onFilterApply(filterData) {
        this.toggleFilterVisibility(false);
        this.setOiginalEvents();

        const startPeriod = moment().startOf(filterData.period).startOf('d');
        const endPeriod = moment().endOf(filterData.period).endOf('d');

        this.filteredEvents = this.filteredEvents
        .filter( e => {
           return filterData.types.indexOf(e.type) !== -1
        })
        .filter( e => {
            return filterData.categories.indexOf(e.category.toString()) !== -1
        })
        .filter( e => {
            const momentDate = moment(e.date, 'DD.MM.YYYY HH:mm:ss');
            return momentDate.isBetween(startPeriod, endPeriod);
        });
        this.calculateChartData();
    }

    onFilterCancel() {
        this.toggleFilterVisibility(false);
        this.setOiginalEvents();
        this.calculateChartData();
    }

}
