
export class User
{                                                       //private because token should not be retrieved outside
    constructor(public email:string, public password:string , private _token:string, private _tokenExpDate:Date )
    {

    }

   
    get token()
    {
                                //new Date() --  current date and time
                                //if current timestamp is greater than token expiration date ,  then it means the TOKEN  expired.
        if(!this._tokenExpDate || new Date() > this._tokenExpDate)
        {
            return null;
        }
        return this._token;
    }

}


