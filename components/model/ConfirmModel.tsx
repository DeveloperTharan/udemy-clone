"use client";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  Button,
  useDisclosure,
  Tooltip,
} from "@nextui-org/react";
import { Trash, Loader2 } from "lucide-react";
import { usePathname } from "next/navigation";

interface ConfirmModelProps {
  onConfirm: () => void;
  isLoading: boolean;
}

export const ConfirmModel = ({ onConfirm, isLoading }: ConfirmModelProps) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const pathname = usePathname();

  const handleDelete = () => {
    onConfirm();
    onOpenChange();
  };

  return (
    <>
      <div className="flex flex-wrap gap-3">
        {pathname == "/teacher" ? (
          <Tooltip color="danger" content="Delete course">
            <button
              className="w-full h-full text-danger cursor-pointer active:opacity-50"
              disabled={isLoading}
              onClick={onOpen}
            >
              <Trash size={18} />
            </button>
          </Tooltip>
        ) : (
          <Button size="sm" disabled={isLoading} onPress={onOpen}>
            {!isLoading && <Trash className="h-4 w-4" />}
            {isLoading && <Loader2 className="animate-spin h-4 w-4" />}
          </Button>
        )}
      </div>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} backdrop={"blur"}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Are you sure?
                <p className="text-xs text-gray-500">
                  This action cannot be undone.
                </p>
              </ModalHeader>
              <ModalBody className="flex">
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="primary" onPress={handleDelete}>
                  {isLoading && <Loader2 className="animate-spin h-4 w-4" />}
                  {!isLoading && "Continue"}
                </Button>
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};
