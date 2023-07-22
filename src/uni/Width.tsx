import React, { FC, useEffect, useState } from 'react'
import { label, input_styles } from './UniApp'

interface Props {
  toApp: (text: any) => void
}

const Width: FC<Props> = ({ toApp }) => {
  const [width, setWidth] = useState(600)

  useEffect(() => {
    toApp(width)
  }, [width])

  return (
    <>
      <div style={{ padding: '.25rem .5rem', fontSize: '.875rem', borderRadius: 5, position: 'relative', width: '100%' }}>
        <input
          defaultValue={width}
          style={input_styles}
          type="number"
          onChange={(e) => setWidth(+(e.target as HTMLInputElement).value)}
        />
        <label style={label}>ширина, мм</label>
      </div>
    </>
  )
}

export { Width }