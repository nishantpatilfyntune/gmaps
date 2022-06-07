import React from 'react';
import {
  Box,
  Grid,
  Icon,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import { useSpeechSynthesis } from 'react-speech-kit';

const ModalComp = ({ data }) => {
  console.log(data);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { speak } = useSpeechSynthesis();
  const handleListenClick = () => {
    let speechValue = ` Hello! Current temerature in ${
      data.name
    } is ${Math.round(
      data.main.temp - 273
    )} degree Celcius and the weather is a bit ${data.weather[0].main}y`;
    speak({ text: speechValue });
  };
  return (
    <>
      <button onClick={onOpen}>Click to open Modal</button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader></ModalHeader>
          <ModalCloseButton />

          <ModalBody>
            <Box p={'10px'}>
              <Box
                p={'5px'}
                bg={'#3b8231'}
                textAlign={'center'}
                borderRadius={'30px'}
                mb={'20px'}
              ></Box>
              <button onClick={handleListenClick}>Click to Listen</button>
              <Grid templateColumns={'50% 50%'}></Grid>
            </Box>
          </ModalBody>

          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalComp;
