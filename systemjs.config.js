// map tells the System loader where to look for things
var map = {
    'app': 'app', // 'dist',
    '@angular': 'node_modules/@angular',
    'angular2-in-memory-web-api': 'node_modules/angular2-in-memory-web-api',
    'rxjs': 'node_modules/rxjs',
    'moment': 'node_modules/moment/moment.js',
    'angular2-google-maps': 'node_modules/angular2-google-maps/core'
};

// packages tells the System loader how to load when no filename and/or no extension
var packages = {
    'app': {main: 'main', defaultExtension: 'ts'},
    'rxjs': {main: 'index.js'},
    'angular2-in-memory-web-api': {main: 'index.js'},
    'angular2-google-maps': {main: 'core', defaultExtension: 'umd.js'}
};

var ngPackageNames = [
    'common',
    'compiler',
    'core',
    'http',
    'platform-browser',
    'platform-browser-dynamic',
    'router',
    'upgrade',
    'forms'
];

// Add package entries for angular packages
ngPackageNames.forEach(function (pkgName) {
    packages['@angular/' + pkgName] = {main: 'index.js'};
});

var config = {
    transpiler: 'typescript',
    typescriptOptions: {emitDecoratorMetadata: true},
    map: map,
    packages: packages
};

System.config(config);
