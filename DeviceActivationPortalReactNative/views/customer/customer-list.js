import React, { useState, useEffect } from 'react';
import { SafeAreaView, FlatList } from 'react-native-web';
import { CustomerListItem } from './customer-list-item';
import { CustomerApi } from '../../generated/api/'
import { HorizontalLine } from '../shared/horizontal-line';

export default function CustomerList(props) {
    const [rows, setRows] = useState([]);

    useEffect(() => {
        new CustomerApi().customerGet()
        .then(response => response.json())
        .then(result => {
           setRows(result);
        });
     }, [])

    const renderItem = ({ item }) => (
        <CustomerListItem 
            itemData={item} />
    );

    function itemDivider() {
        return (<HorizontalLine backgroundColor='lightgrey'/>)
    }

    return (
        <SafeAreaView>
            <FlatList
                data={rows}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                ItemSeparatorComponent={itemDivider}
            />
        </SafeAreaView>
    );
}