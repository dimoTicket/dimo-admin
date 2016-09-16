import {Injectable} from "@angular/core";

@Injectable()
export class ImageService {

    private getImageUrl = "http://localhost:8080/api/ticket/getimage/";

    getImageFullUrl(imageName: string): string {
        return this.getImageUrl + imageName;
    }
}