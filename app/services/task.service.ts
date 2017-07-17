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
        let task: Task;
        this.http.get(this.baseUrl + "/task/byticket/" + ticketId)
            .subscribe(
                res => {
                    if (res.status == 200) {
                        task = res.json();
                        let jsonMule = this.buildExistantTaskJson(task.id, ticketId, userIdsToAdd);
                        console.debug("json is: " + jsonMule);

                        this.http.post(this.baseUrl + "/task/addusers/", jsonMule, this.getContentTypeJson())
                            .subscribe(
                                r => console.debug(r),
                                e => console.warn(e),
                                () => console.debug("Sent post to add user to task"));
                    }
                }, err => {
                    if (err.status == 404) {
                        console.info("Task not found. POSTing create task and add users..");
                        let jsonMule = this.buildNewTaskJson(ticketId, userIdsToAdd);
                        console.debug("json is: " + jsonMule);

                        this.http.post(this.baseUrl + "/task/newtask/", jsonMule, this.getContentTypeJson())
                            .subscribe(
                                r => console.debug(r),
                                e => console.warn(e),
                                () => console.debug("Sent post to create task with users"));
                    } else {
                        console.error("Couldn't handle user add");
                    }
                });
    }

    removeUsersFromTask(ticketId: number, userIdsToRemove: number[]) {
        let task: Task;
        this.http.get(this.baseUrl + "/task/byticket/" + ticketId)
            .subscribe(
                res => {
                    if (res.status == 200) {
                        task = res.json();
                        let jsonMule = this.buildExistantTaskJson(task.id, ticketId, userIdsToRemove);
                        console.debug("json is: " + jsonMule);

                        this.http.post(this.baseUrl + "/task/removeusers/", jsonMule, this.getContentTypeJson())
                            .subscribe(
                                r => console.debug(r),
                                e => console.warn(e),
                                () => console.debug("Sent post to remove user from task"));
                    }
                    else {
                        console.warn("Task for ticketId: " + ticketId + " not found. Doing nothing.");
                    }
                    return res;
                },
                err => console.warn(err)
            );
    }

    private buildNewTaskJson(ticketId: number, userIds: number[]): string {
        return "{" +
            "\"ticket\": {\"id\": " + ticketId + "}," +
            "\"users\": [" +
            this.buildUsersJsonArray(userIds) +
            "]" +
            "}";
    }

    private buildExistantTaskJson(taskId: number, ticketId: number, userIds: number[]): string {
        return "{" +
            "\"id\": " + taskId + "," +
            "\"ticket\": {\"id\": " + ticketId + "}," +
            "\"users\": [" +
            this.buildUsersJsonArray(userIds) +
            "]" +
            "}";
    }

    //gets an array of user IDs and returns them as a json array of users
    private buildUsersJsonArray(userIds: number[]): string {
        let usersJson = "";
        let userCounter = 0;
        for (let uid of userIds) {
            if (userCounter == 0) {
                usersJson = "{\"id\": " + uid + "}";
            }
            else {
                usersJson += ", {\"id\": " + uid + "}";
            }
            userCounter += 1;
        }
        if (usersJson == "") {
            console.warn("returning empty users json")
        }
        return usersJson;
    }

    private getContentTypeJson(): RequestOptions {
        let headers = new Headers({'Content-Type': 'application/json'});
        return new RequestOptions({headers: headers});
    }

    private handleError(error: any) {
        console.error('An error occurred', error);
        return Observable.throw(error.message || error.json().error);
    }
}