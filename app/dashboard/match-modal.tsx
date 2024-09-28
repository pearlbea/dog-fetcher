import { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
} from "@chakra-ui/react";
import { DogProfile } from "./dog";
import { Dog } from "../types/dog";

export function MatchModal({
  dog,
  handleLike,
  onModalClose,
}: {
  dog: Dog;
  handleLike: () => void;
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
        <DogProfile dog={dog} handleLike={handleLike} />
      </ModalContent>
    </Modal>
  );
}
