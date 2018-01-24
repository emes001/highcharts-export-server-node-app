# Highcharts Node.js Export Server

Docker image of a Highcharts Export Server running within a Node.js web application

# Why?

The existing [Highcharts Export Server docker image](https://hub.docker.com/r/highcharts/highcharts-export-server/) was outdated (and has since been [deprecated](https://www.highcharts.com/docs/export-module/258)), having been last pushed in 2016... and me being me, was looking for a fun app to dockerize!

# Prequisites

You must have the Docker engine installed on your target environment.

# Building from source

To build from source you need to clone the git repo and run docker build:

    `git clone https://github.com/emes001/highcharts-export-server-node-app.git`
    `docker build -t highcharts-export-server-node-app:<TAG> .`

# Pulling from Docker Hub

This image is not yet published in the Docker Hub.

# Running

To run the container:

    `docker run -p 8080:8080 --rm -it highcharts-export-server-node-app:<TAG>`

You can then browse to http://<DOCKER_HOST>:8080 to view the live export-server. To find your DOCKER_HOST use the docker inspect to get the IP address.

An HTTP GET request to `/` will return a JSON-formatted message, showing that the application is up and running. To generate a chart, issue a HTTP POST request to `/`. For instructions on how to format your request (with parameters), see [this guide](https://www.highcharts.com/docs/export-module/export-module-overview).


# Caveats

The following caveats apply to this Docker image:
 * You agree to the [Highcharts license](https://github.com/highcharts/node-export-server/blob/master/LICENSE).
 * NPM security permissions have been disabled (within the container) due to Corporate Firewall/Proxy policies during the build process. They are re-enabled (within the container) after install completes.
 * The web application only accepts the following POST parameters: `options` and `scale`.
 * The web application only supports exporting PNG images.

# References / Useful links
 * [Docker Hub: The Highcharts Export server docker image](https://hub.docker.com/r/highcharts/highcharts-export-server/)
 * [GitHub: Highcharts Export Server](https://github.com/highcharts/highcharts-export-server/tree/dockerized) (dockerized branch)
 * [GitHub: Highcharts Node.js Export Server](https://github.com/highcharts/node-export-server)
 * [Dockerizing a Node.js web app](https://nodejs.org/en/docs/guides/nodejs-docker-webapp/)

## License

[MIT](LICENSE).