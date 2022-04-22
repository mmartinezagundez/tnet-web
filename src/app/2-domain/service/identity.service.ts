import { Injectable } from '@angular/core';
import { IIdentityService } from '../service-contract/identity.service.contract';

@Injectable({
  providedIn: 'root'
})
export class IdentityService extends IIdentityService {

  constructor(

  ) { super() }
}
