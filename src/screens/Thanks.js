import React from 'react'
import { Link } from 'react-router-dom'
import { useParams } from 'react-router'
import { localhost, heroku } from '../url/sever'
export default function Thanks() {
    const {id} = useParams()
    console.log(id)
    return (
        <div>
            <h1>送りました。</h1>
            <button><Link to ={`/students/${id}/detail`} >成長を見る</Link></button>
        </div>
    )
}
