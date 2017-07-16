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
var router_1 = require("@angular/router");
var ticket_service_1 = require("../services/ticket.service");
var ticket_1 = require("../entities/ticket");
var image_service_1 = require("../services/image.service");
var TaskComponent = (function () {
    function TaskComponent(ticketService, route, router, imageService) {
        this.ticketService = ticketService;
        this.route = route;
        this.router = router;
        this.imageService = imageService;
        this.statuses = ticket_1.TicketStatus; //Used to print labels in select field
        this.selectedImageIndex = 0; //check @output
    }
    TaskComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.route.params.subscribe(function (params) {
            var id = +params['id'];
            _this.ticketService.getTicket(id).subscribe(function (ticket) {
                _this.populateImagesArray(ticket);
                return _this.ticket = ticket;
            });
        });
        this.statusKeys = Object.keys(ticket_1.TicketStatus).filter(function (s) { return s.toUpperCase() === s; });
    };
    TaskComponent.prototype.populateImagesArray = function (ticket) {
        var _this = this;
        console.debug("populate images called");
        this.imageUrls = [];
        ticket.images.forEach(function (ti) { return _this.imageUrls.push(_this.imageService.getImageFullUrl(ti.imageName)); });
    };
    TaskComponent.prototype.imageSelected = function (index) {
        console.debug("index in is : " + index);
        this.selectedImageIndex = index; //Used by <my-carousel> to show clicked pic 1st
    };
    TaskComponent.prototype.onStatusChange = function (newValue) {
        this.ticket.status = ticket_1.TicketStatus[newValue];
        this.ticketService.updateTicketStatus(this.ticket, ticket_1.TicketStatus[this.ticket.status]);
    };
    TaskComponent.prototype.goBack = function () {
        this.goToTickets();
    };
    TaskComponent.prototype.goToTickets = function () {
        this.router.navigate(['/tickets']);
    };
    TaskComponent = __decorate([
        core_1.Component({
            selector: 'my-ticket-detail',
            templateUrl: 'app/templates/task.component.html',
            providers: []
        }),
        __metadata("design:paramtypes", [ticket_service_1.TicketService, router_1.ActivatedRoute, router_1.Router,
            image_service_1.ImageService])
    ], TaskComponent);
    return TaskComponent;
}());
exports.TaskComponent = TaskComponent;
//# sourceMappingURL=task.component.js.map