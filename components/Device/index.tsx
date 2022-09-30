import React, {FC} from 'react'
import Screen from '../Screen'
import Image, {StaticImageData} from "next/future/image";

import styled from "styled-components";
import theme from "../../styles/theme";
import {useAppSelector} from "../../app/hooks";
import {appsSelector} from "../../features/apps/appsSlice";

interface DeviceStyleProps {
  device: string;
  orientation: string;
}
interface ScreenWrapperStyleProps {
  device: string;
  orientation: string;
}

const Device = styled.div<DeviceStyleProps>`
  position: relative;

  display: flex;
  width: auto;
  max-width: 1000px;
  min-width: 290px;

  @media (max-width: ${theme.media.md}) {
    max-width: 100%;
  }

  ${props => (props.device === 'IPhone')
          && `
              &::before {
                content: '';
                
                position: absolute;
                z-index: 2;
                top: 0;
                left: 0;
                
                width: 100%;
                height: 100%;
                
                background-size: cover;
                background-position: center;
                pointer-events: none;
              }
            `}
  ${props => (props.device === 'IPhone' && props.orientation === 'portrait')
          && `
              &::before {
                background-image: url('./img/dynamic-island-vertical.png');
              }
            `}
  ${props => (props.device === 'IPhone' && props.orientation === 'landscape')
          && `
              &::before {
                background-image: url('./img/dynamic-island-horizontal.png');
              }
            `}
`
const ScreenWrapper = styled.div<ScreenWrapperStyleProps>`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;

  overflow: hidden;
  width: 100%;
  height: 100%;
  
  &::before {
    content: '';

    position: absolute;
    z-index: 1;
    top: 0;
    left: 0;

    width: 100%;
    height: 100%;

    background: rgba(0,0,0,.4);
  }

  ${props => props.device === 'IPad' && `padding: 0;`}
  ${props => (props.device === 'IPhone' && props.orientation === 'portrait')
          && `
              width: 92.4%;
              height: 96.3%;
              margin: auto;
              border-radius: 10.5%/4.9%;
            `}
  ${props => (props.device === 'IPhone' && props.orientation === 'landscape')
          && `
              width: 96.3%;
              height: 92.4%;
              margin: auto;
              border-radius: 4.9%/10.5%;
            `}
  ${props => (props.device === 'IPad' && props.orientation === 'portrait')
          && `
              top: -2px;
              
              width: 89%;
              height: 92.5%;
              margin: auto;
              border-radius: 2%/1.5%;
            `}
  ${props => (props.device === 'IPad' && props.orientation === 'landscape')
          && `
              left: -2px;
              
              width: 92.5%;
              height: 89%;
              margin: auto;
              border-radius: 1.5%/2%;
            `}
`
const Background = styled.img`
  max-width: 100%;
  height: 100%;
`

interface DeviceProps {
  deviceImg: StaticImageData;
}

const DeviceTemp: FC<DeviceProps> = ({deviceImg}) => {
  const {device, orientation} = useAppSelector(appsSelector)

  return (
    <Device device={device} orientation={orientation}>
      <Background as={Image} src={deviceImg}/>
      <ScreenWrapper device={device} orientation={orientation}>
        <Screen />
      </ScreenWrapper>
    </Device>
  )
}

export default DeviceTemp;
