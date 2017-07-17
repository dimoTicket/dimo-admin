import {Component, OnInit} from "@angular/core";
import {IMultiSelectOption, IMultiSelectSettings, IMultiSelectTexts} from "angular-2-dropdown-multiselect";
import {User} from "../entities/user";
import {UserService} from "../services/user.service";
import {ActivatedRoute} from "@angular/router";
import {TaskService} from "../services/task.service";

@Component({
    selector: 'user-select',
    templateUrl: 'app/templates/user-select.component.html',
    providers: []
})

export class UserSelectComponent implements OnInit {
    //Used by the component internally
    optionsModel: number[];
    myOptions: IMultiSelectOption[];
    //Used by us to determine initial state (pre-selected users)
    initialOptionsModel: number[];
    ticketId: number;

    // Settings configuration
    mySettings: IMultiSelectSettings = {
        enableSearch: true,
        checkedStyle: 'checkboxes',
        buttonClasses: 'btn btn-default btn-block',
        dynamicTitleMaxItems: 0,
        displayAllSelectedText: true
    };

    // Text configuration
    myTexts: IMultiSelectTexts = {
        checkAll: 'Select all',
        uncheckAll: 'Unselect all',
        checked: 'user selected',
        checkedPlural: 'users selected',
        searchPlaceholder: 'Search',
        defaultTitle: 'Select users',
        allSelected: 'All selected',
    };

    constructor(private route: ActivatedRoute, private userService: UserService,
                private taskService: TaskService) {
    }

    ngOnInit() {
        this.optionsModel = [];
        this.populateDropdown();
        this.preselectAlreadyAssignedUsers();
    }

    private populateDropdown() {
        this.userService.getUsers().subscribe(
            users => this.myOptions = this.convertUsersToMultiSelect(users),
            err => console.error(err),
            () => console.debug("Trying to Get users..")
        );
    }

    private preselectAlreadyAssignedUsers() {
        this.route.params.subscribe(params => {
            this.ticketId = +params['id'];
            this.taskService.getTaskByTicketId(this.ticketId)
                .subscribe(task => {
                        return this.preselectUsers(task.users);
                    },
                    err => console.debug("No users to preselect for task id: " + this.ticketId)
                ).add(() => this.initialOptionsModel = this.optionsModel.slice());
        });
    }

    ngOnDestroy() {
        this.updateUsersAssignedToDb();
    }

    onSelect(selected: string) {
        console.info("selected onSelect: " + selected);
    }


    //Runs both arrays against each other to calculate which users
    //have to be added and/or removed.
    updateUsersAssignedToDb() {
        let userIdsToAdd: number[] = [];
        let userIdsToRemove: number[] = [];

        //calculate ins
        this.optionsModel.forEach(uid => {
            if (this.initialOptionsModel.indexOf(uid) == -1) {
                userIdsToAdd.push(uid);
            }
        });
        //calculate outs
        this.initialOptionsModel.forEach(uid => {
            if (this.optionsModel.indexOf(uid) == -1) {
                userIdsToRemove.push(uid);
            }
        });
        console.debug("Users to add: " + userIdsToAdd);
        console.debug("Users to remove: " + userIdsToRemove);

        if (userIdsToAdd.length > 0) {
            this.taskService.addUsersToTask(this.ticketId, userIdsToAdd);
        }
        if (userIdsToRemove.length > 0) {
            this.taskService.removeUsersFromTask(this.ticketId, userIdsToRemove);
        }
    }

    //Used to convert our User objects to the format supported by the dropdown component
    private convertUsersToMultiSelect(users: User[]): IMultiSelectOption[] {
        let mule: IMultiSelectOption[] = [];
        for (let user of users) {
            mule.push({id: user.id, name: user.username});
        }
        return mule;
    }

    private preselectUsers(users: User[]): void {
        console.info("Adding users ids to optionsModel (preselecting users already assigned)");
        users.forEach(u => this.optionsModel.push(u.id));
    }
}