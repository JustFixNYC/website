# Justfix Organization Site

## Overview
This is the JustFix.nyc organization website, for front-facing prospective users and organizers. It's a Node/Angular app, if you have any questions please reach out to [hello@justfix.nyc](mailto:hello@justfix.nyc).

## Installation

- make sure you have gulp and bower installed:
```
npm install -g gulp-cli bower
```

- go to the root directory
- run:
```
# root installation tools, ability to run the client
# this should trigger the bower install as well
npm install



# our server or local API
cd ./server
npm install
npm start

# Open in a new tab/window for terminal in the project root
gulp serve
```

## Build and deployment
  - go to project root
  - run:
```
# If adding a new target, make sure the git repo's set up to handle it
mkdir dist && cd $_
git init
git remote add heroku ~location~

# Otherwise, build project, deploy to heroku location
cd ./
gulp build
cd dist
git add .
git commit -a -m "deployment"
git push -f ~target~ master
# If there are any additional directions, follow them to complete the deployment
```

## Docker support (experimental)

You can try running this via Docker if you want.

First set things up by going into a bash shell:

```
docker-compose run app bash
```

Then, once in the bash shell, install everything:

```
npm install
bower install --allow-root
cd server
npm install
```

Then exit the shell and run `docker-compose up` and
visit http://localhost:3000/.
