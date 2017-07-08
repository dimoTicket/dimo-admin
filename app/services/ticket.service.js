"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var http_1 = require("@angular/http");
var ticket_1 = require("../entities/ticket");
var Observable_1 = require("rxjs/Observable");
require("rxjs/add/operator/map");
require("rxjs/add/operator/catch");
var TicketService = (function () {
    function TicketService(http) {
        this.http = http;
        this.baseUrl = 'http://localhost:8080/api';
    }
    TicketService.prototype.getTickets = function () {
        var ticketsObservable = this.http.get(this.baseUrl + "/tickets");
        return ticketsObservable.map(function (response) { return ticket_1.Ticket.fromJSONArray(response.json()); })
            .catch(this.handleError);
    };
    TicketService.prototype.getTicket = function (id) {
        var ticketObservable = this.http.get(this.baseUrl + "/ticket/" + id);
        return ticketObservable.map(function (res) { return res.json(); });
    };
    TicketService.prototype.updateTicket = function (ticket) {
        //fixme : won't work for real endpoint.
        var url = this.baseUrl + "/" + ticket.id;
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        console.warn("ticket b4 update : " + JSON.stringify(ticket));
        return this.http
            .put(url, JSON.stringify(ticket), { headers: headers })
            .map(function (response) { return ticket_1.Ticket.fromJSON(response.json().data); })
            .catch(this.handleError);
    };
    TicketService.prototype.updateTicketStatus = function (ticket, newStatus) {
        var _this = this;
        var url = this.baseUrl + "/task/changestatus?ticketId=" + ticket.id +
            "&status=" + newStatus;
        var headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        var options = new http_1.RequestOptions({ headers: headers });
        var res = this.http.post(url, options);
        res.subscribe(function (r) { return console.debug(r.toString()); }, function (e) { return console.error(_this.handleError(e)); });
        return res;
    };
    TicketService.prototype.handleError = function (error) {
        console.error('An error occurred', error);
        return Observable_1.Observable.throw(error.message || error.json().error);
    };
    TicketService = __decorate([
        core_1.Injectable(),
        __metadata("design:paramtypes", [http_1.Http])
    ], TicketService);
    return TicketService;
}());
exports.TicketService = TicketService;
//# sourceMappingURL=ticket.service.js.map