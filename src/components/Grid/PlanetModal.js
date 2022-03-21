import { useEffect } from "react";
import { Modal, ModalBody, Button } from "reactstrap";

const PlanetModal = ({ toggleModal, isModalOpen, modalData }) => {

    useEffect(()=>{
        console.log("loaded data", modalData)
    }, [])

    return (
        <Modal isOpen={true}>
            <Modal
                isOpen={isModalOpen}>
                <Button onClick={toggleModal} >Close Modal</Button>
                {modalData && <ModalBody>
                    name: {modalData.name}
                    <br />
                    rotation_period: {modalData.rotation_period}
                    <br />
                    orbital_period: {modalData.orbital_period}
                    <br />
                    diameter: {modalData.diameter}
                    <br />
                    climate: {modalData.climate}
                    <br />
                    gravity: {modalData.gravity}
                    <br />
                    terrain: {modalData.terrain}
                    <br />
                    surface_water: {modalData.surface_water}
                </ModalBody>}
            </Modal>
        </Modal>
    )
}

export default PlanetModal;