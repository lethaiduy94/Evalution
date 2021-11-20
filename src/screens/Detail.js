import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import {compare} from '../method/filter'
//url
import {localhost, heroku} from '../url/sever'
export default function Detail() {
    const {id} = useParams()
    const [student, setStudent] = useState({})
    const [evalutions, setEvalutions] = useState([])
    const [times, setTimes] = useState(0)

    useEffect (() =>{
        const fetchData = async () =>{

            try {
                const studentData = await axios({
                    method:'GET',
                    url:`${heroku}/students/${id}`
                })
                const evalutionsSort = studentData.data.evalutions.sort(compare)
                setStudent(studentData.data)
                setEvalutions(evalutionsSort)
                setTimes(studentData.data.evalutions.length)
            } catch (error) {
                console.log(error)
            }
        }

        fetchData()
    },[])
    if(Object.keys(student).length === 0 && student.constructor === Object){
        return(<></>)
    }else{
        return (
            <div style ={{padding:"15px"}}>
                <h1>{student.student_number.includes('21aw') ? '一年生':'二年生'}  {student.name}</h1>
                <h2>評価点</h2>
                <ul>
                    <li>総合点:{student.total_scores.total_score}</li>
                    <li>企画力: {student.total_scores.plan}</li>
                    <li>伝える力: {student.total_scores.presentation}</li>
                    <li>UI・デザイン力: {student.total_scores.design}</li>
                    <li>実装力: {student.total_scores.code}</li>
                    <li>ビジネスマナー: {student.total_scores.communication}</li>
                </ul>
                <div>
                    <h2>コメント</h2>
                    <p>{times}回プレゼンテーションしました。</p>
                
                    {
                        evalutions.map((item, index) =>{
                            return(
                                <div key = {index}>
                                    <h3>{item.visitor}さん</h3>
                                    <h4>良かった点</h4>
                                    <p>{item.comment}</p>
                                    <h4>あともう一歩な点</h4>
                                    <p>{item.comment_2}</p>
                                    <h4>もらった評価点</h4>
                                    <ul>
                                        <li style={{marginRight:"25px"}}>企画力:{item.plan}</li>
                                        <li style={{marginRight:"25px"}}>伝える力:{item.presentation}</li>
                                        <li style={{marginRight:"25px"}}>UI・デザイン力:{item.design}</li>
                                        <li style={{marginRight:"25px"}}>実装力:{item.code}</li>
                                        <li style={{marginRight:"25px"}}>ビジネスマナー:{item.communication}</li>
                                    </ul>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        )
    }
}
