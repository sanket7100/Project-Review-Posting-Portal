import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { observableToBeFn } from 'rxjs/internal/testing/TestScheduler';

@Injectable({
  providedIn: 'root'
})
export class PortalServiceService {

  itemId = localStorage.getItem('itemId');
  loggedIn = localStorage.getItem(`user`) != `null` ? true : false;

  loggedInUserid : any = localStorage.getItem('userid');
  loggedInusername : any = localStorage.getItem('user');
  loggedInUseremail : any = localStorage.getItem('useremail');

  selecteditem = {
    "averageRating":0, 
    "creationtime": "",
    "image": "",
    "itemcategory": "",
    "itemdescription": "",
    "itemid": "",
    "itemname": "",
    "userid": "",
    "totalReviews":0
  }

  constructor(private http: HttpClient) { }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  // portalUrl = `http://192.168.5.102:8080/portal`;
  portalUrl = `http://localhost:8080/portal`;

  // Subject creation
  private subject = new Subject<any>();
  private sortItems = new Subject<any>();

  //method for sending data to subscriber
  sendClickedCategory(categoryName: string) {
    this.sortItems.next(categoryName);
  }

  //method to get data from subscriber
  getClickedCategory() {
    return this.sortItems.asObservable();
  }

  sendClickEvent() {
    this.subject.next(1);
  }

  getClickEvent(): Observable<any> {
    return this.subject.asObservable();
  }

  setSelectedItem(item : any){
    // console.log(item);
    
    this.selecteditem = item;
    // console.log(this.selecteditem);
  }

  getSelectedItem(){
    return this.selecteditem;
  }

  getAllItems(): Observable<any> {
    let url = `${this.portalUrl}/getallitems`;
    return this.http.get(url);
  }

  getReviewsById(itemid: any): Observable<any> {
    let url = `${this.portalUrl}/getreview/${itemid}`;
    return this.http.get(url);
  }

  addUser(data: any): Observable<any> {
    let url = `${this.portalUrl}/adduser`;
    return this.http.post(url, data);
  }

  login(data: any): Observable<any> {
    let url = `${this.portalUrl}/login`;
    return this.http.post(url, data);
  }

  getUser(email: string): Observable<any> {
    let url = `${this.portalUrl}/getuserbyemail/${email}`;
    return this.http.get(url);
  }

  addItem(data: any): Observable<any> {
    let url = `${this.portalUrl}/additem`;
    return this.http.post(url, data);
  }

  getItemsByCategory(category: string): Observable<any> {
    let url = `${this.portalUrl}/searchbyitemcategory/${category}`;
    return this.http.get(url);
  }

  getItemsByName(itemname: string): Observable<any> {
    let url = `${this.portalUrl}/searchbyitemname/${itemname}`;
    return this.http.get(url);
  }

  addReview(data : any) : Observable<any>{
    let url = `${this.portalUrl}/addreview`;
    return this.http.post(url,data);
  }

  addReply(data : any) : Observable<any>{
    let url =`${this.portalUrl}/addreply`;
    return this.http.post(url,data);
  }

  getNumberOfReviewsByUser(userid:number) : Observable<any>{
    let url = `${this.portalUrl}/getnumberofreviews/${userid}`;
    return this.http.get(url);
  }

  getNumberOfItemsByUser(userid:number) : Observable<any>{
    let url = `${this.portalUrl}/getnumberofitems/${userid}`;
    return this.http.get(url);
  }

  getUserCreatedItems(userid:number) : Observable<any>{
    let url = `${this.portalUrl}/getitemshistory/${userid}`;
    return this.http.get(url);
  }

  getReviewHistory(userid:any) : Observable<any>{
    let url = `${this.portalUrl}/getreviewshistory/${userid}`;
    return this.http.get(url);
  }

}
