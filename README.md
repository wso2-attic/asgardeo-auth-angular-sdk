# Asgardeo Auth Angular SDK & Samples 

Repository containing the source of Asgardeo Auth Angular SDK & Samples.

![Builder](https://github.com/asgardeo/asgardeo-auth-angular-sdk/workflows/Builder/badge.svg)
[![Stackoverflow](https://img.shields.io/badge/Ask%20for%20help%20on-Stackoverflow-orange)](https://stackoverflow.com/questions/tagged/wso2is)
[![Join the chat at https://join.slack.com/t/wso2is/shared_invite/enQtNzk0MTI1OTg5NjM1LTllODZiMTYzMmY0YzljYjdhZGExZWVkZDUxOWVjZDJkZGIzNTE1NDllYWFhM2MyOGFjMDlkYzJjODJhOWQ4YjE](https://img.shields.io/badge/Join%20us%20on-Slack-%23e01563.svg)](https://join.slack.com/t/wso2is/shared_invite/enQtNzk0MTI1OTg5NjM1LTllODZiMTYzMmY0YzljYjdhZGExZWVkZDUxOWVjZDJkZGIzNTE1NDllYWFhM2MyOGFjMDlkYzJjODJhOWQ4YjE)
[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://github.com/wso2/product-is/blob/master/LICENSE)
[![Twitter](https://img.shields.io/twitter/follow/wso2.svg?style=social&label=Follow)](https://twitter.com/intent/follow?screen_name=wso2) 

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.2.0.

## Table of Contents

- [Introduction](#introduction)
- [Package Information](#package-information)
- [Try Out the Sample Apps](#try-out-the-sample-apps)
- [Getting Started](#getting-started)
- [APIs](#apis)
- [Develop](#develop)
  - [Prerequisites](#prerequisites)
  - [Installing Dependencies](#installing-dependencies)
  - [Helpful Links](#helpful-links)
- [Contribute](#contribute)
  - [Reporting Issues](#reporting-issues)
- [License](#license)

## Introduction

Asgardeo's Auth SDK for Angular allows Angular Applications to use OIDC or OAuth2 authentication in a simple and secure way. This SDK is built on top of [@asgardio/oidc-js](https://github.com/asgardeo/asgardeo-auth-js-sdk).

Integration with [@angular/router](https://angular.io/api/router) of this SDK will help the developers to add identity management to their Angular Applications in a jiffy.

## Package Information

| Package                  | Version                                                                                                                             |
| ------------------------ | ----------------------------------------------------------------------------------------------------------------------------------- |
| `@asgardeo/auth-angular` | [![npm](https://img.shields.io/npm/v/@asgardeo/auth-angular.svg?maxAge=3600)](https://www.npmjs.com/package/@asgardeo/auth-angular) |

## Try Out the Sample Apps

### 1. Create an Application in Your Identity Provider

Before trying out the sample apps, you need to a create an application in your preferred identity provider. 

There are two methods to add an application to **WSO2 Identity Server**.

#### a. WSO2 Identity Server - Console App

1. Navigate to [`https://localhost:9443/console`](https://localhost:9443/console) and click on **Applications** under **Develop** tab
   
2. Click on **New Application** and then **Single Page Application**.
   
3. Enter **Sample** as the name of the app and the add Callback URL(s). You can find the relevant callback URL(s) of each sample app in the [Running the sample apps](#2-running-the-sample-apps) section.
   
4. Click on Register. You will be navigated to management page of the **sample** application.
   
5. Add `https://localhost:5000/` to **Allowed Origins** under **Access** tab and check **Public client** option.
   
6. Click on **Update** at the bottom.
   
7. Copy the **Client ID**.

#### b. WSO2 Identity Server - Carbon Console

1. Navigate to [`https://localhost:9443/carbon`](https://localhost:9443/carbon) and click on **Add** under **Service Providers** in the left-hand menu panel.

2. Enter **Sample** as the name of the app and click on **Register**.

3. Then, expand the **Inbound Authentication Configuration** section. Under that, expand **OAuth/OpenID Connect Configuration** section and click on **Configure**.

4. Under **Allowed Grant Types** uncheck everything except **Code** and **Refresh Token**.

5. Enter the Callback URL(s). You can find the relevant callback URL(s) of each sample app in the [Running the sample apps](#2-running-the-sample-apps) section.

6. Check **Allow authentication without the client secret**.

7. Click **Add** at the bottom.

8. Copy the **OAuth Client Key**.

9. Enable CORS for the client application by following this [guide](https://is.docs.wso2.com/en/5.11.0/learn/cors/).

### 2. Running the sample apps

1. Download the sample from the given link.

2. Update configuration file `src/config.json` with your registered app details.

Note: You will only have to paste in the `clientID`(**OAuth Client Key**) generated for the application you registered.

Read more about the SDK configurations [here](#configuration) .

```json
{
    "clientID": "",
    "serverOrigin": "https://localhost:9443",
    "signInRedirectURL": "https://localhost:5000"
}
```

3. Build and deploy the apps by running the following command at the root directory.

```bash
npm install && npm start
```

4. Navigate to `https://localhost:5000`.

#### a. Basic Angular Sample

- Download the Sample: [samples/angular-app](/samples/angular-app)

- Find More Info: [README](/samples/angular-app/README.md)

- **Callback URL(s):**
  - `https://localhost:5000`

#### b. Angular Sample With Router

- Download the Sample: [samples/angular-app-with-router](/samples/angular-app-with-router)

- Find More Info: [README](/samples/angular-app-with-router/README.md)

- **Callback URL(s):**
  - `https://localhost:5000`
  - `https://localhost:5000/signin/redirect`

## Getting Started

### 1. Installing the Package

Install the Angular library from the npm registry.
```bash
npm install --save @asgardeo/auth-angular
```

### 2. Import `AsgardeoAuthModule` and Provide Configuration Parameters

Add the `AsgardeoAuthModule` to the imports array of your root app module. Pass the config object to the `forRoot` function. See all the available configurations list [here](#configuration).

```typescript
// app.module.ts

import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";

// Import Auth Module
import { AsgardeoAuthModule } from "@asgardeo/auth-angular";

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,

        AsgardeoAuthModule.forRoot({
            signInRedirectURL: "https://localhost:5000",
            clientID: "clientID",
            serverOrigin: "https://localhost:9443"
        })
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
```

### 3. Use `AsgardeoAuthService` for Authentication Functions

Developers can directly import `AsgardeoAuthService` to take advantage of wide array of authentication functions. Find out more [here](#asgardeoauthservice).

```typescript
// app.component.ts

import { Component } from "@angular/core";
import { AsgardeoAuthService } from "@asgardeo/auth-angular";

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.css"]
})
export class AppComponent {
    isAuthenticated: boolean;

    constructor(private auth: AsgardeoAuthService) {
        this.isAuthenticated = this.auth.isAuthenticated();
    }

    handleSignIn(): void {
        this.auth.signInWithRedirect();
    }
```

## APIs

- [`AsgardeoAuthModule`](#asgardeoauthmodule)
  - [Configuration](#configuration)
- [`AsgardeoAuthService`](#asgardeoauthservice)
  - [signIn](#signin)
  - [signInWithRedirect](#signinwithredirect)
  - [signOut](#signout)
  - [getAccessToken](#getaccesstoken)
  - [getDecodedIDToken](#getdecodedidtoken)
  - [getServiceEndpoints](#getserviceendpoints)
  - [getUserInfo](#getuserinfo)
  - [refreshToken](#refreshtoken)
- [`AsgardeoAuthGuard`](#asgardeoauthguard)

### `AsgardeoAuthModule`

This is the top-level Angular module for the SDK. This module provides following components and services.

- [`AsgardeoAuthService`](#asgardeoauthservice) - Service containing wide range of authentication functions.
- [`AsgardeoAuthGuard`](#asgardeoauthguard) A route guard to grant access to a page only after successful authentication.
- [`AsgardeoSignInRedirectComponent`](#signinwithredirect) - Handles the authentication flow and redirects the user back.

#### Configuration

Pass configuration parameters for authentication into `AsgardeoAuthModule` using `forRoot` method.

<!-- Following parameters are **required**.

- `signInRedirectURL` - URL to redirect to after the user authorizes the client app. (Refer [here](#signinwithredirect))
- `clientID`: The client ID of the OIDC application hosted in the Asgardeo.
- `serverOrigin`: The origin of the Identity Provider. eg: https://www.asgardeo.io -->

This SDK currently supports following configuration parameters defined in [@asgardeo/oidc-js](https://github.com/asgardeo/asgardeo-auth-js-sdk) 

| Attribute                       | Type                                 | Default Value                                               | Description                                                                                 |
| :------------------------------ | :----------------------------------- | :---------------------------------------------------------- | :------------------------------------------------------------------------------------------ |
| `signInRedirectURL`             | `string`                             | ""                                                          | The URL to redirect to after the user authorizes the client app.                            |
| `clientID`                      | `string`                             | ""                                                          | The client ID of the OIDC application hosted in the Asgardeo.                               |
| `serverOrigin`                  | `string`                             | ""                                                          | The origin of the Identity Provider.                                                        |
| `signOutRedirectURL` (optional) | `string`                             | `signInRedirectURL`                                         | The URL to redirect to after the user signs out.                                            |
| `clientHost` (optional)         | `string`                             | The origin of the client app obtained using `window.origin` | The hostname of the client app.                                                             |
| `clientSecret` (optional)       | `string`                             | ""                                                          | The client secret of the OIDC application                                                   |
| `enablePKCE` (optional)         | `boolean`                            | `true`                                                      | Specifies if a PKCE should be sent with the request for the authorization code.             |
| `prompt` (optional)             | `string`                             | ""                                                          | Specifies the prompt type of an OIDC request                                                |
| `scope` (optional)              | `string[]`                           | `["openid"]`                                                | Specifies the requested scopes                                                              |
| `storage` (optional)            | `"sessionStorage"`, `"localStorage"` | `"sessionStorage"`                                          | The storage medium where the session information such as the access token should be stored. |
| `validateIDToken`(optional)     | `boolean`                            | `true`                                                      | Allows you to enable/disable JWT ID token validation after obtaining the ID token.          |
| `clockTolerance`(optional)      | `number`                             | `60`                                                        | Allows you to configure the leeway when validating the id_token.                            |

### `AsgardeoAuthService`

In the components, `AsgardeoAuthService` can be used to take advantage of all of supported authentication features provided. This service inherits from the `IdentityClient` of the [@asgardeo/oidc-js](https://github.com/asgardeo/asgardeo-auth-js-sdk).

#### signIn

```typescript
signIn(): Promise;
```

This method initiates the authentication flow. Developer can use this method to custom implement their own redirect flow. 

#### signInWithRedirect

```typescript
signInWithRedirect(): Promise;
```

This method redirects the user to the route where the authentication flow was initiated. To use this function following steps needs to be fulfilled.

- `app-routing.module.ts`

Register `AsgardeoSignInRedirectComponent` for an unique route.

```typescript
// app-routing.module.ts

import { AsgardeoSignInRedirectComponent } from "@asgardeo/auth-angular";

const routes: Routes = [
    { path: "signin/redirect", component: AsgardeoSignInRedirectComponent },
    ...
];
``` 

- `signInRedirectURL` 

Change Sign In Redirect URL as follows.

```typescript
// app.module.ts

AsgardeoAuthModule.forRoot({
    signInRedirectURL: window.location.origin + "/signin/redirect",
    ...
})
```    

#### signOut

```typescript
signOut(): Promise;
```
This method ends the user session at the identity provider and logs the user out.

#### getAccessToken

```typescript
getAccessToken(): Promise;
```

This returns a promise that resolves with the access token. 

```typescript
this.auth.getAccessToken().then((token) => {
    // console.log(token);
}).error((error) => {
    // console.error(error);
});
```

#### getDecodedIDToken

```typescript
getDecodedIDToken(): Promise;
```

This method returns a promise that resolves with the decoded payload of the JWT ID token.

```typescript
this.auth.getDecodedIDToken().then((idToken) => {
    // console.log(idToken);
}).error((error) => {
    // console.error(error);
});
```

#### getServiceEndpoints

```typescript
getServiceEndpoints(): Promise;
```

This method returns a promise that resolves with an object containing the OIDC endpoints obtained from the `.well-known` endpoint. The object contains the following attributes.

| Attribute             | Description                                                                        |
| --------------------- | ---------------------------------------------------------------------------------- |
| `"authorize"`         | The endpoint to which the authorization request should be sent.                    |
| `"jwks"`              | The endpoint from which JSON Web Key Set can be obtained.                          |
| `"oidcSessionIFrame"` | The URL of the page that should be loaded in an IFrame to get session information. |
| `"revoke"`            | The endpoint to which the revoke-token request should be sent.                     |
| `"token"`             | The endpoint to which the token request should be sent.                            |
| `"wellKnown"`         | The well-known endpoint from which OpenID endpoints of the server can be obtained. |

```typescript
this.auth.getServiceEndpoints().then((endpoints) => {
    // console.log(endpoints);
}).error((error) => {
    // console.error(error);
});
```

#### getUserInfo

```typescript
getUserInfo(): Promise;
```
This method returns a promise that resolves with the information about the authenticated user as an object. The object has the following attributes.

| Attribute       | Type     | Description                                             |
| :-------------- | :------- | :------------------------------------------------------ |
| `email`         | `string` | The email address of the user                           |
| `username`      | `string` | The username of the user                                |
| `displayName`   | `string` | The display name of the user                            |
| `allowedScopes` | `string` | The scopes the user has authorized the client to access |

```typescript
this.auth.getUserInfo().then((response) => {
    // console.log(response);
}).catch((error) => {
    // console.error(error);
});
```

#### refreshToken

```typescript
refreshToken();
```
This refreshes the access token and stores the refreshed session information in either the session or local storage as per your configuration.

This method also returns a Promise that resolves with an object containing the attributes mentioned in the table below.
| Attribute        | Description                         |
| ---------------- | ----------------------------------- |
| `"accessToken"`  | The new access token                |
| `"expiresIn"`    | The expiry time in seconds          |
| `"idToken"`      | The ID token                        |
| `"refreshToken"` | The refresh token                   |
| `"scope"`        | The scope of teh access token       |
| `"tokenType"`    | The type of the token. E.g.: Bearer |

### `AsgardeoAuthGuard`

`AsgardeoAuthGuard` can be used to protect routes from unauthorized access. 

To ensure the user has been properly authenticated before accessing, add the `canActivate` guard to any route as follows.

```typescript
// app-routing.module.ts

import { AsgardeoAuthGuard } from "@asgardeo/auth-angular";
import { ProfileComponent } from "./profile/profile.component";

const routes: Routes = [
    ...,
    {
        path: "profile",
        component: ProfileComponent,
        canActivate: [AsgardeoAuthGuard]
    },
    ...
];
```

## Develop

### Prerequisites

- `Node.js` (version 10 or above).
- `npm` package manager.

### Installing Dependencies

You can install the dependencies by running the following command at the root.

```bash
npm run build
```
### Helpful Links

- Getting started with Angular

    - [Angular Quick Start Guide](https://angular.io/start)
    - [Angular In-app navigation](https://angular.io/guide/router)

- WSO2 Identity Server [Docs](https://is.docs.wso2.com/en/latest/)

## Contribute

Please read [Contributing to the Code Base](http://wso2.github.io/) for details on our code of conduct, and the process for submitting pull requests to us.

### Reporting Issues

We encourage you to report issues, improvements, and feature requests creating [Github Issues](https://github.com/asgardeo/asgardeo-auth-angular-sdk/issues).

Important: And please be advised that security issues must be reported to security@wso2com, not as GitHub issues, in order to reach the proper audience. We strongly advise following the WSO2 Security Vulnerability Reporting Guidelines when reporting the security issues.

## License

This project is licensed under the Apache License 2.0. See the [LICENSE](LICENSE) file for details.
