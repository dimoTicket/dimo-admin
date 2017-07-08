"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Ticket = (function () {
    function Ticket(id, datetime, latitude, longitude, message, status, images) {
        this.id = id;
        this.datetime = new Date(datetime);
        this.latitude = latitude;
        this.longitude = longitude;
        this.message = message;
        this.status = this.getStatusFromString(status);
        this.images = images;
    }
    Ticket.fromJSONArray = function (array) {
        return array.map(function (obj) { return new Ticket(obj['id'], obj['createdAt'], obj['latitude'], obj['longitude'], obj['message'], obj['status'], obj['images']); });
    };
    Ticket.fromJSON = function (ticket) {
        return new Ticket(ticket['id'], ticket['datetime'], ticket['latitude'], ticket['longitude'], ticket['message'], ticket['status'], ticket['images']);
    };
    Ticket.prototype.getStatusFromString = function (status) {
        console.debug("Parsing json status " + status + " to enum");
        var ticketStatus;
        if (status.toUpperCase() == "NEW") {
            ticketStatus = TicketStatus.NEW;
        }
        else if (status.toUpperCase() == "REJECTED") {
            ticketStatus = TicketStatus.REJECTED;
        }
        else if (status.toUpperCase() == "ASSIGNED") {
            ticketStatus = TicketStatus.ASSIGNED;
        }
        else if (status.toUpperCase() == "IN_PROGRESS") {
            ticketStatus = TicketStatus.IN_PROGRESS;
        }
        else if (status.toUpperCase() == "ABORTED") {
            ticketStatus = TicketStatus.ABORTED;
        }
        else if (status.toUpperCase() == "DONE") {
            ticketStatus = TicketStatus.DONE;
        }
        else {
            console.error("Cannot parse ticket status " + status + " from json");
            throw new TypeError("Json status " + status + " doesn't match any enum candidates");
        }
        console.debug("Json status parsed to enum : " + ticketStatus);
        return ticketStatus;
    };
    return Ticket;
}());
exports.Ticket = Ticket;
var TicketStatus;
(function (TicketStatus) {
    TicketStatus[TicketStatus["NEW"] = "New"] = "NEW";
    TicketStatus[TicketStatus["REJECTED"] = "Rejected"] = "REJECTED";
    TicketStatus[TicketStatus["ASSIGNED"] = "Assigned"] = "ASSIGNED";
    TicketStatus[TicketStatus["IN_PROGRESS"] = "In progress"] = "IN_PROGRESS";
    TicketStatus[TicketStatus["ABORTED"] = "Aborted"] = "ABORTED";
    TicketStatus[TicketStatus["DONE"] = "Done"] = "DONE";
})(TicketStatus = exports.TicketStatus || (exports.TicketStatus = {}));
//# sourceMappingURL=ticket.js.map