# OSD600
Open source subject at Seneca

My Blog : https://tonypark0403.wordpress.com

# Seneca 2017 Learning Lab

This is Lab 7, working with Travis CI

Here is the badge for my repo's Travis Build:

[![Build Status](https://travis-ci.org/tonypark0403/OSD600.svg?branch=master)](https://travis-ci.org/tonypark0403/OSD600)


# Seneca 2017 Learning Lab - Part 3

## Introduction

This is part three of a multi-part lab series.  Parts [one](README.md) and [two](README-part2.md)
are available as well, and it is assumed you have finished both already.

In this portion of the series, we'll extend our library to create a simple node.js web server
and REST API that uses our module.  We will then deploy our server to run on the cloud hosting
platform [Heroku](https://www.heroku.com/).

Learning how to use [PaaS (Platform as a Service)](https://en.wikipedia.org/wiki/Platform_as_a_service) as
a developer is useful so that you can test, deploy, and demo web services and apps outside of
your local development environment.

There are many PaaS options availalbe, from Amazon (AWS Elastic Beanstalk), Google (App Engine),
Microsoft (Azure), and others.  We will be using [Heroku](https://www.heroku.com/) because it can
be used to deploy apps for free, which is ideal for open source testing and prototyping.  Also,
[Heroku](https://www.heroku.com/) is used by Mozilla to run Thimble in production, so it can also
scale to handle real-world production loads.

NOTE: it is *not* necessary to use a credit card, or incur costs with any of the steps we'll
do in this lab.  If you want to do production quality deployments on Heroku, you would need
to do this.

## Create a node.js Web Server

We'll create a simple REST API for our Seneca module using the popular [Express](https://expressjs.com/)
web framework for node.js.  This is the same web framework Thimble uses.

First, we need to install it using `npm`:

```bash
$ npm install express --save
```

This will add a new `dependency` to our `package.json` file.  When I run this command, my
`package.json` file now shows the following:

```json
"dependencies": {
  "express": "^4.15.2"
}
```

Next we need to create a web server using Express that will allow provide an HTTP based API
for calling our Seneca module's functions.  Let's create a basic server file called `server.js`
with the following code:

```js
// Load the express web framework module
var express = require('express');
// Load our seneca module
var seneca = require('./seneca');

// Create an instance of express
var app = express();

// Use port 3000 unless one is set in the env
var port = process.env.PORT || 3000;

// Define some HTTP routes (e.g., URLs) users can access on our server

// GET http://localhost:3000/
app.get('/', function (req, res) {
  res.send('My Server is working!');
});

// GET http://localhost:3000/validate/someone@myseneca.ca
app.get('/validate/:email', function (req, res) {
  var email = req.params.email;

  // Return a JSON formatted response indicating that the given
  // email address is valid or invalid.
  res.json({
    email: email,
    valid: seneca.isValidEmail(email)
  });
});

// GET http://localhost:3000/format/someone
app.get('/format/:name', function (req, res) {
  var name = req.params.name;

  // Return a JSON formatted response with the given name
  // formatted as a valid email address.
  res.json({
    name: name,
    email: seneca.formatSenecaEmail(name)
  });
});

// Start our web server on port 3000
app.listen(port, function () {
  console.log('Server started on http://localhost:' + port);
});
```

Let's test our server locally to make sure it's working, and debug any problems. To run
it, you do the following:

```bash
$ node server.js
Server started on http://localhost:3000
```

Now navigate to your routes on [http://localhost:3000](http://localhost:3000). For example:

* [http://localhost:3000/](http://localhost:3000/)
* [http://localhost:3000/validate/hsingh@myseneca.ca](http://localhost:3000/validate/hsingh@myseneca.ca)
* [http://localhost:3000/format/hsingh](http://localhost:3000/format/hsingh)

You should get back responses from your server with the data formatted as JSON.  For example, if I
try [http://localhost:3000/validate/someone](http://localhost:3000/validate/someone), I'll get back JSON
indicating that the email is not valid:

```json
{"email":"someone","valid":false}
```

Make sure you `git add` and `git commit` this file so it will exist when we `git push` to Herkou.

## Deploy to Heroku

### Step 1 - Create your account

First, you need to [create a free account on Heroku](https://signup.heroku.com/signup/dc). You
can set your **Primary Development Language** to `Node.js`.  You do *not* need to enter a
credit card, nor will we do anything that requires payment.  We are going to use the free tier.

### Step 2 - Download the Heroku CLI

Interacting with Heroku is done from the command line and with git.  You need to [install the
Heroku CLI](https://devcenter.heroku.com/articles/getting-started-with-nodejs#set-up) for your
operating system.

Once installed, you should login to your account from the command line:

```bash
$ heroku login
Enter your Heroku credentials.
Email: you@email.com
Password:
Logged in as you@email.com
```

### Step 3 - Create Heroku App Settings Files

In a minute we're going to `git push` our repo to Heroku, much as we do to GitHub, and this will
automatically deploy it.  In order for this to work, we need to add some metadata to our repo so that
Heroku will know what to do with our files.

We'll need a [`Procfile`](https://devcenter.heroku.com/articles/procfile) that
tells Heroku which command to run when it starts our app.  Create a file a file named `Procfile` (note
the capital `P` and lack of extension) with the following contents:

```
web: node server.js
```

Here we're telling Heroku that we want to start a web process, and which command to run to
start our app's code.

Make sure you `git add` and `git commit` this file so it will exist when we `git push` to Herkou.

### Step 4 - Deploy the App

Now we're going to [create and deploy](https://devcenter.heroku.com/articles/getting-started-with-nodejs#deploy-the-app) our
app to Heroku.

First, create a new app using the Heroku CLI:

```bash
$ heroku create
Creating app... done, ⬢ fast-cove-19860
https://fast-cove-19860.herokuapp.com/ | https://git.heroku.com/fast-cove-19860.git
```

Heroku will generate a random name for your app (mine is `fast-cove-19860`) and give you URLs
you'll need in the following steps.

Next we need to deploy our code to Heroku.  The commands we've run have automatically added
a new remote `git` repo we can use, named `heroku`:

```bash
$ git remote -v
heroku	https://git.heroku.com/fast-cove-19860.git (fetch)
heroku	https://git.heroku.com/fast-cove-19860.git (push)
origin	git@github.com:humphd/Seneca2017LearningLab.git (fetch)
origin	git@github.com:humphd/Seneca2017LearningLab.git (push)
```

We can `push` our code to this new `heroku` remote, which will deploy our code.  NOTE:
make sure you have done `git add` and `git commit` for the `server.js`, `package.json`,
and `Procfile` files you created above, or this won't work.

```bash
$ git git push heroku master
Counting objects: 72, done.
Delta compression using up to 8 threads.
Compressing objects: 100% (68/68), done.
Writing objects: 100% (72/72), 114.53 KiB | 0 bytes/s, done.
Total 72 (delta 48), reused 4 (delta 0)
remote: Compressing source files... done.
remote: Building source:
remote:
remote: -----> Node.js app detected
remote:
remote: -----> Creating runtime environment
remote:
remote:        NPM_CONFIG_LOGLEVEL=error
remote:        NPM_CONFIG_PRODUCTION=true
remote:        NODE_VERBOSE=false
remote:        NODE_ENV=production
remote:        NODE_MODULES_CACHE=true
remote:
remote: -----> Installing binaries
remote:        engines.node (package.json):  unspecified
remote:        engines.npm (package.json):   unspecified (use default)
remote:
remote:        Resolving node version 6.x via semver.io...
remote:        Downloading and installing node 6.10.1...
remote:        Using default npm version: 3.10.10
remote:
remote: -----> Restoring cache
remote:        Skipping cache restore (new runtime signature)
remote:
remote: -----> Building dependencies
remote:        Installing node modules (package.json)
remote:        lab7@1.0.0 /tmp/build_1350b8788532d9900320dfde62e01932
remote:        └─┬ express@4.15.2
remote:        ├─┬ accepts@1.3.3
remote:        │ ├─┬ mime-types@2.1.15
remote:        │ │ └── mime-db@1.27.0
remote:        │ └── negotiator@0.6.1
remote:        ├── array-flatten@1.1.1
remote:        ├── content-disposition@0.5.2
remote:        ├── content-type@1.0.2
remote:        ├── cookie@0.3.1
remote:        ├── cookie-signature@1.0.6
remote:        ├─┬ debug@2.6.1
remote:        │ └── ms@0.7.2
remote:        ├── depd@1.1.0
remote:        ├── encodeurl@1.0.1
remote:        ├── escape-html@1.0.3
remote:        ├── etag@1.8.0
remote:        ├─┬ finalhandler@1.0.1
remote:        │ ├── debug@2.6.3
remote:        │ └── unpipe@1.0.0
remote:        ├── fresh@0.5.0
remote:        ├── merge-descriptors@1.0.1
remote:        ├── methods@1.1.2
remote:        ├─┬ on-finished@2.3.0
remote:        │ └── ee-first@1.1.1
remote:        ├── parseurl@1.3.1
remote:        ├── path-to-regexp@0.1.7
remote:        ├─┬ proxy-addr@1.1.4
remote:        │ ├── forwarded@0.1.0
remote:        │ └── ipaddr.js@1.3.0
remote:        ├── qs@6.4.0
remote:        ├── range-parser@1.2.0
remote:        ├─┬ send@0.15.1
remote:        │ ├── destroy@1.0.4
remote:        │ ├─┬ http-errors@1.6.1
remote:        │ │ └── inherits@2.0.3
remote:        │ └── mime@1.3.4
remote:        ├── serve-static@1.12.1
remote:        ├── setprototypeof@1.0.3
remote:        ├── statuses@1.3.1
remote:        ├─┬ type-is@1.6.14
remote:        │ └── media-typer@0.3.0
remote:        ├── utils-merge@1.0.0
remote:        └── vary@1.1.1
remote:
remote:
remote: -----> Caching build
remote:        Clearing previous node cache
remote:        Saving 2 cacheDirectories (default):
remote:        - node_modules
remote:        - bower_components (nothing to cache)
remote:
remote: -----> Build succeeded!
remote: -----> Discovering process types
remote:        Procfile declares types -> web
remote:
remote: -----> Compressing...
remote:        Done: 13.8M
remote: -----> Launching...
remote:        Released v3
remote:        https://fast-cove-19860.herokuapp.com/ deployed to Heroku
remote:
remote: Verifying deploy... done.
To https://git.heroku.com/fast-cove-19860.git
 * [new branch]      master -> master
```

Our code is now deployed to Heroku, but not yet running.  To start the app on Heroku
we need to start at least one web server with our code:

```bash
$ heroku ps:scale web=1
Scaling dynos... done, now running web at 1:Free
```

At this point you can view your app running on Heroku by visiting the URL it
specified above for your app, or you can use the following command to lanuch
it in your default browser:

```bash
$ heroku open
```

To see server logs for your remote app, you can do the following:

```bash
$ heroku logs
...
```

If you want to see a [continuous stream of logs](https://devcenter.heroku.com/articles/getting-started-with-nodejs#view-logs), do this:

```bash
$ heroku logs --tail
...
```

### Step 4 - Update your Code and Re-Deploy the App

If you make a mistake in your code, fix a bug, or add a feature, you'll need to make changes.
Re-deploying your app with updated code is as simple as doing another `git push`.

Try adding a new route to your `server.js` file that we can use to validate that the server
is working.  Often such a route is called a "health check," since it returns info about whether
the server is running, and can be used with server monitoring software.

Your new route should work as follows:

* Add a new route `/healthcheck`
* Use [process.uptime()](https://nodejs.org/api/process.html#process_process_uptime) to deterimine
the number of seconds that this node.js process has bee running.
* Return JSON with the server's uptime

For example:

```
GET http://localhost:3000/healthcheck

{"uptime":52.349}
```

You could also try formatting the uptime to be returned in days, hours, mins, seconds.

Once you've got the code written and working locally (i.e., test with `node server.js` on your local
machine and visit [http://localhost:3000/healthcheck](http://localhost:3000/healthcheck)), you can
re-deploy to Heroku:

```bash
$ git add <files>
$ git commit -m "Added healthcheck route"
$ git push heroku master
```

Now you should be able to visit your app running on Heroku and hit the `/healthcheck` route.

### Step 5 - Update your GitHub Repo Too!

So far we've been pushing only to Heroku, but we should push our updated code back to GitHub
as well.  When you get everything working locally and on Heroku, push to your `master` branch
on GitHub so your code gets included in your repo.

## Exploring Heroku

We've only scratched the surface of what you can do with Heroku and other PaaS platforms.  It's
just as easy (and free!) to experiment with other platforms, and you should challenge yourself to
try using Google Cloud, AWS, Azure, and others.

You should also spend some time reading the complete [Heroku Node.js guide](https://devcenter.heroku.com/articles/getting-started-with-nodejs#introduction).  You can
also explore [guides for other languages](https://devcenter.heroku.com/start). 


# Seneca 2017 Learning Lab - Part 2

## Introduction

This is part two of a multi-part lab series.  Part one is available as well [here](README.md).

In this portion of the series, we'll extend our work to add test infrastructure. Previously
we focused on linting our code, and making sure it didn't contain any anti-patterns, had
good styling, etc.  We also added continuous integration (CI) via Travis CI, to run our
lint checks every time we commit new code, or someone creates a pull request.

This time we'll be adding *unit tests*, which will help us make sure that our code does
what we expect, and that we don't break it as we make changes going forward.  Having
automated unit tests will also help any external developers that join our project, since
they will act as a kind of documentation (e.g., how to use our module's functions) and
a safe-guard for pull requests (e.g., so we know that nothing gets broken).

## Unit Testing Frameworks

All languages have a lot of options for writing unit tests, and JavaScript and node.js
are no different. When you start adding tests to a project, it's a good idea to look at
your options, and pick a testing framework and runtime that will work well with your code,
has good support for automated runs, and is well documented/supported.

Here are some of the popular frameworks you could consider:

* [Jest](http://facebook.github.io/jest/) by Facebook
* [Mocha](https://mochajs.org/)
* [Chai](http://chaijs.com/)
* [Sinon](http://sinonjs.org/)
* [Cucumber](https://github.com/cucumber/cucumber-js)

The list goes on and on.  You're welcome to try any of these for this lab, or another
one not listed.  I'm going to use [Jest](http://facebook.github.io/jest/) for the rest
of this walkthrough.

## Writing our first Test

To use [Jest](http://facebook.github.io/jest/) I first need to install it.  The
[Getting Started](https://facebook.github.io/jest/docs/getting-started.html) is a good
place to start for info on how to get things set up.

First, let's install using `npm`:

```bash
$ npm install --save-dev jest
```

This will install [Jest](http://facebook.github.io/jest/) to our `node_modules` directory
and also save it as a `devDependency` in our `package.json` file.  After running this, mine
looks like this, with a new line added for `jest` and version `^19.0.2` (you might have a newer
version, depending on when you run this):

```json
"devDependencies": {
    "eslint": "^3.17.1",
    "eslint-config-airbnb-base": "^11.1.1",
    "eslint-plugin-import": "^2.2.0",
    "jest": "^19.0.2"
}
```

Next, I need to add a test.  What should we test?  Learning what to test, and how to write
useful and complete tests is an art.  It takes time, and practice will help you.

To begin, let's write a single test for our `seneca` module and the `isValidEmail()`
function.  A unit test should test one thing, and one thing only.  Instead of trying
to write a single test that will test everything at all once, we'll write many small tests,
each of which tests a single aspect of the code.

Let's create a test file for the `seneca.js` module named `seneca.test.js` with the following
contents:

```js
var seneca = require('./seneca');

test('isValid returns true for simple myseneca address', function() {
  var simpleEmail = 'someone@myseneca.ca';
  expect(seneca.isValidEmail(simpleEmail)).toBe(true);
});
```

This test is very simple (as it should be!) and calls our `seneca.isValidEmail()` function
with the string `someone@myseneca.ca`.  Our code *should* return `true`, which is what
we've said with `expect(...).toBe(true)`: the expression we pass to `expect()` needs to
evaluate to `true` in order for our test to pass.  The [docs for `expect`](https://facebook.github.io/jest/docs/expect.html)
show you all the ways you can use it to test for things.

## Running a test

It's often a good idea to write tests *before* you write your code.  This is called
[Test Driven Development (TDD)](https://en.wikipedia.org/wiki/Test-driven_development), and
helps to make sure that your code evolves in ways that
are expected, documented, and safe.  It's not always necessary, appropriate, or possible to
do this, but it's something to keep in mind.  The code we're writing is perfect for TDD,
since the functions are very easy to test (something goes in, something comes out).

Here's my code right now, which is unimplemented:

```js
/**
 * Given a string `email`, return `true` if the string is in the form
 * of a valid Seneca College email address, `false` othewise.
 */
exports.isValidEmail = function isValidEmail(email) {
  // TODO: needs to be implemented fully
};
```

Let's try running our test.  From the command-line, you can do the following:

```bash
$ node_modules/.bin/jest
 FAIL  ./seneca.test.js
  ● isValid returns true for simple myseneca address

    expect(received).toBe(expected)

    Expected value to be (using ===):
      true
    Received:
      undefined

    Difference:

      Comparing two different types of values. Expected boolean but received undefined.

      at Object.<anonymous> (seneca.test.js:6:44)
      at process._tickCallback (node.js:369:9)

  ✕ isValid returns true for simple myseneca address (8ms)

Test Suites: 1 failed, 1 total
Tests:       1 failed, 1 total
Snapshots:   0 total
Time:        1.034s
Ran all test suites.
```

As you would expect, our test failed.  We expected to be able to pass in a simple address
and get back `true`.  Instead, we passed in the address and got back `undefined`, which is
what happens when a function returns no value.

Let's fix our code:

```js
/**
 * Given a string `email`, return `true` if the string is in the form
 * of a valid Seneca College email address, `false` othewise.
 */
exports.isValidEmail = function isValidEmail(email) {
  return email.match(/@myseneca.ca$/);
};
```

And re-run our unit test:

```bash
$ node_modules/.bin/jest
 FAIL  ./seneca.test.js
  ● isValid returns true for simple myseneca address

    expect(received).toBe(expected)

    Expected value to be (using ===):
      true
    Received:
      ["@myseneca.ca"]

    Difference:

      Comparing two different types of values. Expected boolean but received array.

      at Object.<anonymous> (seneca.test.js:6:44)
      at process._tickCallback (node.js:369:9)

  ✕ isValid returns true for simple myseneca address (8ms)

Test Suites: 1 failed, 1 total
Tests:       1 failed, 1 total
Snapshots:   0 total
Time:        1.003s
Ran all test suites.
```

We're still failing this test.  This time, instead of getting `undefined`
we got an array with one string element: `@myseneca.ca`.  This is happening becuase we're
returning all the matches it found for our regex.

Let's fix this so we return the proper thing, using the [`RegExp.prototype.test`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/RegExp/test) method:

```js
/**
 * Given a string `email`, return `true` if the string is in the form
 * of a valid Seneca College email address, `false` othewise.
 */
exports.isValidEmail = function isValidEmail(email) {
  return /@myseneca.ca$/.test(email);
};
```

And rerunning our tests, we see the following:

```bash
$ node_modules/.bin/jest
 PASS  ./seneca.test.js
  ✓ isValid returns true for simple myseneca address (3ms)

Test Suites: 1 passed, 1 total
Tests:       1 passed, 1 total
Snapshots:   0 total
Time:        1.018s
Ran all test suites.
```

Success!

## Automate our Tests

Just as we did with our linting check, it would be nice to have a simple way to run
our tests from the command-line, and in Travis CI.  To do this we need to modify our
`package.json` file:

```json
"scripts": {
    "lint": "node_modules/.bin/eslint seneca.js",
    "jest": "node_modules/.bin/jest",
    "test": "npm run -s lint && npm run jest"
},
```

Here I've done 3 things:

* modified my `lint` script to only lint my `seneca.js` file vs. `*.js`.  You can
(and probably should) also lint your test files, but I'm not going to for this lab.
* added a `jest` script that runs my `jest` binary from `node_modules`.
* modified my `test` script to run *both* the `lint` and `jest` scripts.  This means
that running my tests will accomplish both in one step.

I can run any of my scripts via `npm run [script-name]`, for example: `npm run jest`.

TravisCI is automatically going to run my `test` script when I commit code (or do a PR),
so this should automatically mean my tests will run on every commit, whether I remember to
do them locally or not.

Try running your tests locally, then commit and push to see them run in TravisCI.  Here is
[my build running on TravisCI for the changes described above](https://travis-ci.org/humphd/Seneca2017LearningLab/builds/214296336).

## Organizing Test Suites

Our `seneca` module currently has two public functions: `isValidEmail()` and `formatSenecaEmail()`.
We are going to want to write a bunch of tests for each, and it might be nice to organize them
into two groups.

Let's create two test suites, one for each function, and add a few more tests:

```js
// First require (e.g., load) our seneca.js module
var seneca = require('./seneca');

/**
 * Tests for seneca.isValidEmail()
 */
describe('seneca.isValidEmail()', function() {

  test('returns true for simple myseneca address', function() {
    var simpleEmail = 'someone@myseneca.ca';
    expect(seneca.isValidEmail(simpleEmail)).toBe(true);
  });

  test('returns false for a non-myseneca address', function() {
    var gmailAddress = 'someone@gmail.com';
    expect(seneca.isValidEmail(gmailAddress)).toBe(false);
  });

});

/**
 * Tests for seneca.formatSenecaEmail()
 */
describe('seneca.formatSenecaEmail()', function() {

  test('adds @myseneca.ca to the end of name', function() {
    var name = "mshaw";
    expect(seneca.formatSenecaEmail(name)).toBe('mshaw@myseneca.ca');
  });

});
```

Here we've used [`describe()`](https://facebook.github.io/jest/docs/api.html#describename-fn) to
group common tests into test suites.  It makes the output of our test run a bit easier to follow,
and helps us see how each group is doing:

```bash
$ npm test

> lab7@1.0.0 test /Users/dave/Sites/repos/Seneca2017LearningLab
> npm run -s lint && npm run jest


> lab7@1.0.0 jest /Users/dave/Sites/repos/Seneca2017LearningLab
> jest

 PASS  ./seneca.test.js
  seneca.isValidEmail()
    ✓ returns true for simple myseneca address (3ms)
    ✓ returns false for a non-myseneca address (1ms)
  seneca.formatSenecaEmail()
    ✓ adds @myseneca.ca to the end of name (1ms)

Test Suites: 1 passed, 1 total
Tests:       3 passed, 3 total
Snapshots:   0 total
Time:        1.001s
Ran all test suites.
```

## Write More Tests

To finish this lab, I want you to spend some time thinking of all the ways someone
might use and misuse your `seneca` module and its functions.  Imagine you are giving this
code to someone who is going to use it in a real application.  What might they need?
What might they do?  What problems might they hit?

For every situtation you can imagine, you should add a test.  Each test should be small
and focus on a single thing.  If you think of something that has multiple parts, add more
than one test.  Whenever you add tests, try to also fix your code so they pass. See if you
can fix your code for the new cases you come up with such that you don't break your existing
tests!  It can be a challenge.

Here are some cases to consider, which will need tests and fixes in your code:

### `isValidEmail()`

* user passes something other than a `String` to your function (e.g., `Number`, `Boolean`, ...)
* user passes a variable which is actually `null` (they thought it was a `String`, but it's not)
* email address contains leading whitespace, for example `'    mshaw@myseneca.ca'`
* email address is for a professor vs. student `'david.humphrey@senecacollege.ca'` (this is valid)
* email address uses old style Seneca address, `'david.humphrey@senecac.on.ca'` (this is also valid)

### `formatSenecaEmail()`

* name contains spaces, tabs, or other control characters
* name is `null`

There are so many ways that people might use your code, and so many situations where there might
be bugs in their program that end up passing your code garbage data.  See if you can bullet-proof
your code so you know it works well in all cases.

Use the [docs for `expect`](https://facebook.github.io/jest/docs/expect.html) and the rest
of the [Jest API](https://facebook.github.io/jest/docs/api.html) to help you write good tests
and understand how to do various things.


# Seneca 2017 Learning Lab

## Introduction

In this lab series we will explore a number of open source and GitHub tooling,
automation, and worflow options.  You will learn about how to build node.js modules,
how to use tools like linters, code formatters, how to use unit tests, how to do automated
checks on your commits and pull requests, etc.

We will expand on this repo in the coming weeks, so it's important for you to finish
each week's tasks before the next lab.  If you get stuck, feel free to help one another.
This is not a test, but a learning exercise.

## Create a Repo

This repo will form the basis of our exploration of various open source tooling.
Begin by creating a repo of your own similar to this one. Use https://github.com/new
to create your new repo.  Make sure you include the following:

* Initialize with a `README.me` file
* Add a `.gitignore` for `Node` (e.g., node.js)
* Add a `License` using the [MIT License](https://opensource.org/licenses/MIT)

It will look something like this:

![Create New GitHub Repo](screenshots/create-repo.png)

## Clone your repo

After you've created it on GitHub, you need to clone it locally:

```bash
$ git clone git@github.com:<github-username>/<repo-name>.git
```

## Initialize a new Node.js Module

You should already have [node.js](https://nodejs.org/) installed.  If you don't,
do it now.

Next use [npm](https://docs.npmjs.com/) (NOTE: `npm` gets installed along with node.js)
to initialize your `package.json` file:

```bash
$ npm init

This utility will walk you through creating a package.json file.
It only covers the most common items, and tries to guess sensible defaults.

See `npm help json` for definitive documentation on these fields
and exactly what they do.

Use `npm install <pkg> --save` afterwards to install a package and
save it as a dependency in the package.json file.

Press ^C at any time to quit.
name: (Seneca2017LearningLab) lab7
version: (1.0.0) 1.0.0
description: Learning Lab
entry point: (index.js) seneca.js
test command:
git repository: (https://github.com/humphd/Seneca2017LearningLab.git)
keywords:
author:
license: (ISC) MIT
About to write to /Users/dave/Sites/repos/Seneca2017LearningLab/package.json:

{
  "name": "lab7",
  "version": "1.0.0",
  "description": "Learning Lab",
  "main": "seneca.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/humphd/Seneca2017LearningLab.git"
  },
  "author": "",
  "license": "MIT",
  "bugs": {
    "url": "https://github.com/humphd/Seneca2017LearningLab/issues"
  },
  "homepage": "https://github.com/humphd/Seneca2017LearningLab#readme"
}


Is this ok? (yes)
```

Confirm that your `package.json` is correct, and edit it if not:

```bash
$ cat package.json
{
  "name": "lab7",
  "version": "1.0.0",
  "description": "Learning Lab",
  "main": "seneca.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "repository": {
    "type": "git",
    "url": "git+https://github.com/humphd/Seneca2017LearningLab.git"
  },
  "author": "",
  "license": "MIT",
  "bugs": {
    "url": "https://github.com/humphd/Seneca2017LearningLab/issues"
  },
  "homepage": "https://github.com/humphd/Seneca2017LearningLab#readme"
}
```

## Create your Node.js Module in seneca.js

You need a file to contain your `seneca` module.  Create a file named `seneca.js`,
which should have the following code:

```js
// [INFO] See discussion of node.js exports here:
// https://www.sitepoint.com/understanding-module-exports-exports-node-js/

/**
 * Given a string `email`, return `true` if the string is in the form
 * of a valid Seneca College email address, `false` othewise.
 */
exports.isValidEmail = function(email) {
    // TODO: needs to be implemented
};

/**
 * Given a string `name`, return a formatted Seneca email address for
 * this person. NOTE: the email doesn't need to be real/valid/active.
 */
exports.formatSenecaEmail = function(name) {
    // TODO: needs to be implemented
};
```

Write an implementation of `isValidEmail` and `formatSenecaEmail`.  You are
only expected to validate and work with strings, you don't need to deal with
sending or validating email addresses in general.

## [Optional] Extra Challenge: Command Line Tool that uses seneca.js

If you want an extra challenge, it would be nice if there was an easy way to test
your code from the command line.

You can easily write cross-platform command line tools in node.js.  See if you can
write a simple command line tool that works like so:

```bash
$ seneca --help

 Usage: seneca [options]

  Options:

  -h, --help             output usage information
  -v, --verify <email>   verifys the email address given as a Seneca email
  -f, --format <name>    formats the name given as a Seneca email

$ seneca -v student@myseneca.ca
valid
$ seneca -v student@gmail.com
invalid
$ seneca -f student
student@myseneca.ca
```

A great tutorial on how to achieve something like this can be found at https://developer.atlassian.com/blog/2015/11/scripting-with-node/.

## Add ESLint to avoid common patterns and bugs

Linting your code is a great way to avoid various common problems.  We'll use
[ESLint](http://eslint.org/docs/user-guide/getting-started) to find common issues
and then manually correct them.

Begin by installing it via `npm`.  We'll use `--save-dev` to add a development dependency
(i.e., a dependency only needed when developing this code vs. using it).  We'll also create
a default `eslint` configuration (i.e., rules to check for in our code):

```bash
$ npm install eslint --save-dev
```

The `eslint` module is similar to what we're building.  It will automatically get installed
to a directory named `node_modules`.  A `node_modules/.bin` hidden directory is also created
with a so-called "binary" or executable version of eslint that can be run at the command-line:

```bash
$ ls -a node_modules
.      ..     .bin   eslint
```

We need to create a configuration for `eslint`.  Let's try using a "popular style guide",
the [Airbnb JavaScript rules](https://github.com/airbnb/javascript).  Run `eslint --init`
and then cursor down to `Use a popular style guide`:

```bash
$ ./node_modules/.bin/eslint --init
? How would you like to configure ESLint?
  Answer questions about your style
❯ Use a popular style guide
  Inspect your JavaScript file(s)
```

Cursor down to select `Airbnb`:

```bash
? Which style guide do you want to follow?
  Google
❯ Airbnb
  Standard
```

When asked about React, answer No:

```bash
? Do you use React? (y/N) N
```

Select JSON format for your eslint config file:

```bash
? What format do you want your config file to be in?
  JavaScript
  YAML
❯ JSON
```

Various `npm` modules will now be installed:

```bash
Installing eslint-plugin-import, eslint-config-airbnb-base
eslint-config-airbnb-base@11.1.1 node_modules/eslint-config-airbnb-base

eslint-plugin-import@2.2.0 node_modules/eslint-plugin-import
├── contains-path@0.1.0
├── lodash.cond@4.5.2
├── builtin-modules@1.1.1
├── doctrine@1.5.0 (isarray@1.0.0, esutils@2.0.2)
├── has@1.0.1 (function-bind@1.1.0)
├── debug@2.6.3 (ms@0.7.2)
├── minimatch@3.0.3 (brace-expansion@1.1.6)
├── pkg-up@1.0.0 (find-up@1.1.2)
├── eslint-module-utils@2.0.0 (debug@2.2.0, pkg-dir@1.0.0)
└── eslint-import-resolver-node@0.2.3 (object-assign@4.1.1, resolve@1.3.2)
Successfully created .eslintrc.json file in /Users/dave/Sites/repos/Seneca2017LearningLab
```

You now have a new file `.eslintrc.json` which has the rules you want `eslint` to follow:

```json
{
    "extends": "airbnb-base",
    "plugins": [
        "import"
    ]
}
```

Your `package.json` will also have new `devDependencies` entries:

```json
"devDependencies": {
  "eslint": "^3.17.1",
  "eslint-config-airbnb-base": "^11.1.1",
  "eslint-plugin-import": "^2.2.0"
}
```

Try running `eslint` on your code manually:

```bash
$ ./node_modules/.bin/eslint seneca.js

/Users/dave/Sites/repos/Seneca2017LearningLab/seneca.js
   5:24  warning  Unexpected unnamed function                func-names
   5:32  error    Missing space before function parentheses  space-before-function-paren
   5:33  error    'email' is defined but never used          no-unused-vars
  13:29  warning  Unexpected unnamed function                func-names
  13:37  error    Missing space before function parentheses  space-before-function-paren
  13:38  error    'name' is defined but never used           no-unused-vars

✖ 6 problems (4 errors, 2 warnings)
```

You can read about the various rules and warnings in the `eslint docs`, for example:
http://eslint.org/docs/rules/space-before-function-paren or http://eslint.org/docs/rules/no-unused-vars

Feel free to experiment with different `.eslintrc.json` options, or try other style guides.
There's nothing sacred about Airbnb's, and you can even write your own to match your own style.

## Automate our Lint Checking

Since we'll want to check our code every time we make changes, it's nice to automate the
call to `eslint` and make a script that we can run.  We can add scripts to our `package.json`
file, which are then runnable via `npm`.

Modify the `scripts` section of your `package.json` to add a `lint` task, and update the
`test` task to run this task, passing `-s` for silent mode (keep `npm` from spitting out
debug info):

```json
"scripts": {
  "lint": "node_modules/.bin/eslint *.js",
  "test": "npm run -s lint"
}
```

## Use TravisCI for Continuous Integration

Now that we have the basics of our code infrastructure set up, we can use
a continuous integration service named [Travis CI](https://travis-ci.org/) to help us run these
checks every time we do a new commit or someone creates a pull request.  Travis CI is
free to use for open source projects.  It will automatically clone our repo, checkout our branch
and run any tests we specify.

Follow the [Getting started](https://docs.travis-ci.com/user/getting-started/) guide and the
[Building a Node.js project](https://docs.travis-ci.com/user/languages/javascript-with-nodejs/) docs
to do the following:

* [Sign in to Travis CI](https://docs.travis-ci.com/user/getting-started/) with your GitHub account
* Enable Travis CI integration with your GitHub account for this repo in your [profile page](https://travis-ci.org/profile)
* Create a `.travis.yml` file for a [`node` project](https://docs.travis-ci.com/user/languages/javascript-with-nodejs/).  It will automatically run your `npm test` command.  You can specify `"node"` as your node.js version to use the latest stable version of node.  You can look at how I did my [`.travis.yml`](.travis.yml) file as an example.
* Push a new commit to your repo's `master` branch to start a build on Travis. You can check
your builds at https://travis-ci/profile/<git-username>/<repo-name>.  For example, here is my repo's
Travis build page: https://travis-ci.org/humphd/Seneca2017LearningLab

Get your build to pass by fixing any errors or warnings that you have.

## Add a Travis CI Build Badge to your README

You can have Travis CI automatically indicate whether your current code is passing or failing
by adding a badge to your `README.md` file.  Instructions on how to do it are here:

https://docs.travis-ci.com/user/status-images/

Here is the badge for my repo's Travis Build:

[![Build Status](https://travis-ci.org/humphd/Seneca2017LearningLab.svg?branch=master)](https://travis-ci.org/humphd/Seneca2017LearningLab)

My build is failing because I have not fixed the eslint errors and warnings for my code.

## [Optional] Other Things to Try

* Switch to a more complete [build system or task runner (gulp, grunt, etc.](https://www.slant.co/topics/1276/~node-js-build-systems-task-runners))
* Integrate `eslint` into your editor so that it automatically reads your `.eslintrc.json`
and suggests warnings and errors as you type your code
* See if there are any existing `npm` modules that could help you write your code above,
for example, email address modules, and use them.

