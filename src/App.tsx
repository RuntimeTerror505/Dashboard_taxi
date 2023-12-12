import React, { useEffect } from "react"
import { useMain } from "./Store/useMain"
import Form from "./pages/Form/Form"
import en from './assets/english.png'
import fr from './assets/france.png'

import { TiInfoLarge } from "react-icons/ti";

import dayjs from "dayjs";

function App():React.ReactNode {
  const { activeCarId, setActiveCarId, isCars, isFrench, setIsFrench, setDay} = useMain()

  useEffect(()=>{
    ( dayjs().format('HH') > '05' && dayjs().format('HH') < '23') ? setDay(true): setDay(false)
  },[activeCarId,setActiveCarId,isCars,isFrench])


  return (
    <div className={container} >
      <div className={wrapper}>
        <div className={header}>
        <div className={lang} onClick={()=>setIsFrench(!isFrench)}>
          {isFrench 
            ?<><div style={{backgroundImage:`url(${fr})` }} className={'w-7 h-7 text-xs bg-center bg-cover bg-no-repeat'} ></div><div className={langItem} >EN</div></>
            :<><div style={{backgroundImage:`url(${en})` }} className={'w-7 h-7 text-xs bg-center bg-cover bg-no-repeat '} ></div><div  className={langItem} >FR</div></>
          }
        </div>
            <span className={taxiLabel}>
              Taxis
            </span>
        </div>
        
        <div className="flex h-full">
        <ul className={tabsContainer}>
            <li 
                className={activeCarId ===1  ? activeTab : activeCarId == 2 ? tab + ' rounded-br border-t  ' :  tab +"  rounded-tr border-b-gray-100" }
                onClick={()=> setActiveCarId(1) }
            >1<span className={isFrench?'font-light text-sm mx-[1px] w-3 text-gray-400 -translate-y-[6px] ':'font-light text-sm mx-[1px] w-3 text-gray-400 '}>{isFrench? 'er': 'st'}</span></li>
            <li 
                className={activeCarId===2 ? activeTab  : activeCarId ===3 ? tab + '  rounded-br ' : activeCarId===1 ? tab + ' rounded-tr ' : tab+ ' ' }
                onClick={()=>{
                  if(!isCars[1]) return
                  setActiveCarId(2)
                }}
            >+2<span className={isFrench?'font-light text-sm mx-[1px] w-3 text-gray-400 -translate-y-[6px] ':'font-light text-sm mx-[1px] w-3 text-gray-400 '}>{isFrench? 'e': 'nd'}</span></li>
            <li 
                className={activeCarId===3 ? activeTab  : activeCarId===4 ? tab + 'rounded-br ' : activeCarId===2 ? tab + '  rounded-tr': tab + ' '}
                onClick={()=>{
                  if(!isCars[2] || !isCars[1]) return
                  setActiveCarId(3)
                }}
            >+3<span className={isFrench?'font-light text-sm mx-[1px] w-3 text-gray-400 -translate-y-[6px] ':'font-light text-sm mx-[1px] w-3 text-gray-400 '}>{isFrench? 'e': 'rd'}</span></li>
            <li 
                className={activeCarId===4 ? activeTab  : activeCarId===5 ? tab + '  rounded-br ' : activeCarId===3 ? tab + ' rounded-tr': tab + ' '}
                onClick={()=>{
                  if(!isCars[3] || !isCars[2] || !isCars[1]) return
                  setActiveCarId(4)
                }}
            >+4<span className={isFrench?'font-light text-sm mx-[1px] w-3 text-gray-400 -translate-y-[6px] ':'font-light text-sm mx-[1px] w-3 text-gray-400 '}>{isFrench? 'e': 'th'}</span></li>
            <li 
                className={activeCarId===5 ? activeTab : activeCarId===4 ? tab + '  rounded-tr': tab + ' '}
                onClick={()=>{
                  if(!isCars[4] || !isCars[3] || !isCars[2] || !isCars[1]) return
                  setActiveCarId(5)
                }}
            >+5<span className={isFrench?'font-light text-sm mx-[1px] w-3 text-gray-400 -translate-y-[6px] ':'font-light text-sm mx-[1px] w-3 text-gray-400 '}>{isFrench? 'e': 'th'}</span></li>
            <li className={activeCarId===5 ? 'h-full pt-6 flex w-full justify-center rounded-tr border-r  border-t ' : ' pt-6 flex border-r justify-center w-full h-full  '}>
              <div className=" flex items-center text-2xl justify-center border-2 h-min rounded-full border-orange-400 text-orange-400">
                <TiInfoLarge className='cursor-pointer '/>
              </div>
            </li>
        </ul>
          <Form />
        </div>
      </div>
      
    </div>
  )
}
export default App



const taxiLabel = ' font-bold -translate-x-3 text-blue-700 '
const activeTab = 'px-1 flex items-center justify-end text-lg border border-l-0  cursor-pointer border-t border-b border-white bg-white'
const tab = 'px-1 text-lg flex items-center justify-end border border-l-0  cursor-pointer border-t border-b  bg-white'
const tabsContainer = 'flex flex-col mr-2 font-bold h-full m-0 w-[43px] '

const lang = ' flex rounded h-[20px] cursor-pointer mb-4 self-start'
const langItem = 'text-xl px-1 text-blue-700 '

const header = 'flex flex-col w-full p pt-4 px-4 shadow mb-[1px]'

const wrapper = ' relative w-full flex flex-col max-w-[768px]'
const container = 'flex w-full min-w-screen min-h-screen justify-center '