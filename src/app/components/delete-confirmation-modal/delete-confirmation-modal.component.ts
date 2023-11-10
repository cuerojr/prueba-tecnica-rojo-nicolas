import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-delete-confirmation-modal',
  templateUrl: './delete-confirmation-modal.component.html',
  styleUrls: ['./delete-confirmation-modal.component.css'],
})
export class DeleteConfirmationModalComponent {
  @Output() confirmed = new EventEmitter<boolean>();
  isVisible: boolean = false;

  confirm() {
    this.confirmed.emit(true);
  }

  cancel() {
    this.confirmed.emit(false);
  }

  isModalVisible(event: MouseEvent): boolean {
    return this.isVisible;
  }
}

