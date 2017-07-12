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

    addUsersToTask(ticketId: number, userIdsToAdd: number[]) {
        //todo: use getTaskByTicketId to determine if a task exists, otherwise create it
        console.warn("Stub add users to task called. ticket id: " + ticketId
            + ", user Ids to add: " + userIdsToAdd);
    }

    removeUsersFromTask(ticketId: number, userIdsToRemove: number[]) {
        //todo: use getTaskByTicketId to determine if a task exists, otherwise throw error
        //todo: because this method shouldn't be called if a task doesn't exist
        console.warn("Stub remove users to task called. ticket id: " + ticketId
            + ", user Ids to remove: " + userIdsToRemove);
    }

    private handleError(error: any) {
        console.error('An error occurred', error);
        return Observable.throw(error.message || error.json().error);
    }
}