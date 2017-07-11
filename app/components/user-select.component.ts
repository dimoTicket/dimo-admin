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
    users: User[];

    optionsModel: number[];
    myOptions: IMultiSelectOption[];

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
            let id = +params['id'];
            this.taskService.getTaskByTicketId(id)
                .subscribe(task => this.preselectUsers(task.users),
                    err => console.warn("404 on task with id: " + id)
                );
        });
    }

    onChange() {
        console.log(this.optionsModel);
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
        this.optionsModel = [];
        console.info("Adding users ids to optionsModel (preselecting users already assigned)");
        users.forEach(u => this.optionsModel.push(u.id));
    }
}