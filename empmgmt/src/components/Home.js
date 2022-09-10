import React from 'react'
import {useNavigate} from 'react-router-dom';
import Classes from './Home.module.css'
const Home = () => {
  const navigate = useNavigate();
  const navigateAddWork = () =>{
    navigate('/add-work');
  }
  const navigateWorkBoard = () =>{
    navigate('/work-board')
  }
  return (
    <div className={Classes.container}>
        <div className={Classes.card}>
            <button className={Classes.addwork} onClick={navigateAddWork}>Add Work</button>
            <button className={Classes.workboard} onClick={navigateWorkBoard}>WorkBoard</button>
        </div>
    </div>
  )
}

export default Home