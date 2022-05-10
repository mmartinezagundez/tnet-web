import { Component, HostListener, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router, ActivatedRoute, RouterStateSnapshot } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule  } from '@angular/forms';
import { IAuthService } from 'src/app/2-domain/service-contract/auth.service.contract';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  
  returnUrl: string = '';

  loginForm: FormGroup;
  showCredencialesNoValidas: boolean = false;
  showHauntedUserNoPermido: boolean = false;
  showAccesoDenegado: boolean = false;
  errorMessage: string = '';
  isLoginBusy: boolean = false;
  isLoginNtlmBusy: boolean = false;

  keysPressed = {};

  hauntedUserInputVisible: boolean = false;

  constructor(
    private authService: IAuthService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder,
    // private empleadoService: EmpleadoService,
    // private usuarioService: UsuarioService,
    // private httpErrorService: HttpErrorService,
  ) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      usuario: [null, [Validators.required]],
      password: [null, [Validators.required]],
      hauntedUser: null      
    });

    // Get the query params
    this.route.queryParams
      .subscribe(params => this.returnUrl = params['returnUrl']);
  }

  @HostListener("window:keydown", ['$event'])
    onKeyDown(event:KeyboardEvent) {
      console.log(`Pressed ${event.key}!`);

      this.keysPressed[event.key] = true;

      if (this.keysPressed['Control'] && this.keysPressed['Alt'] && event.key == 'f') {
        console.log('Fantasma!!');
        this.hauntedUserInputVisible = true;        
      }
      
  }

  @HostListener("window:keyup", ['$event'])
    onKeyUp(event:KeyboardEvent) {
      console.log(`Pressed ${event.key}!`);

      delete this.keysPressed[event.key];

      
  }

  submitForm(): void {

    for (const i in this.loginForm.controls) {
      this.loginForm.controls[i].markAsDirty();
      this.loginForm.controls[i].updateValueAndValidity();
    }

    if (this.loginForm.invalid) {
      return;
    }

    this.login(this.loginForm.value.usuario, this.loginForm.value.password, this.loginForm.value.hauntedUser);

  }  

  login(usuario: string, password: string, hauntedUser: string) {
    this.isLoginBusy = true;
    this.showCredencialesNoValidas = false;    
    this.showHauntedUserNoPermido = false; 
    this.showAccesoDenegado = false;  
    this.errorMessage = '';       

    this.authService.token(usuario, password).subscribe(
      data => {                   
        // /* Se obtiene el usuario de contexto para ver si tiene acceso a sido. Si no tiene acceso se muestra un mensaje y se elimina el token del localStorage. */
        // this.usuarioService.getUsuarioContexto().subscribe(
        //   (usuario: Usuario) => {
        //     if (!usuario.tienePermisoSido) {

        //       this.showAccesoDenegado = true;
        //       localStorage.removeItem('token');
        //       this.isLoginBusy = false;
        //     }
        //     else {
        //       /* Si tiene acceso y hay hauntedUser, se valida si el usuario de contexto tiene permiso para impersonar al hauntedUser. */
        //       if (hauntedUser && hauntedUser != '') {
        //         this.authService.hasContextUserPermission("USUARIO_IMPERSONATE", hauntedUser).subscribe(
        //           hasPermission => {
        //             /* Si tiene permiso para impersonar, se registra el hauntedUser en localStorage y se obtiene el tipo de usuario para redireccionar a la página correspondiente. */
        //             if (hasPermission) {
        //               localStorage.setItem('hauntedUser', hauntedUser);

        //               this.empleadoService.getTipoUsuario().subscribe(
        //                 result => {                    
        //                   if(this.returnUrl != null && this.returnUrl != "")
        //                   {
        //                     this.router.navigate([this.returnUrl]);
        //                   }
        //                   else {
        //                     if(result?.tipo == "GESTOR")
        //                     {
        //                       this.router.navigate(['empleados']);
        //                     }
        //                     else if (result?.tipo == "RESPONSABLEENACTUACION")
        //                     {
        //                       this.router.navigate(['actuaciones']);
        //                     }
        //                     else
        //                     {
        //                       this.router.navigate(['home']);
        //                     }
        //                   }             
        //                 },
        //                 error => {                    
        //                   this.errorMessage = this.httpErrorService.getErrorMessage(error);
        //                   localStorage.removeItem('hauntedUser'); 
        //                   localStorage.removeItem('token');
        //                   this.isLoginBusy = false;
        //                 }
        //               ); 
        //             }
        //             else {
        //               /* Si no tiene permiso para impersonar se muestra un mensaje y se elimina el hauntedUse y el token. */
        //               this.showHauntedUserNoPermido = true;    
        //               localStorage.removeItem('hauntedUser'); 
        //               localStorage.removeItem('token');
        //               this.isLoginBusy = false;
        //             }  
        //           },
        //           error => {
        //             this.errorMessage = this.httpErrorService.getErrorMessage(error);
        //             localStorage.removeItem('hauntedUser'); 
        //             localStorage.removeItem('token');
        //             this.isLoginBusy = false;
        //           }
        //         );
        //       }
        //       else {
        //         /* Si no hay hauntedUser se obtiene el tipo de usuario para redireccionar a la página correspondiente. */
        //         this.empleadoService.getTipoUsuario().subscribe(
        //           result => {                    
        //             if(this.returnUrl != null && this.returnUrl != "")
        //             {
        //               this.router.navigate([this.returnUrl]);
        //             }
        //             else {
        //               if(result?.tipo == "GESTOR")
        //               {
        //                 this.router.navigate(['empleados']);
        //               }
        //               else if (result?.tipo == "RESPONSABLEENACTUACION")
        //               {
        //                 this.router.navigate(['actuaciones']);/
        //               }
        //               else
        //               {
        //                 this.router.navigate(['home']);
        //               }
        //             }             
        //           },
        //           error => {                    
        //             this.errorMessage = this.httpErrorService.getErrorMessage(error);
        //             localStorage.removeItem('hauntedUser'); 
        //             localStorage.removeItem('token');
        //             this.isLoginBusy = false;
        //           }
        //         );  
        //       }              
        //     }
        //   },
        //   error => {
        //     console.error(`Error HeaderComponent.GetUsuarioContexto: ${error}`);        
        //   }      
        // );
      },
      error => {
        if (error instanceof HttpErrorResponse && error.status === 401) {
          this.isLoginBusy = false;
          this.showCredencialesNoValidas = true;      
        }
        else {
          // this.errorMessage = this.httpErrorService.getErrorMessage(error);
          this.isLoginBusy = false;
        }          
      }      
    );
  }
  
}
