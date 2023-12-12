import { Injectable } from '@angular/core';
import * as CryptoJS  from 'crypto-js';
import { environment } from '@env/environment';

@Injectable({
  providedIn: 'root'
})
export class EncryptService  {

  constructor() { }

  encrypt(value:string){
   return CryptoJS.AES.encrypt(value.trim(),environment.key.trim()).toString();
  }

  decrypt(value: any){
     let bytes = CryptoJS.AES.decrypt(value.trim(),environment.key.trim());
    return bytes.toString(CryptoJS.enc.Utf8);
   }
}
