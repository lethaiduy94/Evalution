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
export default function Evalution() {
    const {id} = useParams()
    const [student, setStudent] = useState({})


    
    

    const [visitor, setVisitor] = useState('デザイナー')
    const [plan, setPlan] = useState(3)
    const [presentation, setPresentation] = useState(3)
    const [code, setCode] = useState(3)
    const [design, setDesign] = useState(3)
    const [communication, setCommunication] = useState(3)
    const [comment, setComment] = useState('duy')
    const [comment2, setComment2] = useState('duy')
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
                    <p className={styles.title}>「{student.name}」さんの作品評価をお願いします</p>
                    <div className = {styles.imgBox} style={{
                        boxShadow: student.student_number.includes('20aw') ? `3px 3px 4px rgba(0, 0, 0, 0.3), -3px -3px 2px #67bfff` :
                        `3px 3px 4px rgba(0, 0, 0, 0.3), -3px -3px 2px #EB9386`
                    }}>
                        <img className = {styles.img} src = {student.avatar != null ? `${student.avatar.url}`:avatarDummy}></img>
                    </div>
                    <p className={styles.number}>ブース番号: <span>{student.id}</span></p>
                    <div className={styles.product}>
                        <p>{student.title}</p>
                        <div className={styles.productImg}>
                            <img src={student.production_img != null ?`${heroku}${student.production_img.url}`:dummy}></img>
                        </div>
                    </div>
                    <div className={styles.headerBtm}>
                        <p>作品の評価をお願いします</p>
                        <p className={styles.bar}>SCROLL</p>
                    </div>
                    
                </div>
                <div className={styles.formContainer} style={{
                    background: student.student_number.includes('20aw') ? `linear-gradient(0deg, rgba(179,214,240,1) 0%, rgba(14,78,126,1) 100%)` : 
                    `linear-gradient(0deg, #F4A477 0%, #EF8850 100%)`
                }}>
                    <p className={styles.formTitle}>5つの評価をお願いします</p>
                    <form className={styles.form}>
                    <div className ={styles.visitor}>
                        <label htmlFor="visitor">職種を選択してください</label>
                        <select style={{
                            background : student.student_number.includes('20aw') ? `#D5E2EB` : `#FCEEEC`,
                            boxShadow : student.student_number.includes('20aw') ? 
                            `3px 3px 4px rgb(0 0 0 / 30%), -3px -3px 2px #0e4e7e`:
                            `3px 3px 4px rgb(0 0 0 / 30%), -3px -3px 2px #ec9160`
                        }} name = "visitor" onChange = {visitorChange} value = {visitor}>
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
                            <input value={plan} name="plan" type="range" min="1" max="5" step="1" ref={planBarRef} onChange={planChange} ></input>
                            <div ref={planRef} className = {styles.value}>3</div>
                            <p>5</p>
                        </div>
                    </div>
                    <div className ={styles.presentation}>
                        <label htmlFor="presentation">伝える力</label>
                        <div className= {styles.evalution}>
                            <p>1</p>
                            <input value={presentation} name="presentation" type="range" min="1" max="5" step="1" ref={presentationBarRef} onChange={preChange}  ></input>
                            <div ref={presentationRef} className = {styles.value}>3</div>
                            <p>5</p>
                        </div>
                    </div>
                    <div className ={styles.code}>
                        <label htmlFor="code">実装力</label>
                        <div className= {styles.evalution}>
                            <p>1</p>
                            <input value={code} name="code" type="range" min="1" max="5" step="1" ref={codeBarRef} onChange={codeChange} ></input>
                            <div ref={codeRef} className = {styles.value}>3</div>
                            <p>5</p>
                        </div>
                    </div>
                    <div className ={styles.design}>
                        <label htmlFor="design">UI・デザイン力</label>
                        <div className= {styles.evalution}>
                            <p>1</p>
                            <input value={design} name="design" type="range" min="1" max="5" step="1" ref={designBarRef} onChange={designChange} ></input>
                            <div ref={designRef} className = {styles.value}>3</div>
                            <p>5</p>
                        </div>
                    </div>
                    <div className ={styles.communication}>
                        <label htmlFor="communication">ビジネスマナー</label>
                        <div className= {styles.evalution}>
                            <p>1</p>
                            <input value={communication} name="communication" type="range" min="1" max="5" step="1" ref={communicationBarRef} onChange={communicationChange} ></input>
                            <div ref={communicationRef} className = {styles.value}>3</div>
                            <p>5</p>
                        </div>
                    </div>
                    <div className ={styles.comment}>
                        <p>あなたのコメントが学生の励みになります</p>
                        <label htmlFor="comment">良かった点</label>
                        <textarea name="comment" rows="4" cols="50" maxLength="200" onChange={comChange} placeholder='（例）目線を合わせてプレゼンしてくれたのが好印象でした'></textarea>
                        <label htmlFor="comment">あともう一歩な点</label>
                        <textarea name="comment" rows="4" cols="50" maxLength="200" onChange={com2Change} placeholder='（例）名刺を渡す動作をもう一度確認してみてください'></textarea>
                    </div>
                        <div className={styles.bottom} onClick={handleSubmit}>
                            

                                <Link style={{
                                    background :student.student_number.includes('20aw') ?  `#D4E2EB`:`#FCEEEC`,
                                    boxShadow : student.student_number.includes('20aw') ? 
                                    `3px 3px 4px rgb(0 0 0 / 30%), -3px -3px 4px #88cdff` : 
                                    `3px 3px 4px rgb(0 0 0 / 30%), -3px -3px 4px #ff9393`
                                }} className= { styles.link}  to = {`/students/${id}/thanks`}>学生へ送る</Link>
                            
                        </div>
                    </form>
                </div>
             {/* <button onClick={testUpdate}>Update</button> */}
            </div>
        )
    }
}
