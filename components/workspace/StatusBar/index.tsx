import React, {FC} from 'react'
import styled from "styled-components";

import Clock from "../Clock";
import {useAppSelector} from "../../../app/hooks";
import {appsSelector} from "../../../features/apps/appsSlice";

interface StatusBarStyleProps {
  device: string;
  orientation: string;
}

const StatusBarDOM = styled.div<StatusBarStyleProps>`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: auto;
  padding: 0 17px;

  font-size: 13px;
  color: #FFFFFF;

  ${props => (props.device === 'IPhone' && props.orientation === 'portrait')
          && `
                padding: 0 6%;
                
                font-size: 11px;
            `}
  ${props => (props.device === 'IPhone' && props.orientation === 'landscape')
          && `
            position: absolute;
                
            font-size: 10px;
          `}
  ${props => (props.device === 'IPad' && props.orientation === 'portrait')
          && `
            `}
  ${props => (props.device === 'IPad' && props.orientation === 'landscape')
          && `
            `}
`

const StatusBar: FC = () => {
  const {device, orientation} = useAppSelector(appsSelector)

  return (
    <StatusBarDOM device={device} orientation={orientation}>
      <Clock/>
    </StatusBarDOM>
  )
}

export default StatusBar;
