import React, { useEffect } from 'react';
import bg from '../../../assets/taxiBgZoom.jpg'
import { Input } from 'antd';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useAuth } from '../../../Store/useAuth';
import { useNavigate } from 'react-router-dom';

interface FormValues {
    email: string;
    password: string;
}

const Login = (): React.ReactNode => {
    const nav = useNavigate()
    const { login, response, setStatus } = useAuth()
    const validationSchema = Yup.object().shape({
        email: Yup.string().email('Invalid email address').required('Email is required'),
        password: Yup.string()
            .required('required')
            .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,30}$/,
                '8 characters, upper-lowercase, special character'
            ),
    });

    useEffect(()=>{
        if(response ===201) {
            setStatus(0)
            nav('/')
        }
    },[response])

    const initialValues: FormValues = {
        email: '',
        password: '',
    };

    const formik = useFormik({
        initialValues,
        validationSchema,
        onSubmit: (values: FormValues) => { 
            login({
                email: values.email,
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

                    <div  className={inputBox}>
                        <label className={label} htmlFor="password">Password</label>
                        <div className={response === 401? warn:'hidden'}>Wrong password</div>
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

                    <button className={response===102? buttonDis: button} type="submit">Sign in</button>
                    <button onClick={()=>nav('/registration')} className={button2}>Sign up</button>

                </form>
            </div>

        </div>
    );
};

export default Login;

const label = ' text-gray-500 pl-3'
const warn = 'text-xs text-rose-500  absolute right-6 '
const button = ' duration-100 bg-white mb-3 border-2 border-purple-500 w-[300px] py-3 rounded-full text-purple-500 active:text-white active:bg-purple-500  '
const button2 = ' duration-100 bg-white  border-2 border-green-400 w-[300px] py-3 rounded-full text-green-400 active:text-white active:bg-green-400  '

const buttonDis = 'bg-gray-400 border-2 mb-3 border-gray-400 w-[300px] py-3 rounded-full text-white '
const box = 'rounded-lg w-full border border-purple-700'
const boxRed = 'rounded-lg w-full border border-rose-500'
const input = ' rounded-lg  px-4 py-4 border border-purple-700'
const inputBox = 'relative flex flex-col mb-6 w-[300px]'
const form = 'flex flex-col items-center justify-center shadow-xl bg-gray-50 w-3/4 ml-auto '
const coll = 'flex w-1/2  justify-center'
const header = 'text-7xl roboto text-white mt-[200px] ml-40 px-10 py-6 rounded-xl bg-opacity-40 shadow-xl bg-black self-start'
const container = 'flex min-w-screen min-h-screen h-full no-repeat  bg-cover '