import React, {ReactElement} from 'react'

interface Props {
  name?: string
}

export default function LoadingSpinner(props: Props): ReactElement {
  return (
    <div className="ui active inverted dimmer">
      <div className="ui text loader large">
        Lade {props.name || 'Daten'}...
      </div>
    </div>
  )
}
