'use client'
import UserLogin from "@/components/auth/userLogin";
import Main from "@/components/main";
import LogoutModal from './../components/modalWindow/index';
export default function Home() {
  return (
    <main>
      {/* <Main/> */}
      <UserLogin/>
    </main>
  );
}
