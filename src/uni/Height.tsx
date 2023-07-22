import React, { FC, useEffect, useState } from 'react'
import { maxHeight } from './max_height';
import { input_styles, label } from './UniApp';

interface Props {
  toApp: (text: any) => void
  material: string
}

const Height: FC<Props> = ({ toApp, material }) => {

  const [mh, setMh] = useState(0)
  const [height, setHeight] = useState(1500)

  useEffect(() => {
    for (let i = 0; i < maxHeight.length; i++) {
      maxHeight[i][0] = maxHeight[i][0].toUpperCase().replaceAll('BO', 'BLACK-OUT').replaceAll('ВО', 'BLACK-OUT').replaceAll('_', '')
    }
    const elem = maxHeight.find((item: any) => item[0] == material)
    if (elem) setMh((+elem![3]) * 1000)
    toApp(height)
  }, [height])

  return (
    <>
      <div style={{ padding: '.25rem .5rem', fontSize: '.875rem', borderRadius: 5, position: 'relative', width: '100%' }}>
        <input
          defaultValue={height}
          style={input_styles}
          type="number"
          onChange={(e) => setHeight(+(e.target as HTMLInputElement).value)}
        />
        <label style={label}>высота, мм</label>
      </div>
    </>
  )
}

export { Height }