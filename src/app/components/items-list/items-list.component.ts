import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { IListItem } from 'src/app/__types__/IListItem';
import { ItemsListCrudService } from './../../services/items-list-crud.service';

@Component({
  selector: 'app-items-list',
  templateUrl: './items-list.component.html',
  styleUrls: ['./items-list.component.scss']
  
})
export class ItemsListComponent implements OnInit {

  items$: Observable<IListItem[]> = [];
  constructor(private ItemsListCrudService: ItemsListCrudService) { }

  ngOnInit(): void {
    this.items$ = this.fetchAll();
  }
  fetchAll(): Observable<IListItem[]> {
    return this.ItemsListCrudService.fetchAll();
  }

  post(Item: Partial<IListItem>): void {
    const item = (<string>Item).trim();
    if(!item) return;

    this.items$ = this.ItemsListCrudService
    .post({ name: item })
    .pipe(tap(() =>( this.items$ = this.fetchAll())));
  }

  update(id: string, newItem: Partial<IListItem>):void {
    const item = (<string>newItem).trim();
    if(!item) return;

    const newListItem: IListItem = {
      name: item,
      id: id
    }
    this.items$ = this.ItemsListCrudService
    .update(newListItem)
    .pipe(tap(() =>( this.items$ = this.fetchAll())));

  }

  delete(id: string) :void {

    this.items$ = this.ItemsListCrudService
    .delete(id)
    .pipe(tap(() =>( this.items$ = this.fetchAll())));

  }

}
