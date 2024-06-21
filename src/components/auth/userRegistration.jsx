'use client'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faSquareCheck, faXmark} from "@fortawesome/free-solid-svg-icons";
import axios from 'axios';
import { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import {SignUp} from '@/app/store/slices/authSlice';

export default function UserRegistration() {
    const upperLowerCase = (str) =>{
        return /[a-z]/.test(str) && /[A-Z]/.test(str)
    }
    const digitCheck = (str) => {
        return /\d/.test(str)
    }
    const specialSymbolCheck = (str) => {
        return /[!@#$%^*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(str)
    }

    
    const router = useRouter()
    const dispatch = useDispatch()

    const [email, setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');
    const [verificationStatus, setVerificationStatus] = useState(null);

    const [visible, setVisible] = useState(false);
    const [visible2, setVisible2] = useState(false);
    const [step, setStep] = useState(1)

    const [codes, setCodes] = useState(['', '', '', '']);
    const inputRefs = [useRef(), useRef(), useRef(), useRef()];

    const handleChange = (index, e) => {
        const { value } = e.target;
        setCodes(prevCodes => {
        const newCodes = [...prevCodes];
        newCodes[index] = value;
        return newCodes;
        });
        if (value && index < inputRefs.length - 1) {
        inputRefs[index + 1].current.focus();
        }
    };
    const handleKeyDown = (index, e) => {
        if (e.key === 'Backspace' && index > 0 && !codes[index]) {
            inputRefs[index - 1].current.focus();
        }
    };
    const handleSubmit = async () => {
        const code = codes.join('');
        try {
            const res = await axios.post('https://www.challenge-neobook.org/lorby/authentication/email-confirm/', { code });
            if (res.status === 200) {
                setVerificationStatus('success');
                dispatch(authorize(email, username, password, rePassword))
                router.push('/home')
            } else {
                setVerificationStatus('error');
            }
        } catch (error) {
            console.error('Error:', error);
            setVerificationStatus('error');
        }
    };
    const regBtn = () => {
        if(email.length > 0 && password.length > 0){
            console.log('work');
            dispatch(SignUp(email, username, password, rePassword));
            setStep(2)
        }
    }
    const reSendCode = async () => {
        try {
            const res = await axios.post(`https://www.challenge-neobook.org/lorby/authentication/resend-confirmation-code/${ email }`);
        } catch (error) {
            console.error('Error:', error);
        }
    };
    
    return(
        <>
            {step == 1 && 
                <section className="registrationPage">
                    <div className="backBtn">
                        <div className="backIcon" onClick={() => router.push('/login')}>
                            <img src="/img/chevronLeft.svg" alt="Not Found" />
                        </div>
                        <p>Назад</p>
                    </div>
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
                            <input type="text" className="input" placeholder="Придумай логин" value={username} onChange={(e) => setUsername(e.target.value)}/>
                            <div className="inputBoxPassword">
                                <input type={visible ? 'text' : 'password'} className="inputPassword" placeholder="Создай пароль" value={password} onChange={(e) => setPassword(e.target.value)}/>
                                <div className="checkPassword" onClick={() => setVisible(!visible)}>
                                    {visible ? <img src="/img/eyeOpen.svg" alt="Not Found" className="img"/> : <img src="/img/eye.svg" alt="Not Found" className="img" /> }
                                </div>
                            </div>
                            <ul>
                                <li style={{color: password.length === 0 ? "#767676" : (password.length > 8 && password.length < 15 ? "#1BA228" : "#EC0000")}}>
                                    От 8 до 15 символов
                                    {password.length === 0 ? "" : (password.length > 8 && password.length < 15 ?  <FontAwesomeIcon icon={faSquareCheck} style={{color: "#1BA228",}} /> 
                                    : <FontAwesomeIcon icon={faXmark} style={{color: "#EC0000",}} />)}
                                </li>
                                <li style={{color: password.length === 0 ? "#767676" : (upperLowerCase(password) ? "#1BA228" : "#EC0000")}}>
                                    Строчные и прописные буквы
                                    {password.length === 0 ? "" : (upperLowerCase(password) ?  <FontAwesomeIcon icon={faSquareCheck} style={{color: "#1BA228",}} /> 
                                    : <FontAwesomeIcon icon={faXmark} style={{color: "#EC0000",}} />)}
                                </li>
                                <li style={{color: password.length === 0 ? "#767676" : (digitCheck(password) ? "#1BA228" : "#EC0000")}}>
                                    Минимум 1 цифра
                                    {password.length === 0 ? "" : (digitCheck(password) ?  <FontAwesomeIcon icon={faSquareCheck} style={{color: "#1BA228",}} /> 
                                    : <FontAwesomeIcon icon={faXmark} style={{color: "#EC0000",}} />)}
                                </li>
                                <li style={{color: password.length === 0 ? "#767676" : (specialSymbolCheck(password) ? "#1BA228" : "#EC0000")}}>
                                    Минимум 1 спецсимвол (!, #, $...)
                                    {password.length === 0 ? "" : (specialSymbolCheck(password) ?  <FontAwesomeIcon icon={faSquareCheck} style={{color: "#1BA228",}} /> 
                                    : <FontAwesomeIcon icon={faXmark} style={{color: "#EC0000",}} />)}
                                </li>
                            </ul>
                            <div className="inputBoxPassword">
                                <input type={visible2 ? 'text' : 'password'} className="inputPassword" placeholder="Повтори пароль" value={rePassword} onChange={(e) => setRePassword(e.target.value)}/>
                                <div className="checkPassword" onClick={() => setVisible2(!visible2)}>
                                    {visible2 ? <img src="/img/eyeOpen.svg" alt="Not Found" className="img"/> : <img src="/img/eye.svg" alt="Not Found" className="img" /> }
                                </div>
                            </div>
                            <button className="button" onClick={regBtn}>Далее</button>
                        </div>
                    </section>
                </section>    
            }
            {step == 2 && 
                <section className="registrationPage">
                    <div className="backBtn">
                        <div className="backIcon" onClick={() => setStep(1)}>
                            <img src="/img/chevronLeft.svg" alt="Not Found" />
                        </div>
                        <p>Назад</p>
                    </div>
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
                                {codes.map((code, index) => (
                                    <input
                                        className="inputVerifyCode"
                                        key={index}
                                        ref={inputRefs[index]}
                                        type="text"
                                        maxLength="1"
                                        value={code}
                                        onChange={e => handleChange(index, e)}
                                        onKeyDown={e => handleKeyDown(index, e)}
                                        style={{ border: verificationStatus === 'error' ? '1px solid red' : '' }}
                                    />
                                ))}
                            </div>
                            <button className="button verifyBtn" onClick={handleSubmit}>Подтвердить</button>
                            <p className="sendAgain" onClick={reSendCode}>Выслать код повторно</p>
                        </div>
                    </section>
                </section>
            }  
        </>
    )
    
}