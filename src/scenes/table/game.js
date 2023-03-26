import { DataGrid } from "@mui/x-data-grid";
import {Box, IconButton, Typography, useTheme} from "@mui/material";
import {tokens} from '../../theme'
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../../components/Header";
import { useEffect, useState } from "react";
import { PropaneSharp } from "@mui/icons-material";
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';

const GameTable = (props) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [selected, setselected] = useState(false);
    const [cellList, setcellList] = useState([]);
    const columns = [
    { 
        field: "g_id", 
        headerName: "ID" 
    },
    {
      field: "g_name",
      headerName: "Name",
      flex: 1,
      editable: true
    },
    {
        field: "g_release_date",
        headerName: "Release Date",
        flex: 1,
    },
    {
      field: "g_price",
      headerName: "Price",
      flex: 1,
      editable: true
    },
    {
        field: "g_tag",
        headerName: "Tag",
        flex: 1,
        editable: true
    },
    {
        field: "c_name",
        headerName: "Company",
        flex: 1,
    },

  ];
  useEffect(() => {
    fetch('/admin-table-game',{
        method: 'get'
    })
    .then(response => response.json())
    .then(data => setcellList(data));
  }, [])

  const onRowsSelectionHandler = (ids) => {
    if (ids.length === 0){
        setselected(false);
        console.log("null");
    }
    else{
        const selectedRowsData = ids.map((id) => cellList.find((row) => row.g_id === id));
        setselected(true);
        console.log(selectedRowsData);
    }
  }

    return (
        <Box margin="20px">

            <Header title = "Game"/>
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
                checkboxSelection 
                editMode="cell"
                rows={cellList} 
                columns={columns} 
                getRowId = {(row)=>row.g_id}
                onRowSelectionModelChange={(ids) => onRowsSelectionHandler(ids)}
                onCellEditStop = {(param, event) => {
                    if(param.field === "g_name"){
                        console.log(param.field);
                        fetch('/admin-g-change',{
                            method:'post',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                g_id: param.id,
                                g_name: event.target.value,
                            })
                        })
                        .then(response => response.json())
                        .then(data => setcellList(data))
                    }
                    else if(param.field === "g_price"){
                        console.log(param.field);
                        fetch('/admin-g-change',{
                            method:'post',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                g_id: param.id,
                                g_price: event.target.value,
                            })
                        })
                        .then(response => response.json())
                        .then(data => setcellList(data))
                    }
                    else if(param.field === "g_tag"){
                        console.log(param.field);
                        fetch('/admin-g-change',{
                            method:'post',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({
                                g_id: param.id,
                                g_tag: event.target.value,
                            })
                        })
                        .then(response => response.json())
                        .then(data => setcellList(data))
                    }
    
                }}
            />

            </Box>
            {selected === true ? 
                <Button variant="outlined" color="secondary" startIcon={<DeleteIcon />}>
                    Delete
                </Button>
             : null
            }

        </Box>

    );
};
export default GameTable;