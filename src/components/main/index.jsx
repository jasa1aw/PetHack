'use client'
import { useState } from "react"
import LogoutModal from "../modalWindow";
export default function Main({text}) {
    const [openModal, setOpenModal] = useState(false);
    const closeModal = () =>{
        setOpenModal(false)
    }
    return(
        <section className="main">
            {openModal && <LogoutModal closeModal={closeModal}/>}
            <h1>{text}!</h1>
            <h4>Lorby - твой личный репетитор</h4>
            <div className="logo">
                <img src="/img/Illustration.svg" alt="Not Found" className="img" />
            </div>
            <button className="button" onClick={() => setOpenModal(true)}>Выйти</button>
        </section>
    )
}