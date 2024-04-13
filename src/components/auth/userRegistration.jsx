'use client'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faSquareCheck} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link"
import { useEffect, useRef, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import {LogIn, authorize } from '@/app/store/slices/authSlice';
// import { useForm, Controller } from 'react-hook-form';
// import * as yup from 'yup';
// import { yupResolver } from '@hookform/resolvers/yup'
// const schema = yup.object().shape({
//     password: yup
//         .string()
//         .min(8, 'Пароль должен содержать минимум 8 символов')
//         .max(15, 'Пароль должен содержать максимум 15 символов')
//         .matches(/[a-z]/, 'Пароль должен содержать строчные буквы')
//         .matches(/[A-Z]/, 'Пароль должен содержать прописные буквы')
//         .matches(/[0-9]/, 'Пароль должен содержать минимум 1 цифру')
//         .matches(/[!@#$%^&*(),.?":{}|<>]/, 'Пароль должен содержать минимум 1 спецсимвол'),
//     });

export default function UserRegistration() {
    const box1 = useRef()
    const box2 = useRef()
    const box3 = useRef()
    const box4 = useRef()


    

    // const { register, handleSubmit, errors, watch } = useForm({
    //     resolver: yupResolver(schema),
    // });
    // const [requirementsColor, setRequirementsColor] = useState('gray');
    
    // const handlePasswordChange = () => {
    //     const password = watch('password');
    //     if (schema.isValidSync({ password })) {
    //         setRequirementsColor('green');
    //     } else {
    //         setRequirementsColor('red');
    //     }
    // };
    
    // const isAuth = useSelector((state) => state.auth.isAuth)
    const router = useRouter()
    const dispatch = useDispatch()
    const [email, setEmail] = useState('');
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');
    const [visible, setVisible] = useState(false);
    const [step, setStep] = useState(1)
    const [code, setCode] = useState({1:'', 2:'', 3:'', 4: ''});
    const changeHandler = (e) => {
        setCode({[e.target.name]:e.target.value})
    }
    useEffect(() => {
        
    }, [code])
    return(
        <section className="registrationPage">
            <div className="backBtn">
                <div className="backIcon">
                    <img src="/img/chevronLeft.svg" alt="Not Found" />
                </div>
                <p>Назад</p>
            </div>
        {step == 1 && 
            <section className="login-page2">
                <div className="rightSection">
                    <div className="logo">
                        <img src="/img/Illustration.svg" alt="Not Found" className="img" />
                    </div>
                    <h1 className="h1">Lorby</h1>
                    <h3 className="h3">Твой личный репетитор</h3>
                </div>
                <div className="leftSection">
                    <h2 className="h2">Создать аккаунт <br /> Lorby</h2>
                    <input type="text" className="input" placeholder="Введите адрес почты" value={email} onChange={(e) => setEmail(e.target.value)}/>
                    <input type="text" className="input" placeholder="Придумай логин" value={login} onChange={(e) => setLogin(e.target.value)}/>
                    {/* <form onSubmit={handleSubmit(() => {})}>
                        <div className="inputBoxPassword">
                        <input type="password" name="password" onChange={handlePasswordChange} ref={register} className="inputPassword" placeholder="Пароль"
                        />
                        <div className="checkPassword" onClick={() => setVisible(!visible)}>
                            {visible ? (<img src="/img/eyeOpen.svg" alt="Not Found" className="img" />) : (<img src="/img/eye.svg" alt="Not Found" className="img" />)}
                        </div>
                        </div>
                        {errors.password && <p style={{ color: 'red' }}>{errors.password.message}</p>}
                    </form>
                    <div style={{ color: requirementsColor }}>
                        <p>&#8226; От 8 до 15 символов</p>
                        <p>&#8226; Строчные и прописные буквы</p>
                        <p>&#8226; Минимум 1 цифра</p>
                        <p>&#8226; Минимум 1 спецсимвол (!, #, $...)</p>
                    </div> */}

                    <div className="inputBoxPassword">
                        <input type={visible ? 'text' : 'password'} className="inputPassword" placeholder="Создай пароль" value={password} onChange={(e) => setPassword(e.target.value)}/>
                        <div className="checkPassword" onClick={() => setVisible(!visible)}>
                            {visible ? <img src="/img/eyeOpen.svg" alt="Not Found" className="img"/> : <img src="/img/eye.svg" alt="Not Found" className="img" /> }
                        </div>
                    </div>
                    <ul type="disc">
                        <li>От 8 до 15 символов</li>
                        <li>Строчные и прописные буквы</li>
                        <li>Минимум 1 цифра</li>
                        <li>Минимум 1 спецсимвол (!, #, $...)</li>
                    </ul>
                    <div className="inputBoxPassword">
                        <input type={visible ? 'text' : 'password'} className="inputPassword" placeholder="Повтори пароль" value={rePassword} onChange={(e) => setRePassword(e.target.value)}/>
                        <div className="checkPassword" onClick={() => setVisible(!visible)}>
                            {visible ? <img src="/img/eyeOpen.svg" alt="Not Found" className="img"/> : <img src="/img/eye.svg" alt="Not Found" className="img" /> }
                        </div>
                    </div>
                    <button className="button" >Далее</button>
                </div>
            </section>
        }
        {step == 2 && 
            <section className="login-page2">
                <div className="rightSection">
                    <div className="logo">
                        <img src="/img/Illustration.svg" alt="Not Found" className="img" />
                    </div>
                    <h1 className="h1">Lorby</h1>
                    <h3 className="h3">Твой личный репетитор</h3>
                </div>
                <div className="leftSection">
                    <h2 className="h2">Введи 4-значный код, <br/> высланный на <br/> {email}</h2>
                    <div className="verifyCodeBox">
                        <input type="text" className="inputVerifyCode" maxlength="1" ref={box1} name="1" onChange={changeHandler}/>
                        <input type="text" className="inputVerifyCode" maxlength="1" ref={box2} name="2" onChange={changeHandler}/>
                        <input type="text" className="inputVerifyCode" maxlength="1" ref={box3} name="3" onChange={changeHandler}/>
                        <input type="text" className="inputVerifyCode" maxlength="1" ref={box4} name="4" onChange={changeHandler}/>
                    </div>
                    <button className="button verifyBtn">Подтвердить</button>
                    <p className="sendAgain">Выслать код повторно</p>
                </div>
            </section>
        }  
        </section>
    )
    
}