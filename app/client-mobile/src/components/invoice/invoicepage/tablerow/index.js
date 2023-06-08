import React, {Fragment} from 'react';
import {Text, View, StyleSheet } from '@react-pdf/renderer';

const borderColor = '#751132'
const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        borderBottomColor: '#751132',
        borderBottomWidth: 1,
        alignItems: 'center',
        height: 24,
        fontStyle: 'bold',
    },
    description: {
        width: '60%',
        textAlign: 'left',
        borderRightColor: borderColor,
        borderRightWidth: 1,
        paddingLeft: 8,
    },
    qty: {
        width: '10%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
        textAlign: 'right',
        paddingRight: 8,
    },
    rate: {
        width: '15%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
        textAlign: 'right',
        paddingRight: 8,
    },
    amount: {
        width: '15%',
        textAlign: 'right',
        paddingRight: 8,
    }
  });


const InvoiceTableRow = ({items}) => {
    const rows = items.map( item => 
        <View style={styles.row} key={item.productOrderId.toString()}>
            <Text tabIndex={0} style={styles.description} aria-label={item.name}>{item.name}</Text>
            <Text tabIndex={0} style={styles.qty} aria-label={item.quantity}>{item.quantity}</Text>
            <Text tabIndex={0} style={styles.rate} aria-label={(item.price*1).toFixed(2)}>&#36;{(item.price*1).toFixed(2)}</Text>
            <Text tabIndex={0} style={styles.amount} aria-label={(item.subtotal*1).toFixed(2)}>&#36;{(item.subtotal*1).toFixed(2)}</Text>
        </View>
    )
    return (<Fragment>{rows}</Fragment> )
};
  
  export default InvoiceTableRow