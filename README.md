# All About Me :muscle: [![Build Status](https://travis-ci.org/FAC-11/AllAboutMe.svg?branch=master)](https://travis-ci.org/FAC-11/AllAboutMe) [![codecov](https://codecov.io/gh/FAC-11/AllAboutMe/branch/master/graph/badge.svg)](https://codecov.io/gh/FAC-11/AllAboutMe)

_*25.9.17 - 13.10.17 | [Founders & Coders](https://foundersandcoders.com/) Student Project*_


Made by [Constantina](https://github.com/polyccon), [Dak](https://github.com/dangerdak), [Jen](https://github.com/Jen-Harris) & [Rebeca](https://github.com/rebecacalvoquintero) :octocat:


![sign in page](https://i.imgur.com/emJvg9x.jpg)  




## Summary :pencil: 
All About Me is a mobile-first web application which allows young people at the Anna Freud centre to answer questions about their mental health and send their answers to their mental heath workers.

Or as we say in the app:  
![welcome page](https://i.imgur.com/WLLc2sv.png)


## Challenge :warning: 
Patients at [The Anna Freud Centre](http://www.annafreud.org/) were tired of being asked the same questions every time their clinician changed or when they went to a new centre. They wrote up the most commonly asked questions into one questionnaire which they could give to their clinicians, however it was still paper-based.

## Solution :bulb: 
All About Me allows patients to answer the questionnaire online in their own time, save their answers, and update their details as needed. When they're ready they can send their form to their clinician.


## How?
__Design Sprint__ :art: (See a detailed process [here](https://github.com/FAC-11/AllAboutMe/blob/master/designsprint.md))

- [x] Ideation

- [x] Prototyping

- [x] User Testing

*_The outcome of our design sprint was a functioning prototype designed in Figma:_*

![figma designs](https://i.imgur.com/Cg6iIlb.png)



__Build Sprint :wrench:__

- [x] Sprint Planning

- [ ] Technical spike
  * PWA

- [x] Build!

*_See the outcome of our build sprint below!_*

### User Stories :books:
In order to create a realistic MVP we focused on specific user stories we wanted to achieve.

_*"As a user I want to be able to...:"*_
- [x] Login securely
- [x] Sign up to the app
- [ ] Select a personal colour - started, majority set as issue for spring 2
- [x] Answer the questionnaire
- [x] Send answers to questions
- [x] Edit answers once saved
- [x] See my progress within the questionnaire via a progress bar
- [ ] See completed/incomplete sections on screen - sprint 2 
- [ ] Access the app offline - spring 2
- [x] Be able to use the form on mobile and desktop
- [x] See ideas to difficult questions
- [x] Enjoy using the app


## The MVP! :sparkles:

Check it out [here](https://allaboutme-annafreud.herokuapp.com/) :eyes: 

Or look at this short video that shows basic functionality of the app:  

![app walkthrough gif](https://i.imgur.com/Ibg2ykx.gif)  

![](https://files.gitter.im/foundersandcoders/AllAboutMe/3bB8/image.png)
## Set up the app locally :computer: 

First clone this repo:
`git clone git@github.com:FAC-11/AllAboutMe.git`

then run `npm i` to install the dependencies for the app.

### Database Setup

In terminal type psql or pgcli if installed. Within psql/pcli enter the following commands:

```
CREATE DATABASE [db_name];  
CREATE USER [user_name] WITH PASSWORD ['password'];
```

Now you can set the database url in your config.env as follows (setting the values in square brackets to the values you defined in the steps above):

```postgres://[user_name]:[password]@localhost:5432/[db_name]```

Next run the db_build.js file in terminal: 

```node src/database/db_build.js```

This will create the tables in your database.

### Environment Variables 
Environment variables are one of the ways we keep our product safe. If you want to access our app locally you will need to add your own.

First create a [config.env](https://github.com/dwyl/env2#create-a-env-file) file and add the following variables:
```
DATABASE_URL
SECRET
SESSION_SECRET
```

and for sending emails you need the following:

```
TEMPLATE_DIRECTORY
AWS_REGION
AWS_ACCESS_KEY_ID
AWS_SECRET_ACCESS_KEY
```

*_(Note: have a look at the [SendEmail](https://www.npmjs.com/package/sendemail) module to set this up and find the values for the variables)_*


### Redis
Our app uses redis to store information used to reset passwords. In order to
run the app locally you will need to have a redis server running on your machine. The instructions for this will vary depending on your setup: https://redis.io/topics/quickstart

### Start the Server

You can now start the server! In your terminal write: 

`npm run devStart`

then you should be able to go to [localhost](http://localhost:4001/) and view the app!

### Database schema
![schema diagram](schema.png)

## To be continued... :sunglasses:

In the next sprint, we aim to:

- [ ] Make the app available when the user is offline (PWA)
- [ ] Allow the user to change the colours of the whole app
- [ ] Take into account the possible data storage constraints
- [ ] Allow the user to draw his answers
- [ ] Possible extra animation
- [ ] Add 'Forgotten your password?' functionality
- [ ] More tests to prevent errors from happening
- [ ] Add [typeform](https://www.typeform.com/#home-examples) style
- [ ] Styling error pages


## Technologies :floppy_disk: 
 * Database: [PostgreSQL](https://www.postgresql.org/) and [redis](https://redis.io/).
 * Styling: [Tachyons](http://tachyons.io/) and CSS.
 * [Node.js](https://nodejs.org/en/), [Express](https://expressjs.com/) and [Handlebars](http://handlebarsjs.com/).
 * To send the form via email: [SendEmail](https://www.npmjs.com/package/sendemail) with [AWS](https://aws.amazon.com/ses/getting-started/).

## Rescources
* [@oliverjam's guide to a minimal PWAs](https://github.com/oliverjam/minimal-pwa)
* [Send email Dwyl library](https://github.com/dwyl/sendemail)


:dancer::dancer::dancer::dancer:
