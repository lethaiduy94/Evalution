import React, {useState, useEffect, useMemo} from 'react'
import { useParams } from 'react-router'
import axios from 'axios'

export default function Evalution() {
    const {id} = useParams()
    const [student, setStudent] = useState({})
    const [visitor, setVisitor] = useState('duy')
    const [plan, setPlan] = useState(5)
    const [presentation, setPresentation] = useState(5)
    const [code, setCode] = useState(5)
    const [design, setDesign] = useState(5)
    const [communication, setCommunication] = useState(5)
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
             url:"https://quiet-sands-58722.herokuapp.com/evalutions",
             data
         })

         const updateScore = await axios({
             method:"PUT",
             url:`https://quiet-sands-58722.herokuapp.com/students/${id}`,
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
                url:`https://quiet-sands-58722.herokuapp.com/students/${id}`,
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
                    url:`https://quiet-sands-58722.herokuapp.com/students/${id}`
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
            <div style={{margin:"15px"}}>
                <h1>{student.student_number.includes('21aw') ? '一年生':'二年生'}  {student.name}</h1>
                <form style={{ display:"flex",flexDirection:"column", maxWidth:"300px" }} onSubmit={handleSubmit}>
                 <label htmlFor="visitor">来場者</label>
                 <input name="visitor" type="text" onChange={visitorChange} ></input>
                 <label htmlFor="plan">企画力</label>
                 <input value={plan} name="plan" type="range" min="0" max="10" step="1" onChange={planChange} ></input>
                 <label htmlFor="presentation">伝える力</label>
                 <input value={presentation} name="presentation" type="range" min="0" max="10" step="1" onChange={preChange}  ></input>
                 <label htmlFor="code">実装力</label>
                 <input value={code} name="code" type="range" min="0" max="10" step="1" onChange={codeChange} ></input>
                 <label htmlFor="design">UI・デザイン力</label>
                 <input value={design} name="design" type="range" min="0" max="10" step="1" onChange={designChange} ></input>
                 <label htmlFor="communication">ビジネスマナー</label>
                 <input value={communication} name="communication" type="range" min="0" max="10" step="1" onChange={communicationChange} ></input>
                 <label htmlFor="comment">良かった点</label>
                 <textarea name="comment" rows="4" cols="50" maxLength="200" onChange={comChange}></textarea>
                 <label htmlFor="comment">あともう一歩な点</label>
                 <textarea name="comment" rows="4" cols="50" maxLength="200" onChange={com2Change}></textarea>
                 <button>{student.name}君へ</button>
             </form>
             <button onClick={testUpdate}>Update</button>
            </div>
        )
    }
}
