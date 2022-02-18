import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  Image,
  Link,
} from '@chakra-ui/react';

interface ModalViewImageProps {
  isOpen: boolean;
  onClose: () => void;
  imgUrl: string;
}

export function ModalViewImage({
  isOpen,
  onClose,
  imgUrl,
}: ModalViewImageProps): JSX.Element {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent maxH={600} maxW={900}>
        <ModalBody p="0">
          <Image src={imgUrl} />
        </ModalBody>
        <ModalFooter
          bgColor="pGray.800"
          p="1.5"
          borderBottomRadius={4}
          justifyContent="start"
        >
          <Link href={imgUrl} isExternal textAlign="start">
            Abrir original
          </Link>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
