import React, {useState, useEffect, useMemo, useRef} from 'react'
import { useParams} from 'react-router'
import axios from 'axios'
import {Link} from 'react-router-dom'
//url
import {localhost, heroku} from '../url/sever'
//css
import styles from './evalution.module.css'
//img
import img from '../image/present_icon.png'
import dummy from '../image/placeholder-image.png'
import avatarDummy from '../asset/avatar/dummy.jpg'
import downArrow from '../image/caret-down-outline.svg'
export default function Evalution() {
    const {id} = useParams()
    const [student, setStudent] = useState({})


    const [visitor, setVisitor] = useState('デザイナー')
    const [plan, setPlan] = useState(3)
    const [presentation, setPresentation] = useState(3)
    const [code, setCode] = useState(3)
    const [design, setDesign] = useState(3)
    const [communication, setCommunication] = useState(3)
    const [comment, setComment] = useState('')
    const [comment2, setComment2] = useState('')
    //useRef
    const planRef = useRef(null)
    const presentationRef =useRef(null)
    const codeRef =useRef(null)
    const designRef =useRef(null)
    const communicationRef =useRef(null)
    //useRef for input bar
    const planBarRef = useRef(null)
    const presentationBarRef =useRef(null)
    const codeBarRef =useRef(null)
    const designBarRef =useRef(null)
    const communicationBarRef =useRef(null)

    const visitorChange = (e) =>{
        setVisitor(e.target.value)
    }
    const planChange = (e) =>{
        setPlan(e.target.value)
        let value = Math.floor((e.target.value/5)*100) - 10;
        let value2 = (e.target.value - 1) * 100 / (5 - 1) + '% 100%'
        planBarRef.current.style.backgroundSize = value2;
        planRef.current.innerHTML = e.target.value;
        planRef.current.style.left= value + "%";
        planRef.current.style.transform= `translateX(${-value}%)`;
    }
    const preChange = (e) =>{
        setPresentation(e.target.value)
        let value = Math.floor((e.target.value/5)*100) - 10;
        let value2 = (e.target.value - 1) * 100 / (5 - 1) + '% 100%'
        presentationBarRef.current.style.backgroundSize = value2;
        presentationRef.current.innerHTML = e.target.value
        presentationRef.current.style.left= value + "%";
        presentationRef.current.style.transform= `translateX(${-value}%)`;
    }
    const codeChange = (e) =>{
        setCode(e.target.value)
        let value = Math.floor((e.target.value/5)*100) - 10;
        let value2 = (e.target.value - 1) * 100 / (5 - 1) + '% 100%'
        codeBarRef.current.style.backgroundSize = value2;
        codeRef.current.innerHTML = e.target.value
        codeRef.current.style.left= value + "%";
        codeRef.current.style.transform= `translateX(${-value}%)`;
    }
    const designChange = (e) =>{
        setDesign(e.target.value)
        let value = Math.floor((e.target.value/5)*100) - 10;
        let value2 = (e.target.value - 1) * 100 / (5 - 1) + '% 100%'
        designBarRef.current.style.backgroundSize = value2;
        designRef.current.innerHTML = e.target.value
        designRef.current.style.left= value + "%";
        designRef.current.style.transform= `translateX(${-value}%)`;
    }
    const communicationChange = (e) =>{
        setCommunication(e.target.value)
        let value = Math.floor((e.target.value/5)*100) - 10;
        let value2 = (e.target.value - 1) * 100 / (5 - 1) + '% 100%'
        communicationBarRef.current.style.backgroundSize = value2;
        communicationRef.current.innerHTML = e.target.value
        communicationRef.current.style.left= value + "%";
        communicationRef.current.style.transform= `translateX(${-value}%)`;
    }
    const comChange = (e) =>{
        setComment(e.target.value)

    }
    const com2Change = (e) =>{
        setComment2(e.target.value)

    }

    
    const total = useMemo(()=>{
        if(Object.keys(student).length === 0 && student.constructor === Object)return ;
        
        const result = student.total_scores.code + student.total_scores.plan + student.total_scores.design +student.total_scores.presentation + student.total_scores.communication;

        return result
    },[student])
    

    const handleSubmit = async (e)=>{
        e.preventDefault()
        const data1 = {
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
        const totalAsc = parseInt(design) + parseInt(code) + parseInt( plan) +parseInt(presentation) +parseInt(communication) + parseInt(total)
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
             data1
         })

         const updateScore = await axios({
             method:"PUT",
             url:`${heroku}/students/${id}`,
             data : {
                total: totalAsc,
                total_scores
             }
         })

         if(addScore.status === 200 && updateScore.status === 200){
            //  window.location.reload()
            console.log("success")
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
 //btn animetion


    if(Object.keys(student).length === 0 && student.constructor === Object){
        return(<></>)
    }else{
        return (
            <div className={styles.container}>
                <div className ={student.student_number.includes('20aw') ?  styles.header :  styles.header2}>
                    {/* <p className={styles.title}>「{student.name}」さんの作品評価をお願いします</p> */}
                    <p className={styles.title}>作品評価をお願いします</p>
                    <div className = {styles.imgBox} style={{
                        boxShadow: student.student_number.includes('20aw') ? `3px 3px 4px var(--bottom-shadow-1), -3px -3px 2px var(--top-shadow-1)` :
                        `3px 3px 4px var(--bottom-shadow-2), -3px -3px 2px var(--top-shadow-2)`
                    }}>
                        <img className = {styles.img} src = {student.avatar != null ? `${student.avatar.url}`:avatarDummy}></img>
                    </div>
                    <p className={styles.number}>ブース番号: <span>{student.booth_number}</span></p>
                    <p className={styles.studentName}>{student.name}</p>
                    <div className={styles.product}>
                        <p style={{fontSize: '18px'}}>{student.title}</p>
                        <div className={styles.productImg} style={{
                            boxShadow: student.student_number.includes('20aw') ? `3px 3px 4px var(--bottom-shadow-1), -3px -3px 2px var(--top-shadow-1)` :
                        `3px 3px 4px var(--bottom-shadow-2), -3px -3px 2px var(--top-shadow-2)`
                        }}>
                            <img src={student.production_img != null ?`${student.production_img.url}`:dummy}></img>
                        </div>
                    </div>
                    <div className={styles.headerBtm}>
                        <p style={{fontSize: "18px"}}>作品の評価をお願いします</p>
                        <p className={styles.bar}>SCROLL</p>
                        <ion-icon style={{ color: "#ffff",
                                           fontSize:"34px",
                        }} name="caret-down-outline"></ion-icon>
                    </div>
                    
                </div>
                <div className={styles.formContainer} style={{
                    background: student.student_number.includes('20aw') ? `#EDF1F4` : 
                    `#FFF8F7`
                }}>
                    <p className={styles.formTitle}>作品についてお聞かせください</p>
                    <form className={styles.form}>
                    <div className ={styles.visitor}>
                        <label style={{fontSize: "16px"}} htmlFor="visitor">あなたの職種を選択してください</label>
                        <select style={{
                            background : student.student_number.includes('20aw') ? `#D5E2EB` : `#FCEEEC`,
                            boxShadow : student.student_number.includes('20aw') ? 
                            `3px 3px 4px #A0B7C9, -3px -3px 2px #FAFDFF`:
                            `3px 3px 4px #CC928A, -3px -3px 2px #FCEEEC`,
                            backgroundImage : `url(${downArrow})`,
                            backgroundRepeat: "no-repeat",
                            backgroundPosition: "right 0.25rem center",
                            backgroundSize: "24px",
                            color:'#6a5026',

                        }} name = "visitor" onChange = {visitorChange} value = {visitor}>
                             
                            <option value="デザイナー">デザイナー</option>
                            <option value="エンジニア">エンジニア</option>
                            <option value="プログラマー">プログラマー</option>
                            <option value="コーダー">コーダー</option>
                            <option value="ディレクター">ディレクター</option>
                            <option value="営業">営業</option>
                            <option value="学生">学生</option>
                            <option value="保護者">保護者</option>
                            <option value="その他">その他</option>
                        </select>
                    </div>
                    <div className ={styles.plan}>
                        <label htmlFor="plan">企画力</label>
                        <div className= {styles.evalution}>
                            <p>1</p>
                            <input value={plan} name="plan" className={student.student_number.includes('20aw') ? styles.inputRange : styles.inputRange2} type="range" min="1" max="5" step="1" ref={planBarRef} onChange={planChange} ></input>
                            <div ref={planRef} className = {styles.value}>3</div>
                            <div className={styles.datalist}>
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                            <p>5</p>
                        </div>
                    </div>
                    <div className ={styles.presentation}>
                        <label htmlFor="presentation">プレゼンテーション力</label>
                        <div className= {styles.evalution}>
                            <p>1</p>
                            <input value={presentation} name="presentation" className={student.student_number.includes('20aw') ? styles.inputRange : styles.inputRange2} type="range" min="1" max="5" step="1" ref={presentationBarRef} onChange={preChange}  ></input>
                            <div ref={presentationRef} className = {styles.value}>3</div>
                            <div className={styles.datalist}>
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                            <p>5</p>
                        </div>
                    </div>
                    <div className ={styles.code}>
                        <label htmlFor="code">実装力</label>
                        <div className= {styles.evalution}>
                            <p>1</p>
                            <input value={code} name="code" className={student.student_number.includes('20aw') ? styles.inputRange : styles.inputRange2} type="range" min="1" max="5" step="1" ref={codeBarRef} onChange={codeChange} ></input>
                            <div ref={codeRef} className = {styles.value}>3</div>
                            <div className={styles.datalist}>
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                            <p>5</p>
                        </div>
                    </div>
                    <div className ={styles.design}>
                        <label htmlFor="design">UI・デザイン力</label>
                        <div className= {styles.evalution}>
                            <p>1</p>
                            <input value={design} name="design" className={student.student_number.includes('20aw') ? styles.inputRange : styles.inputRange2} type="range" min="1" max="5" step="1" ref={designBarRef} onChange={designChange} ></input>
                            <div ref={designRef} className = {styles.value}>3</div>
                            <div className={styles.datalist}>
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                            <p>5</p>
                        </div>
                    </div>
                    <div className ={styles.communication}>
                        <label htmlFor="communication">ビジネスマナー</label>
                        <div className= {styles.evalution}>
                            <p>1</p>
                            <input value={communication} name="communication" className={student.student_number.includes('20aw') ? styles.inputRange : styles.inputRange2} type="range" min="1" max="5" step="1" ref={communicationBarRef} onChange={communicationChange} ></input>
                            <div ref={communicationRef} className = {styles.value}>3</div>
                            <div className={styles.datalist}>
                                <span></span>
                                <span></span>
                                <span></span>
                            </div>
                            <p>5</p>
                        </div>
                    </div>
                    <div className ={styles.comment}>
                        <p>あなたのコメントが学生の励みになります</p>
                        <label htmlFor="comment">良かった点</label>
                        <textarea name="comment" rows="6" cols="50" maxLength="250" onChange={comChange} placeholder='（例）目線を合わせてプレゼンしてくれたのが好印象でした'></textarea>
                        <label htmlFor="comment">あともう一歩な点</label>
                        <textarea name="comment" rows="6" cols="50" maxLength="250" onChange={com2Change} placeholder='（例）名刺を渡す動作をもう一度確認してみてください'></textarea>
                    </div>
                        <div className={styles.bottom} onClick={handleSubmit}>
                            

                                <Link style={{
                                    background :student.student_number.includes('20aw') ?  `#D4E2EB`:`#FCEEEC`,
                                    boxShadow : student.student_number.includes('20aw') ? 
                                    `3px 3px 4px #A0B7C9, -3px -3px 4px #FAFDFF` : 
                                    `3px 3px 4px #CC928A, -3px -3px 4px #FCEEEC`
                                }} className= { styles.link}  to = {`/students/${id}/thanks`}>学生へ送る</Link>
                            
                        </div>
                    </form>
                </div>
             {/* <button onClick={testUpdate}>Update</button> */}
            </div>
        )
    }
}
