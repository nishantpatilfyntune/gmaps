import React from 'react';
import {
  Box,
  Flex,
  Grid,
  Heading,
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
import { useNavigate } from 'react-router';
import { FaPlay } from 'react-icons/fa';
import styled from 'styled-components/macro';
import { Newbox } from './SmallComponents';
import { PlayButton } from './Weather/WeatherData';
// import useSpeechSynthesis from './custom-hooks/useSpeechSynthesis';
const ModalComp = ({ data }) => {
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { speak } = useSpeechSynthesis();

  const handleOpenClick = (e) => {
    e.preventDefault();
    let currentHr = new Date().getHours();
    let greeting =
      currentHr < 12
        ? 'Good Morning'
        : currentHr >= 18
        ? 'Good Evening'
        : 'Good Afternoon';

    let speechText = ` ${greeting}! Current temperature in ${
      data.name
    } is ${Math.round(
      data.main.temp - 273
    )} degree Celcius, and the weather is a bit ${data.weather[0].main}y`;

    speak({
      text: speechText,
      voice: window.speechSynthesis.getVoices()[10],
    });
    onOpen();
  };

  const handleWeatherNavigate = () => {
    navigate('/weather');
  };
  return (
    <>
      <div
        css={`
          display: flex;
          gap: 5px;
        `}
      >
        <NavButton onClick={handleOpenClick}>Click to open Modal</NavButton>
        <NavButton
          title="Check Detailed Weather Forecast of Source and Destination"
          onClick={handleWeatherNavigate}
        >
          Check
        </NavButton>
      </div>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Current Location Weather Data </ModalHeader>
          <ModalCloseButton />

          <ModalBody>
            <Newbox>
              <Box color={'#3b8231'} p={'20px'} textAlign={'center'}>
                <Flex justify={'end'}></Flex>

                <Heading>{data?.name}</Heading>
                <Heading
                  fontSize={['100px', '120px', '120px', '100px', '120px']}
                >
                  {Math.round(data?.main.temp - 273)}
                  <sup>o</sup>C
                </Heading>
                <Heading>{data?.weather[0].main}</Heading>
                {/* <PlayButton onClick={handleListenClick}>
                  <FaPlay />
                </PlayButton> */}
              </Box>
            </Newbox>
          </ModalBody>

          <ModalFooter></ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default ModalComp;

const NavButton = styled.button`
  background: #fff;
  color: #000;
  border: 2px solid #3b8231;
  font-weight: 600;
  padding: 10px 20px;
  border-radius: 5px;

  &:hover {
    background: #3b8231;
    color: #fff;
    opacity: 1;
  }
`;
