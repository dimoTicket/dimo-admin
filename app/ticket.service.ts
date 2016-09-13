import {Injectable} from "@angular/core";
import {Headers, Http} from "@angular/http";
import {Ticket} from "./ticket";
import {Observable} from "rxjs/Observable";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";

@Injectable()
export class TicketService {

    private url = 'http://localhost:8080/api';

    constructor(private http: Http) {
    }

    getTickets(): Observable<Ticket[]> {
        let ticketsObservable = this.http.get(this.url + "/tickets");
        ticketsObservable.subscribe(res => console.debug("tickets obs json is: " + JSON.stringify(res)));
        return ticketsObservable.map(response => Ticket.fromJSONArray(response.json()))
            .catch(this.handleError);
    }

    getTicket(id: number): Observable<Ticket> {
        //todo : test this

        let ticketObservable = this.http.get(this.url + "/ticket/" + id);
        ticketObservable.subscribe(res => console.debug("ticket obs json is: " + JSON.stringify(res)));
        return ticketObservable.map(res => res.json());
    }

    updateTicket(ticket: Ticket): Observable<Ticket> {
        //fixme : won't work for real endpoint.
        const url = `${this.url}/${ticket.id}`;
        let headers = new Headers({'Content-Type': 'application/json'});
        console.warn("ticket b4 update : " + JSON.stringify(ticket));
        return this.http
            .put(url, JSON.stringify(ticket), {headers: headers})
            .map(response => Ticket.fromJSON(response.json().data))
            .catch(this.handleError);
    }

    private handleError(error: any) {
        console.error('An error occurred', error);
        return Observable.throw(error.message || error.json().error);
    }
}