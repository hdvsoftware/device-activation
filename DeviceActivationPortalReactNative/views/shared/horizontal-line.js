import { Text, View } from 'react-native';
export function HorizontalLine(props) {
    let text = props.text;
    let _backgroundColor = props.backgroundColor || 'black';

    return (
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <View style={{flex: 1, height: 1, backgroundColor: _backgroundColor}} />
                {text && <View><Text style={{width: 50, textAlign: 'center'}}>{text}</Text></View>}
            <View style={{flex: 1, height: 1, backgroundColor: _backgroundColor}} />
        </View>
    );
}