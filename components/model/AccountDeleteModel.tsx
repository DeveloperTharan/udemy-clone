'use client'

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  useDisclosure,
} from "@nextui-org/react";

export const AccountDeleteModel = ({ onConfirm }: { onConfirm: () => void; }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const handleDelete = () => {
    onConfirm();
    onOpenChange();
  };

  return (
    <>
      <div className="flex flex-wrap gap-3">
        <Button
          variant="solid"
          color="danger"
          onPress={onOpen}
        >
          Delete
        </Button>
      </div>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} backdrop={"blur"}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Are you sure?
                <p className="text-xs text-gray-500">
                  This action cannot be undone. It will delete your account and
                  all its associated data.
                </p>
              </ModalHeader>
              <ModalBody className="flex">
                <Button color="danger" variant="light" onPress={onClose}>
                  Cancel
                </Button>
                <Button color="primary" onPress={handleDelete}>
                  Delete Account
                </Button>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
