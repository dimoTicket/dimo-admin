import {Ticket} from "./ticket";
import {User} from "./user";
export class Task {
    ticket: Ticket;
    users: Array<User>;


    constructor(ticket: Ticket, users: Array<User>) {
        this.ticket = ticket;
        this.users = users;
    }

    static todofromJSONArray(array: Array<Object>): Task[] {
        return null;
    }

    static fromJSON(task: Object): Task {
        return new Task(Ticket.fromJSON(task['ticket']), User.fromJSONArray(task['users']));
    }
}