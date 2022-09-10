import React, {useState,useRef} from 'react';
import {useNavigate} from 'react-router-dom';
import Classes from './AddWork.module.css';
import axios from 'axios';
import Modal from './UI/Modal';

const AddWork = () => {
  const navigate = useNavigate();
  const empId = useRef('');
  const empName=useRef('');
  const taskName=useRef('');
  const startDate=useRef('');
  const endDate=useRef('');
  const workForm=useRef(null);
  const taskStatus = useRef('');
  const [empIdError, setEmpIdError] = useState(false)
  const [empNameError, setEmpNameError] = useState(false)
  const [taskNameError, setTaskNameError] = useState(false)
  const [startDateError, setStartDateError] = useState(false)
  const [endDateError, setEndDateError] = useState(false)
  const [statusError, setStatusError] = useState(false)
  const [modalIsShown,setModalIsShown] = useState(false);
  const [resonpseMessage, setResponseMessage] = useState('');
  const [minEndDate,setMinEndDate] = useState(new Date());
  const url = "http://localhost:8800/api/task";

  const navigateToHome = () =>{
    navigate("/");
  }
 const hideModalHandler = () => {
    setModalIsShown(false);
  }
  const setEndDateMin = () =>{
    setMinEndDate(startDate.current.value ? startDate.current.value : new Date())
  }

  const validateEmpId = () =>{
    if(!empId.current.value.trim()){
      setEmpIdError(true);
      return;
    }
    setEmpIdError(false);
  }

  const validateEmpName = () =>{
    if(!empName.current.value.trim()){
      setEmpNameError(true);
      return;
    }
      setEmpNameError(false);
  }

  const validateTaskName = () =>{
    if(!taskName.current.value.trim()){
      setTaskNameError(true);
      return;
    }
    setTaskNameError(false);
  }

  const validateStartDate = () => {
    if(!startDate.current.value){
      setStartDateError(true);
      return;
    }
    setStartDateError(false);
  }

  const validateEndDate = () =>{
    if(!endDate.current.value.trim()){
      setEndDateError(true);
      return;
    }
    setEndDateError(false);
  }
  const validateTaskStatus = () =>{
    if(!taskStatus.current.value.trim()){
      setStatusError(true);
      return;
    }
    setStatusError(false);
  }

  const submitHandler = (event) =>{
    event.preventDefault();
    // alert("form submitted");
    // validateEmpId();
    // validateEmpName();
    // validateEndDate();
    // validateStartDate();
    // validateTaskName();
    // validateTaskStatus();
    const formData = {
      employeeId:empId.current.value,
      employeeName:empName.current.value,
      taskName:taskName.current.value,
      startDate:new Date(startDate.current.value).toISOString(),
      endDate:new Date(endDate.current.value).toISOString(),
      status:taskStatus.current.value
    }
    console.log("form data is ", formData);
    axios.post(url,formData).then((res)=>{
      if(res.status===200){
        event.target.reset();
        setResponseMessage('Work Added Successfully! 😊');
        setModalIsShown(true);

      }
    }).catch((err)=>{
      setResponseMessage('Some Error Occurs while Adding Work 😔')
      setModalIsShown(true);
    })
  }
  return (
    <>
      
      <form className='Classes.form' onSubmit={submitHandler} ref={workForm}>
      <header><h1>Add Your Work Here</h1></header>
          <div className={`${Classes['form-control']} ${empIdError ? Classes.invalid : ''}`} >
              <label htmlFor="empId">Employee ID <sup className={Classes.mandatory}>*</sup></label>
              <input type="text" name="empId" htmlFor="empId" ref={empId} onBlur={validateEmpId}/>
          </div>
          <div className={`${Classes['form-control']} ${empNameError ? Classes.invalid : ''}`}>
              <label htmlFor="empName"> Employee Name <sup className={Classes.mandatory}>*</sup></label>
              <input type="text" name="empName" htmlFor="empName" ref={empName} onBlur={validateEmpName} />
          </div>
          <div className={`${Classes['form-control']} ${taskNameError ? Classes.invalid : ''}`}>
              <label htmlFor="taskName"> Task Name <sup className={Classes.mandatory}>*</sup></label>
              <input type="text" name="taskName" htmlFor="taskName" ref={taskName} onBlur={validateTaskName} />
          </div>
          <div className={`${Classes['form-control']} ${startDateError ? Classes.invalid : ''}`}>
              <label htmlFor="startDate"> Task Start Date <sup className={Classes.mandatory}>*</sup></label>
              <input type="date" name="startDate" htmlFor="startDate" ref={startDate} onInput={setEndDateMin} onBlur={validateStartDate}/>
          </div>
          <div className={`${Classes['form-control']} ${endDateError ? Classes.invalid : ''}`}>
              <label htmlFor="endDate"> Task End Date <sup className={Classes.mandatory}>*</sup></label>
              <input type="date" name="endDate" htmlFor="endDate" ref={endDate}  min={minEndDate} onBlur={validateEndDate} />
          </div>
          <div className={`${Classes['form-control']} ${statusError ? Classes.invalid : ''}`}>
              <label htmlFor="status">Status<sup className={Classes.mandatory}>*</sup></label>
              <select id="status" name="status" ref={taskStatus} onBlur={validateTaskStatus}>
                <option value="notStarted">Not Started</option>
                <option value="inProgress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
          </div>
          <div className={`${Classes['form-control']} ${Classes.actionBtnDiv}`}>
              <button type='submit'> Add </button>
              <button type='button' onClick={navigateToHome}>Cancel</button>
          </div>
      </form>
     {modalIsShown && <Modal onHideModel={hideModalHandler}>
           {/* <div className={Classes.modalHeader}> */}
          <div>
            <h2 className={Classes.modalHeader}>Modal Header</h2>
          {/* </div> */}
            <div className={Classes.modalBody}>
                <p>{resonpseMessage}</p>                
            </div>
            <div className={Classes.modalActions}>
              <button className={Classes["button--alt"]} onClick={hideModalHandler}>
                  Close
              </button>
            </div>
          </div>
      </Modal>}
    </>
  )
}

export default AddWork;