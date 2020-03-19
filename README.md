# Watch Party

## What we do

TODO

## DEV: How to run

- NOTE: All the `cd` portion assume you are in the base directory. If you know which directory to be in
to run the appropariate section, leave that part out.

- NOTE LINUX & MACOS: If you want to run both servers concurrently, you can detatch from the commands. To do this, add ` &` to the end of each line, and if entered into portal, click `CTRL-D` to detatch. Closing
the terminal should kill the session with a `kill -SIGHUP <pid>` command. Alternatively, use `jobs` to see the running jobs, `fg %<job #>` to bring to foreground, and then `CTRL-C` or `CTRL-Z` to kill it.

### First Time Install

You will need to install all the modules before you can run the code, for both backend and frontend.
To install for the backend, navigate to WatchParty and install. \
`cd WatchParty && npm install` \
\
You will need to do the same for client \
`cd WatchParty/client && npm install`

### Starting The Servers

To start the backend, you will need to navigate to the main folder and run \
`cd WatchParty && npm start` \
\
In order to run the client, you will need to navigate to the client and run \
`cd WatchParty/client && npm run start` \
\
The backend should now allow your frontend and mobile to operate. To run the mobile application, go to the mobile repo.
