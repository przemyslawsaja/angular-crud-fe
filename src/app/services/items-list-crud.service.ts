import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { IListItem } from '../__types__/IListItem'
import { Observable } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { ErrorHandlerService } from './error-handler.service';

@Injectable({
  providedIn: 'root'
})
export class ItemsListCrudService {
  private url = "http://localhost:3000/items";
  httpOptions: { headers: HttpHeaders} = {
    headers: new HttpHeaders({ "Content-Type": "application/json"})
  }

  constructor(
    private errorHandlerService:ErrorHandlerService,
    private http: HttpClient) { }

  fetchAll(): Observable<IListItem[]> {
    return this.http.
      get<IListItem[]>(this.url, { responseType: "json"})
      .pipe(
        tap((_) => console.log('fetched items'),
        catchError(
          this.errorHandlerService.handleError<IListItem[]>("fetchAll", [])
        )
        )
    )
  }

  post(item: Partial<IListItem>): Observable<any>{
    return this.http
    .post<Partial<IListItem>>(this.url, item, this.httpOptions)
    .pipe(
      catchError(
        this.errorHandlerService.handleError<any>("post")
      )
    )
  }

  update(item: IListItem): Observable<any>{
     return this.http
    .patch(`${this.url}/${item.id}`, item, this.httpOptions)
    .pipe(
      catchError(
        this.errorHandlerService.handleError<IListItem>("update")
      )
    )
  }

  delete(id: string): Observable<any>{
    return this.http
   .delete(`${this.url}/${id}`, this.httpOptions)
   .pipe(
     catchError(
       this.errorHandlerService.handleError<IListItem>("update")
     )
   )
 }

}
