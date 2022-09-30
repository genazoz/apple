import React, {FC, useRef, useState} from 'react'
import Draggable, {DraggableData} from 'react-draggable'
import styled from "styled-components";
import Image from "next/future/image";

import {useAppSelector} from "../../../app/hooks";
import {appsSelector} from "../../../features/apps/appsSlice";
import theme from "../../../styles/theme";

interface ImageStyleProps {
  device: string;
  orientation: string;
  minimal: boolean;
}
interface TextStyleProps {
  device: string;
  orientation: string;
}

const AppDOM = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;

  cursor: pointer;
  user-select: none;

  &.react-draggable-dragging {
    position: relative; 
    z-index: 1;
  }
`
const ImageWrap = styled.div<ImageStyleProps>`
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  width: auto;

  transition: .2s all;

  img {
    max-width: 100%;
    max-height: 100%;
    height: auto;
    width: auto;

    pointer-events: none;

    ${props => (props.device === 'IPhone' && props.orientation === 'portrait')
            && `
              width: 73%;
              
              ${props.minimal && `width: 80%`}
            `}
    ${props => (props.device === 'IPhone' && props.orientation === 'landscape')
            && `
              width: 38%;
              
              ${props.minimal && `width: 80%`}
            `}
    ${props => (props.device === 'IPad' && props.orientation === 'portrait')
            && `
              width: 70px;
              height: 70px;
            `}
    ${props => (props.device === 'IPad' && props.orientation === 'landscape')
            && `
              width: 65px;
              height: 65px;
            `}
  }
`
const TextWrap = styled.div<TextStyleProps>`
  overflow: hidden;
  flex-shrink: 0;
  width: 100%;

  font-family: ${theme.fonts.openSans};
  font-weight: 500;
  color: #FFFFFF;
  text-overflow: ellipsis;
  text-align: center;
  white-space: nowrap;

  ${props => (props.device === 'IPhone' && props.orientation === 'portrait')
          && `
            `}
  ${props => (props.device === 'IPhone' && props.orientation === 'landscape')
          && `
              display: none;
            `}
  ${props => (props.device === 'IPad' && props.orientation === 'portrait')
          && `
              font-size: 10px;
            `}
  ${props => (props.device === 'IPad' && props.orientation === 'landscape')
          && `
              margin: -.5px 0 0;
              font-size: 10px;
            `}
`

interface AppProps {
  item: string,
  minimal?: boolean,
  axis?: "none" | "x" | "y" | "both" | undefined,
  onClick: () => void,
  onStart?: () => void,
  onStop: (args: DraggableData) => void,
  onDrag?: (args: DraggableData) => void,
}

const App: FC<AppProps> = ({
                                                 item,
                                                 axis,
                                                 onClick,
                                                 onStop,
                                                 onDrag,
                                                 onStart,
                                                 minimal = false
                                               }) => {
  const {device, orientation} = useAppSelector(appsSelector);
  const [isDrag, setIsDrag] = useState(false);
  const appRef = useRef(null);
  const iconImg = require(`../../../public/img/icons/${item}`);
  const title = item.slice(0, -4);

  const handleDrag = (args: DraggableData) => {
    setIsDrag(true)

    if (onDrag)
      onDrag(args);
  }

  const handleStop = (data: DraggableData) => {
    setIsDrag(false)

    if (isDrag && onStop) {
      onStop(data);
    } else if (!isDrag && onClick) {
      onClick();
    }
  }

  return (
    <Draggable
      nodeRef={appRef}
      position={{x: 0, y: 0}}
      axis={axis}
      onStart={onStart}
      onDrag={(...args) => handleDrag(args[1])}
      onStop={(...args) => handleStop(args[1])}
    >
      <AppDOM
        ref={appRef}
        title={title}
      >
        <ImageWrap device={device} orientation={orientation} minimal={minimal}>
          <Image src={iconImg} alt={item}/>
        </ImageWrap>
        {!minimal && <TextWrap device={device} orientation={orientation}>{title}</TextWrap>}
      </AppDOM>
    </Draggable>
  )
}

export default App;
