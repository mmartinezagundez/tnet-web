import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IAuthRepository } from 'src/app/2-domain/repository-contract/auth.repository.contract';
import { environment } from 'src/environments/environment';
import { TokenModel } from '../models/auth/token.model';

@Injectable({
  providedIn: 'root'
})
export class AuthRepository extends IAuthRepository {  
      
  constructor(
    private httpClient: HttpClient
  ) { 
    super(); 
  }

  token(identityId: string, password: string): Observable<TokenModel> {
    return this.httpClient.post<TokenModel>(`${environment.apiUrl}/auth/token`, { identityId: identityId, password: password});
  }
  refreshToken(token: string, refreshToken: string): Observable<TokenModel> {
    return this.httpClient.post<TokenModel>(`${environment.apiUrl}/auth/refreshtoken`, { token: token, refreshToken: refreshToken });
  }

  getCurrentToken(): TokenModel {
    return JSON.parse(localStorage.getItem('token'));
  }

  saveCurrentToken(token: TokenModel): void {
    localStorage.setItem('token', JSON.stringify(token));
  }

  removeCurrentToken(): void {
    localStorage.removeItem('token');
  }

  getHauntedIndentityId(): string {
    if (localStorage.getItem("hauntedUser")) {
      return localStorage.getItem("hauntedUser");
    }
    else {
      return null;
    }
  }    

  saveHauntedIndentityId(hauntedIndentityId: string): void {
    localStorage.setItem('hauntedUser', hauntedIndentityId);
  }

  removeHauntedIndentityId(): void {
    localStorage.removeItem('hauntedUser');
  }
}
