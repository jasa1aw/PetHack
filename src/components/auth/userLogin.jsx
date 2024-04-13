'use client'
import Link from "next/link"
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import {LogIn, authorize } from '@/app/store/slices/authSlice';

export default function UserLogin() {
    // const isAuth = useSelector((state) => state.auth.isAuth)
    let e = 'test@gmail.com';
    let p = 'qwerty123'
    const router = useRouter()
    const dispatch = useDispatch()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [visible, setVisible] = useState(false);
    const [error, setError] = useState(false);
    const login = () => {
        if(email !== e || password !== p){
            setError(true)
        }else{
            router.push('/registration')
        }
    }
    return(
        <section className="login-page">
            <div className="rightSection">
                <div className="logo">
                    <img src="/img/Illustration.svg" alt="Not Found" className="img" />
                </div>
                <h1 className="h1">Lorby</h1>
                <h3 className="h3">Твой личный репетитор</h3>
            </div>
            <div className="leftSection">
                {error && <div className={error ? "loginError show" : "loginError"}>
                    <p>Неверный логин или пароль</p>
                </div>}
                <h2 className="h2">Вэлком бэк!</h2>
                <input type="text" className="input" placeholder="Введите логин" value={email} onChange={(e) => setEmail(e.target.value)}/>
                <div className="inputBoxPassword">
                    <input type={visible ? 'text' : 'password'} className="inputPassword" placeholder="Введите пароль" value={password} onChange={(e) => setPassword(e.target.value)}/>
                    <div className="checkPassword" onClick={() => setVisible(!visible)}>
                        {visible ? <img src="/img/eyeOpen.svg" alt="Not Found" className="img"/> : <img src="/img/eye.svg" alt="Not Found" className="img" /> }
                    </div>
                </div>
                <button className="button" onClick={login}>Войти</button>
                <Link href={"/registration"} className="link">У меня еще нет аккаунта</Link>
            </div>
            {/* <ToastContainer position="top-right"/> */}
        </section>
    )
}