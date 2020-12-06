import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-items-list',
  templateUrl: './items-list.component.html',
  styleUrls: ['./items-list.component.sass']
})
export class ItemsListComponent implements OnInit {

  items = [
    {id: 1, name: 'buy milk'},
    {id: 2, name: 'do workout'},
    {id: 3, name: 'wash the dishes'}
  ]

  constructor() { }

  ngOnInit(): void {
  }

}
