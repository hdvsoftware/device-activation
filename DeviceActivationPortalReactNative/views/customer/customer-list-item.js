import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native';
import { formatDateString } from '../shared/utils'

export function CustomerListItem(props) {
    const navigation = useNavigation();
    let customer = props.itemData;

    function createDataRow(label, value) {
        return (
            <View style={customerListItemStyles.row}>
                <Text style={customerListItemStyles.label}>{label}</Text>
                <Text style={customerListItemStyles.value}>{value}</Text>
            </View>
        );
    }

    return (
        <TouchableOpacity
            onPress={() => { navigation.navigate('CustomerDetail', { id: customer.id }) }}>
            <View style={customerListItemStyles.wrapper}>
                {createDataRow('Code', customer.code)}
                {createDataRow('Naam', customer.name)}
                {createDataRow('Omschrijving', customer.description)}
                {createDataRow('Licenties', `${customer.registeredDevices} / ${customer.maxDevices}`)}
                {createDataRow('Aangemaakt op', formatDateString(customer.created))}
            </View>
        </TouchableOpacity>
    );
}

const customerListItemStyles = StyleSheet.create ({
    wrapper: {
        padding: 10
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