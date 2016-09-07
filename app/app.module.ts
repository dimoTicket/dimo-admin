import {NgModule} from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {AppComponent} from "./app.component";
import {FormsModule} from "@angular/forms";
import {routing} from "./app.routing";
import {HttpModule} from "@angular/http";
import {DashboardComponent} from "./dashboard.component";
import {TicketsComponent} from "./tickets.component";
import {TicketDetailComponent} from "./ticket-detail.component";
import {TicketService} from "./ticket.service";
import {InMemoryDataService} from "./in-memory-data.service";
import {InMemoryWebApiModule} from "angular2-in-memory-web-api";
import {ImageService} from "./image.service";

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        InMemoryWebApiModule.forRoot(InMemoryDataService),
        routing],
    declarations: [
        AppComponent,
        DashboardComponent,
        TicketsComponent,
        TicketDetailComponent],
    providers: [
        TicketService,
        ImageService],
    bootstrap: [AppComponent]
})

export class AppModule {
}
