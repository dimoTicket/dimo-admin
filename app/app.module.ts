import {NgModule } from "@angular/core";
import {BrowserModule} from "@angular/platform-browser";
import {AppComponent} from "./components/app.component";
import {FormsModule} from "@angular/forms";
import {routing} from "./app.routing";
import {HttpModule} from "@angular/http";
import {DashboardComponent} from "./components/dashboard.component";
import {TicketsComponent} from "./components/tickets.component";
import {TaskComponent} from "./components/task.component";
import {TicketService} from "./services/ticket.service";
import {ImageService} from "./services/image.service";
import {AgmCoreModule} from "angular2-google-maps/core";
import {CarouselComponent} from "./components/carousel.component";
// import {InMemoryDataService} from "./in-memory-data.service";

@NgModule({
    imports: [
        BrowserModule,
        FormsModule,
        HttpModule,
        routing],
    declarations: [
        AppComponent,
        DashboardComponent,
        TicketsComponent,
        TaskComponent,
        CarouselComponent],
    providers: [
        TicketService,
        ImageService],
    bootstrap: [AppComponent]
})

export class AppModule {
}
