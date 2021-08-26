# Saleor Storefront

![1 copy 2x](https://user-images.githubusercontent.com/5421321/47798207-30aeea00-dd28-11e8-9398-3d8426836a83.png)

_**Note:** This project is beta quality. We don't advise using it in production._

A GraphQL-powered, PWA, single-page application storefront for [Saleor](https://github.com/mirumee/saleor/).

## Features

- Headless ecommerce storefront built with [GraphQL](https://graphql.org/), [Apollo Client](https://www.apollographql.com/client), [React](https://reactjs.org/) and [Typescript](https://www.typescriptlang.org/)
- Offline mode (beta)
- Saleor GraphQL API integration
- Single-page application experience

## Demo

See the [public demo](http://pwa.saleor.io) of Saleor Storefront!

Or launch the demo on a free Heroku instance.

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy)

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js 10.0+
- A running instance of Saleor.

  To run the storefront, you have to set the `API_URI` environment variable to point to the Saleor GraphQL API. If you are running Saleor locally with the default settings, set `API_URI` to: `http://localhost:8000/graphql/`.

### Installing

Clone the repository:

```
git clone https://github.com/farmacia-retail/saleor-storefront.git
```

Enter the project directory:

```
cd saleor-storefront
```

#### Using stable release

To use the official stable release, checkout to a release tag:

```
$ git checkout 2.10.4
```

See the list of all releases here: https://github.com/farmacia-retail/saleor-storefront/releases/

#### Using development version

If you want to use the latest development version, checkout to the `master` branch:

```
$ git checkout master
```

Install NPM dependencies:

```
npm i
```

Run the development server:

```
npm start
```

Go to `http://localhost:3000` to access the storefront .

## Given a version number MAJOR.MINOR.PATCH, increment the:

    MAJOR version when you make new versions of platform. BREAKING CHANGE
    MINOR version when you add functionality like to a new sprint. feat
    PATCH version when you make bug fixes. fix

## How to tagging release versions

- This feature will use semantic version of git triggered when push in branch release (therefore also it will in approve pull request), and deploy a tag release.

![button-merge](https://user-images.githubusercontent.com/75376686/106189625-8b895300-6176-11eb-9962-58faf17ebfe4.png)

- Add to pull request name #major, #minor, #patch

![confirm-merge](https://user-images.githubusercontent.com/75376686/106189975-f9357f00-6176-11eb-9d06-682a922990f0.png)

- version structure should be: vX.Y.Z --> v{major}.{minor}.{patch}
  - `[BREAKING CHANGE] new version #major` for change X
  - `[feat] adding feature #minor` for change Y
  - `[fix] fix bug #patch` for change Z
- Then github actions will be deployed a new tag release with the version set above (automatic and autoincrement).
- This feature has been added in saleor-dashboard, saleor-storefront and saleor-platform.
