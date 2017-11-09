# All About Me :muscle: [![Build Status](https://travis-ci.org/FAC-11/AllAboutMe.svg?branch=master)](https://travis-ci.org/FAC-11/AllAboutMe) [![codecov](https://codecov.io/gh/FAC-11/AllAboutMe/branch/master/graph/badge.svg)](https://codecov.io/gh/FAC-11/AllAboutMe)

_*25.9.17 - 13.10.17 | [Founders & Coders](https://foundersandcoders.com/) Student Project*_ | _*by [Constantina](https://github.com/polyccon), [Dak](https://github.com/dangerdak), [Jen](https://github.com/Jen-Harris) & [Rebeca](https://github.com/rebecacalvoquintero)*_  
_*Continued for 2 more sprints as a Graduate Project*_ | _*by [Constantina](https://github.com/polyccon) & [Dak](https://github.com/dangerdak)*_

<img src="https://i.imgur.com/emJvg9x.jpg" width="600">

## Summary :pencil: 
All About Me is a mobile-first web application which allows young people at the Anna Freud centre to answer questions about their mental health and send their answers to their mental heath workers.

## Challenge :warning: 
Patients at [The Anna Freud Centre](http://www.annafreud.org/) were tired of being asked the same questions every time their clinician changed or when they went to a new centre. They wrote up the most commonly asked questions into one questionnaire which they could give to their clinicians, however it was still paper-based.

## Solution :bulb: 
All About Me allows patients to answer the questionnaire online in their own time, save their answers, and update their details as needed. When they're ready they can send their form to their clinician.


## How?
__Design Sprint__ :art: (See a detailed process [here](https://github.com/FAC-11/AllAboutMe/blob/master/designsprint.md))

- [x] Ideation

- [x] Prototyping

- [x] User Testing

*_The outcome of our design sprint was a prototype designed in Figma:_*

![figma designs](https://i.imgur.com/Cg6iIlb.png)

*_And our database design:_*  

![schema diagram](schema.png)

__Build Sprint :wrench:__

- Sprint Planning

- Build!

- Frequent discussion of priorities and user testing results with PO

*_See the outcome below!_*

### User Stories :books:
In order to create a realistic MVP we focused on specific user stories we wanted to achieve.

#### Sprint 1

_*"As a user I want to be able to...:"*_
- [x] Login securely
- [x] Sign up to the app
- [ ] Change the colour scheme of the whole app
- [x] Answer the questionnaire
- [x] Send answers to questions
- [x] Edit answers once saved
- [x] See my progress within the questionnaire via a progress bar
- [ ] See completed/incomplete sections on screen
- [ ] Access the app offline
- [x] Be able to use the form on mobile and desktop
- [x] See ideas to help with answering some questions
- [x] Enjoy using the app!

#### Sprint 2

- [ ] Use the app offline (PWA) - no longer considered a priority
- [x] Change the colour scheme of the whole app
- [x] My data is safe and secure
- [x] Add 'Forgotten your password?' functionality
- [x] More tests to prevent unexpected errors
- [x] Navigate the app easily
- [x] Send a copy of the form to myself


#### Sprint 3
- [ ] Draw my answers 
- [ ] See fun animations on the site
- [ ] Be able to hide my answers
- [ ] Customise the background image
- [ ] Have a child-friendly experience while using the app
- [ ] See sensible error pages/messages when something goes wrong
- [ ] Include any additional information I feel is relevant

## The MVP! :sparkles:

Check it out [here](https://allaboutme-annafreud.herokuapp.com/) :eyes: 

Or look at this short video that shows basic functionality of the app:  

![app walkthrough gif](https://i.imgur.com/Ibg2ykx.gif)  

![](https://files.gitter.im/foundersandcoders/AllAboutMe/3bB8/image.png)
## Set up the app locally :computer: 

First clone this repo:
```
git clone git@github.com:FAC-11/AllAboutMe.git
```

then run `npm i` to install the dependencies for the app.

### Database Setup

In terminal type psql or pgcli if installed. Within psql/pcli enter the following commands:

```bash
CREATE DATABASE [db_name];  
CREATE USER [user_name] WITH PASSWORD [password];
```

Now you can set the database url in your config.env as follows (setting the values in square brackets to the values you defined in the steps above):

```bash
postgres://[user_name]:[password]@localhost:5432/[db_name]
```

Next run the db_build.js file in terminal: 

```bash
node src/database/db_build.js
```

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
SENDER_EMAIL_ADDRESS
AWS_REGION
AWS_ACCESS_KEY_ID
AWS_SECRET_ACCESS_KEY
```

*_(Note: have a look at the [SendEmail](https://www.npmjs.com/package/sendemail) module to set this up and find the values for the variables)_*


### Redis
Our app uses redis to store information used to reset passwords. In order to
run the app locally you will need to have a redis server running on your machine. The instructions for this will vary depending on your setup: https://redis.io/topics/quickstart

### Start the Server

You can now start the server! In your terminal type:

```
npm run devStart
```

then you should be able to go to [localhost](http://localhost:4001/) and view the app!

## Technologies :floppy_disk: 
 * Database: [PostgreSQL](https://www.postgresql.org/) and [redis](https://redis.io/).
 * Authentication: Password hashing using __bcrypt__.
 * Styling: [Tachyons](http://tachyons.io/) and CSS.
 * [Node.js](https://nodejs.org/en/), [Express](https://expressjs.com/) and [Handlebars](http://handlebarsjs.com/).
 * To send the form via email: [SendEmail](https://www.npmjs.com/package/sendemail) with [AWS](https://aws.amazon.com/ses/getting-started/).

## Rescources
* [Send email Dwyl library](https://github.com/dwyl/sendemail)
* [Using flash
  messages](https://gist.github.com/brianmacarthur/a4e3e0093d368aa8e423)
* [Password reset flow](https://stormpath.com/blog/the-pain-of-password-reset)
* [CSS speech bubble :)](https://codepen.io/Founts/pen/gmhcl)
* [Handling 404s with Express](https://expressjs.com/en/starter/faq.html)


:dancer::dancer::dancer::dancer:
