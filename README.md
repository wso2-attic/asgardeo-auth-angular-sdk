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
- [Package](#package)
- [Try Out the Sample Apps](#try-out-the-sample-apps)
- [Getting Started](#getting-started)
- [APIs](#apis)
- [Storage](#storage)
- [Models](#models)
- [Develop](#develop)
  - [Prerequisites](#prerequisites)
  - [Installing Dependencies](#installing-dependencies)
  - [Build](#build)
  - [Helpful Links](#helpful-links)
- [Contribute](#contribute)
  - [Reporting Issues](#reporting-issues)
- [License](#license)

## Introduction

Asgardeo's Auth SDK for Angular allows Angular Applications to use OIDC or OAuth2 authentication in a simple and secure way. This SDK is built on top of [@asgardeo/auth-spa](https://github.com/asgardeo/asgardeo-auth-spa-sdk).

Integration with [@angular/router](https://angular.io/api/router) of this SDK will help the developers to add identity management to their Angular Applications in a jiffy.

## Package

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
   
3. Enter **Sample** as the name of the app and add the redirect URL(s). You can find the relevant redirect URL(s) of each sample app in the [Running the sample apps](#2-running-the-sample-apps) section.
   
4. Click on Register. You will be navigated to management page of the **sample** application.
   
5. Add `https://localhost:5000` to **Allowed Origins** under **Access** tab and check **Public client** option.
   
6. Click on **Update** at the bottom.
   
7. Copy the **Client ID**.

#### b. WSO2 Identity Server - Carbon Console

1. Navigate to [`https://localhost:9443/carbon`](https://localhost:9443/carbon) and click on **Add** under **Service Providers** in the left-hand menu panel.

2. Enter **Sample** as the name of the app and click on **Register**.

3. Then, expand the **Inbound Authentication Configuration** section. Under that, expand **OAuth/OpenID Connect Configuration** section and click on **Configure**.

4. Under **Allowed Grant Types** uncheck everything except **Code** and **Refresh Token**.

5. Enter the callback URL(s). You can find the relevant callback(redirect) URL(s) of each sample app in the [Running the sample apps](#2-running-the-sample-apps) section.

6. Check **Allow authentication without the client secret**.

7. Click **Add** at the bottom.

8. Copy the **OAuth Client Key**.

9. Enable CORS for the client application by following this [guide](https://is.docs.wso2.com/en/5.11.0/learn/cors/).

### 2. Running the sample apps

1. Download the sample from the given link.

2. Update configuration file `src/config.json` with your registered app details.

**Note:** You will only have to paste in the `clientID`(**OAuth Client Key**) generated for the application you registered.

Read more about the SDK configurations [here](#configuration) .

```json
{
    "clientID": "",
    "serverOrigin": "https://localhost:9443",
    "signInRedirectURL": "https://localhost:5000",
    "signOutRedirectURL": "https://localhost:5000"
}
```

3. Build and deploy the apps by running the following command at the root directory.

```bash
npm install && npm start
```

4. Navigate to [`https://localhost:5000`](https://localhost:5000).

#### a. Basic Angular Sample

- Download the Sample: [samples/asgardeo-angular-app](https://github.com/asgardeo/asgardeo-auth-angular-sdk/releases/latest/download/asgardeo-angular-app.zip)

- Find More Info: [README](/samples/asgardeo-angular-app/README.md)

- **Redirect URL(s):**
  - `https://localhost:5000`

#### b. Angular Sample With Router

- Download the Sample: [samples/asgardeo-angular-app-with-router](https://github.com/asgardeo/asgardeo-auth-angular-sdk/releases/latest/download/asgardeo-angular-app-with-router.zip)

- Find More Info: [README](/samples/asgardeo-angular-app-with-router/README.md)

- **Redirect URL(s):**
  - `https://localhost:5000`
  - `https://localhost:5000/signin/redirect`

## Getting Started

### 1. Installing the Package

Install the Asgardeo Auth Angular SDK from the npm registry.
```bash
npm install --save @asgardeo/auth-angular
```

### 2. Import `AsgardeoAuthModule` and Provide Configuration Parameters

Add the `AsgardeoAuthModule` to the imports array of your root app module. Pass the config object to the [`forRoot` function](https://angular.io/guide/singleton-services). See the list of available configurations [here](#configuration).

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

        // Provide the configs (See API Docs)
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
    constructor(private auth: AsgardeoAuthService) { }

    // Use this function in a login button to simply sign-in.    
    handleSignIn(): void {
        this.auth.signIn();
    }

    // Use this function in a logout button to simply sign-out.
    handleSignOut(): void {
        this.auth.signOut();
    }
}
```

### 4. Use `AsgardeoAuthService` to access Authenticated state.

`state$` could be used to access the user's authenticated user's state. Click [here](#authstateinterface) to see which attributes are exposed from `$state` object.

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

    public isAuthenticated: boolean;

    constructor(private auth: AsgardeoAuthService) { }

    ngOnInit() {
        this.auth.state$
            .subscribe((state: AuthStateInterface) => {
                isAuthenticated = state.isAuthenticated;
            });
    }
}
```

## APIs

- [`AsgardeoAuthModule`](#asgardeoauthmodule)
  - [Configuration](#configuration)
- [`AsgardeoAuthService`](#asgardeoauthservice)
  - [state$](#state)
  - [signIn](#signin)
  - [signInWithRedirect](#signinwithredirect)
  - [signOut](#signout)
  - [isAuthenticated](#isauthenticated)
  - [getBasicUserInfo](#getbasicuserinfo)
  - [getAccessToken](#getaccesstoken)
  - [getIDToken](#getidtoken)
  - [getDecodedIDToken](#getdecodedidtoken)
  - [getOIDCServiceEndpoints](#getoidcserviceendpoints)
  - [refreshAccessToken](#refreshaccesstoken)
  - [revokeAccessToken](#revokeaccesstoken)
  - [on](#on)
  - [requestCustomGrant](#requestcustomgrant)
  - [httpRequest](#httprequest)
  - [httpRequestAll](#httprequestall)
- [`AsgardeoAuthGuard`](#asgardeoauthguard)
- [`AsgardeoAuthInterceptor`](#asgardeoauthinterceptor)


### `AsgardeoAuthModule`

This is the top-level Angular module for the SDK. This module provides following components and services.

- [`AsgardeoAuthService`](#asgardeoauthservice) - Service containing wide range of authentication functions.
- [`AsgardeoAuthGuard`](#asgardeoauthguard) - A route guard to grant access to a page only after successful authentication.
- [`AsgardeoSignInRedirectComponent`](#signinwithredirect) - Handles the authentication flow and redirects the user back.

#### Configuration

Pass configuration parameters for authentication into `AsgardeoAuthModule` using `forRoot` method.

This SDK currently supports following configuration parameters defined in [@asgardeo/auth-spa](https://github.com/asgardeo/asgardeo-auth-spa-sdk) 

| Attribute                    | Required?                                                                                                           | Type            | Default Value                                                   | Description                                                                                                                                                                                                                                                                                                                                |
| :--------------------------- | :------------------------------------------------------------------------------------------------------------------ | :-------------- | :-------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `signInRedirectURL`          | Required                                                                                                            | `string`        | ""                                                              | The URL to redirect to after the user authorizes the client app.                                                                                                                                                                                                                                                                           |
| `signOutRedirectURL`         | Optional                                                                                                            | `string`        | `signInRedirectURL` will be used if this value is not provided. | The URL to redirect to after the user is signed out                                                                                                                                                                                                                                                                                        | signs out. eg: `https://localhost:5000/dashboard`                                                                                                           |
| `clientHost`                 | Optional                                                                                                            | `string`        | Origin of the client app obtained using `window.origin`         | The hostname of the client app. eg: `https://localhost:5000`                                                                                                                                                                                                                                                                               |
| `clientID`                   | Required                                                                                                            | `string`        | ""                                                              | The client ID of the OIDC application hosted in the Asgardeo.                                                                                                                                                                                                                                                                              |
| `clientSecret`               | Optional                                                                                                            | `string`        | ""                                                              | The client secret of the OIDC application                                                                                                                                                                                                                                                                                                  |
| `enablePKCE`                 | Optional                                                                                                            | `boolean`       | `true`                                                          | Specifies if a PKCE should be sent with the request for the authorization code.                                                                                                                                                                                                                                                            |
| `prompt`                     | Optional                                                                                                            | `string`        | ""                                                              | Specifies the prompt type of an OIDC request                                                                                                                                                                                                                                                                                               |
| `responseMode`               | Optional                                                                                                            | `ResponseMode`  | `query`                                                         | Specifies the response mode. The value can either be `query` or `form_post`                                                                                                                                                                                                                                                                |
| `scope`                      | Optional                                                                                                            | `string[]`      | `["openid"]`                                                    | Specifies the requested scopes.                                                                                                                                                                                                                                                                                                            |
| `serverOrigin`               | Required                                                                                                            | `string`        | ""                                                              | The origin of the Identity Provider. eg: `https://localhost:9443`                                                                                                                                                                                                                                                                          |
| `endpoints`                  | Optional                                                                                                            | `OIDCEndpoints` | [OIDC Endpoints Default Values](#oidcendpoints)                 | The OIDC endpoint URLs. The SDK will try to obtain the endpoint URLS                                                                                                                                                                                                                                                                       | using the `.well-known` endpoint. If this fails, the SDK will use these endpoint URLs. If this attribute is not set, then the default endpoint URLs will be | used. However, if the `overrideWellEndpointConfig` is set to `true`, then this will override the endpoints obtained from the `.well-known` endpoint. |
| `overrideWellEndpointConfig` | Optional                                                                                                            | `boolean`       | `false`                                                         | If this option is set to `true`, then the `endpoints` object will override endpoints obtained                                                                                                                                                                                                                                              | from the `.well-known` endpoint. If this is set to `false`, then this will be used as a fallback if the request to the `.well-known` endpoint fails.        |
| `wellKnownEndpoint`          | Optional                                                                                                            | `string`        | `"/oauth2/token /.well-known/ openid-configuration"`            | The URL of the `.well-known` endpoint.                                                                                                                                                                                                                                                                                                     |
| `validateIDToken`            | Optional                                                                                                            | `boolean`       | `true`                                                          | Allows you to enable/disable JWT ID token validation after obtaining the ID token.                                                                                                                                                                                                                                                         |
| `clockTolerance`             | Optional                                                                                                            | `number`        | `60`                                                            | Allows you to configure the leeway when validating the `id_token`.                                                                                                                                                                                                                                                                         |
| [`storage`](#storage)        | Optional                                                                                                            | `Storage`       | `SessionStorage`                                                | The storage medium where the session information such as the access token should be stored.                                                                                                                                                                                                                                                |                                                                                                                                                             |
| `resourceServerURLs`         | Required if `storage` is set to `webWorker` or if the built-in [auth interceptor](#asgardeoauthinterceptor) is used | `string[]`      | `[]`                                                            | The URLs of the API endpoints. This is needed only if the storage method is set to `webWorker`. When API calls are made through the [`httpRequest`](#httprequest) or the [`httpRequestAll`](#httprequestall) method, only the calls to the endpoints specified in the `baseURL` attribute will be allowed. Everything else will be denied. |                                                                                                                                                             |
| `requestTimeout`             | Optional                                                                                                            | `number`        | 60000 (seconds)                                                 | Specifies in seconds how long a request to the web worker should wait before being timed out.                                                                                                                                                                                                                                              |
| `skipRedirectCallback`       | Optional                                                                                                            | `boolean`        | `false`                                              | Stop listening to Auth param changes i.e `code` & `session_state` to trigger auto login.                                                                                                                                                                                                                                              |

---

### `AsgardeoAuthService`

In the components, `AsgardeoAuthService` can be used to take advantage of all of supported authentication features provided. This service inherits from the `IdentityClient` of the [@asgardeo/auth-spa](https://github.com/asgardeo/asgardeo-auth-spa-sdk).

### state$

Authenticated state of the user than is exposed as an Observable. You can subscribe to `this.auth.state$` end extract the [attributes exposed by the SDK](#authstateinterface).


```typescript

constructor(private auth: AsgardeoAuthService) { }

ngOnInit() {
    this.auth.state$
        .subscribe((state: AuthStateInterface) => {
            // Access the state from here. ex: state.isAuthenticated, state.username etc.
        });
}
```

### signIn

```typescript
signIn(config?: SignInConfig, authorizationCode?: string, sessionState?: string): Promise<BasicUserInfo>
```

#### Arguments

1. config?: [`SignInConfig`](#SignInConfig) (optional)
   An object that contains attributes that allows you to configure sign in. The `forceInit` attribute of this object, allows you to force a request to the `.well-known` endpoint even if a request has previously been sent. You can also pass key-value pairs that you want to be appended as path parameters to the authorization URL to this object. To learn more, refer to [`SignInConfig`](#SignInConfig). This object is needed only during the authorization-url-generation phase.

2. authorizationCode?: `string` (optional)
   The `signIn` method can be passed the authorization code as an argument, which will be used to obtain the token during the token-request phase of the method. This allows developers to use different response modes such as `form_post`. To learn more about the `form_post` method refer to the [Using the `form_post` response mode](https://github.com/asgardeo/asgardeo-auth-spa-sdk#using-the-form_post-response-mode) section. If you're using the `query` method, then the `signIn` method automatically obtains the authorization code from the URL.

3. sessionState?: `string` (optional)
   The `signIn` method can be passed the session state as an argument, which will be used to obtain the token during the token-request phase of the method. This allows developers to use different response modes such as `form_post`. To learn more about the `form_post` method refer to the [Using the `form_post` response mode](https://github.com/asgardeo/asgardeo-auth-spa-sdk#using-the-form_post-response-mode) section. If you're using the `query` method, then the `signIn` method automatically obtains the session state from the URL.

#### Description

As the name implies, this method is used to sign-in users. This method will have to be called twice to implement the two phases of the authentication process. The first phase generates generates the authorization URl and takes the user to the single-sign-on page of the identity server, while second phase triggers the token request to complete the authentication process. So, this method should be called when initiating authentication and when the user is redirected back to the app after authentication themselves with the server.

The `sign-in` hook is used to fire a callback function after signing in is successful. Check the [on()](#on) section for more information.

### signInWithRedirect

```typescript
signInWithRedirect(): Promise<boolean>
```

#### Description

This method signs in and redirects the user back to the route where the authentication flow was initiated. To use this function following steps need to be fulfilled.

- `app-routing.module.ts`

Register `AsgardeoSignInRedirectComponent` for a unique route.

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

### signOut

```typescript
signOut(): Promise<boolean>
```

#### Description

This method ends the user session at the Identity Server and logs the user out.

The `sign-out` hook is used to fire a callback function after signing out is successful. Check the [on()](#on) section for more information.

### isAuthenticated

```TypeScript
isAuthenticated(): Promise<boolean>
```

#### Returns

isAuth: `Promis<boolean>` A promise that resolves with a boolean value that indicates if the user is authenticated or not.

#### Description

This method returns a boolean value indicating if the user is authenticated or not.

### getBasicUserInfo

```typescript
getBasicUserInfo(): Promise<BasicUserInfo>;
```

#### Returns

A Promise that resolves with [`BasicUserInfo`](#BasicUserInfo).

#### Description

This method returns a promise that resolves with the information about the authenticated user obtained from the id token as an object. To learn more what information this object contains, refer to the [`BasicUserInfo`](#BasicUserInfo) section.

### getAccessToken

```typescript
getAccessToken(): Promise<string>;
```

#### Returns

A Promise that resolves with the access token.

#### Description

This returns a promise that resolves with the access token. The promise resolves successfully only if the storage type is set to a type other than `webWorker`. Otherwise an error is thrown.

### getIDToken

```TypeScript
getIDToken(): Promise<string>
```

#### Returns

A promise that resolves with the ID token.

#### Description

idToken: `Promise<string>` This method returns the id token.

### getDecodedIDToken

```typescript
getDecodedIDToken(): Promise<DecodedIDTokenPayload>
```

#### Returns

A promise that returns with the [`DecodedIDTokenPayload`](#DecodedIDTokenPayload) object.

#### Description

This method returns a promise that resolves with the decoded payload of the JWT ID token.

### getOIDCServiceEndpoints

```TypeScript
getOIDCServiceEndpoints(): Promise<OIDCEndpoints>
```

#### Returns

A Promise that resolves with an object containing the endpoints. To learn more about what endpoints are returned, refer to the [`OIDCEndpoints`](#OIDCEndpoints) section.

#### Description

This method returns a promise that resolves with an object containing the OIDC endpoints obtained from the `.well-known` endpoint.

### refreshAccessToken

```typescript
refreshAccessToken(): Promise<BasicUserInfo>;
```

#### Returns

A Promise that resolves with the [`BasicUserInfo`](#BasicUserInfo) object.

#### Description

This refreshes the access token and stores the refreshed session information in either the session or local storage as per your configuration. Note that this method cannot be used when the storage type is set to `webWorker` since the web worker automatically refreshes the token and there is no need for the developer to do it.

### revokeAccessToken

```typescript
revokeAccessToken(): Promise<boolean>
```

#### Description
This method revokes the access token and clears the session information from the storage.

The `end-user-session` hook is used to fire a callback function after end user session is successful. Check the [on()](#on) section for more information.

### on

```typescript
on(hook: Hooks, callback: (response?: any) => void, id?: string): Promise<void>
```

#### Arguments

1. hook: `Hooks`
   The name of the hook.
2. callback: `() => void`
   The callback function that should be fired.
3. id?: `string`
   An id for the method. This is required only when the hook type is `custom-grant`.

#### Description

The `on` method is used to hook callback functions to authentication methods. The method accepts a hook name and a callback function as the only arguments except when the hook name is "custom-grant", in which case the id of the custom grant should be passed as the third argument. The following hooks are available.

If you are using TypeScript, you may want to use the `Hooks` enum that consists of the following string literals instead of directly inputting the string value.

| Hook                       | Method to which the callback function is attached                                | Returned Response                                                           |
| :------------------------- | :------------------------------------------------------------------------------- | :-------------------------------------------------------------------------- |
| `Hooks.SignIn`             | `signIn()`                                                                       | The user information. See [BasicUserInfo](#basicuserinfo) for more details. |
| `Hooks.SignOut`            | `signOut()`                                                                      |                                                                             |
| `Hooks.Initialize`         | `initialize()`                                                                   | A boolean value indicating if the initialization was successful or not.     |
| `Hooks.HttpRequestStart`   | `httpRequest()` (Called before an http request is sent)                          |
| `Hooks.HttpRequestFinish`  | `httpRequest()` (Called after an http request is sent and response is received.) |
| `Hooks.HttpRequestError`   | `httpRequest()` (Called when an http request returns an error)                   |
| `Hooks.HttpRequestSuccess` | `httpRequest()` (Called when an http requests returns a response successfully)   |
| `Hooks.RevokeAccessToken`  | `revokeAccessToken()`                                                            | A boolean value indicating if the process was successful or not             |
| `Hooks.CustomGrant`        | `customGrant()`                                                                  | Returns the response from the custom grant request.                         |

**When the user signs out, the user is taken to the identity server's logout page and then redirected back to the SPA on successful log out. Hence, developers should ensure that the `Hooks.SignOut` hook is called when the page the user is redirected to loads.**

### requestCustomGrant

```typescript
requestCustomGrant(config: CustomGrantConfig): Promise<HttpResponse | BasicUserInfo>;
```

#### Arguments

1. config: [`CustomGrantConfig`](#CustomGrantConfig)
   A config object to configure the custom-grant request. To learn more about the different attributes that can be used with config object, see the [`CustomGrantConfig`](#CustomGrantConfig) section.

#### Returns

A Promise that resolves either with the response or the [`BasicUserInfo`](#BasicUserInfo).

#### Description

This method allows developers to use custom grants provided by their Identity Servers. This method accepts an object that has the following attributes as the argument.

The `custom-grant` hook is used to fire a callback function after a custom grant request is successful. Check the [on()](#on) section for more information.

```TypeScript
const config = {
    attachToken: false,
    data: {
        client_id: "{{clientID}}",
        grant_type: "account_switch",
        scope: "{{scope}}",
        token: "{{token}}",
    },
    id: "account-switch",
    returnResponse: true,
    returnsSession: true,
    signInRequired: true
}

this.auth.requestCustomGrant(config)
    .then((response)=>{
        // console.log(response);
    })
    .catch((error)=>{
        // console.error(error);
    });
```


### httpRequest

```typescript
httpRequest(config: HttpRequestConfig): Promise<HttpResponse>;
```

#### Arguments

1. config: `HttpRequestConfig`
   A config object with the settings necessary to send http requests. This object is similar to the `AxiosRequestConfig`.

#### Returns

A Promise that resolves with the response.

#### Description

This method is used to send http requests to the Identity Server. The developer doesn't need to manually attach the access token since this method does it automatically.

If the `storage` type is set to `sessionStorage` or `localStorage`, the developer may choose to implement their own ways of sending http requests by obtaining the access token from the relevant storage medium and attaching it to the header. However, if the `storage` is set to `webWorker`, this is the _ONLY_ way http requests can be sent.

This method accepts a config object which is of type `AxiosRequestConfig`. If you have used `axios` before, you can use the `httpRequest` in the exact same way.

For example, to get the user profile details after signing in, you can query the `Me` endpoint as follows:

#### Example

```TypeScript
const requestConfig = {
    headers: {
        "Accept": "application/json",
        "Content-Type": "application/scim+json"
    },
    method: "GET",
    url: "https://localhost:9443/scim2/Me"
};

return this.auth.httpRequest(requestConfig)
    .then((response) => {
        // console.log(response);
    })
    .catch((error) => {
        // console.error(error);
    });
```

### httpRequestAll

```typescript
httpRequestAll(config: HttpRequestConfig[]): Promise<HttpResponse[]>;
```

#### Arguments

1. config[]: `HttpRequestConfig[]`
   An array config objects with the settings necessary to send http requests. This object is similar to the `AxiosRequestConfig`.

#### Returns

A Promise that resolves with the responses.

#### Description

This method is used to send multiple http requests at the same time. This works similar to `axios.all()`. An array of config objects need to be passed as the argument and an array of responses will be returned in a `Promise` in the order in which the configs were passed.

#### Example

```typeScript
this.auth.httpRequestAll(configs)
    .then((responses) => {
        response.forEach((response) => {
            // console.log(response);
        });
    })
    .catch((error) => {
        // console.error(error);
    });
```
---

### `AsgardeoAuthGuard`

`AsgardeoAuthGuard` can be used to protect routes from unauthorized access. 

To ensure the user has been properly authenticated before accessing, add the `canActivate` guard to any route as follows.
(Add `canActivateChild` guard to protect a child route.)

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
---

### `AsgardeoAuthInterceptor`

This is an angular [HTTPInterceptor](https://angular.io/api/common/http/HttpInterceptor) that automatically attaches the access tokens to outgoing HTTP requests, when using the built-in angular HttpClient [@angular/common/http](https://angular.io/api/common/http). 

**Note:** `AsgardeoAuthInterceptor` can only be used if the `storage` type is set to `sessionStorage` or `localStorage`. If the storage type is set to `webWorker`, promise based [`httpRequest`](#httprequest) or [`httpRequestAll`](#httprequestall) methods must be used to call API endpoints of the identity provider.

#### Example

Add `AsgardeoAuthInterceptor` to the providers array in the app root module and list down the required API endpoints in `resourceServerURLs` array,

```typescript
// app.module.ts

import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { AsgardeoAuthInterceptor, AsgardeoAuthModule } from "@asgardeo/auth-angular";
import { AppComponent } from "./app.component";

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        AsgardeoAuthModule.forRoot({
            ...
            serverOrigin: "https://localhost:9443",

            // Add the correct scope(s) required by the API here
            scope: ["internal_login"],

            // Access token will be attached to calls that start with these base URLs
            resourceServerURLs: [
                "https://localhost:9443/scim2",
                ...
            ]
        })
    ],
    providers: [
        // Add the http interceptor to the providers array
        {
            provide: HTTP_INTERCEPTORS,
            useClass: AsgardeoAuthInterceptor,
            multi: true
        }
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
```

An access token will be attached as an `Authorization` header, for the requests sent by the built-in angular [`HttpClient`](https://angular.io/api/common/http/HttpClient), to the API endpoints that start with URLs defined in the `resourceServerURLs` array.

Query the `Me` endpoint to get the user profile details after signing in as follows:

```typescript
// app.component.ts

import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Component } from "@angular/core";
import { Observable } from "rxjs";

@Component({
    selector: "app-root",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.css"]
})
export class AppComponent {
    constructor(private http: HttpClient) { }

    // Send http requests with built-in angular HttpClient
    sendHTTPRequest(): Observable<any> {
        const url = "https://localhost:9443/scim2/Me";
        const httpOptions = {
            headers: new HttpHeaders({
                "Accept": "application/json",
                "Content-Type": "application/scim+json",
            })
        };
        
        return this.http.get(url, httpOptions);
    }
}
```

Learn more about using APIs in WSO2 Identity Server from [here](https://is.docs.wso2.com/en/latest/develop/using-apis/).

## Storage

Asgardeo allows the session information including the access token to be stored in four different places, namely,

1. Session storage - `Storage.SessionStorage`
2. Local storage - `Storage.LocalStorage`
3. Web worker - `Storage.WebWorker`
4. Browser memory - `Sorage.BrowserMemory`

Of the four methods, storing the session information in the **web worker** is the **safest** method. This is because the web worker cannot be accessed by third-party libraries and data there cannot be stolen through XSS attacks. However, when using a web worker to store the session information, the [`httpRequest`](#httprequest) method has to be used to send http requests. This method will route the request through the web worker and the web worker will attach the access token to the request before sending it to the server.

## Models

- [BasicUserInfo](#basicuserinfo)
- [SignInConfig](#signinconfig)
- [OIDCEndpoints](#oidcendpoints)
- [CustomGrantConfig](#customgrantconfig)
- [DecodedIDTokenPayload](#decodedidtokenpayload)
- [AuthStateInterface](#authstateinterface)

### BasicUserInfo

| Attribute       | Type     | Description                                                                                        |
| :-------------- | :------- | :------------------------------------------------------------------------------------------------- |
| `email`         | `string` | The email address of the user.                                                                     |
| `username`      | `string` | The username of the user.                                                                          |
| `displayName`   | `string` | The display name of the user. It is the `preferred_username` in the id token payload or the `sub`. |
| `allowedScopes` | `string` | The scopes allowed for the user.                                                                   |
| `tenantDomain`  | `string` | The tenant domain to which the user belongs.                                                       |
| `sessionState`  | `string` | The session state.                                                                                 |

### SignInConfig

| Method        | Required/Optional | Type                  | Default Value | Description                                                                                                                                                            |
| ------------- | ----------------- | --------------------- | ------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `fidp`        | Optional          | `string`              | ""            | The `fidp` parameter that can be used to redirect a user directly to an IdP's sign-in page.                                                                            |
| `forceInit`   | Optional          | `boolean`             | `false`       | Forces obtaining the OIDC endpoints from the `.well-known` endpoint. A request to this endpoint is not sent if a request has already been sent. This forces a request. |
| key: `string` | Optional          | `string` \| `boolean` | ""            | Any key-value pair to be appended as path parameters to the authorization URL.                                                                                         |

### OIDCEndpoints

| Method                  | Type     | Default Value                                      | Description                                                               |
| ----------------------- | -------- | -------------------------------------------------- | ------------------------------------------------------------------------- |
| `authorizationEndpoint` | `string` | `"/oauth2/authorize"`                              | The authorization endpoint.                                               |
| `tokenEndpoint`         | `string` | `"/oauth2/token"`                                  | The token endpoint.                                                       |
| `userinfoEndpoint`      | `string` | ""                                                 | The user-info endpoint.                                                   |
| `jwksUri`               | `string` | `"/oauth2/jwks"`                                   | The JWKS URI.                                                             |
| `registrationEndpoint`  | `string` | ""                                                 | The registration endpoint.                                                |
| `revocationEndpoint`    | `string` | `"/oauth2/revoke"`                                 | The token-revocation endpoint.                                            |
| `introspectionEndpoint` | `string` | ""                                                 | The introspection endpoint.                                               |
| `checkSessionIframe`    | `string` | `"/oidc/checksession"`                             | The check-session endpoint.                                               |
| `endSessionEndpoint`    | `string` | `"/oidc/logout"`                                   | The end-session endpoint.                                                 |
| `issuer`                | `string` | ""                                                 | The issuer of the token.                                                  |
| `wellKnownEndpoint`     | `string` | `"/oauth2/token/.well-known/openid-configuration"` | The well-known endpoint. This is the default endpoint defined in the SDK. |

### CustomGrantConfig

| Attribute        | Required/Optional | Type      | Default Value | Description                                                                                                                                                                                                                   |
| ---------------- | ----------------- | --------- | ------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `id`             | Required          | `string`  | ""            | Every custom-grant request should have an id. This attributes takes that id.                                                                                                                                                  |
| `data`           | Required          | `any`     | `null`        | The data that should be sent in the body of the custom-grant request. You can use template tags to send session information. Refer to the [Custom Grant Template Tags](#custom-grant-template-tags) section for more details. |
| `signInRequired` | Required          | `boolean` | `false`       | Specifies if the user should be sign-in or not to dispatch this custom-grant request.                                                                                                                                         |
| `attachToken`    | Required          | `boolean` | `false`       | Specifies if the access token should be attached to the header of the request.                                                                                                                                                |
| `returnsSession` | Required          | `boolean` | `false`       | Specifies if the the request returns session information such as the access token.                                                                                                                                            |

#### Custom Grant Template Tags

Session information can be attached to the body of a custom-grant request using template tags. This is useful when the session information is not exposed outside the SDK but you want such information to be used in custom-grant requests. The following table lists the available template tags.
| Tag                | Data               |
| ------------------ | ------------------ |
| "{{token}}"        | The access token.  |
| "{{username}}"     | The username.      |
| "{{scope}}"        | The scope.         |
| "{{clientID}}"     | The client ID.     |
| "{{clientSecret}}" | The client secret. |

### DecodedIDTokenPayload

| Method             | Type                   | Description                                    |
| ------------------ | ---------------------- | ---------------------------------------------- |
| aud                | `string` \| `string[]` | The audience.                                  |
| sub                | `string`               | The subject. This is the username of the user. |
| iss                | `string`               | The token issuer.                              |
| email              | `string`               | The email address.                             |
| preferred_username | `string`               | The preferred username.                        |
| tenant_domain      | `string`               | The tenant domain to which the user belongs.   |

### AuthStateInterface

| Attribute          | Type                   | Description                                    |
| ------------------ | ---------------------- | ---------------------------------------------- |
| allowedScopes      | `string`               | Scopes in the Token.                           |
| displayName        | `string`               | User's display name                            |
| email              | `string`               | User's email.                                  |
| isAuthenticated    | `boolean`              | Is the user authenticated or not.              |
| isLoading          | `boolean`              | Is the authentication requests still loading.  |
| username           | `string`               | Username of the Authenticated user.            |

## Develop

### Prerequisites

- `Node.js` (version 10 or above).
- `npm` package manager.

### Installing Dependencies

You can install the dependencies by running the following command at the root.

```bash
npm install
```

### Build

You can build the project by executing the following command.

```bash
npm run build
```

#### Ivy Build

For development builds, use the following command to build the project in [`ivy`](https://angular.io/guide/ivy) mode.
This will help you resolve error occurred when using `npm link`.

```bash
npm run build:ivy
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
