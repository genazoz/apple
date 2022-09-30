import React, {FC, useEffect, useState} from 'react'

const Clock: FC = () => {
  const [time, setTime] = useState<string | null>(getCurrentTime());
  let runner: NodeJS.Timer | null = null;

  function getCurrentTime() {
    return new Date().toLocaleTimeString(
      [], {
        hour: '2-digit',
        minute: '2-digit'
      })
  }

  useEffect(() => {
      runner = setInterval(() => {
        setTime(getCurrentTime())
      }, 1000)

      return () => {
        if (runner) {
          clearInterval(runner)
        }
      }
    }
  )

  return <>
    {time}
  </>
}

export default Clock;
