import { Token } from "@angular/compiler";
import { Observable } from "rxjs";


export abstract class IAuthService {    

    // abstract getCurrentToken(): Token;
    
    // abstract getHauntedIndentityId(): string;

    abstract setHauntedIndentityId(hauntedIndentityId: string): void;
    
    abstract token(identityId: string, password: string): Observable<void>;
    abstract refreshToken(): Observable<void>;

    abstract logout(): void;

}