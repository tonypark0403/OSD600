# OSD600
Open source subject at Seneca

My Blog : https://tonypark0403.wordpress.com

# Seneca 2017 Learning Lab

This is Lab 7, working with Travis CI

Here is the badge for my repo's Travis Build:

[![Build Status](https://travis-ci.org/tonypark0403/OSD600.svg?branch=master)](https://travis-ci.org/tonypark0403/OSD600)


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
