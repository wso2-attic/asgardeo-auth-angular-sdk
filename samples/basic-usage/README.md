# Sample Angular Application for Basic Usage
This sample application is developed to demonstrate basic usage of Asgardeo Auth Angular SDK.

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.2.0.

## Instructions

1. Before getting started with running this app, make sure you have followed the instructions in the [Try Out the Sample Apps](../../README.md#try-out-the-sample-apps) section.

2. Open the [src/config.json](src/config.json) file.

3. Paste the copied `OAuth Client Key` in front of the `clientID`. You will be replacing a value called `<<CLIENT_ID>>`.


```json
{
    "clientID": "<<CLIENT_ID>>",
    "signInRedirectURL": "http://localhost:5000/signin/redirect",
    "signOutRedirectURL": "http://localhost:5000",
    "serverOrigin": "https://localhost:9443"
}
```

## Contribute

Please read [Contributing to the Code Base](http://wso2.github.io/) for details on our code of conduct, and the process for submitting pull requests to us.

### Reporting Issues

We encourage you to report issues, improvements, and feature requests creating [Github Issues](https://github.com/asgardeo/asgardeo-auth-angular-sdk/issues).

Important: And please be advised that security issues must be reported to security@wso2com, not as GitHub issues, in order to reach the proper audience. We strongly advise following the WSO2 Security Vulnerability Reporting Guidelines when reporting the security issues.

## License

This project is licensed under the Apache License 2.0. See the [LICENSE](../../LICENSE) file for details.
