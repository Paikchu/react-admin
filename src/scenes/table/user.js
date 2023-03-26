import { DataGrid } from "@mui/x-data-grid";
import {Box, IconButton, Typography, useTheme} from "@mui/material";
import {tokens} from '../../theme'
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../../components/Header";
import { useEffect, useState } from "react";
import { PropaneSharp } from "@mui/icons-material";

const UserTable = (props) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [cellList, setcellList] = useState([]);
    const columns = [
    { 
        field: "u_id", 
        headerName: "ID" 
    },
    {
      field: "u_name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "u_email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "u_permission",
      headerName: "Access Level",
      flex: 1,
    },
  ];
  useEffect(() => {
    fetch('/admin-table-user',{
        method: 'get'
    })
    .then(response => response.json())
    .then(data => setcellList(data));
  }, [])
    return (
        <Box margin="20px">
            <Header title = "User"/>
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
            <DataGrid checkboxSelection rows={cellList} columns={columns} getRowId = {(row)=>row.u_id}/>
            </Box>
        </Box>
    );
};

export default UserTable;