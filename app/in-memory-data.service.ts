import {InMemoryDbService} from "angular2-in-memory-web-api";

export class InMemoryDataService implements InMemoryDbService {
    createDb() {
        let tickets = [
            {
                "id": 1,
                "datetime": "2016-04-17 13:10:55",
                "message": "Ticket one msg",
                "latitude": 40.628386,
                "longitude": 22.949639,
                "status": "NEW",
                "images": [
                    "imageone.jpg"
                ]
            },
            {
                "id": 2,
                "datetime": "2016-04-17 14:14:55",
                "message": "Ticket two msg",
                "latitude": 40.628386,
                "longitude": 22.949639,
                "status": "NEW",
                "images": [
                    "imageone.jpg"
                ]
            },
            {
                "id": 3,
                "datetime": "2016-04-17 15:15:55",
                "message": "Ticket three msg",
                "latitude": 40.628386,
                "longitude": 22.949639,
                "status": "NEW",
                "images": [
                    "imageone.jpg"
                ]
            },
            {
                "id": 4,
                "datetime": "2016-04-17 16:16:55",
                "message": "Ticket four msg",
                "latitude": 40.628386,
                "longitude": 22.949639,
                "status": "NEW",
                "images": [
                    "imageone.jpg",
                    "imagetwo.jpg"
                ]
            },
            {
                "id": 5,
                "datetime": "2016-04-17 17:17:55",
                "message": "Ticket five msg",
                "latitude": 40.628386,
                "longitude": 22.949639,
                "status": "ASSIGNED",
                "images": []
            }
        ];
        return {tickets};
    }
}
