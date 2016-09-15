import {Injectable} from "@angular/core";

@Injectable()
export class ImageService {

    private getImageUrl = "/api/ticket/getimage/";

    getImageFullUrl(imageName: string): string {
        return this.getImageUrl + imageName;
    }
}