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
import { HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class AppService {
  // we add private HttpClient so that for every instance of AppService
  // they can use HttpClient to send request
  constructor(private httpClient: HttpClient) { }

  uri = 'http://localhost:4200';

  getIssues() {
    return this.httpClient.get(`${this.uri}/issues`);
  }
  // tslint:disable-next-line:typedef
  getIssueById(id) {
    return this.httpClient.get(`${this.uri}/issues/${id}`);
  }

  addIssue(title, responsible, description, severity) {
    const issue = {
      title: title,
      responsible: responsible,
      description: description,
      severity: severity
    };
    return this.httpClient.post(`${this.uri}/issue`,issue);
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

}
