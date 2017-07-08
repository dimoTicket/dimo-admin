import {Injectable} from "@angular/core";
import {Headers, Http, RequestOptions, Response} from "@angular/http";
import {Ticket} from "../entities/ticket";
import {Observable} from "rxjs/Observable";
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";

@Injectable()
export class TicketService {

    private baseUrl = 'http://192.168.1.64:8080/api';

    constructor(private http: Http) {
    }

    getTickets(): Observable<Ticket[]> {
        let ticketsObservable = this.http.get(this.baseUrl + "/tickets");
        return ticketsObservable.map(response => Ticket.fromJSONArray(response.json()))
            .catch(this.handleError);
    }

    getTicket(id: number): Observable<Ticket> {
        let ticketObservable = this.http.get(this.baseUrl + "/ticket/" + id);
        return ticketObservable.map(res => res.json());
    }

    updateTicket(ticket: Ticket): Observable<Ticket> {
        //fixme : won't work for real endpoint.
        const url = `${this.baseUrl}/${ticket.id}`;
        let headers = new Headers({'Content-Type': 'application/json'});
        console.warn("ticket b4 update : " + JSON.stringify(ticket));
        return this.http
            .put(url, JSON.stringify(ticket), {headers: headers})
            .map(response => Ticket.fromJSON(response.json().data))
            .catch(this.handleError);
    }

    updateTicketStatus(ticket: Ticket, newStatus: string): Observable<Response> {
        const url = this.baseUrl + "/task/changestatus?ticketId=" + ticket.id +
            "&status=" + newStatus;
        let headers = new Headers({'Content-Type': 'application/json'});
        let options = new RequestOptions({headers: headers});
        var res = this.http.post(url, options);
        res.subscribe(
            (r) => console.debug(r.toString()),
            (e) => console.error(this.handleError(e)));
        return res;
    }

    private handleError(error: any) {
        console.error('An error occurred', error);
        return Observable.throw(error.message || error.json().error);
    }
}