import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {IFriend} from './friend';

@Injectable({
  providedIn: 'root'
})
export class FriendsService {
  postData = {
    test: 'my content'
  }
  private _url: string = "http://localhost:3000/users/friends";
  //friends;

  constructor(private http: HttpClient) { }

  getFriends() {
    return this.http.post(this._url, this.postData).toPromise().then(data => {console.log(data);});
  }
}
