import React, {FC, useEffect, useState} from 'react'
import App from "../App";
import debounce from 'lodash.debounce'
import styled from "styled-components";
import {DraggableData} from "react-draggable";

import {useAppSelector} from "../../../app/hooks";
import {appsSelector} from "../../../features/apps/appsSlice";
import {getAbsCol, getCol, getPageIndex, getSelCellIndex} from "../../../utils/apps/apps";

interface handleFuncProps {
  pageIndex: number,
  itemIndex: number,
  data: DraggableData
}

interface CommonStyleProps {
  device: string;
  orientation: string;
}

interface AppsStyleProps extends CommonStyleProps {
}

interface ScreenStyleProps extends CommonStyleProps {
}

interface CellStyleProps {
  colMax: number;
  rowMax: number;
}

const AppsDOM = styled.div<AppsStyleProps>`
  position: relative;

  overflow-x: scroll;
  overflow-y: hidden;
  display: flex;
  flex-wrap: nowrap;
  height: 100%;

  font-size: 11px;

  &::-webkit-scrollbar {
    display: none;
  }

  ${props => (props.device === 'IPhone' && props.orientation === 'portrait')
          && `
                height: 65%;

                font-size: 8px;
            `}
  ${props => (props.device === 'IPhone' && props.orientation === 'landscape')
          && `
            `}
  ${props => (props.device === 'IPad' && props.orientation === 'portrait')
          && `
            `}
  ${props => (props.device === 'IPad' && props.orientation === 'landscape')
          && `
            `}
`
const Screen = styled.div<ScreenStyleProps>`
  display: flex;
  flex-wrap: wrap;
  flex-shrink: 0;
  width: 100%;
  padding: 20px 17px 25px 17px;

  ${props => (props.device === 'IPhone' && props.orientation === 'portrait')
          && `
                padding: 8% 3% 0
            `}
  ${props => (props.device === 'IPhone' && props.orientation === 'landscape')
          && `
                padding: 1% 7% 0 7%
            `}
  ${props => (props.device === 'IPad' && props.orientation === 'portrait')
          && `
            `}
  ${props => (props.device === 'IPad' && props.orientation === 'landscape')
          && `
            `}
`
const Cell = styled.div<CellStyleProps>`
  min-width: 0;

  ${props => props.colMax && `width: calc(100% / ${props.colMax});`}
  ${props => props.rowMax && `height: calc(100% / ${props.rowMax});`}
`

type AppsRefType<T> = {
  current: T | null
}

interface AppsProps {
  appsRef: AppsRefType<HTMLDivElement>;
  pagesCount: number;
  appsPerPage: number;
  items: string[];
  colMax: number;
  rowMax: number;
  setPage: (selPageIndex: number) => void;
  setAppsItems: (newItems: string[], selPageIndex: number) => void;
  onStartApp: (item: string) => void;
}

interface setPositionsProps {
  itemIndex: number,
  selCellIndex: number,
  selPageIndex: number
}

const Apps: FC<AppsProps> = ({
                               appsRef,
                               pagesCount,
                               appsPerPage,
                               items,
                               colMax,
                               rowMax,
                               setPage,
                               setAppsItems,
                               onStartApp
                             }) => {
  const {device, orientation} = useAppSelector(appsSelector)
  const [isDrag, setIsDrag] = useState(false);
  const [width, setWidth] = useState(0);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const apps = appsRef?.current;

    if (apps) {
      setWidth(apps.clientWidth);
      setHeight(apps.clientHeight);
    }
  }, [])

  const setPositions = ({itemIndex, selCellIndex, selPageIndex}: setPositionsProps) => {
    const newItems = [...items];
    newItems[itemIndex] = newItems.splice(selCellIndex, 1, newItems[itemIndex])[0]
    setAppsItems(newItems, selPageIndex)
  }
  const handleDrag = debounce(({pageIndex, itemIndex, data}: handleFuncProps) => {
    if (!isDrag) return

    const col = getCol({itemIndex, colMax})
    const selAbsCol = getAbsCol({pageIndex, data, col, width, colMax})
    const selPageIndex = getPageIndex({selAbsCol, colMax})

    if ((selPageIndex >= pagesCount) || (selPageIndex < 0))
      return;

    setPage(selPageIndex)
  }, 50)
  const handleStop = ({pageIndex, itemIndex, data}: handleFuncProps) => {
    setIsDrag(false);

    const col = getCol({itemIndex, colMax})
    const selAbsCol = getAbsCol({pageIndex, data, col, width, colMax})
    const selPageIndex = getPageIndex({selAbsCol, colMax})

    if ((selPageIndex >= pagesCount) || (selPageIndex < 0)) return

    const absRow = Math.ceil(((itemIndex + 1) % appsPerPage) / colMax) || rowMax
    const stepY = height / rowMax
    const selAbsRow = Math.round((data.y + (absRow * stepY)) / stepY)

    if ((selAbsRow > rowMax) || (selAbsRow < 1)) return

    const selCol = selAbsCol - (selPageIndex * colMax)

    if ((pageIndex === selPageIndex) && (col === selCol) && (absRow === selAbsRow)) return

    const selCellIndex = getSelCellIndex({selPageIndex, selCol, selAbsRow, appsPerPage, colMax});
    setPositions({itemIndex, selCellIndex, selPageIndex})
  }

  return (
    <AppsDOM ref={appsRef} device={device} orientation={orientation}>
      {
        [...Array(pagesCount)].map((page, pageIndex) => {
          const startCount = appsPerPage * pageIndex
          const apps = items.slice(startCount, startCount + appsPerPage)

          return (
            <Screen key={pageIndex} device={device} orientation={orientation}>
              {
                apps.map((item, i) => {
                  const itemIndex = startCount + i

                  return !item
                    ? <Cell key={itemIndex} colMax={colMax} rowMax={rowMax}/>
                    : <Cell key={item} colMax={colMax} rowMax={rowMax}>
                      <App
                        item={item}
                        onClick={() => onStartApp(item)}
                        onStart={() => setIsDrag(true)}
                        onDrag={(data) => handleDrag({pageIndex, itemIndex, data})}
                        onStop={(data) => handleStop({pageIndex, itemIndex, data})}
                      />
                    </Cell>
                })
              }
            </Screen>
          )
        })
      }
    </AppsDOM>
  )
}

export default Apps;