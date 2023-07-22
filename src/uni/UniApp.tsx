import React, { useEffect, useRef, useState } from "react";
import moment from 'moment'
import { al } from "./amigologo";
import { Width } from "./Width";
import { Height } from "./Height";
import ExcelJS from 'exceljs'
import { rulonka } from './rulonka'
import { rulonka_tkani } from './rulonka_tkani'
import FileSaver from 'file-saver'

export const label: any = {
  position: 'absolute',
  top: 0,
  left: 0,
  zIndex: 2,
  height: '100%',
  padding: '1rem .75rem',
  overflow: 'hidden',
  textAlign: 'start',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
  pointerEvents: 'none',
  border: 'none',
  transformOrigin: '0 0',
  transition: 'opacity .1s ease-in-out,transform .1s ease-in-out',
  transform: "scale(.85) translateY(-.5rem) translateX(.15rem)"
}

export const input_styles = {
  paddingTop: '1.625rem',
  paddingBottom: '.625rem',
  lineHeight: 1.25,
  width: '100%',
  border: '1px solid blue'
}

export default function UniApp() {

  const mat: any = useRef(null)
  const col: any = useRef(null)
  const upr: any = useRef(null)

  const [w, setWidth] = useState(0)
  const [h, setHeight] = useState(0)
  const [text, setText] = useState(rulonka[3]['НАИМЕНОВАНИЕ'])
  const [clo, setClo] = useState('300715-0225 белый')
  const [u, setU] = useState('прав')
  const [radioUni, setRadioUni] = useState('1')

  const onClo = () => {
    if (col.current) {
      setClo(col.current.options[col.current.selectedIndex].text)
    }
  }

  const onText = () => {
    if (mat.current) {
      setText(mat.current.options[mat.current.selectedIndex].text)
    }
  }

  const onchangeFilter = () => {
    onText()
  }

  const onchanupr = () => {
    if (upr.current) {
      setU(upr.current.options[upr.current.selectedIndex].text)
    }
  }

  let num = 1, stroka: any[], tabl: any[]
  tabl = []

  const [arrtabl, setArrtabl] = useState(tabl)
  const [spisok, setSpisok] = useState('')

  stroka = [radioUni === '1' ? 'УНИ-1' : 'УНИ-2', text, clo, Math.ceil(w) / 1000, Math.ceil(h) / 1000, num, u, 'ст', 'бел', 'да']

  const go = async () => {
    let date = 'Дата ' + moment().format("DD") + '.' + moment().format("MM") + '.' + moment().format("YYYY") + 'г.'
    let dt = moment().format("DD") + moment().format("MM") + moment().format("YY")
    const workbook = new ExcelJS.Workbook();
    const wsh = workbook.addWorksheet(radioUni === '1' ? 'UNI-1' : 'UNI-2')
    wsh.getRow(3).height = 35
    wsh.getCell('A3').value = 'Название фирмы "ГерАрт"'
    wsh.getCell('A3').font = {
      name: 'Times New Roman',
      size: 16
    }
    wsh.getCell('C3').value = date
    wsh.getCell('C3').font = {
      name: 'Times New Roman',
      size: 16
    }
    const colu = [
      { name: 'Вид изделия' },
      { name: 'Наименование ткани' },
      { name: 'Цвет ткани' },
      { name: radioUni === '1' ? 'Ширина по ребру штапика UNI (м)' : 'Ширина по линии стыка штапика и рамы, UNI2 (м)' },
      { name: radioUni === '1' ? 'Высота по ребру штапика UNI (м)' : 'Высота по линии стыка штапика и рамы, UNI2 (м)' },
      { name: 'Кол-во\n(шт.)' },
      { name: 'Управление\n(прав / лев)' },
      { name: 'Длина\nуправления\n(м)' },
      { name: 'Цвет\nфурнитуры' },
      { name: 'Со свер-\nлением' },
      { name: 'На скотч' },
      { name: 'Натяжитель\nцепи' },
    ]
    const massA = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L']
    const widthCol = [23, 32, 27, 12, 12, 12, 12, 12, 12, 12, 12, 12]

    wsh.getRow(5).height = 155
    wsh.getRow(5).font = { name: 'Times New Roman', size: 11 };
    wsh.getRow(4).font = { name: 'Times New Roman', size: 11 };
    wsh.mergeCells('D4:E4');
    wsh.mergeCells('J4:K4');
    wsh.mergeCells('A4:A5');
    wsh.mergeCells('B4:B5');
    wsh.mergeCells('C4:C5');
    wsh.mergeCells('F4:F5');
    wsh.mergeCells('G4:G5');
    wsh.mergeCells('H4:H5');
    wsh.mergeCells('I4:I5');
    wsh.mergeCells('L4:L5');
    wsh.getCell('D4').value = radioUni === '1' ? 'UNI' : 'UNI2'
    wsh.getCell('D4').font = {
      name: 'Times New Roman',
      size: 14,
      bold: true
    };
    wsh.getCell('D4').alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
    wsh.getCell('D4').border = {
      top: { style: 'medium' },
      left: { style: 'medium' },
      bottom: { style: 'medium' },
      right: { style: 'medium' }
    }
    wsh.getCell('D4').fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'dbeef4' },
    }
    wsh.getCell('J4').value = 'Тип установки'
    wsh.getCell('J4').font = {
      name: 'Times New Roman',
      size: 11
    };
    wsh.getCell('J4').alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
    wsh.getCell('J4').border = {
      top: { style: 'medium' },
      left: { style: 'medium' },
      bottom: { style: 'medium' },
      right: { style: 'medium' }
    }
    wsh.getCell('J4').fill = {
      type: 'pattern',
      pattern: 'solid',
      fgColor: { argb: 'dbeef4' },
    }


    for (let i = 0; i < 12; i++) {
      let col = massA[i]
      let c = col + 5
      let w = widthCol[i]
      wsh.getColumn(col).width = w
      wsh.getCell(c).alignment = { vertical: 'middle', horizontal: 'center', wrapText: true };
      wsh.getCell(c).border = {
        top: { style: 'medium' },
        left: { style: 'thin' },
        bottom: { style: 'medium' },
        right: { style: 'thin' }
      }
      wsh.getCell(c).value = colu[i].name
      wsh.getCell(c).fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'dbeef4' },
      }
    }

    wsh.getCell('A4').border = {
      left: { style: 'medium' },
      top: { style: 'medium' },
      bottom: { style: 'medium' },
    }
    wsh.getCell('L4').border = {
      right: { style: 'medium' },
      top: { style: 'medium' },
      bottom: { style: 'medium' },
    }

    wsh.getCell('A1').value = 'Бланк заказа на кассетные рулонные шторы UNI1, UNI2, UNI1-Зебра, UNI2-Зебра, UNI с пружиной'
    wsh.getCell('A1').alignment = { horizontal: 'right' }
    wsh.getCell('A1').font = { name: 'Times New Roman', size: 14, bold: true }
    wsh.mergeCells('A1:L1')

    for (let i = 0; i < lengthSpisok; i++) {
      let rw = 6 + i
      wsh.spliceRows(rw, 0, arrtabl[i])
      wsh.getRow(rw).alignment = { vertical: 'middle', horizontal: 'center' }
      wsh.getRow(rw).font = { name: 'Times New Roman', size: 14 }
      for (let j = 0; j < 12; j++) {
        let col = massA[j]
        let c = col + rw
        wsh.getCell(c).border = { left: { style: 'thin' }, bottom: { style: 'thin' }, right: { style: 'thin' } }
      }
      wsh.getRow(rw).height = 58
      wsh.getRow(rw + 1).height = 43

      wsh.getCell('D' + rw).numFmt = '0.000'
      wsh.getCell('E' + rw).numFmt = '0.000'

      wsh.getCell('A' + (rw + 1)).value = '   Подпись___________                             Печать__________                                 Оплату гарантируем_____________                    С техническими особенностями ознакомлены___________'

    }
    const myBase64Image = "data:image/png;base64," + al
    const imageId2 = workbook.addImage({
      base64: myBase64Image,
      extension: 'png',
    })
    wsh.addImage(imageId2, 'J' + (8 + lengthSpisok) + ':K' + (11 + lengthSpisok));

    const buffer = await workbook.xlsx.writeBuffer();
    //var FileSaver = require('file-saver')
    FileSaver.saveAs(new Blob([buffer]), `Заявка_УНИ${radioUni}_${dt}.xlsx`)
  }

  let [lengthSpisok, setLengthSpisok] = useState(1)

  const addbut: any = useRef(null)
  const xlsxbut: any = useRef(null)

  let [strokaToStr, setStrokaToStr] = useState('')

  const add = () => {
    setStrokaToStr(strokaToStr + '\n' + stroka.join(', ').replace(/УНИ/g, lengthSpisok + '. УНИ'))
    arrtabl.push(stroka)
    setArrtabl(arrtabl)
    setLengthSpisok(arrtabl.length + 1)
  }
  useEffect(() => {
    setSpisok(strokaToStr)
  }, [strokaToStr])

  const onchWidth = (value: React.SetStateAction<number>) => {
    setWidth(value)
  }

  const onchHeight = (value: React.SetStateAction<number>) => {
    setHeight(value)
  }

  const [arrColors, setArrColors] = useState(<option>BELIY</option>)

  useEffect(() => {
    const colors: any = rulonka_tkani.filter((i: any) => i['LABEL-3'].slice(0, 4) === text.slice(0, 4))
    const options = colors.map((i: any, n: number) => <option key={n} value={i['LABEL-5']}>{i['LABEL-5']}</option>)
    setArrColors(options.length > 0 ? options : <option>бесцветный</option>)
  }, [text])

  const [kartinki, setKartinki] = useState<any>(<></>)
  useEffect(() => {
    setKartinki(rulonka_tkani.filter((i: any) => i['LABEL-3'].slice(0, 4) === text.slice(0, 4)).map((i: any, n: number) => (
      <div style={{ flexDirection: 'row', display: 'flex', justifyContent: 'center' }} key={Date.now() + Math.random() * 999 + n}>
        <img key={Date.now() + Math.random() * 999999 + n} src={`img/${i['LABEL-1']}` ? `img/${i['LABEL-1']}` : `img/${i['LABEL-2']}` || undefined} width='200px' height='200px' alt={i['LABEL-3']} />
        <img key={Date.now() + Math.random() * 999999999 + n} src={`img/${i['LABEL-2']}` ? `img/${i['LABEL-2']}` : `img/${i['LABEL-1']}` || undefined} width='200px' height='200px' alt={i['LABEL-3']} />
      </div>
    )))
  }, [arrColors])

  return (
    <div className="mt-2 pt-0" style={{ backgroundColor: 'white', marginTop: '0.5rem', paddingTop: '0px' }}>
      <form className="" noValidate>
        <div className="flex-row" style={{ flexDirection: 'row', display: 'flex', justifyContent: 'space-around' }} onChange={(e) => setRadioUni((e.target as HTMLTextAreaElement).value)}>

          <input type="radio" id="UNI-1" name="uni" value='1' defaultChecked />
          <label htmlFor="UNI-1">UNI-1</label>

          <input type="radio" id="UNI-2" name="uni" value='2' />
          <label htmlFor="UNI-2">UNI-2</label>
        </div>

        <div style={{ flexDirection: 'row', display: 'flex', justifyContent: 'space-around' }}>
          <Width toApp={onchWidth} />
          <Height toApp={onchHeight} material={text} />
        </div>


        <div style={{ padding: '.25rem .5rem', fontSize: '.875rem', borderRadius: 5, position: 'relative' }}>
          <select style={input_styles} id='mat' className="form-select" defaultValue={rulonka[3]['НАИМЕНОВАНИЕ']} onChange={onchangeFilter} ref={mat}>
            {rulonka.map((i: any, n: number) => <option key={n} value={i['НАИМЕНОВАНИЕ'] ? i['НАИМЕНОВАНИЕ'] : 0}>{i['НАИМЕНОВАНИЕ']}</option>)}
          </select>
          <label style={label} htmlFor="mat">материал</label>
        </div>

        <div style={{ padding: '.25rem .5rem', fontSize: '.875rem', borderRadius: 5, position: 'relative' }} id="torender">
          <select style={input_styles} id='col' className="form-select" defaultValue='белый' onChange={onClo} ref={col}>
            {arrColors}
          </select>
          <label style={label} htmlFor="col">цвет</label>
        </div>

        <div style={{ flexDirection: 'row', display: 'flex', justifyContent: 'space-around' }}>

          <div style={{ padding: '.25rem .5rem', fontSize: '.875rem', borderRadius: 5, position: 'relative' }}>
            <input style={input_styles} defaultValue={1} />
            <label style={label}>кол-во, шт</label>
          </div>

          <div style={{ padding: '.25rem .5rem', fontSize: '.875rem', borderRadius: 5, position: 'relative' }}>
            <select name="upr" id='upr' style={input_styles} defaultValue="прав" onChange={onchanupr} ref={upr}>
              <option value="прав">прав</option>
              <option value="лев">лев</option>
              <option value="лев">лев/прав</option>
            </select>
            <label style={label} htmlFor="upr">управление</label>
          </div>

        </div>

        <div style={{ padding: '.25rem .5rem', fontSize: '.875rem', borderRadius: 5, position: 'relative' }}>
          <textarea title="text-area" style={input_styles} value={spisok} readOnly rows={lengthSpisok * 2}></textarea>
        </div>
      </form >
      <div style={{ flexDirection: 'row', display: 'flex', justifyContent: 'space-around' }}>

        {(w > 350 && w < 3300 && h > 350 && h < 3300 && num > 0 && num < 100) &&
          <div style={{ width: '60px', padding: '6px 15px 10px 17px', height: '40px', border: '1px solid blue', backgroundColor: 'white' }}>
            <button id="add" className="btn btn-outline-primary mt-1 " onClick={add} ref={addbut}>++</button>
          </div>}

        {(arrtabl.length > 0) &&
          <div style={{ width: '60px', padding: '6px 15px 10px 17px', height: '40px', border: '1px solid blue', backgroundColor: 'white' }}>
            <button id="xlsx" className="btn btn-outline-primary mt-1 " onClick={go} ref={xlsxbut}>xlsx</button>
          </div>}

      </div>
      <div>
        {kartinki}
      </div>
    </div >

  )

}