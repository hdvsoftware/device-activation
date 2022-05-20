import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { formatDateString } from '../shared/utils'

export function DeviceListItem(props) {
    let device = props.itemData;

    function createDataRow(label, value) {
        return (
            <View style={deviceListItemStyles.row}>
                <Text style={deviceListItemStyles.label}>{label}</Text>
                <Text style={deviceListItemStyles.value}>{value}</Text>
            </View>
        );
    }

    return (
        <View style={deviceListItemStyles.wrapper}>
            {createDataRow('UUID', device.uuid)}
            {createDataRow('Omschrijving', device.description)}
            {/* {createDataRow('Laatste wijziging', formatDateString(device.modified)} */}
            {createDataRow('Laatste verbinding', formatDateString(device.lastConnection))}
        </View>
    )
}

const deviceListItemStyles = StyleSheet.create({
    wrapper: {
        paddingTop: 5,
        paddingBottom: 5
    },
    row: {
        flexDirection: 'row',
        flex: 1
    },
    label: {
        fontWeight: 'bold',
        justifyContent: 'flex-start',
        flex: 1
    },
    value: {
        justifyContent: 'flex-end',
        flex: 1
    }
});