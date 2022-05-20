import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import moment  from 'moment';
import Button from "@mui/material/Button";
import Table from '@mui/material/Table'

import { CustomerApi } from '../../generated/api'
import { AuthenticationComponent } from '../../shared/AuthenticationComponent'
import { DeviceList } from '../device/device-list'

function CustomerDetail()  {
   const navigate = useNavigate();
   const { id } = useParams();
   const [customer, setDetails] = useState({});
   
   useEffect(() => {
      new CustomerApi().customerDetailIdGet(id)
         .then(response => response.json())
         .then(result => {
            setDetails(result);
         });
   }, [])
   
   return (
      <div>
         <div>
         {
            (AuthenticationComponent.instance.hasRule('customer-update') && 
            <Button style={{ marginRight: '10px'}} onClick={() => navigate('edit')}>Aanpassen</Button>)             
         }
         </div>
         
         <div>
            <h3>Omgeving: { (customer.name)}</h3>
         </div>

         <Table>
            <tbody>
                  <tr>
                     <th>Code</th>
                     <td>{ customer.code }</td>
                  </tr>
                  <tr>
                     <th>Omschrijving</th>
                     <td>{ customer.description }</td>
                  </tr>
                  <tr>
                     <th>Server</th>
                     <td>{ customer.Server }</td>
                  </tr>
                  <tr>
                     <th>Gebruikte licenties</th>
                     <td>{customer.registeredDevices} / { customer.maxDevices}</td>
                  </tr>
                  <tr>
                     <th>Aangemaakt op</th>
                     <td>
                        {
                          customer && moment(customer.created).format('DD-MM-yyyy HH:mm')
                        }                        
                     </td>
                  </tr>
            </tbody>
         </Table>

         <hr/>
         <div>
         {
            (AuthenticationComponent.instance.hasRule('device-add') && 
            <Button style={{ marginRight: '10px'}} onClick={() => navigate('/device/new')}>Device toevoegen</Button>)
         }
         </div>
         <DeviceList devices={customer.devices} />
      </div>
   
   );
   
}
export default CustomerDetail;