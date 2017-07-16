import {Injectable} from "@angular/core";
import {Headers, Http, RequestOptions} from "@angular/http";
import {Observable} from "rxjs/Observable";
import {Task} from "../entities/task";

@Injectable()
export class TaskService {

    private baseUrl = 'http://192.168.1.64:8080/api';

    constructor(private http: Http) {
    }

    getTaskByTicketId(id: number): Observable<Task> {
        let taskObservable = this.http.get(this.baseUrl + "/task/byticket/" + id);
        return taskObservable.map(res => res.json());
    }

    addUsersToTask(ticketId: number, userIdsToAdd: number[]) {
        //todo: use getTaskByTicketId to determine if a task exists, otherwise create it
        console.warn("Stub add users to task called. ticket id: " + ticketId
            + ", user Ids to add: " + userIdsToAdd);
    }

    removeUsersFromTask(ticketId: number, userIdsToRemove: number[]) {
        //use getTaskByTicketId to determine if a task exists, otherwise throw error
        //because this method shouldn't be called if a task doesn't exist
        let task: Task;
        this.http.get(this.baseUrl + "/task/byticket/" + ticketId)
            .subscribe(
                res => {
                    if (res.status == 200) {
                        task = res.json();

                        let userCounter = 0;
                        let usersJson = "";
                        for (let uid of userIdsToRemove) {
                            if (userCounter == 0) {
                                usersJson = "{\"id\": " + uid + "}";
                            }
                            else {
                                usersJson += ", {\"id\": " + uid + "}";
                            }
                            userCounter += 1;
                        }

                        let jsonMule = "{" +
                            "\"id\": " + task.id + "," +
                            "\"ticket\": {\"id\": " + ticketId + "}," +
                            "\"users\": [" +
                            usersJson +
                            "]" +
                            "}";
                        console.debug("json is: " + jsonMule);

                        let headers = new Headers({'Content-Type': 'application/json'});
                        let options = new RequestOptions({headers: headers});
                        this.http.post(this.baseUrl + "/task/removeusers/", jsonMule, options)
                            .subscribe(
                                r => console.debug(r),
                                e => console.warn(e),
                                () => console.warn("Sent post to remove user from task"));
                    }
                    else {
                        console.warn("Task for ticketId: " + ticketId + " not found. Doing nothing.");
                    }
                    return res;
                },
                err => console.warn(err)
            );
    }

    private handleError(error: any) {
        console.error('An error occurred', error);
        return Observable.throw(error.message || error.json().error);
    }
}