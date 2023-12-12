import { useEffect, useState } from 'react';
import PhoneNumberInput from '../../../UI/components/PhoneInput';
import MailInput from '../../../UI/components/MailInput';
import { Input, Select } from 'antd';
import { BsPeople } from "react-icons/bs";
import { useMain } from '../../../Store/useMain';
import { useStore } from '../../../Store';
import React from 'react';

const InfoSection = () => {
    const { store } = useStore()
    const {
        isFrench,
        activeCarId,
        list, 
        setTitle,
        setTitle2,
        setTitle3,
        setName,
        setName2,
        setName3,
        setEmail,
        setEmail2,
        setEmail3,
        setPhone,
        setPhone2,
        setPhone3,
        setSteps,
    } = useMain()
    const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    const [isTitle, setIsTitle] = useState(true)
    const [isName, setIsName] = useState(true)
    const [isEmail, setIsEmail] = useState(true)
    const [isPhone, setIsPhone] = useState(true)
    const [noPhone, setNoPhone] = useState(true)
    const [trigger, setTrigger] = useState(false)

    const [isExtraNameOpen, setIsExtraNameOpen] = useState({
        1:false,
        2:false,
    })
    const [isExtraPhoneOpen, setIsExtraPhoneOpen] = useState({
        1:false,
        2:false,
    })
    const [isExtraEmailOpen, setIsExtraEmailOpen] = useState({
        1:false,
        2:false,
    })

    useEffect(()=>{
        setIsExtraNameOpen({ 1:list[activeCarId-1].name2.length>0 , 2:list[activeCarId-1].name3.length>0})
        setIsExtraEmailOpen({ 1:list[activeCarId-1].email2.length>1 , 2:list[activeCarId-1].email3.length>1})
        setIsExtraPhoneOpen({ 1:list[activeCarId-1].phone2.length>0 , 2:list[activeCarId-1].phone3.length>0})
    },[])

    function goNext(){
        setTrigger(true)
        setIsTitle(false)
        setIsName(false)
        setIsEmail(false)
        setNoPhone(false)

        if(list[activeCarId-1].name.length > 2) setIsName(true)
        if(list[activeCarId-1].title.length>1) setIsTitle(true)
        if(pattern.test(list[activeCarId-1].email)) setIsEmail(true)
        if(isPhone) setNoPhone(true)
    
        if(isTitle && isName &&  isPhone && isEmail && noPhone) setSteps(2)
    }

    useEffect(()=>{
        if(trigger) {
            setIsTitle(false)
            setIsName(false)
            setIsEmail(false)
            setNoPhone(false)
    
            setIsName(list[activeCarId-1].name.length > 2)
            setIsTitle(list[activeCarId-1].title.length>1)
            setIsEmail(pattern.test(list[activeCarId-1].email))
            setNoPhone(isPhone)
        }
    },[list[activeCarId-1], isPhone])
    
    const options1 = isFrench ? store.titleListF.map(item=>({value: item, label: item })) : store.titleList.map(item=>({value: item, label: item }))

    return (
        <section className={section}>
            <div className={extraContainer}>
                <div className={nameCard }>
                    <div className={ (isTitle && isName) ? box: box + '  border-red-500' }>
                        <span className='icon'><BsPeople/></span>
                        <Select allowClear  placeholder={isFrench? 'Titre':'Title' } style={{width: 118, height: 40}} onChange={setTitle} options={options1} value={list[activeCarId-1].title || null} />
                        <Input allowClear value={list[activeCarId-1].name} placeholder={isFrench? store.nameListF[0]:store.nameList[0] } onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=>{setName(e.target.value)}}style={{maxWidth:200, borderRadius: 5, height: 30}}/>
                    </div>
                </div>

                <div className={list[activeCarId-1].name.length>2 ? nameCard : 'hidden'}>
                    <div className={isExtraNameOpen[1] ? box : box + ' opacity-0'}>
                        <div className={(list[activeCarId-1].name === list[activeCarId-1].name2)? warn: 'hidden'}>name cannot be repeated</div>
                        {!isExtraNameOpen[1] &&  <div className='absolute -top-0 left-0 right-0 bottom-0 z-10 bg-white opacity-100 rounded cursor-not-allowed'></div>}
                        <span className='icon'><BsPeople/></span>
                        <Select placeholder={isFrench? 'Titre':'Title'  }style={{width: 118, height: 40}} onChange={setTitle2} options={options1} value={list[activeCarId-1].title2 || null}/> 
                        <Input value={list[activeCarId-1].name2} allowClear placeholder={isFrench? store.nameListF[1]:store.nameList[1] } onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=>setName2(e.target.value)} style={{maxWidth:200, borderRadius: 5, height: 30}}/>
                        
                    </div>
                    <button 
                        className={(isExtraNameOpen[1]) ? 'hidden' : addExtraBtn } 
                        onClick={()=>{
                                if(list[activeCarId-1].name2 && list[activeCarId-1].title2 && list[activeCarId-1].name3) {
                                    setTitle2(list[activeCarId-1].title3);
                                    setName2(list[activeCarId-1].name3);
                                    setTitle3('');
                                    setName3('');
                                    return setIsExtraNameOpen({ 1: true, 2:false })
                                }
                                setTitle2('');
                                setName2('');
                                setIsExtraNameOpen({ ...isExtraNameOpen, 1: !isExtraNameOpen[1] })
                            }}>
                        {`${ isFrench?'+ nom':'+ name'}`}
                    </button>
                    <button 
                        className={(isExtraNameOpen[1]) ? extraNameClose : 'hidden' } 
                        onClick={()=>{
                            if(list[activeCarId-1].name2 && list[activeCarId-1].title2 && list[activeCarId-1].name3) {
                                setTitle2(list[activeCarId-1].title3);
                                setName2(list[activeCarId-1].name3);
                                setTitle3('');
                                setName3('');
                                return setIsExtraNameOpen({ 1: true, 2:false })
                            }
                            setTitle2('');
                            setName2('');
                            setIsExtraNameOpen({ ...isExtraNameOpen, 1: !isExtraNameOpen[1] })
                        }}
                    ><span className='scale-[150%] font-bold rotate-45'>+</span></button>
                </div>
                
                <div className={list[activeCarId-1].name2.length<2 ? 'hidden': (isExtraNameOpen[1] || isExtraNameOpen[2])? nameCard : nameCard + ' border-white h-[32px]'}>
                    <div className={(list[activeCarId-1].name === list[activeCarId-1].name3 || list[activeCarId-1].name2 === list[activeCarId-1].name3)? warn: 'hidden'}>name cannot be repeated</div>
                    <div className={(isExtraNameOpen[2])? box: box +' opacity-0'}>
                        {!isExtraNameOpen[2] &&  <div className='absolute top-0 left-0 right-0 bottom-0 z-10 bg-white opacity-75 rounded cursor-not-allowed'></div>}
                        <span className='icon'><BsPeople/></span>
                        <Select placeholder={isFrench? 'Titre':'Title'  } style={{width: 118, height: 40}} onChange={setTitle3}options={options1} value={list[activeCarId-1].title3 || null}/> 
                        <Input  value={list[activeCarId-1].name3 } allowClear placeholder={isFrench? store.nameListF[2]:store.nameList[2] } onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=>setName3(e.target.value)} style={{maxWidth:200, borderRadius: 5, height: 30}}/>
                    </div>
                    {(isExtraNameOpen[1] || isExtraNameOpen[2]) 
                    && <button 
                            className={(isExtraNameOpen[2]) ? 'hidden' : addExtraBtn } 
                            onClick={()=>{
                                if(isExtraNameOpen[2]) {
                                    setName3('')
                                    setTitle3('Undefined')
                                }
                                setIsExtraNameOpen({ ...isExtraNameOpen, 2: !isExtraNameOpen[2] })
                            }}
                        >{`${(isExtraNameOpen[2]) ? isFrench?'Supprimer':'Delete' : isFrench?'+ nom':'+ name'}`}</button>}

                    {(isExtraNameOpen[1] || isExtraNameOpen[2]) 
                    && <button 
                            className={(isExtraNameOpen[2]) ? extraNameClose : 'hidden' } 
                            onClick={()=>{
                                if(isExtraNameOpen[2]) {
                                    setName3('')
                                    setTitle3('Undefined')
                                }
                                setIsExtraNameOpen({ ...isExtraNameOpen, 2: !isExtraNameOpen[2] })
                            }}
                        ><span className='scale-[150%] font-bold rotate-45'>{`${ isFrench?'+':'+'}`}</span></button>}
                </div>
            </div>

            <div className={extraContainer}>
                <div className={nameCard}>
                    <div className={box +' border-none '}>
                        <MailInput 
                            value={list[activeCarId-1].email} 
                            mainMail={true} 
                            noMail={isEmail} 
                            onChange={setEmail} 
                            placeholder={isFrench? store.emailListF[0]:store.emailList[0] }
                        />
                    </div>
                </div>
                
                <div className={pattern.test(list[activeCarId-1].email) ? nameCard : 'hidden'}>

                    <div className={isExtraEmailOpen[1] ? box + ' border-none ' : box + ' opacity-0'}>
                        <div className={(list[activeCarId-1].email === list[activeCarId-1].email2)? warn: 'hidden'}>email cannot be repeated</div>
                        {!isExtraEmailOpen[1] &&  <div className={'absolute -top-0 left-0 right-0 bottom-0 z-10 bg-white opacity-0 rounded cursor-not-allowed'}></div>}
                        <MailInput value={list[activeCarId-1].email2} mainMail={false} onChange={setEmail2} placeholder={isFrench? store.emailListF[1]:store.emailList[1]}/>
                    </div>
                    <button className={(isExtraEmailOpen[1]) ? 'hidden' : addExtraBtn } onClick={()=> setIsExtraEmailOpen({ ...isExtraEmailOpen, 1: true })}>
                        {isFrench?'+ courrier':'+ email'}
                    </button>
                    <button 
                        className={(isExtraEmailOpen[1]) ? extraNameClose : 'hidden' } 
                        onClick={()=>{
                            if(list[activeCarId-1].email2.length>1 && list[activeCarId-1].email3.length>1) {
                                setEmail2(list[activeCarId-1].email3)
                                setEmail3('@')
                                return   setIsExtraEmailOpen({ ...isExtraEmailOpen, 2: false })
                            }
                            setEmail2('@')
                            setIsExtraEmailOpen({ ...isExtraEmailOpen, 1: false })
                        }}
                    >
                        <span className='scale-[150%] font-bold rotate-45'>{`${ isFrench?'+':'+'}`}</span>
                    </button>  
                </div>
                
                <div className={(!pattern.test(list[activeCarId-1].email2)) ? 'hidden' : nameCard + ' border-none'}>
                    <div className={isExtraEmailOpen[2] ? box +' border-none ': box + ' opacity-0 '}>    
                        <div className={(list[activeCarId-1].email2 === list[activeCarId-1].email3 || list[activeCarId-1].email === list[activeCarId-1].email3)? warn: 'hidden'}>email cannot be repeated</div>
                        <div className={isExtraEmailOpen[2]? 'hidden':'absolute top-0 left-0 right-0 bottom-0 z-10 bg-white opacity-75 rounded cursor-not-allowed'}></div>
                        
                        <MailInput value={list[activeCarId-1].email3} onChange={setEmail3}placeholder={isFrench? store.emailListF[2]:store.emailList[2] }/>
                    </div>
                    
                    <button className={(isExtraEmailOpen[2]) ? ' hidden ' : addExtraBtn } onClick={()=>{setIsExtraEmailOpen({ ...isExtraEmailOpen, 2: true })}}>
                        {isFrench?'+ courrier':'+ email'}
                    </button>
                    <button className={(isExtraEmailOpen[2]) ? extraNameClose : ' hidden ' } onClick={()=>{
                                    setEmail3('@')
                                    setIsExtraEmailOpen({ ...isExtraEmailOpen, 2: false })
                                }}>
                        <span className='scale-[150%] font-bold rotate-45'>+</span>
                    </button>
                </div>
            </div>

            <div className={extraContainer}>
                <div className={noPhone ? extraCard +' border z-30': extraCard+ ' border border-red-500 z-30' } >
                    <PhoneNumberInput  setValidation={setIsPhone} type={1} value={list[activeCarId-1].phone} onChange={setPhone}/>
                </div>

                <div className={list[activeCarId-1].phone.length>=10 ? extraCard + ' z-20' : 'hidden'}>
                    <div className={( list[activeCarId-1].phone === list[activeCarId-1].phone2)? warn: 'hidden'}>phone cannot be repeated</div>
                    <div className={isExtraPhoneOpen[1]? box : box+ ' opacity-0 '}>
                        {!isExtraPhoneOpen[1] &&  <div className='absolute top-0 left-0 right-0 bottom-0 z-10 bg-white opacity-75 rounded cursor-not-allowed'></div>} 
                        <PhoneNumberInput  setValidation={setIsPhone} type={3}  value={list[activeCarId-1].phone2} onChange={setPhone2}/>
                    </div>
                    <button 
                        className={(isExtraPhoneOpen[1]) ? 'hidden' : addExtraBtn } 
                        onClick={()=>{
                            if(list[activeCarId-1].phone2 && list[activeCarId-1].phone3) {
                                setPhone2(list[activeCarId-1].phone3)
                                setPhone3('')
                                return setIsExtraPhoneOpen({ ...isExtraPhoneOpen, 2: false})
                            }
                            setPhone2('')
                            setIsExtraPhoneOpen({ ...isExtraPhoneOpen, 1: !isExtraPhoneOpen[1] })
                        }}
                    > 
                        {isFrench?'+ téléphone':'+ phone'} 
                    </button>
                    <button 
                        className={(isExtraPhoneOpen[1]) ? extraNameClose : 'hidden ' } 
                        onClick={()=>{
                            if(list[activeCarId-1].phone2 && list[activeCarId-1].phone3) {
                                setPhone2(list[activeCarId-1].phone3)
                                setPhone3('')
                                return setIsExtraPhoneOpen({ ...isExtraPhoneOpen, 2: false})
                            }
                            setPhone2('')
                            setIsExtraPhoneOpen({ ...isExtraPhoneOpen, 1: !isExtraPhoneOpen[1] })
                        }}
                    > 
                        <span className='scale-[150%] font-bold rotate-45'>{`${ isFrench?'+':'+'}`}</span>
                    </button>      
                </div>

                <div className={list[activeCarId-1].phone2.length < 10 ? 'hidden' : nameCard}>
                    <div className={( list[activeCarId-1].phone === list[activeCarId-1].phone3 || list[activeCarId-1].phone2 === list[activeCarId-1].phone3)? warn: 'hidden'}>phone cannot be repeated</div>
                    <div className={isExtraPhoneOpen[2]? box: box + ' opacity-0 '}>
                        {!isExtraPhoneOpen[2] &&  <div className='absolute top-0 left-0 right-0 bottom-0 z-10 bg-white opacity-75 rounded cursor-not-allowed'></div>}
                        {(isExtraPhoneOpen[1] || isExtraPhoneOpen[2]) &&  <>
                            <PhoneNumberInput  setValidation={setIsPhone} type={2}  value={list[activeCarId-1].phone3} onChange={setPhone3}/>
                        </>}
                    </div>
                    
                    <button className={(isExtraPhoneOpen[2]) ? 'hidden' : addExtraBtn } onClick={()=>{
                            setPhone3('')
                            setIsExtraPhoneOpen({ ...isExtraPhoneOpen, 2: !isExtraPhoneOpen[2] })
                                }}>
                        {isFrench?'+ téléphone':'+ phone'}
                    </button>
                    <button className={(isExtraPhoneOpen[2]) ? extraNameClose : 'hidden' } onClick={()=>{
                            setPhone3('')
                            setIsExtraPhoneOpen({ ...isExtraPhoneOpen, 2: !isExtraPhoneOpen[2] })
                                }}>
                        <span className='scale-[150%] font-bold rotate-45'>{`${ isFrench?'+':'+'}`}</span>
                    </button>
                </div>
            </div>
            <div className=" w-full flex justify-end max-w-[400px]">
                <div 
                    className="bg-green-400 p-2 px-3 rounded-full cursor-pointer border text-white border-black active:bg-green-300"
                    onClick={goNext}
                >{isFrench? 'Suivant': 'Next'}</div>
            </div>
        </section>
    );
};

export default InfoSection;


const box = ' border rounded bg-white flex items-center w-full '
const warn = 'absolute -top-[15px] left-4 text-xs z-20 text-red-500'
const nameCard = 'relative flex max-w-[400px] w-[100%] relative'
const addExtraBtn = "absolute p-2 py-1 flex justify-center border border-gray-500 bg-green-400 rounded text-xs cursor-pointer left-0"

const extraNameClose = " my-auto ml-2 text-black w-6  h-6 border-gray-800 border  items-center flex justify-center bg-red-500 rounded cursor-pointer  left-[102%]"

const extraCard = ' flex relative max-w-[400px] rounded w-full'
const extraContainer = 'flex flex-col w-full  space-y-4 items-center'

const section = 'flex flex-col pt-10 space-y-6 items-center justify-between w-full  max-w-[576px] border-none'