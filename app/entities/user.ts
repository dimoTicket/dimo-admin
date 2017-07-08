export class User {
    id: number;
    username: string;


    constructor(id: number, username: string) {
        this.id = id;
        this.username = username;
    }

    static fromJSONArray(array: Array<Object>): User[] {
        return array.map(obj => new User(obj['id'], obj['username']));
    }

    static fromJSON(user: Object): User {
        return new User(user['id'], user['username']);
    }
}