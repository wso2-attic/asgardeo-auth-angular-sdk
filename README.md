# [WIP] Asgardio Angular OIDC SDK & Samples
Repository containing the source of Asgardio Angular OIDC SDK & Samples.

![Builder](https://github.com/asgardio/asgardio-js-oidc-sdk/workflows/Builder/badge.svg)
[![Stackoverflow](https://img.shields.io/badge/Ask%20for%20help%20on-Stackoverflow-orange)](https://stackoverflow.com/questions/tagged/wso2is)
[![Join the chat at https://join.slack.com/t/wso2is/shared_invite/enQtNzk0MTI1OTg5NjM1LTllODZiMTYzMmY0YzljYjdhZGExZWVkZDUxOWVjZDJkZGIzNTE1NDllYWFhM2MyOGFjMDlkYzJjODJhOWQ4YjE](https://img.shields.io/badge/Join%20us%20on-Slack-%23e01563.svg)](https://join.slack.com/t/wso2is/shared_invite/enQtNzk0MTI1OTg5NjM1LTllODZiMTYzMmY0YzljYjdhZGExZWVkZDUxOWVjZDJkZGIzNTE1NDllYWFhM2MyOGFjMDlkYzJjODJhOWQ4YjE)
[![License](https://img.shields.io/badge/License-Apache%202.0-blue.svg)](https://github.com/wso2/product-is/blob/master/LICENSE)
[![Twitter](https://img.shields.io/twitter/follow/wso2.svg?style=social&label=Follow)](https://twitter.com/intent/follow?screen_name=wso2)
---

:construction:&ensp;&ensp;This project is a work in progress. Please do not use this yet!

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.2.0.

## Table of Contents

- [Introduction](#introduction)
- [Install](#install)
- [Getting Started](#getting-started)
- [APIs](#apis)
    - [`Configuration`](#configuration)
    - [`AsgardioAuthService`](#asgardioauthservice)
        - [`SignIn`](#signin)
        - [`SignInWithRedirect`](#signinwithredirect)
        - [`SignOut`](#signout)
- [Develop](#develop)
    - [Prerequisites](#prerequisites)
    - [Installing Dependencies](#installing-dependencies)
- [Contribute](#contribute)
    - [Reporting Issues](#reporting-issues)
- [License](#license)


## Introduction

Asgardio's OIDC SDK for Angular allows Angular Applications to use OIDC or OAuth2 authentication in a simple and secure way. This SDK is built on top of [@asgardio/oidc-js](https://github.com/asgardio/asgardio-js-oidc-sdk).  

Integaration with [@angular/router](https://angular.io/api/router) of this SDK will help the developers to add identity management to their Angular Applications in a jiffy.

## Install
<!-- Install the Angular library from the npm registry.
```bash
npm install --save @asgardio/oidc-angular
``` -->
## Getting Started

- Getting started with Angular
    - [Quickstart Guide](https://angular.io/start)
    - [In-app navigation](https://angular.io/guide/router)
- Try Out the Sample Apps
    - [Basic Usage](samples/basic-usage)

## APIs

### `Configuration`

Pass configuration parameters for authentication into `AsgardoAuthModule` using `forRoot` method.

Following parameters are **required**.

- `signInRedirectURL` - URL to redirect to after the user authorizes the client app. (Refer [here](#signinwithredirect))
- `clientID`: The client ID of the OIDC application hosted in the Asgardio.
- `serverOrigin`: The origin of the Identity Provider. eg: https://www.asgardio.io

```javascript
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";

// Import Asgardio Auth Module
import { AsgardioAuthModule } from "@asgardio/oidc-angular";

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,

        // Add the module as a Import providing the configs (See API Docs)
        AsgardioAuthModule.forRoot({
            signInRedirectURL: "https://localhost:9443/myaccount/login",
            clientID: "client ID",
            serverOrigin: "https://localhost:9443"
        })
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
```

This SDK supports all configuration parameters defined in [@asgardio/oidc-js](https://github.com/asgardio/asgardio-js-oidc-sdk) 

|Attribute| Type | Default Value| Description|
|:-----|:----|:----|:----|
|`signInRedirectURL`|`string`|""|The URL to redirect to after the user authorizes the client app. eg: `https://conotoso.com/login` |
|`clientID`| `string` |""|The client ID of the OIDC application hosted in the Asgardio.|
|`serverOrigin`|`string`|""|The origin of the Identity Provider. eg: `https://www.asgardio.io`|
|`signOutRedirectURL` (optional)|`string`|`signInRedirectURL` |The URL to redirect to after the user signs out. eg: `https://conotoso.com/logout` |
|`clientHost` (optional)|`string`|The origin of the client app obtained using `window.origin`|The hostname of the client app.  eg: `https://contoso.com`|
|`clientSecret` (optional)|`string`|""|The client secret of the OIDC application|
|`enablePKCE` (optional)|`boolean`|`true`|Specifies if a PKCE should be sent with the request for the authorization code. |
|`prompt` (optional)|`string`|""|Specifies the prompt type of an OIDC request|
|`responseMode` (optional)|`string`|`"query"`| Specifies the response mode. The value can either be `query` or `form_post`|
|`scope` (optional)|`string[]`|`["openid"]`|Specifies the requested scopes|
|[`storage`](#storage) (optional)| `"sessionStorage"`, `"webWorker"`, `"localStorage"`|`"sessionStorage"`| The storage medium where the session information such as the access token should be stored.|
|`baseUrls` (required if the `storage` is set to `webWorker`|`string[]`|""|The URLs of the API endpoints. This is needed only if the storage method is set to `webWorker`. When API calls are made through the [`httpRequest`](#httprequest) or the [`httpRequestAll`](#httprequestall) method, only the calls to the endpoints specified in the `baseURL` attribute will be allowed. Everything else will be denied.|
|`endpoints` (optional)|[`ServiceResourceTypes`](#serviceresourcetypes)|[ServiceResource Default Values](#serviceresourcetypes)| The OIDC endpoint URLs. The SDK will try to obtain the endpoint URLS using the `.well-known` endpoint. If this fails, the SDK will use these endpoint URLs. If this attribute is not set, then the default endpoint URLs will be used.|
|`authorizationCode` (optional)| `string`|""|When the `responseMode` is set to `from_post`, the authorization code is returned as a `POST` request. Apps can use this attribute to pass the obtained authorization code to the SDK. Since client applications can't handle `POST` requests, the application's backend should implement the logic to receive the authorization code and send it back to the SDK.|
| `sessionState` (optional) | `string`|""| When the `responseMode` is set to `from_post`, the session state is returned as a `POST` request. Apps can use this attribute to pass the obtained session state to the SDK. Since client applications can't handle `POST` requests, the application's backend should implement the logic to receive the session state and send it back to the SDK.|
|`validateIDToken`(optional)|`boolean`|`true`|Allows you to enable/disable JWT ID token validation after obtaining the ID token.|
|`clockTolerance`(optional)|`number`|`60`|Allows you to configure the leeway when validating the id_token.|

### `AsgardioAuthService`

#### `SignIn`

This method initiates the authentication flow using [signIn](https://github.com/asgardio/asgardio-js-oidc-sdk/tree/master/packages/oidc-js#signin) function of [@asgardio/oidc-js](https://github.com/asgardio/asgardio-js-oidc-sdk) . Developer can use this method to customize their own redirect flow. 

#### `SignInWithRedirect`

This method redirects the user to the route where the authentication flow was initiated. To use this function following steps needs to be fullfilled.
- `signInRedirectURL` 

Change Sign In Redirect URL as follows
```javascript
AsgardioAuthModule.forRoot({
    signInRedirectURL: window.location.origin + "/signin/redirect",
    ...
})
```    
- `app-routing.module.ts`

Register `AsgardioLoginRedirectComponent` for the the following route.

```javascript
import { AsgardioSignInRedirectComponent } from "@asgardio/oidc-angular";

const routes: Routes = [
    { path: "signin/redirect", component: AsgardioSignInRedirectComponent },
    ...
];
``` 
#### `SignOut`

This method ends the user session at the identity provider and logs the user out.

## Develop

### Prerequisites

- `Node.js` (version 10 or above).
- `npm` package manager.

### Installing Dependencies

You can install the dependencies by running the following command at the root.

```bash
npm run build
```

## Contribute

Please read [Contributing to the Code Base](http://wso2.github.io/) for details on our code of conduct, and the process for submitting pull requests to us.

### Reporting Issues

We encourage you to report issues, improvements, and feature requests creating [Github Issues](https://github.com/asgardio/asgardio-angular-oidc-sdk/issues).

Important: And please be advised that security issues must be reported to security@wso2com, not as GitHub issues, in order to reach the proper audience. We strongly advise following the WSO2 Security Vulnerability Reporting Guidelines when reporting the security issues.

## License

This project is licensed under the Apache License 2.0. See the [LICENSE](LICENSE) file for details.
