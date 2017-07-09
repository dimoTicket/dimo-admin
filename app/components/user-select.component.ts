import {Component, OnInit} from "@angular/core";
import {IMultiSelectOption, IMultiSelectSettings, IMultiSelectTexts} from "angular-2-dropdown-multiselect";
import {User} from "../entities/user";
import {UserService} from "../services/user.service";

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

    constructor(private userService: UserService) {
    }

    ngOnInit() {
        this.getUsersAndSetDropdown();
    }

    getUsersAndSetDropdown() {
        this.userService.getUsers().subscribe(
            users => this.myOptions = this.convertUsersToMultiSelect(users),
            err => console.error(err),
            () => console.debug("Trying to Get users..")
        );
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
}