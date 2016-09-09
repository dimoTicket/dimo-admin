import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {TicketService} from "./ticket.service";
import {Ticket, TicketStatus} from "./ticket";
import {ImageService} from "./image.service";


@Component({
    selector: 'my-ticket-detail',
    templateUrl: 'app/templates/ticket-detail.component.html',
    providers: []
})

export class TicketDetailComponent implements OnInit {

    private ticket: Ticket;
    private statuses = TicketStatus; //Used to print labels in select field
    private statusKeys;
    private imageUrls: Array<string>;

    constructor(private ticketService: TicketService, private route: ActivatedRoute, private router: Router,
                private imageService: ImageService) {
    }

    ngOnInit() {
        this.route.params.subscribe(params => {
            let id = +params['id'];
            this.ticketService.getTicket(id).subscribe(ticket => this.ticket = ticket);
        });
        this.populateImagesArray();
        this.statusKeys = Object.keys(TicketStatus).filter(s => s.toUpperCase() === s);
    }

    populateImagesArray() {
        let img1Url = this.imageService.getImageFullUrl("");
        let img2Url = this.imageService.getImageFullUrl("");
        this.imageUrls = [img1Url, img2Url];
    }

    private onStatusChange(newValue: string) {
        this.ticket.status = TicketStatus[newValue];
        console.debug("New in value is : " + newValue);
        console.debug("New value parsed to enum gives : " + TicketStatus[newValue]);
        console.debug("Ticket status is : " + this.ticket.status);
        //TODO : call "update" of ticket service to persist changes.
    }

    goBack() {
        this.goToTickets();
    }

    goToTickets() {
        this.router.navigate(['/tickets']);
    }
}