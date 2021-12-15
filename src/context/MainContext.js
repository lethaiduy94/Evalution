import React, {useState, createContext, useEffect} from 'react'
import {localhost, heroku} from '../url/sever'
import axios from 'axios'
const MainContext = createContext()

function MainProvider({children}) {

    const [students, setStudents] = useState({})
    const [firstGrades, setFirstGrades] = useState({})
    const [secondGrades, setSecondGrades] = useState({})
    //get all students
    useEffect(() => {
        const fetchData = async () =>{

            try {
                const studentData = await axios({
                    method:'GET',
                    url:`${localhost}/students`
                })
                console.log(studentData.data)
                setStudents(studentData.data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
    }, [])
    //get all firtGrade students
    useEffect(() => {
        const fetchData = async () =>{
            try {
                const studentData = await axios({
                    method:'GET',
                    url:`${localhost}/students?student_number_contains=21aw`
                })
                setFirstGrades(studentData.data)
            } catch (error) {
                console.log(error)
                
            }
        }
        fetchData()
    }, [])
    //get all secondGrade students

    useEffect(() => {
        const fetchData = async () =>{
            try {
                const studentData = await axios({
                    method:'GET',
                    url:`${localhost}/students?student_number_contains=20aw`
                })
                setSecondGrades(studentData.data)
            } catch (error) {
                console.log(error)
                
            }
        }
        fetchData()
    }, [])
    return (
        <MainContext.Provider value={[students,firstGrades,secondGrades]}>
            {children}
        </MainContext.Provider>
    )
}

export {MainContext, MainProvider}