
import { Injectable } from '@angular/core';
import { TokenModel } from 'src/app/3-data/models/auth/token.model';
import { Token } from '../../entities/auth/token';
import { IMapper } from '../../service-contract/mapper.service.contract';

@Injectable({
  providedIn: 'root'
})
export class TokenMapperService extends IMapper<Token, TokenModel> {
  
  constructor() { super() }
  
  fromEntityToModel(param: Token): TokenModel {
    throw new Error('Method not implemented.');
  }
  fromModelToEntity(param: TokenModel): Token {
    return {
      token: param.token,
      refreshToken: param.refreshToken,      
    };
  }
  fromEntityListToModelList(param: Token[]): TokenModel[] {
    throw new Error('Method not implemented.');
  }
  fromModelListToEntityList(param: TokenModel[]): Token[] {
    throw new Error('Method not implemented.');
  }  
}
