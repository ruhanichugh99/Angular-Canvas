import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../login/user.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError, Subject, BehaviorSubject} from 'rxjs'; 
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/database';
import {AngularFirestore} from '@angular/fire/firestore'
import { SocialAuthService, SocialUser, GoogleLoginProvider } from 'angularx-social-login';


@Injectable({
  providedIn:'root'
})

export class AuthService {


  booksRef: AngularFireList<any>;

  userSub = new BehaviorSubject<User>(null);     

    constructor(private http:HttpClient, private routerBtn:Router,private fireservice:AngularFirestore,private socialAuthService:SocialAuthService)
    {

    }

    signUp(emailUser:string, name:string,allCanvas,sharedCanvas)
    {
      const allUsers = {
        email: emailUser,
        name: name,
        myCanvas:allCanvas,
        sharedCanvas:sharedCanvas
      };
      //CREATE      
      return this.fireservice.collection('Users').add(allUsers);
                
    }
    
    login(emailUser:string, pwd:string)
    {
       return this.http.post('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyASdBuIgymT7Kit7RNhY0AsPWXyH3suEDk',
        {
            email: emailUser,
            password: pwd,
            returnSecureToken:true   
          }
        );
    }

    //google authentication
  googleLogin()
  {
    return this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID)
    // this.router.navigate(['/canvas'])
  }

    get_all_employee()
    {
      return this.fireservice.collection('Users/').snapshotChanges();
    }

    update_employee(recordId,record)
    {
      this.fireservice.doc('Users/'+recordId).update(record);
    }

    updateCanvas(recordId,record)
    {
      this.fireservice.doc('Users/'+recordId).update(record);
    }

    updateSharedCanvasOtherUser(recordId,record)
    {
      this.fireservice.doc('Users/'+recordId).update(record);
    }

}
