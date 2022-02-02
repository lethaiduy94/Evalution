import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'
import {compare} from '../method/filter'
//url
import {localhost, heroku} from '../url/sever'
//component
import Chart from '../components/detail/Chart'
//css
import styles from './detail.module.css'
export default function Detail() {
    const {id} = useParams()
    const [student, setStudent] = useState({})
    const [evalutions, setEvalutions] = useState([])
    const [times, setTimes] = useState(0)
    const [avatar, setAvatar] = useState('')
    const [hana, setHana] =useState('')
    const [average, setAverage] = useState([])
    useEffect (() =>{
        const fetchData = async () =>{

            try {
                const studentData = await axios({
                    method:'GET',
                    url:`${heroku}/students/${id}`
                })
                const evalutionsSort = studentData.data.evalutions.sort(compare)

                
                // setHana(studentData.data.ill_img.url)
                // setAvatar(studentData.data.avatar.url)
                setStudent(studentData.data)
                setEvalutions(evalutionsSort)
                setTimes(studentData.data.evalutions.length)

                console.log(studentData.data)

                const codeAverage = (studentData.data.total_scores.code / studentData.data.evalutions.length);
                const planAverage = (studentData.data.total_scores.plan / studentData.data.evalutions.length);
                const designAverage = (studentData.data.total_scores.design / studentData.data.evalutions.length);
                const presentationAverage = (studentData.data.total_scores.presentation / studentData.data.evalutions.length);
                const communicationAverage = (studentData.data.total_scores.communication / studentData.data.evalutions.length);
                
                const average = [
                    Math.round(codeAverage) ,
                    Math.round(planAverage) ,
                    Math.round(designAverage) ,
                    Math.round(presentationAverage) ,
                    Math.round(communicationAverage) ,
                ]

                setAverage(average)
            } catch (error) {
                console.log(error)
            }
        }

        fetchData()
    },[])

// date format
const dateFomat = (value) =>{
    const dateString =  new Date(value);
    const month = dateString.getMonth();
    const date = dateString.getDate();
    const hours = dateString.getHours();
    const minutes = dateString.getMinutes();

    const format = `${month + 1}月${date}日 ${hours}時${minutes}分`
    return format;
}



    if(Object.keys(student).length === 0 && student.constructor === Object){
        return(<></>)
    }else{
        return (
            <div className={styles.detailContainer} style ={{ margin:'auto', overflow:'hidden', backgroundColor: student.student_number.includes('20aw') ? '#EDF1F4' : '#FFF8F7'}}>
                <div style={{display:'flex', justifyContent:'space-between', padding: '0 15px'}}>
                <h1>{student.name}</h1>
                    
                    {/* <div style={{width:100,height:100,borderRadius:'50%',overflow:'hidden'}}>
                        <Link to ={`/students/${id}/detail/flower`}><img style={{width:'100%',height:'100%',objectFit:'cover'}} src={`${heroku}${hana}`} alt="hana" ></img></Link>
                    </div> */}

                </div>
                <div style={{padding: '0 15px'}} className = {styles.section1}>
                    <h2>平均スコア</h2>
                    <div className= {styles.arrow}></div>
                </div>

                <Chart average={average} times={times} />
                <div>
                    <div className = {styles.value}>
                        <p>評価をいただいた回数：<span>{times}</span> 回</p>
                    </div>
                
                    {evalutions &&
                        evalutions.map((item, index) =>{
                            return(
                                <div className = {styles.evalution}  key = {index}>
                                    <h3>{item.visitor} <span className = {styles.subTitle}>さんからいただいた評価</span></h3>
                                    <i>{dateFomat(item.published_at)}</i>
                                    <h4>もらった評価点</h4>
                                    <ul className = {styles.list}>
                                        <li style={{marginRight:"25px"}}>企画力:{item.plan}</li>
                                        <li style={{marginRight:"25px"}}>伝える力:{item.presentation}</li>
                                        <li style={{marginRight:"25px"}}>UI・デザイン力:{item.design}</li>
                                        <li style={{marginRight:"25px"}}>実装力:{item.code}</li>
                                        <li style={{marginRight:"25px"}}>ビジネスマナー:{item.communication}</li>
                                        
                                    </ul>
                                    <div className={styles.commentContainer}>
                                        <h4>良かった点</h4>
                                        <p className={styles.comment}>{item.comment} </p>
                                        {/* <p className= {styles.comment}>{item.comment}</p> */}
                                        <h4>あともう一歩な点</h4>
                                        <p className={styles.comment}>{item.comment_2} </p>
                                        {/* <p className= {styles.comment}>{item.comment_2} </p> */}
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        )
    }
}
