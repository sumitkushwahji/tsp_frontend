import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { DataService } from '../../../services/data.service';

@Component({
  selector: 'ngx-items',
  templateUrl: './items.component.html',
  styleUrls: ['./items.component.scss']
})
export class ItemsComponent implements OnInit {

  // documentation
  // https://akveo.github.io/ng2-smart-table/#/documentation
  settings = {
    add: {
      addButtonContent: '<i class="nb-plus"></i>',
      createButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmCreate: true
      
    },
    edit: {
      editButtonContent: '<i class="nb-edit"></i>',
      saveButtonContent: '<i class="nb-checkmark"></i>',
      cancelButtonContent: '<i class="nb-close"></i>',
      confirmSave: true
     
    },
    delete: {
      deleteButtonContent: '<i class="nb-trash"></i>',
      confirmDelete: true,
    },
    columns: {
      id: {
        title: 'ID',
        type: 'number',
        editable: false,
      },
      itemName: {
        title: 'Item Name',
        type: 'string',
      },
      indentor: {
        title: 'Indentor',
        type: 'string',
      },
      employeeId: {
        title: 'Employee ID',
        type: 'number',
      },
      totalQty: {
        title: 'Total Qty',
        type: 'number',
      },
      tenderNo: {
        title: 'Tender No',
        type: 'string',
      },
      purchaseOrderDate: {
        title: 'Purchase Order Date',
        type: 'string',
      },
      purchaseOrderNo: {
        title: 'Purchase Order No',
        type: 'string',
      },
      dateOfDeliveryISTRAC: {
        title: 'Date of Delivery ISTRAC',
        type: 'string',
      },
      quantityISTRAC: {
        title: 'Quantity ISTRAC',
        type: 'number',
      },
      installationDateISTRAC: {
        title: 'Installation Date ISTRAC',
        type: 'string',
      },
      dateOfDeliveryNPL: {
        title: 'Date of Delivery NPL',
        type: 'string',
      },
      quantityNPL: {
        title: 'Quantity NPL',
        type: 'number',
      },
      installationDateNPL: {
        title: 'Installation Date NPL',
        type: 'string',
      },
      whiteSlipDate: {
        title: 'White Slip Date',
        type: 'string',
      },
      whiteSlipNo: {
        title: 'White Slip No',
        type: 'string',
      },
      whiteSlipGivenBy: {
        title: 'White Slip Given By',
        type: 'string',
      },
      remarks: {
        title: 'Remarks',
        type: 'string',
      },
      category: {
        title: 'Category',
        type: 'string',
      },
    },
  };

  source: LocalDataSource = new LocalDataSource();

  constructor(private itemService: DataService) { }

  ngOnInit(): void {
    this.loadItems();
  }

  loadItems(): void {
    this.itemService.getAllItems().subscribe(
      (items: any[]) => {
        this.source.load(items); // Load data into the smart table source
        console.log(items);
      },
      (error) => {
        console.error('Error fetching items:', error);
        // Handle error, e.g., display a message to the user
      }
    );
  }

  onCreateConfirm(event: any): void {
    if (window.confirm('Are you sure you want to create this item?')) {
      console.log('Creating item:', event.newData); // Check if the method is called and data is provided
      this.itemService.createItem(event.newData).subscribe(
        (createdItem) => {
          console.log('Item created successfully:', createdItem);
          event.confirm.resolve(createdItem); // Resolve creation action
          this.loadItems(); // Reload items after creation
        },
        (error) => {
          console.error('Error creating item:', error);
          event.confirm.reject(); // Reject creation action
        }
      );
    } else {
      console.log('User cancelled creation.'); // Check if the user cancels the creation
      event.confirm.reject(); // Reject creation action
    }
  }

  onEditConfirm(event): void {
    console.log('Updating item:', event.data); // Check if the method is called and data is provided
    
    if (window.confirm('Are you sure you want to save these changes?')) {
      console.log('User confirmed update.'); // Check if the confirmation dialog is triggered
      this.itemService.updateItem(event.data.id, event.newData).subscribe(
        () => {
          event.confirm.resolve(event.newData); // Resolve update action
          this.loadItems(); // Reload items after update
        },
        (error) => {
          console.error('Error updating item:', error);
          event.confirm.reject(); // Reject update action
        }
      );
    } else {
      console.log('User cancelled update.'); // Check if the user cancels the update
      event.confirm.reject(); // Reject update action
    }
  }
  

  onDeleteConfirm(event): void {
    if (window.confirm('Are you sure you want to delete?')) {
      this.itemService.deleteItem(event.data.id).subscribe(
        () => {
          // Item deleted successfully, remove it from the local data source
          this.source.remove(event.data);
          console.log('Item deleted successfully');
        },
        (error) => {
          console.error('Error deleting item:', error);
          
          // Handle error, e.g., display a message to the user
        }
      );
    } else {
      // Cancel delete action
    }
  }
}
