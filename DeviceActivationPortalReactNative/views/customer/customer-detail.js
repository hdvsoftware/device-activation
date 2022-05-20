import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { CustomerApi } from '../../generated/api/'
import { DeviceList } from '../device/device-list';
import { HorizontalLine } from '../shared/horizontal-line';
import { formatDateString } from '../shared/utils'

export default function CustomerDetail(props) {
    let id = props.route.params.id;

    const [customer, setDetails] = useState({});

    useEffect(() => {
        new CustomerApi().customerDetailIdGet(id)
           .then(response => response.json())
           .then(result => {
              setDetails(result);
           });
     }, [])

     function hasDevices() {
        return (customer && customer.devices && customer.devices.length > 0);
     }

     function createDataRow(label, value) {
        return (
            <View style={customerDetailStyles.row}>
                <Text style={customerDetailStyles.label}>{label}</Text>
                <Text style={customerDetailStyles.value}>{value}</Text>
            </View>
        );
    }
   
    return (
        <View style={customerDetailStyles.wrapper}>
            <View style={customerDetailStyles.data}>
                {createDataRow('Code', customer.code)}
                {createDataRow('Naam', customer.name)}
                {createDataRow('Omschrijving', customer.description)}
                {createDataRow('Licenties', `${customer.registeredDevices} / ${customer.maxDevices}`)}
                {createDataRow('Server', customer.server)}
                {createDataRow('Aangemaakt op', formatDateString(customer.created))}
            </View>

            <HorizontalLine text="Devices"/>
            {
                hasDevices() ? <DeviceList devices={customer.devices} /> : <Text>Geen geregistreerde devices</Text>
            }
          
            
        </View>
    );
}

const customerDetailStyles = StyleSheet.create ({
    wrapper: {
        padding: 10
    },
    data: {
        paddingBottom:20
    },
    row: {
        flexDirection: 'row',
        flex: 1
    },
    label: {
        fontWeight: 'bold',
        justifyContent: 'flex-start',
        flex:1
    },
    value: {
        justifyContent: 'flex-end',
        flex:1
    }
});