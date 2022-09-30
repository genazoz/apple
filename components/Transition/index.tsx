import {Transition as ReactTransition, TransitionGroup,} from "react-transition-group"

import {ReactChild} from "react"

type TransitionKind<RC> = {
  children: RC
  location: string
}

const TIMEOUT: number = 200

const getTransitionStyles: any = {
  entering: {
    position: `absolute`,
    opacity: 0,
    transform: `translateX(-100px)`,
  },
  entered: {
    transition: `opacity ${TIMEOUT}ms ease-in-out, transform ${TIMEOUT}ms ease-in-out`,
    opacity: 1,
    transform: `translateX(0)`,
  },
  exiting: {
    transition: `opacity ${TIMEOUT}ms ease-in-out, transform ${TIMEOUT}ms ease-in-out`,
    opacity: 0,
    transform: `translateX(100px)`,
  },
}

const Transition: React.FC<TransitionKind<ReactChild>> = ({ children, location }) => {
  return (
    <TransitionGroup style={{position: "relative"}}>
      <ReactTransition
        key={location}
        timeout={{
          enter: TIMEOUT,
          exit: TIMEOUT,
        }}
      >
        {(status) => (
          <>
            <div style={{...getTransitionStyles[status]}} className={`page-${status}`}>
              {children}
            </div>
          </>
        )}
      </ReactTransition>
    </TransitionGroup>
  )
}

export default Transition;