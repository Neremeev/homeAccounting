import {BaseApi} from "../../../shared/core/base.api";
import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {MyEvent} from "../models/event.model";

@Injectable()
export class EventsService extends BaseApi {

    constructor(public http: HttpClient) {
        super(http);
    }

    addEvent(event: MyEvent): Observable<MyEvent> {
        return this.post('events', event)
    }

    getEvents(): Observable<MyEvent> {
        return this.get('events');
    }

}