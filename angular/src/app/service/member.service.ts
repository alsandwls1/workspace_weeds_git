import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';


import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { Member } from '../model/member.model';

@Injectable()
export class MemberService {

  private subject = new Subject<any>();

  private membersUrl: string = "http://localhost:8080/members";
  private headers = new Headers({ 'Content-Type': 'application/json; charset=utf-8' });

  constructor(private http: Http) { }

  getMembers(): Observable<Member[]> {
    return this.http.get(this.membersUrl)
      .map(this.extractData)
      .catch(this.handleError);
  }

  getInfo(id:string): Observable<Member> {
    const url = `${this.membersUrl}/${id}`;
    console.log('getInfo() # url='+url);
    return this.http.get(url)
      .map(this.extractDataForObject)
      .catch(this.handleError);
  }

  loginMember(email: string, password: string): Promise<any> {
    const url = `${this.membersUrl}/login`;
    let headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let member = { "email": email, "password": password };
    console.log('member = ' + JSON.stringify(member));

    return this.http.post(url, JSON.stringify(member), options).toPromise().then(res => {
      if(res.text()==="fail"){
        alert('로그인 실패!!');
      }
      else{
        alert('로그인 성공!!');
        localStorage.setItem("email", res.text());
        this.subject.next({login:'true'});
      }
    });
  }


  addMember(email: string, password: string, name: string): Observable<Member> {
    let headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let member = { "email": email, "password": password, "name": name, "profile_img": "/img/profile_default.png" };
    console.log('member = ' + JSON.stringify(member));

    return this.http.post(this.membersUrl, JSON.stringify(member), options)
      .map(this.extractDataForObject)
      .catch(this.handleError);
  }


  removeMember(id:string): Observable<Member> {
    const url = `${this.membersUrl}/${id}`;
    return this.http.delete(url, { headers: this.headers })
      .map(this.extractDataForObject)
      // ._catch(this.handleError);
  }

  // updateName(name:string, id:string, password:string):Promise<any>{
  updateName(name:string, id:string, password:string, img:string):Promise<any>{
    console.log("id =" + id);
    const url = `${this.membersUrl}/${id}`;

    let headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let member = { "email": id, "name":name, "password": password, "profile_img":img };
    // return this.http.post(url,JSON.stringify(member), options)
      // .map(this.extractDataForObject)
      // ._catch(this.handleError);

      return this.http.post(url, JSON.stringify(member), options).toPromise();
  }

  // updatePassword(name:string,id:string,password:string):Observable<any>{
  updatePassword(name:string,id:string,password:string, img:string):Observable<any>{
    const url = `${this.membersUrl}/${id}`;
    let headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let member = { "email": id, "name":name, "password": password, "profile_img":img };

    return this.http.post(url, JSON.stringify(member), options)
      .map(this.extractDataForObject)
      ._catch(this.handleError);
  }

  updateImg(name:string, id:string, password:string, img:string):Observable<any>{
    const url = `${this.membersUrl}/${id}`;
    let headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json' });
    let options = new RequestOptions({ headers: headers });
    let member = { "email": id, "name":name, "password": password, "profile_img":img };

    return this.http.post(url, JSON.stringify(member), options)
      .map(this.extractDataForObject)
      ._catch(this.handleError);
  }


  private extractDataForObject(res: Response) {
    console.log('MemberService # extractDataForObject() working...');
    console.log('extractDataForObject#res = ' + JSON.stringify(res));
    let json = res.text();//데이터만 뽑아 낼 수 있다. (헤더정보제외)
    console.log(json);
    json = JSON.parse(json);
    console.log("json =" + json);
    return json || {};
  }

  private extractData(res: Response) {
    console.log('extractData#res = ' + JSON.stringify(res));
    let json = res.text();
    json = JSON.parse(json);
    return json || [];
  }

  private handleError(res: Response) {
    console.log("Erroe = "+res);
    return Observable.throw(res.json().error || 'Server Down');
  }

  getObservable(): Observable<any> {
    return this.subject.asObservable();

  }
}



// import { Injectable } from '@angular/core';
// import { Http, Response, Headers, RequestOptions } from '@angular/http';
// import { Observable } from 'rxjs/Observable';
// import { Subject } from 'rxjs/Subject';
//
//
// import 'rxjs/add/operator/toPromise';
// import 'rxjs/add/operator/map';
// import 'rxjs/add/operator/catch';
// import 'rxjs/add/observable/throw';
//
// import { Member } from '../model/member.model';
//
// @Injectable()
// export class MemberService {
//
//   private subject = new Subject<any>();
//
//   private membersUrl: string = "http://localhost:8080/members";
//   private headers = new Headers({ 'Content-Type': 'application/json; charset=utf-8' });
//
//   constructor(private http: Http) { }
//
//   getMembers(): Observable<Member[]> {
//     return this.http.get(this.membersUrl)
//       .map(this.extractData)
//       .catch(this.handleError);
//   }
//
//   loginMember(email: string, password: string): Promise<any> {
//     const url = `${this.membersUrl}/login`;
//     let headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json' });
//     let options = new RequestOptions({ headers: headers });
//     let member = { "email": email, "password": password };
//     console.log('member = ' + JSON.stringify(member));
//
//     return this.http.post(url, JSON.stringify(member), options).toPromise().then(res => {
//       localStorage.setItem("email", res.text());
//       this.subject.next({login:'true'});
//     });
//   }
//
//
//   addMember(email: string, password: string, name: string): Observable<Member> {
//     let headers = new Headers({ 'Content-Type': 'application/json', 'Accept': 'application/json' });
//     let options = new RequestOptions({ headers: headers });
//     let member = { "email": email, "password": password, "name": name, "profile_img": null };
//     console.log('member = ' + JSON.stringify(member));
//
//     return this.http.post(this.membersUrl, JSON.stringify(member), options)
//       .map(this.extractDataForObject)
//       .catch(this.handleError);
//   }
//
//
//   removeMember(member): Observable<Member[]> {
//     const url = `${this.membersUrl}/${member.email}`;
//     return this.http.delete(url, { headers: this.headers })
//       .map(this.extractData)
//       ._catch(this.handleError);
//   }
//
//   private extractDataForObject(res: Response) {
//     console.log('extractDataForObject#res = ' + JSON.stringify(res));
//     let json = res.text();//데이터만 뽑아 낼 수 있다. (헤더정보제외)
//     json = JSON.parse(json);
//     return json || {};
//   }
//
//   private extractData(res: Response) {
//     console.log('extractData#res = ' + JSON.stringify(res));
//     let json = res.text();
//     json = JSON.parse(json);
//     return json || [];
//   }
//
//   private handleError(res: Response) {
//     console.log(res);
//     return Observable.throw(res.json().error || 'Server Down');
//   }
//
//   getObservable(): Observable<any> {
//     return this.subject.asObservable();
//   }
// }
