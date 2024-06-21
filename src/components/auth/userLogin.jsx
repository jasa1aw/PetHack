'use client'
import Link from "next/link"
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import {authorize } from '@/app/store/slices/authSlice';
import { END_POINT } from '@/config/end_point';

export default function UserLogin() {
    // const isAuth = useSelector((state) => state.auth.isAuth)
    let e = 'test@gmail.com';
    let p = 'qwerty123'
    const router = useRouter()
    const dispatch = useDispatch()
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [visible, setVisible] = useState(false);
    const [error, setError] = useState(false);
    const Login =  (data) => {
        console.log(data)
        // try {
        //     const res = await axios.post(`${END_POINT}/login/`, {username, password }, {
        //         headers: {
        //             'Content-Type': 'application/json'
        //         }
        //     });
        //     if (res.status === 200) {
        //         setError(null);
        //         dispatch(authorize(res.data))
        //         router.push('/home')
        //     } else {
        //         setError(true)
        //     }
        // } catch (error) {
        //     console.error('Error:', error);
        // }
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
                {error && <div className='loginError'>
                    <p>Неверный логин или пароль</p>
                </div>}
                <h2 className="h2">Вэлком бэк!</h2>
                <input type="text" className="input" placeholder="Введите логин" value={username} onChange={(e) => setUsername(e.target.value)}/>
                <div className="inputBoxPassword">
                    <input type={visible ? 'text' : 'password'} className="inputPassword" placeholder="Введите пароль" value={password} onChange={(e) => setPassword(e.target.value)}/>
                    <div className="checkPassword" onClick={() => setVisible(!visible)}>
                        {visible ? <img src="/img/eyeOpen.svg" alt="Not Found" className="img"/> : <img src="/img/eye.svg" alt="Not Found" className="img" /> }
                    </div>
                </div>
                <button className="button" onClick={Login(username, password)}>Войти</button>
                <Link href={"/registration"} className="link">У меня еще нет аккаунта</Link>
            </div>
        </section>
    )
}