
export class ModalService {


    constructor(modal) {
        this.modal=modal;
    }

    openModalWindow() {

        this.modal.style.display = 'block';
    }
    closeModal() {
        this.modal.style.display = 'none';
    }
}
export default ModalService;
