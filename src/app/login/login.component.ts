import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { SocialAuthService } from 'angularx-social-login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  isLoginMode =true;

  //we want to hide the entire form , when we are loading
  isLoading = false;

  //error handling
  error:string = null;    //initially no error


  constructor(private authService:AuthService,private routerBtn:Router) { }

  ngOnInit(): void {
  }

  onSwitchMode()
  {   
      //changing it to OPPOSITE of what it was before
      this.isLoginMode = !this.isLoginMode;
                    //  !true -- false,    !false -- true

  }

  signInWithGoogle()
  {
    this.authService.googleLogin().then(res=>{
      console.log(res);
      if(res!=null)
      {
         let userExists = false;
        // this.routerBtn.navigate(['/canvas']);

        this.authService.get_all_employee().subscribe(data=>{
          data.map(e=>{
            if(res.email==e.payload.doc.data()['email'])
            {
              // console.log(e.payload.doc.data()['email'], form.value.email)
              
            console.log(e.payload.doc.data());
            localStorage.setItem('user',JSON.stringify(e.payload.doc.data()));
            localStorage.setItem('userId',e.payload.doc.id);
              userExists = true;
              return;
            }
          })
         
        
        })

        setTimeout(()=>{
          // console.log(userExists);
              if(userExists)
        {
          console.log("Login Successfull");
          this.routerBtn.navigate(['/canvas'])
        }
        else{
          console.log("Login not successfull")
          
      this.authService.signUp(res.email,res.name,'',[]).then(res=>{
        console.log("Result : ",res);
      })
      
        }
        },1000)   
  
         
      }
    });
  }

  onSubmit(form:NgForm)
  {
    // this.authService.signUp(form.value.email,form.value.password,'','').subscribe(res=>{
    //   console.log(form)
    // })
    if(!this.isLoginMode)
    {
      this.authService.signUp(form.value.email,form.value.password,'',[]).then(res=>{
        console.log("Result : ",res);
      })
    }
    else{
      let userExists = false;
      console.log("Login Mode");
      this.authService.get_all_employee().subscribe(data=>{
        data.map(e=>{
          if(form.value.email==e.payload.doc.data()['email'] && form.value.password==e.payload.doc.data()['password'] )
          {
            // console.log(e.payload.doc.data()['email'], form.value.email)
            
          console.log(e.payload.doc.data());
          localStorage.setItem('user',JSON.stringify(e.payload.doc.data()));
          localStorage.setItem('userId',e.payload.doc.id);
            userExists = true;
            return;
          }
        })
        if(userExists)
        {
          console.log("Login Successfull");
          this.routerBtn.navigate(['/canvas'])
        }
        else{
          console.log("Login not successfull")
        }
      })
     
    }
  
  }

  getAllEmployees()
  {
    this.authService.get_all_employee().subscribe(data=>{
      //for loop can be applied on this 'data',      like   employees = data.map(....)
      data.map(e=>{
        //do following to get all these maps in array
        // return {
        //   id:e.payload.doc.id,
        //   ....
        //   ....
        // }
        console.log("ID:"+e.payload.doc.id,
        ", Email:"+e.payload.doc.data()['email'],
        ", Password:"+e.payload.doc.data()['password'],
        ", AllCanvas:"+e.payload.doc.data()['allCanvas'])
      })
    })
  }

  editEmployees()
  {
    // this.authService.update_employee('KQtmKjoUoPqYxyuGweHE',{email:'samarthchadda@gmail.com'});
    this.authService.update_employee('KQtmKjoUoPqYxyuGweHE',{allCanvas:['json1']});
    
  }

}
