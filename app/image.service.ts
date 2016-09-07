import {Injectable} from "@angular/core";

@Injectable()
export class ImageService {

    private imagesEndpointUrl = "point this to api";

    getImageFullUrl(imageName: string): string {
        console.warn("mocked URLs are used. Parameter imageName is ignored");
        let number = Math.round(Math.random());
        if (number == 0) {
            return "http://webmastertuts.com/wp-content/uploads/2013/03/zero-posters.jpg";
        } else {
            return "http://cdn2.hubspot.net/hub/10395/file-520062050-jpg/images/3203734_xxl_number_one.jpg";
        }
    }
}