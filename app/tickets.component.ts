import {Component, OnInit} from "@angular/core";
import {Ticket} from "./ticket";
import {TicketService} from "./ticket.service";
import {Router} from "@angular/router";
import {ImageService} from "./image.service";

@Component({
    selector: 'my-tickets',
    templateUrl: 'app/templates/tickets.component.html'
})

export class TicketsComponent implements OnInit {

    tickets: Ticket[];
    selectedTicketImageUrls: Array<string>;

    constructor(private router: Router, private ticketService: TicketService,
                private imageService: ImageService) {
    }

    ngOnInit() {
        this.getTickets();
    }

    onSelect(ticket: Ticket) {
        console.debug("onSelect called with ticket id : " + ticket.id);
        this.router.navigate(['/ticket', ticket.id])
            .catch(err => console.error(err));
    }

    getTickets() {
        this.ticketService.getTickets().subscribe(
            tickets => this.tickets = tickets,
            err => console.error(err),
            () => console.debug("Tickets data mapped to Ticket objects"));
    }

    onSelectPicture(ticket: Ticket) {
        console.debug("Show images selected for ticket id : " + ticket.id);
        this.populateImagesArray(ticket);
    }

    private populateImagesArray(ticket: Ticket) {
        console.debug("populate images called..");
        this.selectedTicketImageUrls = [];
        for (var url in ticket.images) {
            this.selectedTicketImageUrls.push(this.imageService.getImageFullUrl("url"));
        }
    }
}
