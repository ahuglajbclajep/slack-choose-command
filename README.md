# slack-choose-command

Add a `/choose` command to your workspace.

## Usage

- `/choose`  
  You choose one person from the current channel.
- `/choose 3`  
  You choose three people from the current channel.
- `/choose 3 from #general`  
  You choose three people from the general channel.
- `/choose 3 from @foo @bar @baz @qux`  
  You choose three people of the four.

## Install

### Create a Heroku application

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

### Create a Slack application

Go to a [your Slack Apps web page](https://api.slack.com/apps).

1. _Create New app_.
2. Setup application.

- _App Name_: As you like.
- _Development Slack Workspace_: Select a workspace you want to install this app.

3. _Create App_.

### Create a Slash Command

In the new application page:

1. Select _Slack Commands_ from _Features_ menu.
2. _Create New Command_.
3. Setup new command.

- _Command_: /choose
- _Request URL_: Your Heroku application's URL.
- _Short Description_: e.g. "Choose three people from the general channel".
- _Usage Hint_: e.g. "3 from #general".
- _Escape channels, users, and links sent to your app_: **check**

4. _Save_.

### Setup permission

In the application page:

1. Select _OAuth & Permissions_ from _Features_ menu.
2. Add _channels:read_ permission in _Select Permission Scopes_.

### Install an application on your workspace

Select _OAuth & Permissions_ from _Features_ menu:

1. _Install App to Workspace_.
2. _Authorize_.

### Setup environment variables

In the application page:

1. Select _Basic Information_ from _Settings_ menu.
2. Note down _Verification Token_.
3. Select _OAuth & Permissions_ from _Features_ menu.
4. Note down _OAuth Access Token_.

In the Heroku application's _Settings_ page:

5. Select _Reveal Config Vars_.
6. Add _Verification Token_ as _VERIFICATION_TOKEN_.
7. Add _OAuth Access Token_ as _OAUTH_TOKEN_.

## License

[MIT](LICENSE)
