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

    private onStatusChange(newValue: any) {
        console.log("new value in is :" + newValue);
        console.log("New value parsed to enum gives :" + TicketStatus[newValue]);
        console.log("Ticket status is : " + this.ticket.status);
    }

    goBack() {
        this.goToTickets();
    }

    goToTickets() {
        this.router.navigate(['/tickets']);
    }
}