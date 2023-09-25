
import styles from './Header.module.css'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { GITHUB_LOGIN_URL } from '../properties'

export default function Header () {

    const [isLogin, setLogin] = useState(false)
    
    useEffect(() => {
        if (localStorage.getItem('9token') != null) {
            setLogin(true)  
        } 
    }, [])
    
    return (
        <div className={styles.container}>
            <div className={styles.wrapper}>
                <div className={styles.left_nav}>
                    <Link to={'/'}>
                        <h1 className={styles.logo_text} style={{
                            fontFamily: "OAGothic-ExtraBold",
                            letterSpacing: '-2px',
                            color:'#21252a',
                        }}>구해YO</h1>
                    </Link>
                    <ul>
                        <Link to={'/profile'}><li>프로필</li></Link>
                        <Link to={'/hub'}><li>네트워크</li></Link>
                        <Link to={'/'}><li>팀원모집</li></Link>
                        <Link to={'/'}><li>자랑하기</li></Link>
                    </ul>
                </div>
                <div className={styles.right_nav}>
                    <div className={styles.search_box}>
                        <input type='text' placeholder='프로젝트/스터디 검색'/>
                        <button>
                            <span className="material-symbols-outlined" style={{
                                position: "relative",
                                top: "1px",
                                left: '-5px'
                            }}>
                                search
                            </span>
                        </button>
                    </div>
                    {isLogin ? 
                        <>  
                            {/* <Avatar name='asds' size='sm'
                                style={{
                                    position: 'relative',
                                    right: '-2px'
                                }}
                                src={localStorage.getItem('9heayo_avatar')}
                            />
                            <span>{localStorage.getItem('9heayo_nickname')}</span> */}
                        </> 
                        : <>
                            <a href={GITHUB_LOGIN_URL}>로그인</a>
                        </>}
                </div>
            </div>
        </div>
    )
}