"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var ticket_service_1 = require("../services/ticket.service");
var router_1 = require("@angular/router");
var image_service_1 = require("../services/image.service");
var TicketsComponent = (function () {
    function TicketsComponent(router, ticketService, imageService) {
        this.router = router;
        this.ticketService = ticketService;
        this.imageService = imageService;
    }
    TicketsComponent.prototype.ngOnInit = function () {
        this.getTickets();
    };
    TicketsComponent.prototype.onSelect = function (ticket) {
        console.debug("onSelect called with ticket id : " + ticket.id);
        this.router.navigate(['/ticket', ticket.id])
            .catch(function (err) { return console.error(err); });
    };
    TicketsComponent.prototype.getTickets = function () {
        var _this = this;
        this.ticketService.getTickets().subscribe(function (tickets) { return _this.tickets = tickets; }, function (err) { return console.error(err); }, function () { return console.debug("Tickets data mapped to Ticket objects"); });
    };
    TicketsComponent.prototype.onSelectPicture = function (ticket) {
        console.debug("Show images selected for ticket id : " + ticket.id);
        this.populateImagesArray(ticket);
    };
    TicketsComponent.prototype.populateImagesArray = function (ticket) {
        var _this = this;
        console.debug("populate images called..");
        this.selectedTicketImageUrls = [];
        ticket.images.forEach(function (ti) { return _this.selectedTicketImageUrls.push(_this.imageService.getImageFullUrl(ti.imageName)); });
    };
    TicketsComponent = __decorate([
        core_1.Component({
            selector: 'my-tickets',
            templateUrl: 'app/templates/tickets.component.html'
        }),
        __metadata("design:paramtypes", [router_1.Router, ticket_service_1.TicketService,
            image_service_1.ImageService])
    ], TicketsComponent);
    return TicketsComponent;
}());
exports.TicketsComponent = TicketsComponent;
//# sourceMappingURL=tickets.component.js.map