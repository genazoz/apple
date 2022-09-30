import React, {FC, useEffect} from 'react'

import deviceImg from '../../../public/img/iphone5-vertical.png'
import Device from "../../Device";
import {useAppDispatch} from "../../../app/hooks";
import {setDevice, setOrientation} from "../../../features/apps/appsSlice";

const IPhonePortrait: FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setDevice({device: 'IPhone'}))
    dispatch(setOrientation({orientation: 'portrait'}))
  }, [])

  return (
    <Device deviceImg={deviceImg} />
  )
}

export default IPhonePortrait;
