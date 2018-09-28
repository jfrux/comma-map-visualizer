# Comma Speedmap Challenge

Shows a list of routes, user selects a route, it shows the points on a map with a blip for speed of each point.

## Scope

> Attached are a few hundred trip paths from the SF Bay Area, each of which is represented as coordinate pairs sampled at 1hz in a JSON file. Please build an performant web-based map visualization of the distribution of speeds along the trip paths. We'd like to see all reading+processing of JSON data performed in the browser.
>
> -- Andy

## Deadline

`Wed. Oct. 3rd, 2018`

## Todos / Nice to haves

- [ ] Field to quick add a new feed by URL
- [ ] Animate / replay the drive in real-time, showing speed in HUD

## Done

- [x] Research existing OSS modules that could be helpful in this project.
- [x] Basic mapbox implementation
- [x] Overall structure of layout.
- [x] Redux Store
- [x] Mock-endpoint for raw JSON results.
- [x] Serves JSON files as static assets for now until we want to host them somewhere or allow users to add feeds.
- [x] Very fast performance for processing the data in the browser.
- [x] Display the routes in a list next to a map.
- [x] User clicks route, shows route in map with speeds at each point.
- [x] As you zoom in you see more and more speeds 
- [x] It must scrub the data in real-time in the browser.
- [x] Iterate data through a visualization sdk such as Mapbox.
- [x] Display the points on Mapbox map with a tag showing speed estimated at each point.

## User Stories

- [x] User visits page and sees list of routes and a message telling them to select a route.
- [x] User clicks a route, Mapbox appears where message was.
- [x] User sees points visualized on the map for the route.
- [x] User zooms in and sees more and more detailed list of speeds.

## Starting the dev server

Make sure you have the latest Stable or LTS version of Node.js installed.

1. `git clone https://github.com/jfrux/comma-map-visualizer.git`
2. Run `npm install` or `yarn install`
3. Start the dev server using `npm start`
3. Open [http://localhost:8080](http://localhost:8080)

## Available Commands

- `npm start` - start the dev server
- `npm clean` - delete the dist folder
- `npm run production` - create a production ready build in `dist` folder
- `npm run lint` - execute an eslint check
- `npm test` - run all tests
- `npm run test:watch` - run all tests in watch mode
- `npm run coverage` - generate code coverage report in the `coverage` folder

<!-- ## Vendor Exporting

You can export specific vendors in separate files and load them. All vendors should be included in `app/vendors` and will be exported in a `vendors` folder under `dist`. The main idea is to serve independent JavaScript and CSS libraries, though currently all file formats are supported.

! Don't forget to add the vendors in `app/index.html` and `build/index.html`.

## Code Coverage

The project is using the Jest Code Coverage tool. The reports are generated by running `npm run coverage`. All configurations are located in `package.json`, inside the `jest` object.

The coverage report consists of an HTML reporter, which can be viewed in the browser and some helper coverage files like the coverage json and xml file.

## Production code

Run `npm run production`. The production-ready code will be located under `dist` folder. -->

## Licence

_comma-map-visualizer_ is available under MIT.
