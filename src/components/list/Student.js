import {Link} from 'react-router-dom'
import React from 'react'
import {localhost, heroku} from '../../url/sever'
import dummy from "../../asset/avatar/dummy.jpg"
//css
import styles from "../../screens/list.module.css"

export default function Student(props) {
    const student = props.student;
    const grade = props.grade;

    

    return (
        <>
            <Link to = {`./students/${student.id}`}
                                style={{textDecoration:'none'}}
                            >
                                <div 
                                    className={styles.item}
                                >
                                    <div className={styles.avatarBox}>
                                        <img className={styles.avatar} 
                                        //heroku thi ko can add ${heroku}
                                        src={student.avatar != null ? `${student.avatar.url}`: dummy}>

                                        </img>
                                    <div style={{
                                        backgroundColor : grade == '21aw' ? '#E8644F' : '#1163A1',
                                        boxShadow : grade == '21aw' ? `2px 2px 5px #D04731, -2px -2px 5px #F5AB9F` :`2px 2px 5px #095188, -2px -2px 5px #D7D7DD`
                                    }} className={styles.number}>{student.booth_number}</div>
                                    </div>
                                </div>
                                <p className={styles.name} style={{fontSize: student.name.length > 9 ? '15px' : '18px',
                                                                    color : grade == '21aw' ? '#E8644F' : '#1163A1'
                                }}>{student.name}</p>
        </Link>
        </>
    )
}
