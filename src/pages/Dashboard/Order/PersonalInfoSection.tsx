import React, { useState } from 'react';
import { useMain } from '../../../Store/useMain';
import { BsPeople } from 'react-icons/bs';
import { Input, Select } from 'antd';
import MailInput from '../../../UI/components/MailInput';
import PhoneNumberInput from '../../../UI/components/PhoneInput';
import { useStore } from '../../../Store';

const PersonalInfoSection = () => {
    const {
        orders,
        isFrench,
        setOrder,
    } = useMain()
    console.log(orders[0].title)
    const { store } = useStore()
    const options1 = isFrench ? store.titleListF.map(item => ({ value: item, label: item })) : store.titleList.map(item => ({ value: item, label: item }))
    const [isPhone, setIsPhone] = useState(true)

    const [names, setNames] = useState({ 1: false, 2: false })
    const [emails, setEmails] = useState({ 1: false, 2: false })
    const [phones, setPhones] = useState({ 1: false, 2: false })
    const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    return (
        <div className={personalInfo}>
        <div className='pb-2'>
            <div className='text-blue-600 w-1/3'>Personal info</div>
        </div>
        <div className="flex space-x-2 justify-between">
            {/* __________________________________________________name________________________________________________             */}
            <div className=' flex flex-col space-y-4'>
                <div className={(orders[0].title && orders[0].name.length > 2) ? nameBox : nameBox + '  border-red-500'}>
                    <span className='icon'><BsPeople /></span>
                    <Select allowClear placeholder={isFrench ? 'Titre' : 'Title'} style={{ width: 110, height: 40 }} onChange={(value)=> {setOrder(value, 'title')}} options={options1} value={orders[0].title || null} />
                    <Input allowClear value={orders[0].name} placeholder={isFrench ? store.nameListF[0] : store.nameList[0]} onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>  setOrder(e.target.value, 'name') } style={{ maxWidth: 180, borderRadius: 5, height: 30, paddingLeft: 0, }} />
                </div>
                {(orders[0].title && orders[0].name.length > 2 && !names[1]) && <div className={addNameBtn} onClick={() => setNames({ 1: true, 2: false })}>+ name</div>}
                {(orders[0].title && orders[0].name.length > 2 && names[1]) && <div className={nameBox}>
                    <span className='icon'><BsPeople /></span>
                    <Select allowClear placeholder={isFrench ? 'Titre' : 'Title'} style={{ width: 110, height: 40 }} onChange={(value)=> setOrder(value, 'title2')} options={options1} value={orders[0].title2 || null} />
                    <Input allowClear value={orders[0].name2} placeholder={isFrench ? store.nameListF[0] : store.nameList[0]} onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setOrder(e.target.value, 'name2') } style={{ maxWidth: 180, borderRadius: 5, height: 30, paddingLeft: 0 }} />
                    <div className={nameClose} onClick={() => {
                        if (orders[0].name3.length > 2 || orders[0].title3) {
                            setOrder(orders[0].name3, 'name2')
                            setOrder(orders[0].title3, 'title2')
                            setOrder('','title2')
                            setOrder('','name3')
                            return setNames({ 1: true, 2: false });
                        }
                        setOrder('','title2')
                        setOrder('','name2')
                        setNames({ 1: false, 2: false })
                    }}>+</div>
                </div>}
                {(orders[0].title2 && orders[0].name2.length > 2 && !names[2]) && <div className={addNameBtn} onClick={() => setNames({ 1: true, 2: true })}>+ name</div>}
                {(orders[0].title2 && orders[0].name2.length > 2 && names[2]) && <div className={nameBox}>
                    <span className='icon'><BsPeople /></span>
                    <Select allowClear placeholder={isFrench ? 'Titre' : 'Title'} style={{ width: 110, height: 40 }} onChange={(value)=> setOrder(value, 'title3')} options={options1} value={orders[0].title3 || null} />
                    <Input allowClear value={orders[0].name3} placeholder={isFrench ? store.nameListF[0] : store.nameList[0]} onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setOrder(e.target.value, 'name3')} style={{ maxWidth: 180, borderRadius: 5, height: 30, paddingLeft: 0 }} />
                    <div className={nameClose} onClick={() => {
                        setOrder('','title3')
                        setOrder('','name3')
                        setNames({ 1: true, 2: false })
                    }}>+</div>
                </div>}
            </div>
            {/* _____________________________________________________________email________________________________________________ */}

            <div className='flex flex-col space-y-4'>
                <div className={nameBox + 'border-none'}>
                    <MailInput value={orders[0].email} mainMail={true} noMail={pattern.test(orders[0].email)} onChange={(value)=> setOrder(value, 'email')} placeholder={isFrench ? store.emailListF[0] : store.emailList[0]} />
                </div>

                {(pattern.test(orders[0].email) && !emails[1]) && <div className={addNameBtn} onClick={() => setEmails({ 1: true, 2: false })}>+ email</div>}
                {(pattern.test(orders[0].email) && emails[1]) && <div className={nameBox + ' border-none '}>
                    <MailInput value={orders[0].email2} mainMail={true} noMail={true} onChange={(value)=> setOrder(value, 'email2')} placeholder={isFrench ? store.emailListF[0] : store.emailList[0]} />
                    <div className={nameClose} onClick={() => {
                        if (pattern.test(orders[0].email3)) {
                            setOrder(orders[0].email3,'email2')
                            setOrder('@','email3')
                            return setEmails({ 1: true, 2: false });
                        }
                        setOrder('@', 'email2')
                        setEmails({ 1: false, 2: false })
                    }}>+</div>
                </div>}

                {(pattern.test(orders[0].email2) && !emails[2]) && <div className={addNameBtn} onClick={() => setEmails({ 1: true, 2: true })}>+ email</div>}
                {(pattern.test(orders[0].email2) && emails[2]) && <div className={nameBox + ' border-none '}>
                    <MailInput value={orders[0].email3} mainMail={true} noMail={true} onChange={(value)=>setOrder(value, 'email3')} placeholder={isFrench ? store.emailListF[0] : store.emailList[0]} />
                    <div className={nameClose} onClick={() => {
                        setOrder('@', 'email3')
                        setEmails({ 1: true, 2: false })
                    }}>+</div>
                </div>}
            </div>
            {/* _____________________________________________________________phone________________________________________________ */}

            <div className='flex flex-col space-y-4'>
                <div className={isPhone ? nameBox + ' border ' : nameBox + ' border border-red-500 '} >
                    <PhoneNumberInput setValidation={setIsPhone} type={1} value={orders[0].phone} onChange={(value)=>setOrder(value, 'phone')} />
                </div>
                {(isPhone && !phones[1]) && <div className={addNameBtn} onClick={() => setPhones({ 1: true, 2: false })}>+ phone</div>}
                {(isPhone && phones[1]) && <div className={nameBox} >
                    <PhoneNumberInput setValidation={setIsPhone} type={2} value={orders[0].phone2} onChange={(value)=>setOrder(value, 'phone2')} />
                    <div className={nameClose} onClick={() => {
                        if (orders[0].phone3.length > 10) {
                            setOrder(orders[0].phone3, 'phone3')
                            return setPhones({ 1: true, 2: false });
                        }
                        setOrder('','phone3')
                        setPhones({ 1: true, 2: false })
                    }}>+</div>
                </div>}

                {(orders[0].phone2.length > 10 && !phones[2]) && <div className={addNameBtn} onClick={() => setPhones({ 1: true, 2: true })}>+ phone</div>}
                {(orders[0].phone2.length > 10 && phones[2]) && <div className={nameBox} >
                    <PhoneNumberInput setValidation={setIsPhone} type={2} value={orders[0].phone3} onChange={(value)=>setOrder(value, 'phone3')} />
                    <div className={nameClose} onClick={() => {
                        setOrder('','phone3')
                        setPhones({ 1: true, 2: false })

                    }}>+</div>
                </div>}
            </div>

        </div>
    </div>
    );
};

export default PersonalInfoSection;

const nameClose = ' absolute -top-2 -right-2 px-[6px] rotate-45 py-[2px] text-center bg-rose-600 text-white rounded-full cursor-pointer z-10'

const personalInfo = 'flex flex-col w-full bg-white rounded border mb-5 p-4 text-xs  pb-10'
const nameBox = 'relative flex items-center rounded-lg border '
const addNameBtn = 'text-blue-500 cursor-pointer hover:text-blue-700 pl-4 w-[60px]'
