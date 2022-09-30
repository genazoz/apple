import React, {FC, useEffect, useRef, useState} from 'react'
import styled from "styled-components";

import App from "../App";
import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import {appsSelector, selectData, setData} from "../../../features/apps/appsSlice";
import {setCookie} from "nookies";

interface DockBarStylesProps {
  device: string;
  orientation: string;
}

const DockBarDOM = styled.div<DockBarStylesProps>`
  overflow: hidden;
  display: flex;
  flex-shrink: 0;
  gap: .5em;
  width: max-content;
  max-width: 100%;
  margin: 0 auto;
  padding: 1%;

  font-size: 11px;

  background-color: rgba(210, 210, 210, 0.2);
  backdrop-filter: blur(30px);
  border-radius: 20px;

  ${props => (props.device === 'IPhone' && props.orientation === 'portrait')
          && `
              width: 90%;
              padding: 3% .8%;
          
              border-radius: 10%/35%;
          `}
  ${props => (props.device === 'IPhone' && props.orientation === 'landscape')
          && `
              gap: 0;
              width: 41%;
              padding: .5% 0;

              border-radius: 10px;
           `}
  ${props => (props.device === 'IPad' && props.orientation === 'portrait')
          && `
              gap: .7em;
              padding: 1.8%;
              
              border-radius: 30px;
            `}
  ${props => (props.device === 'IPad' && props.orientation === 'landscape')
          && `
            `}
`

interface DockBarProps {
  items: string[],
  onStartApp: (item: string) => void
}

const DockBar: FC<DockBarProps> = ({items, onStartApp}) => {
  const dispatch = useAppDispatch();
  const apps = useAppSelector(selectData);
  const {device, orientation} = useAppSelector(appsSelector)
  const dockBarRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState<number>(0);

  useEffect(() => {
    if (dockBarRef.current) {
      setWidth(dockBarRef.current.clientWidth)
    }
  })

  const changeDockBarItems = (dockBarItems: string[]) => {
    dispatch(setData({data: {...apps, [`${device}_${orientation}_dock_apps`]: dockBarItems}}))
    setCookie(null, `${device}_${orientation}_dock_apps`, JSON.stringify(dockBarItems), {
      maxAge: 30 * 24 * 60 * 60,
      path: "/",
    })
  }
  const setPositions = (col: number, selCol: number) => {
    let apps = [...items];
    apps[col - 1] = apps.splice(selCol - 1, 1, apps[col - 1])[0]
    changeDockBarItems(apps)
  }
  const handleStop = (itemIndex: number, x: number) => {
    const col = itemIndex + 1
    const colMax = items.length
    const stepX = width / colMax
    const parentX = x + (col * stepX)
    const selCol = Math.round(parentX / stepX)

    if (selCol === col || selCol > colMax || selCol < 1)
      return;

    setPositions(col, selCol)
  }

  return (
    <DockBarDOM ref={dockBarRef} device={device} orientation={orientation}>
      {
        items.map((item, i) => {
          return (
            <App
              key={item}
              item={item}
              axis='x'
              minimal={true}
              onStop={(data) => handleStop(i, data.x)}
              onClick={() => onStartApp(item)}
            />
          )
        })
      }
    </DockBarDOM>
  )
}

export default DockBar;