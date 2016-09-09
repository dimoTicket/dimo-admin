export class Ticket {
    id: number;
    datetime: Date;
    latitude: number;
    longitude: number;
    message: string;
    status: TicketStatus; //Should be kept in sync with the TickeStatus enum in the backend
    images: Array<string>;

    constructor(id: number, datetime: string, latitude: number, longitude: number, message: string,
                status: string, images: Array<string>) {
        this.id = id;
        this.datetime = new Date(datetime);
        this.latitude = latitude;
        this.longitude = longitude;
        this.message = message;
        this.status = this.getStatusFromString(status);
        this.images = images;
    }

    static fromJSONArray(array: Array<Object>): Ticket[] {
        return array.map(obj => new Ticket(obj['id'], obj['datetime'], obj['latitude'], obj['longitude'],
            obj['message'], obj['status'], array['images']));
    }

    static fromJSON(ticket: Object): Ticket {
        return new Ticket(ticket['id'], ticket['datetime'], ticket['latitude'], ticket['longitude'],
            ticket['message'], ticket['status'], ticket['images']);
    }

    private getStatusFromString(status: string): TicketStatus {
        console.info("Parsing json status " + status + " to enum");
        let ticketStatus;
        if (status.toUpperCase() == "NEW") {
            ticketStatus = TicketStatus.NEW;
        } else if (status.toUpperCase() == "REJECTED") {
            ticketStatus = TicketStatus.REJECTED;
        } else if (status.toUpperCase() == "ASSIGNED") {
            ticketStatus = TicketStatus.ASSIGNED;
        } else if (status.toUpperCase() == "IN_PROGRESS") {
            ticketStatus = TicketStatus.IN_PROGRESS;
        } else if (status.toUpperCase() == "ABORTED") {
            ticketStatus = TicketStatus.ABORTED;
        } else if (status.toUpperCase() == "DONE") {
            ticketStatus = TicketStatus.DONE;
        } else {
            console.error("Cannot parse ticket status " + status + " from json");
            throw new TypeError("Json status " + status + " doesn't match any enum candidates");
        }
        console.info("Json status parsed to enum : " + ticketStatus);
        return ticketStatus;
    }
}

export enum TicketStatus{
    NEW = <any>"New",
    REJECTED = <any>"Rejected",
    ASSIGNED = <any>"Assigned",
    IN_PROGRESS = <any>"In progress",
    ABORTED = <any>"Aborted",
    DONE = <any>"Done"
}