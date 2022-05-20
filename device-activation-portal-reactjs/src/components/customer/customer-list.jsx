import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid'
import moment  from 'moment';
import Button from "@mui/material/Button";


import { CustomerApi } from '../../generated/api/'
import { AuthenticationComponent } from '../../shared/AuthenticationComponent'

function CustomerList() {
   const navigate = useNavigate();
   const columns = [
      {  valueGetter: getDisplayValue, field: 'code', headerName: 'CODE', flex: 1, hideable: false },
      {  valueGetter: getDisplayValue, field: 'name', headerName: 'NAME', flex: 1, hideable: false },
      {  valueGetter: getDisplayValue, field: 'description', headerName: 'DESCRIPTIONS', flex: 1, hideable: false },
      {  valueGetter: getDisplayValue, field: 'devices', headerName: 'DEVICES', flex: 1, hideable: false },//registeredDevices / maxDevices
      {  valueGetter: getDisplayValue, field: 'created', headerName: 'CREATED', flex: 1, hideable: false },
   ];
   const columnVisibilityModel = { }
   const [rows, setRows] = useState([]);
   
   function getDisplayValue(params) {
      switch(params.field) {
         case 'devices':
            return (params.row.registeredDevices + ' / ' + params.row.maxDevices);
         case 'created':
            return moment(params.row[params.field]).format('DD-MM-yyyy HH:mm');
         default:
            return params.row[params.field];
      }
   }

   function onRowClick(params, event, details) {
      navigate(`${params.id}`);
   }

   useEffect(() => {
      new CustomerApi().customerGet()
      .then(response => response.json())
      .then(result => {
         setRows(result);
      });
   }, [])

   return (
      <div>
         <div>
         {
            (AuthenticationComponent.instance.hasRule('customer-add') && 
            <Button style={{ marginRight: '10px'}} onClick={() => navigate('/customer/new')}>Omgeving toevoegen</Button>)
         }
         </div>
         <div style={{ height: 400, width: '100%'}}>
            <DataGrid 
               rows={rows}
               columns={columns}
               columnVisibilityModel={columnVisibilityModel}
               disableColumnSelector={true}
               pageSize={5}
               rowsPerPageOptions={[5]}
               onRowClick={onRowClick}
            
            />
         </div>
      </div>
      
   );
}
export default CustomerList;