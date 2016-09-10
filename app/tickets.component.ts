import {Component, OnInit} from "@angular/core";
import {Ticket} from "./ticket";
import {TicketService} from "./ticket.service";
import {Router} from "@angular/router";
import {ImageService} from "./image.service";

@Component({
    selector: 'my-tickets',
    templateUrl: 'app/templates/tickets.component.html',
})

export class TicketsComponent implements OnInit {

    tickets: Ticket[];
    ticket: Ticket;
    private imageUrls: Array<string>;

    constructor(private router: Router, private ticketService: TicketService,
                private imageService: ImageService) {
    }

    ngOnInit() {
        this.getTickets();
        this.populateImagesArray();
    }

    private populateImagesArray() {
        let img1Url = this.imageService.getImageFullUrl("");
        let img2Url = this.imageService.getImageFullUrl("");
        this.imageUrls = [img1Url, img2Url];
    }

    onSelect(ticket: Ticket) {
        console.log("onSelect called with ticket id : " + ticket.id);
        this.router.navigate(['/ticket', ticket.id])
            .catch(err => console.error(err));
    }

    getTickets() {
        this.ticketService.getTickets().subscribe(tickets => this.tickets = tickets);
    }

    onSelectPicture(ticket: Ticket) {
        console.log("Show picture selected for ticket id : " + ticket.id);
    }
}
