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
            this.ticketService.getTicket(id).subscribe(ticket => {
                return this.ticket = ticket;
            });
        });
        this.populateImagesArray();
        this.statusKeys = Object.keys(TicketStatus).filter(s => s.toUpperCase() === s);
    }

    private populateImagesArray() {
        let img1Url = this.imageService.getImageFullUrl("");
        let img2Url = this.imageService.getImageFullUrl("");
        this.imageUrls = [img1Url, img2Url];
    }

    private onStatusChange(newValue: string) {
        console.debug("New ticket status value is : " + newValue);
        this.ticket.status = TicketStatus[newValue];
        this.ticketService.updateTicket(this.ticket);
    }

    goBack() {
        this.goToTickets();
    }

    goToTickets() {
        this.router.navigate(['/tickets']);
    }
}