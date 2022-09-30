import React, {FC, useEffect} from 'react'

import deviceImg from '../../../public/img/ipad-mini-horizontal.png'
import Device from "../../Device";
import {useAppDispatch} from "../../../app/hooks";
import {setDevice, setOrientation} from "../../../features/apps/appsSlice";

const IPadPortrait: FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setDevice({device: 'IPad'}))
    dispatch(setOrientation({orientation: 'landscape'}))
  }, [])

  return (
    <Device deviceImg={deviceImg}/>
  )
}

export default IPadPortrait;
