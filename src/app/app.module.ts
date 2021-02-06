import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FabricjsEditorModule } from 'projects/angular-editor-fabric-js/src/public-api';
import { FormsModule } from '@angular/forms';
import { ColorPickerModule } from 'ngx-color-picker';
import { LoginComponent } from './login/login.component';
import { RouterModule, Routes } from '@angular/router';
import { CanvasComponent } from './canvas/canvas.component';
import { RegisterComponent } from './register/register.component';
import { AuthService } from './services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { AngularFireModule } from '@angular/fire';
import {AngularFirestoreModule} from '@angular/fire/firestore'
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { environment } from 'src/environments/environment';
import { SocialLoginModule, SocialAuthServiceConfig, SocialAuthService } from 'angularx-social-login';
import {
  GoogleLoginProvider,
  FacebookLoginProvider,
  AmazonLoginProvider,
} from 'angularx-social-login';


const routes: Routes = [
  {path: 'login',component:LoginComponent},
  {path:'', redirectTo:'/login', pathMatch:'full'},
  {path:'canvas',component:CanvasComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    CanvasComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FabricjsEditorModule,
    FormsModule,
    ColorPickerModule,
    RouterModule.forRoot(routes),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    AngularFirestoreModule
  ],
  providers: [
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              // '242675854004-t2dr6pv4vsvgrocidnvnkldhq2l4f8ia.apps.googleusercontent.com'
              '770021858879-1prmecog76m0at5i41j96vluuu3ggjq3.apps.googleusercontent.com'
            ),
          }         
        ],
      } as SocialAuthServiceConfig,
    },
    SocialAuthService,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
