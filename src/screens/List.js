import React, {useState, useEffect, useRef, createRef} from 'react'
import axios from 'axios'
import {localhost, heroku} from '../url/sever'
import {Link} from 'react-router-dom'

import { compare, compare2 } from '../method/filter'
//css
import styles from "./list.module.css"

//component
import Student from '../components/list/Student'
import Loading from '../components/loading/Loading'
const tabs = ['21aw','20aw'];
//useRef
export default function List() {
    
    const [grade, setGrade] = useState('20aw');
    const [students, setStudents] = useState([])
    //useRef loop
    const btn = useRef([])
    btn.current = tabs.map((element, i) => btn.current[i] ?? createRef());
    // console.dir(btn.current[0].current)
    //function
    const handleClick =(tab) =>{
        if(tab == '21aw'){
            btn.current[0].current.style.backgroundColor = '#fcf2f0';
            btn.current[0].current.style.color = '#e8644f';
            btn.current[1].current.style.backgroundColor = '#ffff';
            btn.current[1].current.style.color = '#6A5026';
        }else{
            btn.current[1].current.style.backgroundColor = '#edf1f4';
            btn.current[1].current.style.color = '#1163a1';
            btn.current[0].current.style.backgroundColor = '#ffff';
            btn.current[0].current.style.color = '#6A5026';
        }
        setGrade(tab)
    }
    useEffect (() =>{
        const fetchData = async () =>{

            try {
                const studentData = await axios({
                    method:'GET',
                    url:`${heroku}/students?student_number_contains=${grade}`
                })
                console.log(studentData.data)
                const studentSort = studentData.data.sort(compare2)
                setStudents(studentSort)
            } catch (error) {
                console.log(error)
            }
        }

        fetchData()
    },[grade])
    if(!students.length){
        return(
            <>
                <Loading />
            </>
        )
    }else{

        return (
            <div className={styles.container}>
                <div className={styles.contents}
                    style={{backgroundColor:  grade == '20aw' ? `var(--background-color-2)`: `var(--background-color-1)`}}
                >
                    <div className={styles.nav}>
                        {tabs.map((tab, index) =>{
                            return(
                                <button
                                    ref={btn.current[index]}
                                    className={styles.btn}
                                    key ={tab}
                                    onClick ={() => handleClick(tab)}
                                    
                                >
                                {tab == '21aw' ? '一年生':'二年生'}
                                </button>
                            )
                        })}
                    </div>
                    <p style={{margin: "35px auto",color:'#6A5026'}}>ブース番号を選んで評価をお願いします</p>
                    <ul className={styles.list}>
                        {students.map((student, index) =>{
                            return (
                                <li
                                key = {index}
                                >
                                <Student grade={grade} student ={student}/>
                                </li>
                            )
                        })}
                    </ul>
    
                </div>
            </div>
        )
    }
}
