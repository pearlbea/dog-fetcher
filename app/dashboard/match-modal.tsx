import { useState } from "react";
import {
  Modal,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { DogProfile } from "./dog";
import { Dog } from "../types/dog";

export function MatchModal({
  dog,
  onModalClose,
}: {
  dog: Dog;
  onModalClose: () => void;
}) {
  const [open, setOpen] = useState(true);

  function handleClose() {
    setOpen(false);
    onModalClose();
  }
  return (
    <Modal isOpen={open} onClose={handleClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>You have a match!</ModalHeader>
        <ModalCloseButton />
        <DogProfile dog={dog} />
      </ModalContent>
    </Modal>
  );
}
