import {platformBrowserDynamic} from "@angular/platform-browser-dynamic";
import {AppModule} from "./app.module";

platformBrowserDynamic().bootstrapModule(AppModule);

// bootstrap(AppComponent, [HTTP_PROVIDERS,
//     provide(XHRBackend, {useClass: InMemoryBackendService}), // in-mem server
//     provide(SEED_DATA, {useClass: InMemoryDataService}),  // in-mem server data]);
//     APP_ROUTER_PROVIDERS,
//     disableDeprecatedForms(),
//     provideForms()])
//     .catch(err => console.error(err));

