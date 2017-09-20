import React, {Component} from 'react';
import '../styles/Modal.css';
class NewTodoInput extends Component {
    constructor(props) {
        super(props);
        this.closeModal = this.closeModal.bind(this);
        this.openModal = this.openModal.bind(this);


    }


    openModal() {
        this.modal.style.display = 'block';
    }

    closeModal() {
        this.modal.style.display = 'none';
    }

    componentDidMount() {


        this.modal = document.getElementsByClassName('modal')[0];
    }

    render() {
        return (
            <div className="modal">
                <div className="modal-content">
                    <div className="modal-header">
                        <span className="close-modal" onClick={this.closeModal}>&times;</span>
                    </div>
                    <div className="modal-body">
                        <p>Enter some text</p>
                    </div>

                </div>

            </div>


        )
    }
}

export default NewTodoInput;