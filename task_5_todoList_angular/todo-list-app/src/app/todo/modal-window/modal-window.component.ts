import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-modal-window',
  templateUrl: './modal-window.component.html',
  styleUrls: ['./modal-window.component.scss']
})
  export class ModalWindowComponent implements OnInit {
  modal: any;

  constructor() {
  }

  openModalWindow() {
    this.modal.style.display = "block";
  }

  closeModal() {
    this.modal.style.display = "none";
  }

  ngOnInit() {
    this.modal = document.getElementsByClassName('modal')[0];

  }

}
