"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var TicketImage = (function () {
    function TicketImage(imageName, createdAt) {
        this.imageName = imageName;
        this.createdAt = createdAt;
    }
    TicketImage.fromJSONArray = function (array) {
        return array.map(function (obj) { return new TicketImage(obj['imageName'], obj['createdAt']); });
    };
    TicketImage.fromJSON = function (ticket) {
        return new TicketImage(ticket['imageName'], ticket['createdAt']);
    };
    return TicketImage;
}());
exports.TicketImage = TicketImage;
//# sourceMappingURL=ticket-image.js.map