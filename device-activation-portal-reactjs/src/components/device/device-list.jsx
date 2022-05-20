import React from 'react';
import { useNavigate } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid'
import moment  from 'moment';

export function DeviceList(props) {
   const navigate = useNavigate();
   let devices = [];
   if(props.devices) {
      devices = props.devices;
   }
   
   const columns = [
      {  valueGetter: getDisplayValue, field: 'uuid', headerName: 'UUID', flex: 1, hideable: false },
      {  valueGetter: getDisplayValue, field: 'description', headerName: 'DESCRIPTIONS', flex: 1, hideable: false },
      {  valueGetter: getDisplayValue, field: 'lastConnection', headerName: 'LAST CONNECTION', flex: 1, hideable: false },
   ];
   const columnVisibilityModel = { }

   function getDisplayValue(params) {

      switch(params.field) {
         case 'lastConnection':
            if(params.row[params.field]) {
               return moment(params.row[params.field]).format('DD-MM-yyyy HH:mm');
            } else {
               return '';
            }
            
         default:
            return params.row[params.field];
      }
   }

   function onRowClick(params, event, details) {
      // navigate(`${params.id}`);
   }

   return (
      <div style={{ height: 400, width: '100%'}}>
         <DataGrid 
               rows={devices}
               columns={columns}
               columnVisibilityModel={columnVisibilityModel}
               disableColumnSelector={true}
               pageSize={10}
               rowsPerPageOptions={[10]}
               onRowClick={onRowClick}
            
            />
      </div>
   );
}
