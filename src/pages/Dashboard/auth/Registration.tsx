import React, { useEffect } from 'react';
import bg from '../../../assets/taxiBgZoom.jpg'
import { Input } from 'antd';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAuth } from '../../../Store/useAuth';
import { useNavigate } from 'react-router-dom';

interface FormValues {
    name: string;
    email: string;
    phone: string;
    password: string;
    repeatPassword: string;
}

const Registration = (): React.ReactNode => {
    const nav = useNavigate()
    const { registration, response, setStatus } = useAuth()
    const validationSchema = Yup.object().shape({
        email: Yup.string().email('Invalid email address').required('Email is required'),
        password: Yup.string()
            .required('required')
            .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,30}$/,
                '8 characters, upper-lowercase, special character'
            ),
        repeatPassword: Yup.string()
            .oneOf([Yup.ref('password'), undefined], 'Passwords mismatch')
            .required('Repeat password'),
    });
    useEffect(()=>{
        if(response ===201){
            setStatus(0)
            nav('/login')
        }
    },[response])

    const initialValues: FormValues = {
        name: '',
        email: '',
        phone: '',
        password: '',
        repeatPassword: '',
    };
    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: (values: FormValues) => { 
            registration({
                email: values.email,
                name: values.name,
                phone:values.phone,
                password: values.password,
            })
        },
    });
    return (
        <div style={{ backgroundImage: `url(${bg})`, }} className={container}>
            <div className={coll}><h1 className={header}>BONJOUR TAXI</h1></div>
            <div className={coll}>

                <form className={form} onSubmit={formik.handleSubmit}>
                    <div className={inputBox}>
                        <label className={label} htmlFor="email">Email</label>
                        <div className={formik.touched.email && formik.errors.email? boxRed: box}>
                        
                            <Input
                                allowClear
                                className={input}
                                id="email"
                                name="email"
                                type="email"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.email}
                            />
                        </div>
                        <span className={warn}>{formik.touched.email && formik.errors.email ? (
                            <div>{formik.errors.email}</div>
                        ) : null}</span>
                        <span className={response===409? warn: 'hidden'}>User already exists</span>
                    </div>
                    <div className={inputBox}>
                        <label className={label} htmlFor={"name"}>Name</label>
                        <div className={box}>
                        <Input
                            allowClear
                            className={input}
                            id="name"
                            name="name"
                            type="text"
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            value={formik.values.name}
                        />
                        </div>
                    </div>



                    <div className={inputBox}>
                        <label className={label} htmlFor="phone">Phone</label>
                        <div className={box}>
                        <Input
                            allowClear
                            className={input}
                            type="tel"
                            inputMode="numeric" 
                            pattern="[0-9]*"
                            id="phone"
                            name="phone"
                            onChange={(e) => {
                                const numericValue = e.target.value.replace(/\D/g, '');
                                formik.handleChange({
                                    target: {
                                        name: 'phone',
                                        value: numericValue,
                                    },
                                });
                            }}
                            onBlur={formik.handleBlur}
                            value={formik.values.phone}
                        />
                        </div>
                    </div>

                    <div  className={inputBox}>
                        <label className={label} htmlFor="password">Password</label>
                        
                        <div className={formik.touched.password && formik.errors.password ?boxRed: box}>
                            <Input.Password
                                allowClear
                                className={input}
                                id="password"
                                name="password"
                                type="password"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.password}
                            />
                        </div>
                        <span className={warn+ ' top-full' }>{formik.touched.password && formik.errors.password ? (
                            <div>{formik.errors.password}</div>
                        ) : null}</span>
                    </div>

                    <div  className={inputBox}>
                        <label className={label} htmlFor="repeatPassword">Password</label>
                        <div className={formik.touched.repeatPassword && formik.errors.repeatPassword ?boxRed: box}>
                            <Input.Password
                                allowClear
                                className={input}
                                id="repeatPassword"
                                name="repeatPassword"
                                type="password"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.repeatPassword}
                            />
                        </div>
                        <span className={warn+ ' top-full'}>{formik.touched.repeatPassword && formik.errors.repeatPassword ? (
                            <div>{formik.errors.repeatPassword}</div>
                        ) : null}</span>
                    </div>

                    <button className={response===102? buttonDis: button} type="submit">Sign up</button>
                    <button onClick={()=>nav('/login')} className={button2}>Sign in</button>
                </form>

            </div>

        </div>
    );
};

export default Registration;

const label = ' text-gray-500 pl-3'
const warn = 'text-xs text-rose-500  absolute right-6 '
const button = ' duration-100 mb-4 bg-white border-2 border-purple-500 w-[300px] py-3 rounded-full text-purple-500 active:text-white active:bg-purple-500  '
const button2 = ' duration-100 bg-white border-2 border-green-400 w-[300px] py-3 rounded-full text-green-400 active:text-white active:bg-green-400  '
const buttonDis = 'bg-gray-400 mb-4 border-2 border-gray-400 w-[300px] py-3 rounded-full text-white '
const box = 'rounded-lg w-full border border-purple-700'
const boxRed = 'rounded-lg w-full border border-rose-500'
const input = ' rounded-lg  px-4 py-4 border border-purple-700'
const inputBox = 'relative flex flex-col mb-6 w-[300px]'
const form = 'flex flex-col items-center justify-center shadow-xl bg-gray-50 w-3/4 ml-auto '
const coll = 'flex w-1/2  justify-center'
const header = 'text-7xl roboto text-white mt-[200px] ml-40 px-10 py-6 rounded-xl bg-opacity-40 shadow-xl bg-black self-start'
const container = 'flex min-w-screen min-h-screen h-full no-repeat  bg-cover '