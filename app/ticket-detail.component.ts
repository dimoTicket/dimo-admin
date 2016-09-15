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
    private selectedImageIndex: number = 0; //check @output

    constructor(private ticketService: TicketService, private route: ActivatedRoute, private router: Router,
                private imageService: ImageService) {
    }

    ngOnInit() {
        this.route.params.subscribe(params => {
            let id = +params['id'];
            this.ticketService.getTicket(id).subscribe(ticket => {
                this.populateImagesArray(ticket);
                return this.ticket = ticket;
            });
        });
        this.statusKeys = Object.keys(TicketStatus).filter(s => s.toUpperCase() === s);
    }

    private populateImagesArray(ticket: Ticket) {
        console.debug("populate images called");
        this.imageUrls = [];
        ticket.images.forEach(ti => this.imageUrls.push(this.imageService.getImageFullUrl(ti.imageName)));
    }

    imageSelected(index: number) {
        console.debug("index in is : " + index);
        this.selectedImageIndex = index; //Used by <my-carousel> to show clicked pic 1st
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