
export class ModalService {


    constructor(modal) {
        this.modal=modal;
    }

    openModalWindow() {
        console.log(this.modal);
        this.modal.style.display = 'block';
    }
    closeModal() {
        this.modal.style.display = 'none';
    }
}
export default ModalService;
