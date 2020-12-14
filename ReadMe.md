# GigAdvisor

For executing this application and its own environment you will need Docker. Install it from here: https://www.docker.com

The web-application is available online at: https://gigadvisor.buccella.me

The Android application is available online at:

The iOS application is available online at:

## Web-App Setup for Local Environment

### First Step

Clone the repository:

```sh
$ git clone https://github.com/IvanBuccella/GigAdvisor
```

### Second Step

Edit .env file with your personal settings.

Edit env.config.json file with your personal back-end API Endpoints on front-end.

Edit Google Geocoding API key in Review.tsx file on front-end.

Edit Google Maps API key in PlatformMap.tsx file on front-end.


### Third Step

Deploy local environment with Docker (since next time, the "--build" flag is unnecessary):

```sh
$ docker-compose up --build
```

### Fourth Step

Run on your browser

```sh
http://localhost:9000
```

### Enjoy :-)
