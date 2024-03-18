import React, {  useState } from 'react';
import { useMain } from '../../../Store/useMain';
import { BsPeople } from 'react-icons/bs';
import { Input, Select } from 'antd';
import MailInput from '../../../UI/MailInput';
import PhoneNumberInput from '../../../UI/PhoneInput';
import { useStore } from '../../../Store';
import { useTranslation } from 'react-i18next';

const PersonalInfoSection = () => {
    const {t} = useTranslation()
    const {
        orders,
        id,
        isFrench,
        setOrder,
    } = useMain()
    const { store } = useStore()

    const options1 = isFrench ? store.titleListF.map(item => ({ value: item, label: item })) : store.titleList.map(item => ({ value: item, label: item }))
    const [isPhone, setIsPhone] = useState(true)

    const [names, setNames] = useState(0)
    const [emails, setEmails] = useState(0)
    const [phones, setPhones] = useState(0)
    const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    const closePhone = (index: number) => {
        if(index === 2) {
            if (orders[id].phone3.length > 10) {
                setOrder(orders[id].phone3, 'phone2')
                setPhones(phones-1);
            }
            setOrder('','phone3')
            setPhones(phones-1)

        } else {
            setOrder('','phone3')
            setPhones(phones-1)
        }
    }

    const closeName = (index: number) => {
        if(index === 2) {
            if (orders[id].name3.length > 2 || orders[id].title3) {
                setOrder(orders[id].name3, 'name2')
                setOrder(orders[id].title3, 'title2')
                setOrder('','title3')
                setOrder('','name3')
                return setNames(names-1);
            }
            setOrder('','title2')
            setOrder('','name2')
            setNames(names-1);

        } else {
            
            setOrder('','title3')
            setOrder('','name3')
            setNames(names-1);
        }
    }
    const closeEmails = (index: number) => {
        if(index === 2) {
            if (pattern.test(orders[id].email3)) {
                setOrder(orders[id].email3,'email2')
                setOrder('@','email3')
                return setEmails(emails-1)
            }
            setOrder('@', 'email2')
            setEmails(emails-1)
        } else {
            setOrder('@', 'email3')
            setEmails(emails-1)
        }
    }

    return (
        <div className={personalInfo}>
            <header className={header}>Personal info</header>
        
            <main className={main}>

                <section className={section}>
                    <div className={(orders[id].title && orders[id].name.length > 2) ? nameBox : nameBoxRed}>
                        <span className='icon'><BsPeople /></span>
                        <Select allowClear placeholder={t('title')} style={{ width: 110, height: 40 }} onChange={(value)=> {setOrder(value, 'title')}} options={options1} value={orders[id].title || null} />
                        <Input allowClear value={orders[id].name} placeholder={t('name_placeholder')} onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>  setOrder(e.target.value, 'name') } style={{ maxWidth: 180, borderRadius: 5, height: 30, paddingLeft: 0, }} />
                    </div>

                    <div className={names >0?nameBox: 'hidden'}>
                        <span className='icon'><BsPeople /></span>
                        <Select 
                            allowClear 
                            placeholder={t('title')} 
                            style={{ width: 110, height: 40 }} 
                            onChange={(value)=> setOrder(value, 'title2')} 
                            options={options1} 
                            value={orders[id].title2 || null} 
                        />
                        <Input allowClear value={orders[id].name2} placeholder={t('name_placeholder2')} onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setOrder(e.target.value, 'name2') } style={{ maxWidth: 180, borderRadius: 5, height: 30, paddingLeft: 0 }} />
                        <div className={nameClose} onClick={() => closeName(2)}>+</div>
                    </div>

                    <div className={(names === 0 && orders[id].title && orders[id].name.length > 2 ) ?addNameBtn: 'hidden'} onClick={() => setNames(names+1)}>+ name</div>

                    <div className={names === 2? nameBox: 'hidden'}>
                        <span className='icon'><BsPeople /></span>
                        <Select allowClear placeholder={t('Title')} style={{ width: 110, height: 40 }} onChange={(value)=> setOrder(value, 'title3')} options={options1} value={orders[id].title3 || null} />
                        <Input allowClear value={orders[id].name3} placeholder={t('name_placeholder3')} onChange={(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setOrder(e.target.value, 'name3')} style={{ maxWidth: 180, borderRadius: 5, height: 30, paddingLeft: 0 }} />
                        <div className={nameClose} onClick={() => closeName(3)}>+</div>
                    </div>
                    
                    <div className={(names === 1 && orders[id].title2 && orders[id].name2.length > 2) ?addNameBtn: 'hidden'} onClick={() => setNames(names+1)}>+ name</div>
                </section>

                <section className={section}>
                    <div className={emailBox}>
                        <MailInput value={orders[id].email} mainMail={true} noMail={pattern.test(orders[id].email)} onChange={(value)=> setOrder(value, 'email')} placeholder={t('email_placeholder')} />
                    </div>

                    <div className={emails>0 ? emailBox: 'hidden'}>
                        <MailInput value={orders[id].email2} mainMail={true} noMail={true} onChange={(value)=> setOrder(value, 'email2')} placeholder={t('email_placeholder2')} />
                        <div className={nameClose} onClick={() => closeEmails(2)}>+</div>
                    </div>
                    <div className={(emails ===0 && pattern.test(orders[id].email)) ? addNameBtn: 'hidden'} onClick={() => setEmails(emails+1)}>+ email</div>

                    <div className={emails===2? emailBox: 'hidden'}>
                        <MailInput value={orders[id].email3} mainMail={true} noMail={true} onChange={(value)=>setOrder(value, 'email3')} placeholder={t('email_placeholder3')} />
                        <div className={nameClose} onClick={() => closeEmails(3)}>+</div>
                    </div>
                    <div className={(emails ===1 && pattern.test(orders[id].email2)) ? addNameBtn: 'hidden'} onClick={() => setEmails(emails+1)}>+ email</div>

                </section>

                <section className={section}>
                    <div className={isPhone ? nameBox  : nameBoxRed }>
                        <PhoneNumberInput setValidation={setIsPhone} type={1} value={orders[id].phone} onChange={(value)=>setOrder(value, 'phone')} />
                    </div>

                    <div className={phones > 0 ? nameBox: 'hidden'} >
                        <PhoneNumberInput setValidation={setIsPhone} type={2} value={orders[id].phone2} onChange={(value)=>setOrder(value, 'phone2')} />
                        <div className={nameClose} onClick={() => closePhone(2)}>+</div>
                    </div>

                    <div className={phones ===1 ? addNameBtn: 'hidden'} onClick={()=>setPhones(phones+1)}>+ phone</div>

                    <div className={phones === 2 ? nameBox: 'hidden'} >
                        <PhoneNumberInput setValidation={setIsPhone} type={2} value={orders[id].phone3} onChange={(value)=>setOrder(value, 'phone3')} />
                        <div className={nameClose} onClick={() => closePhone(3)}>+</div>
                    </div>

                    <div className={phones ===0 ? addNameBtn: 'hidden'} onClick={()=>setPhones(phones+1)}>+ phone</div>
                </section>

            </main>
    </div>
    );
};

export default PersonalInfoSection;


const header = 'text-blue-600 w-1/3'
const main ="flex space-x-2 justify-between"

const nameClose = ' absolute -top-2 -right-2 px-[6px] rotate-45 py-[2px] text-center bg-rose-600 text-white rounded-full cursor-pointer z-10'

const nameBox = 'relative  flex items-center rounded-lg border '
const emailBox = 'relative  flex items-center rounded-lg  '
const nameBoxRed = 'relative border border-red-500 flex items-center rounded-lg border '
const addNameBtn = 'text-blue-500 cursor-pointer hover:text-blue-700 pl-4 w-[60px]'
const section = 'flex flex-col space-y-4 '

const personalInfo = 'flex flex-col w-full bg-white rounded border mb-5 p-4 text-xs  pb-10 border-gray-800'