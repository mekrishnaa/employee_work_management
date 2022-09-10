import {useState} from 'react'
import classes from './Navbar.module.css';


const Navbar = (props) => {
    const [activeTab, setActiveTab] =  useState('addwork');
    const handleActiveTab = (activeTab) =>{
        setActiveTab(activeTab);
        props.onPageBtnClick(activeTab);
        console.log("setting active tab ",activeTab);
    }
  return (
    <>
    <div className={classes.container}>
        <button className={`${classes.addwork} ${activeTab==='addwork' ? classes.active : ''}`} onClick={()=>handleActiveTab('addwork')}>Add Work </button>
        <button className={`${classes.workboard} ${activeTab==='workboard' ? classes.active : ''}`} onClick={()=>handleActiveTab('workboard')}>Workboard</button>
    </div>
    </>
  )
}

export default Navbar