import {Component, OnInit} from "@angular/core";
import {ActivatedRoute, Router} from "@angular/router";
import {TicketService} from "../services/ticket.service";
import {Ticket, TicketStatus} from "../entities/ticket";
import {ImageService} from "../services/image.service";


@Component({
    selector: 'my-ticket-detail',
    templateUrl: 'app/templates/task.component.html',
    providers: []
})

export class TaskComponent implements OnInit {

    private ticket: Ticket;
    private statuses = TicketStatus; //Used to print labels in select field
    private statusKeys: any;
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
        this.ticket.status = TicketStatus[newValue];
        this.ticketService.updateTicketStatus(this.ticket, TicketStatus[this.ticket.status]);
    }

    goBack() {
        this.goToTickets();
    }

    goToTickets() {
        this.router.navigate(['/tickets']);
    }
}