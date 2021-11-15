import axios from 'axios'
import React, {useEffect} from 'react'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'


export default function Home() {

    const {id} = useParams();

    useEffect(() => {
        const fetchData = async () =>{

            try {
                const student = await axios({
                    method:'GET',
                    url:'https://quiet-sands-58722.herokuapp.com/students/1'
                })

                console.log(student.data)
            } catch (error) {
                console.log(error)
            }
        }

        fetchData()
        return () => {
            
        }
    }, [])


    return (
        <div>
            <h1>ようこそ　評価システム</h1>
            <button><Link style={{textDecoration:"none",color:"#000"}} to ={`/students/${id}/evalution`}>評価する</Link></button>
            <button><Link style={{textDecoration:"none",color:"#000"}} to ={`/students/${id}/detail`}>自分の評価を見る</Link></button>
        </div>
    )
}
