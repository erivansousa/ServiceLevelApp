# ServiceLevelApp

The application is a single page web application, it was developed using JavaScript powered by NodeJS. 

I chose to make it as a web application to make possible to execute it on many platforms, and chose to develop using NodeJS because it makes easier to build and get the application running. To avoid problems on how each browser process a web content and to make the interface looks good, I decided to use Bootstrap and jQuery to organize and implement some behaviors on the screen (I've tested open the app on Chrome, IE and Edge, and the interface works fine).

One of the current limitations of the application is it'll fail if you put a url with the protocol at the begin, I haven't implemented the processing of this information. It's necessary to do more tests on the measure algorithm and, maybe, compare its result with other monitoring tool to make sure it's working like expected. Maybe it's interesting to implement new features like make it possible to test requests to other protocols and to get other statistics.

## Getting Started

As it was developed with JavaScript the build process isn't necessary, you just need to download and install the [NodeJS](https://nodejs.org/en/) runtime, and clone or download the [project source code](https://github.com/erivansousa/ServiceLevelApp).

### Running

The starting point of the project is the file slapp.js in the project root directory, so, after you've installed the Nodejs runtime and downloaded the project source code, open a terminal or command prompt, navigate to the project root directory and run the command:

```
node slapp.js
```
Or, if you're using the Nodemon utility:
```
nodemon slapp.js
```
After the server turns on, you can access the application interface on a internet browser using 'localhost:3000' as a url. By default the application will use the port 3000, but you can change this modifying the property 'server_port' in the 'parameters.js' file. I've made this file to make easier to config some aspects of the application. The parameters.js file looks like shown bellow:

```
{
    slo_limit_response_millis: 100,
    screen_refresh_millis: 5000,
    process_running_millis: 5000,
    server_port: 3000,
    database_file_name: "slDataBase"
}
```
* **slo_limit_response_millis** - (milliseconds) - Limit time to consider a response time fast enough;
* **screen_refresh_millis** - (milliseconds) - Time between every each ajax request to refresh the data on the application screen;
* **process_running_millis** - (milliseconds) - Time between every each routine execution which makes the requisitions to the urls stored by the user;
* **server_port** - The port used by the server starting process;
* **database_file_name** - The file name of the "database" file on the application root directory;


## Built With

* [Express](https://www.npmjs.com/package/express) - The web framework for node;
* [Ejs](https://www.npmjs.com/package/ejs) - Embedded JavaScript template;
* [Json DB](https://www.npmjs.com/package/node-json-db) - A minimalist "database" which uses a json file to store data;
* [Bootstrap](http://getbootstrap.com/) - Front-end web framework;
* [jQuery](https://jquery.com/) - JavaScript library;

## Authors

* **Erivan Nogueira de Sousa** - [ErivanSousa](https://github.com/erivansousa)