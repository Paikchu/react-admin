import { DataGrid } from "@mui/x-data-grid";
import {Box,useTheme} from "@mui/material";
import {tokens} from '../../theme'
import Header from "../../components/Header";
import { useEffect, useState } from "react";
import Switch from '@mui/material/Switch';




const CompanyTable = (props) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [cellList, setcellList] = useState([]);
    const columns = [
    { 
        field: "c_id", 
        headerName: "ID",
    },
    {
      field: "c_name",
      headerName: "Name",
      flex: 1,
      editable: true,
    },
    {
      field: "c_email",
      headerName: "Email",
      flex: 1,
      editable: true,
    },
    {
      field: "c_permission",
      headerName: "Active",
      flex: 1,
      renderCell: (param) => {
        const onChange = (event) =>{
            fetch('/admin-access-c',{
                method: 'post',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({c_id: param.id, c_permission: param.value})
            })
            .then(response => response.json())
            .then(data => setcellList(data))
        }
        return (<Switch checked = {param.value} onChange={onChange} />)
      }
    },
  ];
  useEffect(() => {
    fetch('/admin-table-c',{
        method: 'get'
    })
    .then(response => response.json())
    .then(data => setcellList(data));
  }, [])
    return (
        <Box margin="20px">
            <Header title = "Company"/>
            <Box 
            margin="40px 0 0 0" 
            height = "75vh" 
            sx={{
                "& .MuiDataGrid-root": {
                    border: "none",
                },
                "& .MuiDataGrid-cell": {
                    borderBottom: "none",
                },
                "& .name-column--cell": {
                    color: colors.greenAccent[300],
                },
                "& .MuiDataGrid-columnHeaders": {
                    backgroundColor: colors.blueAccent[700],
                    borderBottom: "none",
                },
                "& .MuiDataGrid-virtualScroller": {
                    backgroundColor: colors.primary[400],
                },
                "& .MuiDataGrid-footerContainer": {
                    borderTop: "none",
                    backgroundColor: colors.blueAccent[700],
                },
                "& .MuiCheckbox-root": {
                    color: `${colors.greenAccent[200]} !important`,
                },
            }}
            >
            <DataGrid 
            disableRowSelectionOnClick 
            editMode="cell" 
            checkboxSelection 
            rows={cellList} 
            columns={columns} 
            getRowId = {(row)=>row.c_id}
            onCellEditStop = {(param, event) => {
                if(param.field === "c_name"){
                    console.log(param.field);
                    fetch('/admin-c-change-name',{
                        method:'post',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            c_id: param.id,
                            c_name: event.target.value,
                        })
                    })
                    .then(response => response.json())
                    .then(data => setcellList(data))
                }
                else if(param.field === "c_email"){
                    console.log(param.field);
                    fetch('/admin-c-change-email',{
                        method:'post',
                        headers: {
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            c_id: param.id,
                            c_email: event.target.value,
                        })
                    })
                    .then(response => response.json())
                    .then(data => setcellList(data))
                }

            }}
            />
            </Box>
        </Box>
    );
};

export default CompanyTable;