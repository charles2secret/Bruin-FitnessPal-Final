
/*
    AppService is the portal for designing services to backend
    app.service.spec.ts and app.service.ts is managed by backend team
    as it makes easier for us to test functionalities

    note: any modification (merge/push) of the files above
    requires merge approval from backend team
    do not tamper this file, ask before doing anything

    However, you can modify it locally to serve your needs
    and create a pull request stating the needs for your changes
 */

// @ts-nocheck
import { Injectable } from '@angular/core';
// new add for AppService
import { HttpClient } from '@angular/common/http';
//import { RequestOptions } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class AppService {
  // we add private HttpClient so that for every instance of AppService
  // they can use HttpClient to send request
  constructor(private httpClient: HttpClient) { }

  uri = 'http://localhost:3000';
  private accountId;
  private activityDate;
  private loginStatus = false;
  private metabolism = 0;
  private calorieBurned = 0;
  private calorieConsumption = 0;
  private username;
  private password;
  private gender;
  private email;
  setUsername(temp){
    this.username=temp
  }
  getUsername(){
    return this.username
  }
  setpassword(temp){
    this.password=temp
  }
  getpassword(){
    return this.password
  }
  setgender(temp){
    this.gender=temp
  }
  getgender(){
    return this.gender
  }
  setemail(temp){
    this.email=temp
  }
  getemail(){
    return this.email
  }
  setMetabolism(temp){
    this.metabolism=temp
  }
  getMetabolism(){
    return this.metabolism
  }
  setCalorieB(temp){
    this.calorieBurned=temp
  }
  getCalorieB(){
    return this.calorieBurned
  }
  setCalorieC(temp){
    this.calorieConsumption=temp
  }
  getCalorieC(){
    return this.calorieConsumption
  }
  setLogginStatus(status){
    this.loginStatus = status
  }
  getLogginStatus(){
    return this.loginStatus
  }
  setAccountId (tempAccountId){
    this.accountId=tempAccountId;
  }
  getActivityDate (){
    return this.activityDate;
  }
  setActivityDate (tempDate){
    this.activityDate=tempDate;
  }
  getAccountId (){
    return this.accountId;
  }
  getIssues() {
    return this.httpClient.get(`${this.uri}/issues`);
  }
  // tslint:disable-next-line:typedef
  getUserById(accountId,password) {
    const user = {
      accountId: accountId,
      password: password,
    };
    return this.httpClient.post(`${this.uri}/users/current`,user);
  }
  getUserByName(username,password) {
    const user = {
      username: username,
      password: password,
    };
    return this.httpClient.post(`${this.uri}/users/current`,user);
  }
  loginUserByName(username, password) {
    const user = {
      username: username,
      password: password,
    };
    return this.httpClient.post(`${this.uri}/users/login`, user);
  }

  loginUserById(accountId, password) {
    const user = {
      accountId: accountId,
      password: password,
    };
    return this.httpClient.post(`${this.uri}/users/login`,user);
  }
  registerUser(name, pass, id, email, gender) {
    const user = {
      accountId: id,
      password: pass,
      username: name,
      email: email,
      gender: gender,
    }
    return this.httpClient.post(`${this.uri}/users/register`,user);
  }
  getActivity(id,date){
    const activity = {
      accountId:id,
      date:date,
    }
    return this.httpClient.post(`${this.uri}/diaries/activity`,activity);
  }
  putActivity(id,date,activityName,activityType,calorieBurned,duration,timeOfDay){
      const _activity = {
        accountId:id,
        date: date,
        activity:{activityName,activityType,calorieBurned,duration,timeOfDay},
      }
      return this.httpClient.put(`${this.uri}/diaries/activity`,_activity);
  }
  putFood(id,date,foodName,calorieConsumed,timeOfDay,totalFat,totalProtein,totalCarbs,totalFiber){
    const _food = {
      accountId:id,
      date:date,
      food:{foodName,calorieConsumed,timeOfDay,totalFat,totalProtein,totalCarbs,totalFiber},
    }
    return this.httpClient.put(`${this.uri}/diaries/food`,_food);
  }
  putHealth(id,date,water,sleep,weight){
    const _health = {
      accountId:id,
      date: date,
      water: water,
      sleep: sleep,
      weight: weight,
    }
    return this.httpClient.put(`${this.uri}/diaries/health`,_health);
}
  getActivity(id, date) {
    const query = {
      accountId: id,
      date: date
    }
    let response = this.httpClient.post(`${this.uri}/diaries/activity`, query);
    
    return response
  }

  getFood(id,date){
    const food = {
      accountId:id,
      date:date,
    }
    return this.httpClient.post(`${this.uri}/diaries/food`,food);
  }

  getHealth(id,date){
    const health = {
      accountId:id,
      date:date,
    }
    return this.httpClient.post(`${this.uri}/diaries/health`,health);
  }
  updateIssue(id, title, responsible, description, severity) {
    const issue = {
      title: title,
      responsible: responsible,
      description: description,
      severity: severity
    };
    return this.httpClient.post(`${this.uri}/issue/${id}`,issue);
  }

  deleteIssue(id) {
    return this.httpClient.get(`${this.uri}/issue/delete/${id}`);
  }

  //FRIENDS
  getFriends(id) {
    const friends = {
      accountId: id
    };
    return this.httpClient.post(`${this.uri}/users/friend`, friends);
  }

  addFriend(friendId) {
    const _friend = {
      accountId: this.getAccountId(),
      friendId: friendId,
    };
    return this.httpClient.put(`${this.uri}/users/friend`, _friend);
  }

  delFriend(friendId) {
    const _friend = {
      accountId: this.getAccountId(),
      friendId: friendId,
    };
    return this.httpClient.delete(`${this.uri}/users/friend`, { body: _friend });
  }

}

