import { Component, OnInit } from '@angular/core';
import { DataService } from '../../../services/data.service';

@Component({
  selector: 'ngx-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit {
  items: any[];

  constructor(private itemService: DataService) { }

  ngOnInit(): void {
    this.itemService.getAllItems().subscribe(
      (items: any[]) => {
        this.items = items;
        console.log(items);
      },
      (error) => {
        console.error('Error fetching items:', error);
        // Handle error, e.g., display a message to the user
      }
    );
  }
}
