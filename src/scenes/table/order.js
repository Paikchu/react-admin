import { DataGrid } from "@mui/x-data-grid";
import {Box,useTheme} from "@mui/material";
import {tokens} from '../../theme'
import Header from "../../components/Header";
import { useEffect, useState } from "react";
import Switch from '@mui/material/Switch';




const OrderTable = (props) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [cellList, setcellList] = useState([]);
    const columns = [
    { 
        field: "o_id", 
        headerName: "Order ID",
    },
    {
        field: "u_name",
        headerName: "User Name",
        flex: 1,
      },
    {
      field: "g_name",
      headerName: "Game Name",
      flex: 1,
    },
    {
      field: "o_value",
      headerName: "Value",
      flex: 1,
      editable: true,
    },
    {
      field: "o_time",
      headerName: "Date",
      flex: 1,
      
    },
  ];
  useEffect(() => {
    fetch('/admin-table-order',{
        method: 'get'
    })
    .then(response => response.json())
    .then(data => setcellList(data));
  }, [])
    return (
        <Box margin="20px">
            <Header title = "Order"/>
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
            getRowId = {(row)=>row.o_id}
            />
            </Box>
        </Box>
    );
};

export default OrderTable;