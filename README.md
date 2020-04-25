# Watch Party

## What we do

We provide the user with a way to keep track of movie they have watched and want to watch. We also provide the user with the ability to invite friends to watch movies together.

## DEV: How to run

### NOTES

- NOTE: All the `cd` portion assume you are in the base directory. If you know which directory to be in
to run the appropariate section, leave that part out.

- NOTE LINUX & MACOS: If you want to run both servers concurrently, you can detatch from the commands. To do this, add ` &` to the end of each line, and if entered into portal, click `CTRL-D` to detatch. Closing
the terminal should kill the session with a `kill -SIGHUP <pid>` command. Alternatively, use `jobs` to see the running jobs, `fg %<job #>` to bring to foreground, and then `CTRL-C` or `CTRL-Z` to kill it. If this does not work for you, open multiple folders. *Do not forget to run nvm use on each new terminal*.

### ON EVERY RUN

You have to use `nvm` to make sure your version is correction. To do this, run \
`nvm use` \
every time in the base directory. If you don't have the right node version, run \
`nvm install` \
If you don't have nvm installed, run \
`wget -qO- https://raw.githubusercontent.com/nvm-sh/nvm/v0.35.3/install.sh | bash`

### First Time Install (Needs update for backend)

You will need to install all the modules before you can run the code, for both backend and frontend.
To install for the backend, navigate to WatchParty and install. \
`cd WatchParty/backend && npm install` \
\
You will need to do the same for client \
`cd WatchParty/client && npm install` \
\
And OPTIONALLY for mobile \
`cd WatchParty/mobile && npm install`

### Starting The Servers

To start the backend, you will need to navigate to the main folder and run \
`cd WatchParty/backend && npm start` \
\
In order to run the client, you will need to navigate to the client and run \
`cd WatchParty/client && npm run start`

## Linting

We are now subject to the mighty linter (deploy will soon be too). We follow airbnb (with some edits) on the frontend.

### Frontend

We are following the airbnb eslint style. The full list can be found [at this link](https://github.com/airbnb/javascript/tree/master/react). This style specifically flows
well with React.

### Mobile ( Support to be moved to frontend webapp )

In order to run the mobile application, go into the mobile/WatchPart. \
`cd WatchParty/mobile && sudo npm start` \
This was instantiated using Expo, and works on React Native. *Note the sudo*. Otherwise, you will get many errors. You will also need to make sure ADB is set up along with device manager. Follow the instructions given by expo to properly set up.
