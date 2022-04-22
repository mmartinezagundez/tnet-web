import { Observable } from "rxjs";
import { TokenModel } from "src/app/3-data/models/auth/token.model";

export abstract class IAuthRepository {    

    abstract token(identityId: string, password: string): Observable<TokenModel>;
    abstract refreshToken(token: string, refreshToken: string): Observable<TokenModel>;

    
    abstract saveCurrentToken(token: TokenModel): void;
    abstract getCurrentToken(): TokenModel;
    abstract removeCurrentToken(): void;
    
    abstract getHauntedIndentityId(): string;        
    abstract saveHauntedIndentityId(hauntedIndentityId: string): void;    
    abstract removeHauntedIndentityId(): void;

}