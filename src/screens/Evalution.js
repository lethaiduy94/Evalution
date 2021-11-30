import React, {useState, useEffect, useMemo} from 'react'
import { useParams} from 'react-router'
import axios from 'axios'
import {Link} from 'react-router-dom'
//url
import {localhost, heroku} from '../url/sever'
//css
import styles from './evalution.module.css'
//img
import img from '../image/present_icon.png'
export default function Evalution() {
    const {id} = useParams()
    const [student, setStudent] = useState({})
    const [visitor, setVisitor] = useState('デザイナー')
    const [plan, setPlan] = useState(2)
    const [presentation, setPresentation] = useState(2)
    const [code, setCode] = useState(2)
    const [design, setDesign] = useState(2)
    const [communication, setCommunication] = useState(2)
    const [comment, setComment] = useState('duy')
    const [comment2, setComment2] = useState('duy')

    const visitorChange = (e) =>{
        setVisitor(e.target.value)
    }
    const planChange = (e) =>{
        setPlan(e.target.value)

    }
    const preChange = (e) =>{
        setPresentation(e.target.value)

    }
    const codeChange = (e) =>{
        setCode(e.target.value)

    }
    const designChange = (e) =>{
        setDesign(e.target.value)

    }
    const communicationChange = (e) =>{
        setCommunication(e.target.value)

    }
    const comChange = (e) =>{
        setComment(e.target.value)

    }
    const com2Change = (e) =>{
        setComment2(e.target.value)

    }

    
    
    const total = useMemo(()=>{
        if(Object.keys(student).length === 0 && student.constructor === Object)return;
        
        const result = student.total_scores.code + student.total_scores.plan + student.total_scores.design +student.total_scores.presentation + student.total_scores.communication;

        return result
    },[student])
    

    const handleSubmit = async (e)=>{
        e.preventDefault()

        const data = {
            code:parseInt(code),
            plan:parseInt(plan),
            design:parseInt(design),
            presentation:parseInt(presentation),
            visitor,
            comment,
            communication:parseInt(communication),
            comment_2:comment2,
            student:id
        }
        
        const total_scores = {
           
                id,
                code:parseInt(student.total_scores.code) + parseInt(code),
                plan:parseInt(student.total_scores.plan) + parseInt(plan),
                design:parseInt(student.total_scores.design) + parseInt(design),
                presentation:parseInt(student.total_scores.presentation) + parseInt(presentation),
                communication:parseInt(student.total_scores.communication) + parseInt(communication),
                total_score:parseInt(design) + parseInt(code) + parseInt( plan) +parseInt(presentation) +parseInt(communication) + parseInt(total),
            

        }

         const addScore = await axios({
             method:'POST',
             url:`${heroku}/evalutions`,
             data
         })

         const updateScore = await axios({
             method:"PUT",
             url:`${heroku}/students/${id}`,
             data : {
                total_scores
             }
         })

         if(addScore.status === 200 && updateScore.status === 200){
             window.location.reload()
         }else{
             alert('fail')
         }
    }

    const testUpdate = async() =>{

        try {
            const total_scores = {
                
                    id,
                    code:0,
                    plan:0,
                    design:0,
                    presentation:0,
                    communication:0,
                    total_score: 0,
                
            }
            const updateScore = await axios({
                method:"PUT",
                url:`${heroku}/students/${id}`,
                data : {
                    total_scores
                }
            })
            if(updateScore.status === 200){
                console.log('updated')
            }
            
        } catch (error) {
            console.log(error)
        }
    }

    useEffect (() =>{
        const fetchData = async () =>{

            try {
                const studentData = await axios({
                    method:'GET',
                    url:`${heroku}/students/${id}`
                })
                console.log(studentData.data)
                setStudent(studentData.data)
            } catch (error) {
                console.log(error)
            }
        }

        fetchData()
    },[id])

    if(Object.keys(student).length === 0 && student.constructor === Object){
        return(<></>)
    }else{
        return (
            <div style={{padding:'15px', margin:'auto', maxWidth:400}}>
                <div className ={styles.header}>
                    <div className = {styles.imgBox}>
                        <img className = {styles.img} src = {`${heroku}${student.avatar.url}`}></img>
                    </div>
                    <div　className ={styles.content}>
                        <h2>{student.name}</h2>  
                        <div className= {styles.contentSub}>
                            <p>職種：{student.job}</p>
                            <p>強み：{student.talent}</p>
                        </div>
                    </div>

                </div>

                <form>
                <div className ={styles.visitor}>
                    <label htmlFor="visitor">職種を選択してください</label>
                    <select name = "visitor" onChange = {visitorChange} value = {visitor}>
                        <option value="デザイナー">デザイナー</option>
                        <option value="エンジニア">エンジニア</option>
                        <option value="プログラマー">プログラマー</option>
                        <option value="コーダー">コーダー</option>
                        <option value="ディレクター">ディレクター</option>
                        <option value="営業">営業</option>
                        <option value="学生">学生</option>
                        <option value="保護者">保護者</option>
                    </select>
                </div>
                <div className ={styles.plan}>
                    <label htmlFor="plan">企画力</label>
                    <div className= {styles.evalution}>
                        <p>1</p>
                        <input value={plan} name="plan" type="range" min="0" max="5" step="1" onChange={planChange} ></input>
                        <p>5</p>
                    </div>
                </div>
                <div className ={styles.presentation}>
                    <label htmlFor="presentation">伝える力</label>
                    <div className= {styles.evalution}>
                        <p>1</p>
                        <input value={presentation} name="presentation" type="range" min="0" max="5" step="1" onChange={preChange}  ></input>
                        <p>5</p>
                    </div>
                </div>
                <div className ={styles.code}>
                    <label htmlFor="code">実装力</label>
                    <div className= {styles.evalution}>
                        <p>1</p>
                         <input value={code} name="code" type="range" min="0" max="5" step="1" onChange={codeChange} ></input>
                        <p>5</p>
                    </div>
                </div>
                <div className ={styles.design}>
                    <label htmlFor="design">UI・デザイン力</label>
                    <div className= {styles.evalution}>
                        <p>1</p>
                        <input value={design} name="design" type="range" min="0" max="5" step="1" onChange={designChange} ></input>
                        <p>5</p>
                    </div>
                </div>
                <div className ={styles.communication}>
                    <label htmlFor="communication">ビジネスマナー</label>
                    <div className= {styles.evalution}>
                        <p>1</p>
                        <input value={communication} name="communication" type="range" min="0" max="5" step="1" onChange={communicationChange} ></input>
                        <p>5</p>
                    </div>
                </div>
                <div className ={styles.comment}>
                    <label htmlFor="comment">良かった点</label>
                    <textarea name="comment" rows="4" cols="50" maxLength="200" onChange={comChange}></textarea>
                    <label htmlFor="comment">あともう一歩な点</label>
                    <textarea name="comment" rows="4" cols="50" maxLength="200" onChange={com2Change}></textarea>
                </div>
                 <button className={styles.btn} onClick = {handleSubmit}>
                    <div className ={styles.imgBox2}><img className={styles.img} src = {img}></img></div>
                    <Link style={{textDecoration:'none'}} to = {`/students/${id}/thanks`}>{student.name}さんへ送る</Link>
                 </button>
             </form>
             {/* <button onClick={testUpdate}>Update</button> */}
            </div>
        )
    }
}
