import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {SelectItem} from 'primeng/api';
import {ConferenceService} from '../services/conference.service';
import {DropdownValue} from "../../DropdownValue";
import {MessageService} from "primeng/api";
import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';

@Component({
    selector: 'app-admin-page',
    templateUrl: './admin-page.component.html',
    styleUrls: ['./admin-page.component.css'],
    providers: [MessageService]
})
export class AdminPageComponent implements OnInit {
    userForm!: FormGroup;
    departmentForm!: FormGroup;
    departments!: SelectItem[];
    email!: string;
    userId!: number;
    socialUser!: SocialUser;
    isLoggedin?: boolean;

    constructor(private fb: FormBuilder,  private socialAuthService: SocialAuthService, private messageService: MessageService, private conferenceService: ConferenceService) {
    }

    ngOnInit() {
        this.initializeForms();
        this.loadDepartments();
    }

    private initializeForms() {
        this.userForm = this.fb.group({
            email: ['', [Validators.required, Validators.email]],
            department: [null, Validators.required],
            password: ['', Validators.required],
            confirmPassword: ['', Validators.required],
            userName: ['', Validators.required]
        });

        this.departmentForm = this.fb.group({
            departmentName: ['', Validators.required]
        });
        this.socialAuthService.authState.subscribe(async (user) => {
            this.socialUser = user;
            this.isLoggedin = user != null;
            console.log(this.socialUser);

            if (user && user.email) {this.email=user.email}});
    }

    private loadDepartments() {
        this.conferenceService.getDepartments().subscribe(
            data => {
                this.departments = data.map(dept => ({label: dept, value: dept}));
            },
            error => {
                console.error('Error fetching departments:', error);
            }
        );
    }

    createUser() {
        if (this.userForm.valid && this.userForm.value.password === this.userForm.value.confirmPassword) {
            const newUser: DropdownValue = {
                email: this.userForm.value.email,
                password: this.userForm.value.password,
                department: this.userForm.value.department,
                name:this.userForm.value.userName
            };
            console.log(newUser);

            this.conferenceService.createUser(newUser).subscribe(response => {
                this.messageService.add({severity: 'success', summary: 'Success', detail: 'User created successfully'});
            }, error => {
                this.messageService.add({severity: 'error', summary: 'Error', detail: 'Failed to create user'});
            });
        } else {
            this.messageService.add({severity: 'warn', summary: 'Warning', detail: 'Form is not valid or passwords do not match'});
        }
    }

    createDepartment() {
        if (this.departmentForm.valid) {
            const departmentData = {department: this.departmentForm.value.departmentName};
            console.log(departmentData);
            this.conferenceService.createDepartment(departmentData).subscribe(response => {
                this.messageService.add({severity: 'success', summary: 'Success', detail: 'Department created successfully'});
                this.loadDepartments();
            }, error => {
                this.messageService.add({severity: 'error', summary: 'Error', detail: 'Failed to create department'});
            });
        } else {
            this.messageService.add({severity: 'warn', summary: 'Warning', detail: 'Department form is not valid'});
        }
    }
}
