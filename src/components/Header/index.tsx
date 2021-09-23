import { useRouter } from "next/router";
import styles from './header.module.scss';
import Link from "next/link";

export default function Header() {
  const router = useRouter();
  return(
    <>
    <Link href="/">
        <img src="/logo.svg" 
            alt="logo"
            className={styles.logo} />
    </Link>
     
    </>
  )
}
