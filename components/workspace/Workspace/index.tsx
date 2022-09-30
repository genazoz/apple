import React, {FC, useEffect, useRef, useState} from 'react'
import styled from "styled-components";
import {setCookie} from "nookies";

import {useAppDispatch, useAppSelector} from "../../../app/hooks";
import {appsSelector, selectData, setData} from "../../../features/apps/appsSlice";
import StatusBar from '../StatusBar'
import DockBar from "../DockBar";
import Pagination from "../Pagination";
import Apps from "../Apps";
import ModalApp from "../ModalApp";

interface WorkspaceProps {
  device: string;
  orientation: string;
}

const WorkspaceDOM = styled.div<WorkspaceProps>`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 10px 0 15px;

  ${props => (props.device === 'IPhone' && props.orientation === 'portrait')
          && `
                gap: 10px 0;
                padding: 4.5% 0 3%;
            `}
  ${props => (props.device === 'IPhone' && props.orientation === 'landscape')
          && `
                padding: 5px 0 5px;
            `}
  ${props => (props.device === 'IPad' && props.orientation === 'portrait')
          && `
            `}
  ${props => (props.device === 'IPad' && props.orientation === 'landscape')
          && `
            `}
`

const Workspace: FC = () => {
  const dispatch = useAppDispatch();
  const {device, orientation} = useAppSelector(appsSelector)
  const [colMax, setColMax] = useState(orientation === 'portrait' ? 4 : 5);
  const [rowMax, setRowMax] = useState(orientation === 'portrait' ? 5 : 4);
  const [appsPerPage, setPageItemsCount] = useState(colMax * rowMax);
  const [curDesktopIndex, setCurPageIndex] = useState(0);
  const appsRef = useRef<HTMLDivElement>(null);
  const apps = useAppSelector(selectData);
  const dockApps = apps[`${device}_${orientation}_dock_apps`];
  const desktopApps = getAppsGridItems(apps[`${device}_${orientation}_apps`]);
  const pagesCount = desktopApps.length / appsPerPage

  const [modalAppItem, setRunAppItem] = useState<string | null>(null);

  useEffect(() => {
    setColMax(orientation === 'portrait' ? 4 : 5);
    setRowMax(orientation === 'portrait' ? 5 : 4);
    setPageItemsCount(colMax * rowMax)
  }, [orientation])

  function trimLeftDesktops(appsItems: string[]): string[] {
    if (!appsItems.slice(0, appsPerPage).find((item: string) => !!item)) {
      return trimLeftDesktops(appsItems.slice(appsPerPage))
    }
    return appsItems
  }

  function trimRightDesktops(appsItems: string[]): string[] {
    if (!appsItems.slice(-appsPerPage).find((item: string) => !!item)) {
      return trimRightDesktops(appsItems.slice(0, -appsPerPage))
    }
    return appsItems
  }

  function setPage(pageIndex: number) {
    const appsElement = appsRef.current

    if (!appsElement) return

    const width = appsElement.clientWidth
    const stepX = width / colMax

    appsElement.scrollTo({
      top: 0,
      left: (colMax * stepX) * pageIndex,
      behavior: 'smooth',
    })

    setCurPageIndex(pageIndex);
  }

  function setEmptyPages(appsItems: string[]) {
    let _appsItems = trimRightDesktops(trimLeftDesktops(appsItems))

    if (_appsItems.slice(-appsPerPage).find((item: string) => !!item)) {
      _appsItems = [..._appsItems, ...Array(appsPerPage)]
    }

    return _appsItems
  }

  const setAppsItems = (appsItems: string[]) => {
    appsItems = setEmptyPages(appsItems)
    setCookie(null, `${device}_${orientation}_apps`, JSON.stringify(appsItems), {
      maxAge: 30 * 24 * 60 * 60,
      path: "/",
    })
    dispatch(setData({data: {...apps, [`${device}_${orientation}_apps`]: appsItems}}))
  }

  const handleStartApp = (item: string) => {
    setRunAppItem(item)
  }

  const handleStopApp = () => {
    setRunAppItem(null);
  }

  function getAppsGridItems(apps: string[]) {
    const emptyCellsNum = appsPerPage - (apps.length % appsPerPage)

    return setEmptyPages([...apps, ...Array(emptyCellsNum)])
  }

  return (
    <WorkspaceDOM device={device} orientation={orientation}>
      <StatusBar/>
      <Apps
        appsRef={appsRef}
        pagesCount={pagesCount}
        appsPerPage={appsPerPage}
        items={desktopApps}
        colMax={colMax}
        rowMax={rowMax}
        setPage={setPage}
        setAppsItems={setAppsItems}
        onStartApp={handleStartApp}
      />
      <Pagination
        curDesktopIndex={curDesktopIndex}
        pagesCount={pagesCount}
        setPage={setPage}
      />
      <DockBar
        items={dockApps}
        onStartApp={handleStartApp}
      />
      {
        modalAppItem
        && <ModalApp item={modalAppItem} onStopApp={handleStopApp}/>
      }
    </WorkspaceDOM>
  )
}

export default Workspace;