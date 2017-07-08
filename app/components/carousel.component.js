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
var image_service_1 = require("../services/image.service");
var CarouselComponent = (function () {
    function CarouselComponent(imageService) {
        this.imageService = imageService;
        this.activeImageIndex = 0;
    }
    __decorate([
        core_1.Input(),
        __metadata("design:type", Array)
    ], CarouselComponent.prototype, "imageUrls", void 0);
    __decorate([
        core_1.Input(),
        __metadata("design:type", Number)
    ], CarouselComponent.prototype, "activeImageIndex", void 0);
    CarouselComponent = __decorate([
        core_1.Component({
            selector: 'my-carousel',
            templateUrl: 'app/templates/carousel.component.html'
        }),
        __metadata("design:paramtypes", [image_service_1.ImageService])
    ], CarouselComponent);
    return CarouselComponent;
}());
exports.CarouselComponent = CarouselComponent;
//# sourceMappingURL=carousel.component.js.map