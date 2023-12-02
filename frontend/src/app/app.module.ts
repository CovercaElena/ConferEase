import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {ScheduleModule, RecurrenceEditorModule} from '@syncfusion/ej2-angular-schedule';
import {HomeComponent} from './home/home.component';
import {MenuComponent} from './menu/menu.component';
import {LoginComponent} from './login/login.component';
import {PrimeNGConfig} from 'primeng/api'
import {MenubarModule} from "primeng/menubar";
import {MenuModule} from "primeng/menu";
import {InputTextModule} from "primeng/inputtext";
import {ButtonModule} from "primeng/button";
import {DialogModule} from "primeng/dialog";
import {CheckboxModule} from "primeng/checkbox";
import {CommonModule} from "@angular/common";
import {DepartmentComponent} from './department/department.component';
import {CreateComponent} from './create/create.component';
import {PublicComponent} from './public/public.component';
import {SplitterModule} from "primeng/splitter";
import {CardModule} from "primeng/card";
import {
    GoogleLoginProvider,
    GoogleSigninButtonModule,
    SocialAuthServiceConfig,
    SocialLoginModule
} from "@abacritt/angularx-social-login";
import {AuthService} from "./services/auth.service";
import {HttpClientModule} from "@angular/common/http";
import { MessageService } from 'primeng/api';
import {DividerModule} from "primeng/divider";
import { CalendarComponent } from './calendar/calendar.component';
import {DataService} from "./calendar/data.service";
import {DayPilotModule} from "@daypilot/daypilot-lite-angular";
import {CarouselModule} from "primeng/carousel";
import { PastConferencesComponent } from './past-conferences/past-conferences.component';
import {TableModule} from "primeng/table";
import { FutureConferencesComponent } from './future-conferences/future-conferences.component';
@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        MenuComponent,
        LoginComponent,
        DepartmentComponent,
        CreateComponent,
        PublicComponent,
        CalendarComponent,
        PastConferencesComponent,
        FutureConferencesComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        ScheduleModule, RecurrenceEditorModule, MenubarModule,
        InputTextModule, ButtonModule, DialogModule, CheckboxModule, MenubarModule, FormsModule, SplitterModule, CardModule, ReactiveFormsModule, SocialLoginModule, GoogleSigninButtonModule, HttpClientModule, DividerModule, DayPilotModule, CarouselModule, TableModule
    ],
    providers: [{
        provide: 'SocialAuthServiceConfig',
        useValue: {
            autoLogin: true, //keeps the user signed in
            providers: [
                {
                    id: GoogleLoginProvider.PROVIDER_ID,
                    provider: new GoogleLoginProvider('78151943185-csairh2o5tjbgahgh8e082v374f4cjao.apps.googleusercontent.com') // your client id
                }
            ]
        } as SocialAuthServiceConfig,
    }, AuthService,MessageService,DataService],
    bootstrap: [AppComponent]
})
export class AppModule {
    constructor(private primengConfig: PrimeNGConfig) {
    }

    ngOnInit() {
        this.primengConfig.ripple = true;
    }
}
