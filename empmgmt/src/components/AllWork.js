import axios from "axios";
import React, { useEffect, useState } from "react";
import MaterialTable, {MTableToolbar} from "material-table";
import { ThemeProvider, createTheme } from "@mui/material";
import tableIcons from "./UI/MaterialTableIcon";
import { makeStyles } from "@material-ui/core";
import Classes from "./AllWork.module.css";
import { MatSnackBar } from "./UI/MatSnackBar";
import Spinner from "./UI/Spinner";
import Header from "./Layout/Header";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiPaper-root": {
      boxShadow: "none",
    },
  },
  actions: {
    color: "blue",
  },
}));

const AllWork = () => {
  const defaultMaterialTheme = createTheme();
  const getTaskUrl = "http://localhost:8800/api/task/alltask";
  const deleteTaskUrl = "http://localhost:8800/api/task/";
  const [empWork, setEmpWork] = useState([]);
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [sendRequest, setSendRequest] = useState(true);
  const [isDataLoading, setIsDataLoading] = useState(false);
  const [errorWhileDataFetching, setErrorWhileDataFetching] = useState(false);
  const [snackbarOpen, setSnackBarOpen] = useState(false);
  const [snackBarMsg, setSnackBarMsg] = useState("");
  const navigate = useNavigate();

  const styleClass = useStyles();

  const columns = [
    { title: "Employee Id", field: "employeeId" },
    { title: "Employee Name", field: "employeeName" },
    { title: "Task Name", field: "taskName" },
    { title: "Start Date", field: "startDate", type: "date" },
    { title: "End Date", field: "endDate", type: "date" },
    { title: "Status", field: "status" },
    { title: "Created On", field: "createdAt", type: "date" },
  ];

  const fetchData = async () => {
    setIsDataLoading(true);
    await axios
      .get(getTaskUrl)
      .then((res) => {
        setEmpWork((prev) => {
          return [...res.data];
        });
        console.log(res);
        setIsDataLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsDataLoading(false);
      });
  };

  const handleSnackBarClose = (event, reason) => {
    if (reason === "clickaway") return;
    setSnackBarOpen(false);
  };

  useEffect(() => {
    if (sendRequest) {
      fetchData();
      setSendRequest(false);
    }
  }, [page, limit, sendRequest]);

  const deleteRecord = async (event, row) => {
    console.log("deleteing record", row);
    const url = deleteTaskUrl + row._id;
    await axios
      .delete(url)
      .then((res) => {
        console.log(res);
        if (res.status == 200) {
          setSendRequest(true);
          setSnackBarOpen(true);
          setSnackBarMsg("Data Deleted Successfully!");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const submitHandler = (event) => {
    event.preventDefault();
    alert("form submitted");
  };
  return (
    <>
      {isDataLoading && <Spinner></Spinner>}
      {!isDataLoading && (
        <div className={`${Classes.tableContainer} ${styleClass.root}`}>
          <ThemeProvider theme={defaultMaterialTheme}>
            <MaterialTable
              elevation={0}
              title="WorkBoard"
              columns={columns}
              data={empWork}
              icons={tableIcons}
              actions={[
                {
                  icon: tableIcons.Delete,
                  tooltip: "Delete User",
                  onClick: (event, rowData) => deleteRecord(event, rowData),
                },
              ]}
              options={{
                showTitle: false,
                actionsColumnIndex: -1,
                actionsCellStyle: {
                  paddingRight: "40px",
                },
                pageSizeOptions: [2, 5, 10, 20, 50],
                exportButton: true,
                sorting: true,
                headerStyle: {
                  backgroundColor: "#01579b",
                  color: "#FFF",
                },
                rowStyle: (data) => {
                  console.log(data);
                  return data.status === "completed"
                    ? { background: "#caf7a6" }
                    : data.status === "inProgress"
                    ? { background: "#f5ebb3" }
                    : { background: "#f5f7f2" };
                },
              }}
              components={{
                  Toolbar: props => (
                   <>
                      <div style={{padding: '0px 10px 3px 10px', display:'flex',height:'40px', borderBottom:"1px solid black"}}>
                            <button style={{padding:'3px 10px'}} onClick={()=>navigate('/')}>Home</button>
                            <div style={{width:"80vw", display:"flex",alignItems:'center',justifyContent:'center', fontSize:"20px",color:"#0A66C2"}}>
                            <h2 style={{margin:"0", textDecoration:"underline"}}>WorkBoard</h2>
                            </div>
                      </div>
                      <MTableToolbar {...props} />
                    </>
                  ),
                }}
            
            />
          </ThemeProvider>
          <MatSnackBar
            open={snackbarOpen}
            message={snackBarMsg}
            handleSnackBarClose={handleSnackBarClose}
          />
        </div>
      )}
    </>
  );
};

export default AllWork;
