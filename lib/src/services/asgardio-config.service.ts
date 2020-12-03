import { Injectable } from '@angular/core';
import { IdentityClient } from '@asgardio/oidc-js';
import { AsgardioConfig } from '../models/asgardio-config';

@Injectable({
    providedIn: 'root'
})
export class AsgardioConfigService {
    constructor(config: AsgardioConfig) {
        console.log("fff");
        if (config) {
            const auth = IdentityClient.getInstance();
            auth.initialize(config).then(value => console.log(value));
        }
    }
}
