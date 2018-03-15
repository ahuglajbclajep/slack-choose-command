# slack-choose-command
Add `/choose` command to your workspace.


## Usage
- `/choose`  
You can choose one person in this channel.
- `/choose 3`  
You can choose three people in this channel.


## Install
### Create heroku application
[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

### Create slack application
Go to [Slack API: Applications](https://api.slack.com/apps).

1. `Create New app`.
2. Setup application.
  - `App Name`: choose (or name yourself)
  - `Development Slack Team`: Select workspace you want to install.
3. `Create New app`.

### Create Slash Command
In the slack application:

1. Select `Slack Commands` from Features menu.
2. `Create New Command`.
3. Setup Slack commands.
  - `Command`: /choose (or name yourself)
  - `Request URL`: Your application URL.
4. `Save`.

### Setup permission
In the slack application:

1. Select `OAuth & Permissions` from Features menu.
2. Add `channels:read` permission with `Permission scopes`.

### Install app
Select `OAuth & Permissions` from Features menu.

1. `Install App to Team`
2. `Authorize`

### Setup environment variables
In the slack application:

1. Select `Basic Information` from Settings menu.
2. Note down `Verification Token`.
3. Select `OAuth & Permissions` from Features menu.
4. Note down `OAuth Access Token`.

In the heroku application settings:

5. Select `Reveal Config Vars`.
6. Add `Verification Token` as `VERIFICATION_TOKEN`.
7. Add `OAuth Access Token` as `OAUTH_TOKEN`.
