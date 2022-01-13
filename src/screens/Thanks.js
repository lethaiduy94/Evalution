import React, {useRef, useEffect} from 'react'
import { useParams } from 'react-router'
//css
import styles from './thanks.module.css'
import { Link } from 'react-router-dom'
import logo from '../asset/logo/logo.png'
export default function Thanks() {
    const {id} = useParams()

    const btn = useRef(null)
    useEffect(() => {
        const touchStart = ()=>{
            btn.current.style.boxShadow = `inset 3px 3px 4px rgba(0, 0, 0, 0.3), inset -3px -3px 4px #ffffff`;
        }
        const touchEnd = ()=>{
            btn.current.style.boxShadow = `3px 3px 4px rgba(0, 0, 0, 0.3), -3px -3px 4px #ffffff`;
        }
        btn.current.addEventListener('touchstart',touchStart)
        btn.current.addEventListener('touchend',touchEnd)
        // return () => {
        // btn.current.removeEventListener('touchstart',touchStart)
        // btn.current.removeEventListener('touchend',touchEnd)
        // }
    }, [])

        return (
            <div className= {styles.container} style={{
                background : id < 40 ?  `var(--background-color-2)`:`var(--background-color-1)` 
            }}>
                <div className= {styles.contents}>
                    <div className= {styles.top}>
                        <div className= {styles.topText}>
                            <p>ご意見・アドバイス </p>
                            <p>ありがとうございました</p>
                        </div>
                        <div className= {styles.logoBox}>
                            <img src={logo} className={styles.logo}></img>
                        </div>
                        <p>学生の花が成長しました！</p>
                    </div>
                    <div className={styles.bottom}>
                        <Link className= { styles.btn}  to = {"/"}><button style={{
                            background : id < 40 ? `#e9f0f5` : `#F4CEBA`
                        }} ref={btn}>他の学生も評価する</button></Link>
                    </div>
                </div>
            </div>
        )

}
