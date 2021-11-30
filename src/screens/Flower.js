import React, { useState } from 'react'
import { useParams } from 'react-router'
import images from '../asset/img'
import styles from './flower.module.css'
export default function Flower() {
    
    const {id} = useParams()
    const [design, setDesign] = useState(0)
    const [flower, setFlower] = useState(images.img0)
    console.log(images.img2)
    const designChange= (e)=>{
        setDesign(e.target.value)
        switch(e.target.value) {
            case "0":
              // code block
            setFlower(images.img0)
              break;
            case "1":
              // code block
            setFlower(images.img1)
              break;
            case "2":
              // code block
            setFlower(images.img2)
                
              break;
            case "3":
              // code block
            setFlower(images.img3)
              
              break;
            case "4":
              // code block
            setFlower(images.img4)
              
              break;
            case "5":
              // code block
            setFlower(images.img5)
              
              break;
            case "6":
              // code block
            setFlower(images.img6)
              
              break;
            default:
              // code block
            setFlower(images.img1)

          }
          console.log(flower)
    }
    return (
        <div>
            <h1>このぐらい　成長しました。</h1>
            <label htmlFor = "design">UI・デザイン力</label>
            <input type="range" name ="design" min = "0" max = "6" value = {design} onChange ={designChange} ></input>
            <div>
                <img className={styles.imgFlower} src = {flower} alt></img>
            </div>
        </div>
    )
}
