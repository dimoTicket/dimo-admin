import {Injectable} from "@angular/core/core";
import {Http} from "@angular/http";
import {Observable} from "rxjs/Observable";
import {User} from "../entities/user";

@Injectable()
export class UserService {

    private baseUrl = 'http://192.168.1.64:8080/api';

    constructor(private http: Http) {
    }

    getUsers(): Observable<User[]> {
        let usersObservable = this.http.get(this.baseUrl + "/users");
        return usersObservable.map(response => User.fromJSONArray(response.json()))
            .catch(this.handleError);
    }

    getUser(id: number): Observable<User> {
        let userObservable = this.http.get(this.baseUrl + "/user/" + id);
        return userObservable.map(res => res.json());
    }

    private handleError(error: any) {
        console.error('An error occurred', error);
        return Observable.throw(error.message || error.json().error);
    }
}