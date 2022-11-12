import { Modal } from "bootstrap";

export default function createAndHideModal(elemnt){
    const modal = new Modal(elemnt);
    console.log(modal);
    modal.toggle();
}