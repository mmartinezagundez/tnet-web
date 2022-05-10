import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IAuthService } from '../service-contract/auth.service.contract';
import { map, tap } from 'rxjs/operators';
import { IAuthRepository } from '../repository-contract/auth.repository.contract';
import { TokenMapperService } from './mappers/token-mapper.service';
import { Token } from '../entities/auth/token';
import { TokenModel } from 'src/app/3-data/models/auth/token.model';
import { IMapper } from '../service-contract/mapper.service.contract';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends IAuthService {
  
  private currentTokenSubject: BehaviorSubject<Token>;
  public currentToken: Observable<Token>;
  
  constructor(
    private authRepository: IAuthRepository,
    private tokenMapper: TokenMapperService
  ) { 
    super();
    console.log("AuthService Constructor!");        
    this.currentTokenSubject = new BehaviorSubject<Token>(this.tokenMapper.fromModelToEntity(this.authRepository.getCurrentToken()));
    this.currentToken = this.currentTokenSubject.asObservable();
  }
  
  token(identityId: string, password: string): Observable<void> {    
    return this.authRepository.token(identityId, password).pipe(
      map((tokenModel: TokenModel) => {        
        this.authRepository.saveCurrentToken(tokenModel);        
        this.currentTokenSubject.next(this.tokenMapper.fromModelToEntity(tokenModel));        
      })
    );
  }

  refreshToken(): Observable<void> {
    return this.authRepository.refreshToken(this.currentTokenSubject.value.token, this.currentTokenSubject.value.refreshToken).pipe(
      map((tokenModel: TokenModel) => {
        this.authRepository.saveCurrentToken(tokenModel);        
        this.currentTokenSubject.next(this.tokenMapper.fromModelToEntity(tokenModel));        
      })
    );
  }

  setHauntedIndentityId(hauntedIndentityId: string): void {
    this.authRepository.saveHauntedIndentityId(hauntedIndentityId);
    location.reload();
  }

  logout(): void {
    this.authRepository.removeCurrentToken();
    this.currentTokenSubject.next(null);
    this.authRepository.removeHauntedIndentityId();
  }

}
