import {
  Box,
  Flex,
  Grid,
  Heading,
  Icon,
  Text,
  useToast,
} from '@chakra-ui/react';
import { FaPlay } from 'react-icons/fa';
import React, { useEffect, useState } from 'react';
import { shallowEqual, useDispatch, useSelector } from 'react-redux';
import { getItem } from '../../helpers/sessionStorage';
import { getWeatherByLocation, syncData } from '../../redux/actions';
import { Error } from '../Error';
import { FaSyncAlt } from 'react-icons/fa';
import { Loading } from '../Loading';
import { Newbox, NewText } from '../SmallComponents';
import { celsius } from '../../helpers/extraFunctions';
import { Forcast } from '../Forcast';
import styled from 'styled-components';
import { useNavigate } from 'react-router';
const WeatherData = () => {
  const {
    isLoading,
    weatherData: data,
    forcastData,
    sourceData,

    isError,
  } = useSelector((state) => state, shallowEqual);
  const [isRotate, setIsRotate] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    dispatch(getWeatherByLocation(toast));
  }, []);

  const handleSyncData = () => {
    console.log('sss', sourceData);
    setIsRotate(true);
    dispatch(syncData(data.name, toast));
  };

  // setInterval(() => {
  //   speak({ text: `Your city name is ${data.name}` });
  // }, 10000);

  return isLoading ? (
    <Loading />
  ) : isError ? (
    <Error />
  ) : (
    <>
      <button onClick={() => navigate('/')}>Go Back</button>
      <Box maxW={'1400px'} m={'20px auto 5px'} p={'20px'} minH={'550px'}>
        <Heading fontSize={'20px'} marginBottom={'15px'}>
          ORIGIN DATA
        </Heading>

        <Grid
          gridTemplateColumns={['100%', 'repeat(2, 1fr)', 'repeat(2, 1fr)']}
          gap={'30px'}
        >
          <Newbox>
            <Box color={'#3b8231'} p={'20px'} textAlign={'center'}>
              <Flex justify={'end'}>
                <Icon
                  onClick={handleSyncData}
                  onAnimationEnd={() => {
                    setIsRotate(false);
                  }}
                  className={isRotate ? 'iconRotate' : undefined}
                  cursor={'pointer'}
                  w={'23px'}
                  h={'23px'}
                  as={FaSyncAlt}
                />
              </Flex>

              <Heading>{data?.name}</Heading>
              <Heading fontSize={['100px', '120px', '120px', '100px', '120px']}>
                {Math.round(data?.main.temp - 273)}
                <sup>o</sup>C
              </Heading>
              <Heading>{data?.weather[0].main}</Heading>
              <PlayButton>
                <FaPlay />
              </PlayButton>
            </Box>
          </Newbox>

          <Newbox>
            <Grid templateColumns={'50% 50%'} h={'100%'} p={'8px'}>
              <Box py={'10px'} pl={'15%'}>
                {[
                  'Felt Temp.',
                  'Humidity',
                  'Wind',
                  'Visibility',
                  'Max Temp.',
                  'Min Temp.',
                ].map((e, i) => (
                  <Text
                    key={i}
                    color={'#3b8231'}
                    fontWeight={500}
                    mt={'15px'}
                    fontSize={'18px'}
                  >
                    {e}
                  </Text>
                ))}
              </Box>
              <Box borderRadius={'30px'} bg={'#3b8231'} py={'10px'} pl={'15%'}>
                <NewText>
                  {celsius(data.main.feels_like)}
                  <sup>o</sup> C
                </NewText>
                <NewText>{data.main.humidity}%</NewText>
                <NewText>{(data.wind.speed * 3.6).toFixed(2)} Km/h</NewText>
                <NewText>{(data.visibility * 0.001).toFixed(2)} Km</NewText>
                <NewText>
                  {celsius(data.main.temp_max)}
                  <sup>o</sup> C
                </NewText>
                <NewText>
                  {celsius(data.main.temp_min)}
                  <sup>o</sup> C
                </NewText>
              </Box>
            </Grid>
          </Newbox>

          {/* <Newbox>
           

            <Map city={data.name} />
          </Newbox> */}
        </Grid>
        <Heading fontSize={'20px'} marginBottom={'15px'}>
          DESTINATION DATA
        </Heading>
        <Grid
          gridTemplateColumns={['100%', 'repeat(2, 1fr)', 'repeat(2, 1fr)']}
          gap={'30px'}
        >
          <Newbox>
            <Box color={'#3b8231'} p={'20px'} textAlign={'center'}>
              <Flex justify={'end'}>
                <Icon
                  onClick={handleSyncData}
                  onAnimationEnd={() => {
                    setIsRotate(false);
                  }}
                  className={isRotate ? 'iconRotate' : undefined}
                  cursor={'pointer'}
                  w={'23px'}
                  h={'23px'}
                  as={FaSyncAlt}
                />
              </Flex>

              <Heading>{data.name}</Heading>
              <Heading fontSize={['100px', '120px', '120px', '100px', '120px']}>
                {Math.round(data.main.temp - 273)}
                <sup>o</sup>C
              </Heading>
              <Heading>{data.weather[0].main}</Heading>
              <PlayButton>
                <FaPlay />
              </PlayButton>
            </Box>
          </Newbox>

          <Newbox>
            <Grid templateColumns={'50% 50%'} h={'100%'} p={'8px'}>
              <Box py={'10px'} pl={'15%'}>
                {[
                  'Felt Temp.',
                  'Humidity',
                  'Wind',
                  'Visibility',
                  'Max Temp.',
                  'Min Temp.',
                ].map((e, i) => (
                  <Text
                    key={i}
                    color={'#3b8231'}
                    fontWeight={500}
                    mt={'15px'}
                    fontSize={'18px'}
                  >
                    {e}
                  </Text>
                ))}
              </Box>
              <Box borderRadius={'30px'} bg={'#3b8231'} py={'10px'} pl={'15%'}>
                <NewText>
                  {celsius(data.main.feels_like)}
                  <sup>o</sup> C
                </NewText>
                <NewText>{data.main.humidity}%</NewText>
                <NewText>{(data.wind.speed * 3.6).toFixed(2)} Km/h</NewText>
                <NewText>{(data.visibility * 0.001).toFixed(2)} Km</NewText>
                <NewText>
                  {celsius(data.main.temp_max)}
                  <sup>o</sup> C
                </NewText>
                <NewText>
                  {celsius(data.main.temp_min)}
                  <sup>o</sup> C
                </NewText>
              </Box>
            </Grid>
          </Newbox>

          {/* <Newbox>
           

            <Map city={data.name} />
          </Newbox> */}
        </Grid>
        {/* 
        <Grid
          mt={'40px'}
          templateColumns={[
            'repeat(2, 1fr)',
            'repeat(3, 1fr)',
            'repeat(4, 1fr)',
            'repeat(5, 1fr)',
            'repeat(8, 1fr)',
          ]}
          gap={'20px'}
        >
          {forcastData.map((e, i) => (
            <Forcast key={i} data={e} />
          ))}
        </Grid> */}
      </Box>
    </>
  );
};

export default WeatherData;

export const PlayButton = styled.button`
  background: #fff;
  color: #3b8231;
  padding: 10px;

  border: 3px solid #3b8231;
  border-radius: 50%;
  &:hover {
    color: #fff;
    background: #3b8231;
  }
`;
