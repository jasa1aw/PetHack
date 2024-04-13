'use client'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faSquareCheck} from "@fortawesome/free-solid-svg-icons";
import Link from "next/link"
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import {LogIn, authorize } from '@/app/store/slices/authSlice';

export default function UserRegistration() {
    // const isAuth = useSelector((state) => state.auth.isAuth)
    const router = useRouter()
    const dispatch = useDispatch()
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [visible, setVisible] = useState(false);
    return(
        <>
            <h1>Heelo</h1>
        </>
    )
}