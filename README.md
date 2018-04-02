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
cd ./dist
git remote add ~location~

# Otherwise, build project, deploy to heroku location
cd ./
gulp build
cd dist
git commit -a -m "deployment"
git push ~target~ master
# If there are any additional directions, follow them to complete the deployment
```
