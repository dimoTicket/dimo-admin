import {Ticket} from "./ticket";
import {User} from "./user";
export class Task {
    id: number;
    createdAt: Date;
    ticket: Ticket;
    users: Array<User>;


    constructor(id: number, createdAt: Date, ticket: Ticket, users: Array<User>) {
        this.id = id;
        this.createdAt = createdAt;
        this.ticket = ticket;
        this.users = users;
    }

    static todofromJSONArray(array: Array<Object>): Task[] {
        return null;
    }

    static fromJSON(task: Object): Task {
        return new Task(task['id'], task['createdAt'],
            Ticket.fromJSON(task['ticket']), User.fromJSONArray(task['users']));
    }
}