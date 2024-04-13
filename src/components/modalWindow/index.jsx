'use client'

import { useState } from "react"
import { useRouter } from 'next/navigation';
export default function LogoutModal({closeModal}){
    const router = useRouter()
    const [step, setStep] = useState(1)
    const logOut = () =>{
        router.push('/login')
    }
    return(
        <div className="modalBackground">
            {step == 1 && 
                <div className="modalInner">
                    <h4>Выйти?</h4>
                    <button className="button" onClick={() => setStep(2)}>Да</button>
                    <button className="button" onClick={() => closeModal()}>Нет</button>
                </div>
            }
            {step == 2 && 
                <div className="modalInner">
                    <h4>Выйти?</h4>
                    <p>Точно выйти?</p>
                    <button className="button" onClick={logOut}>Да, точно</button>
                    <button className="button" onClick={() => closeModal()}>Нет, остаться</button>
                </div>
            }
        </div>
    )
}