# Sample Application With Angular Router using Asgardeo Auth Angular SDK

This sample application is developed to demonstrate the usage of Asgardeo Auth Angular SDK with [Angular Router](https://angular.io/api/router).

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.2.0.

## Table of Contents

- [Getting Started](#getting-started)
  - [Register an Application](#register-an-application)
  - [Download the Sample](#download-the-sample)
  - [Configure the Sample](#configure-the-sample)
  - [Run the Application](#run-the-application)
- [Available Scripts](#available-scripts)
  - [Development server](#development-server)
  - [Build](#build)
  - [Lint](#lint)
  - [Further help](#further-help)
- [Contribute](#contribute)
  - [Reporting Issues](#reporting-issues)
- [License](#license)

## Getting Started

### Register an Application

Follow the instructions in the [Try Out the Sample Apps](../../README.md#try-out-the-sample-apps) section to register an application.

Make sure to add `https://localhost:5000` and `https://localhost:5000/signin/redirect` as a Redirect URLs.

Add `https://localhost:5000` under allowed origins. 

### Download the Sample

Download the sample from [here](https://github.com/asgardeo/asgardeo-auth-angular-sdk/releases/latest/download/asgardeo-angular-app-with-router.zip) and extract the zip file.

### Configure the Sample

Update configuration file `src/config.json` with your registered app details.

**Note:** You will only have to paste in the `client ID` generated for the application you registered.

Read more about the SDK configurations [here](../../README.md#configuration).

```json
{
    "clientID": "<ADD_CLIENT_ID_HERE>",
    "serverOrigin": "https://localhost:9443",
    "signInRedirectURL": "https://localhost:5000/signin/redirect",
    "signOutRedirectURL": "https://localhost:5000"
}
```

### Run the Application

```bash
npm install && npm start
```
The app should open at [`http://localhost:5000`](http://localhost:5000)

## Available Scripts

Install [Angular CLI](https://github.com/angular/angular-cli) globally to use default angular scripts.

```bash
npm install -g @angular/cli
```

### Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:5000/`. The app will automatically reload if you change any of the source files.

### Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

### Lint

Run `ng lint` to lint the project. This app will use [Angular EsLint](https://github.com/angular-eslint/angular-eslint) for this purpose.

### Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## Contribute

Please read [Contributing to the Code Base](http://wso2.github.io/) for details on our code of conduct, and the process for submitting pull requests to us.

### Reporting Issues

We encourage you to report issues, improvements, and feature requests creating [Github Issues](https://github.com/asgardeo/asgardeo-auth-angular-sdk/issues).

Important: And please be advised that security issues must be reported to security@wso2com, not as GitHub issues, in order to reach the proper audience. We strongly advise following the WSO2 Security Vulnerability Reporting Guidelines when reporting the security issues.

## License

This project is licensed under the Apache License 2.0. See the [LICENSE](../../LICENSE) file for details.
