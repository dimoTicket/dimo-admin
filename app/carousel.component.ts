import {Component, Input} from "@angular/core";
import {ImageService} from "./image.service";

@Component({
    selector: 'my-carousel',
    templateUrl: 'app/templates/carousel.component.html'
})

export class CarouselComponent {

    @Input() imageUrls: Array<string>;
    @Input() activeImageIndex: number = 0;

    constructor(private imageService: ImageService) {
    }

}