import {Injectable} from "@angular/core";

@Injectable()
export class ImageService {

    private getImageUrl = "http://192.168.1.64:8080/api/ticket/getimage/";

    getImageFullUrl(imageName: string): string {
        return this.getImageUrl + imageName;
    }
}