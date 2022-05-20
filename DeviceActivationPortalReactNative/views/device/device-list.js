import React from 'react';
import { SafeAreaView, FlatList } from 'react-native-web';
import { HorizontalLine } from '../shared/horizontal-line';
import { DeviceListItem } from './device-list-item';

export function DeviceList(props) {
    let devices = props.devices;

    const renderItem = ({ item }) => (
        <DeviceListItem 
            itemData={item} />
    );

    function itemDivider() {
        return (<HorizontalLine backgroundColor='lightgrey'/>)
    }

    return(
        <SafeAreaView>
            <FlatList
                data={devices}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                ItemSeparatorComponent={itemDivider}
            />
        </SafeAreaView>
    )
}