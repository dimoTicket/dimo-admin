import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {Observable} from "rxjs/Observable";
import {Task} from "../entities/task";

@Injectable()
export class TaskService {

    private baseUrl = 'http://192.168.1.64:8080/api';

    constructor(private http: Http) {
    }

    getTaskByTicketId(id: number): Observable<Task> {
        let tasksObservable = this.http.get(this.baseUrl + "/task/byticket/" + id);
        return tasksObservable.map(res => res.json());
    }

    private handleError(error: any) {
        console.error('An error occurred', error);
        return Observable.throw(error.message || error.json().error);
    }
}