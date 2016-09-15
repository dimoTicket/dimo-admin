export class TicketImage {
    imageName: string;
    createdAt: Date;


    constructor(imageName: string, createdAt: Date) {
        this.imageName = imageName;
        this.createdAt = createdAt;
    }

    static fromJSONArray(array: Array<Object>): TicketImage[] {
        return array.map(obj => new TicketImage(obj['imageName'], obj['createdAt']));
    }

    static fromJSON(ticket: Object): TicketImage {
        return new TicketImage(ticket['imageName'], ticket['createdAt']);
    }

}