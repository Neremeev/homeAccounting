import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";

import {User} from "../models/users.models";
import {BaseApi} from "../core/base.api";

@Injectable()
export class UserService extends BaseApi {

  constructor(public http: HttpClient) {
    super(http)
  }

  // constructor(private http: HttpClient) {}
  //
  // getUserByEmail(email: string) {
  //   return this.http.get(`http://localhost:3000/users?email=${email}`)
  // }

  getUserByEmail(email: string) {
    return this.get(`users?email=${email}`)
  }

  createNewUser(user: User) {
    return this.post('users', user)
  }
}