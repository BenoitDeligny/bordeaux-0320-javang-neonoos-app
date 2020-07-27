import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'neo-add-picture-dialog',
  templateUrl: './add-picture-dialog.component.html',
  styleUrls: ['./add-picture-dialog.component.scss']
})
export class AddPictureDialogComponent implements OnInit {

  pictureUrl = '';

  constructor(public dialogRef: MatDialogRef<AddPictureDialogComponent>) { }

  ngOnInit(): void {
  }

  onNoClick() {
    this.dialogRef.close();
  }

}
