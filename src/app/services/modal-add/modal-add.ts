import { Component, output } from '@angular/core';

@Component({
  selector: 'app-modal-add',
  standalone: true,
  templateUrl: './modal-add.html',
  styleUrl: './modal-add.css',
})
export class ModalAdd {
  close = output<void>();
  
  ocultarModal(): void {
    this.close.emit();
  }
}
