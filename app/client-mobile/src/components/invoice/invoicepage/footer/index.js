import React, { useEffect } from 'react';
import { Text, View, StyleSheet } from '@react-pdf/renderer';

const borderColor = '#751132'
const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        borderBottomColor: '#751132',
        borderBottomWidth: 1,
        alignItems: 'center',
        height: 24,
        fontSize: 12,
        fontStyle: 'bold',
    },
    description: {
        width: '85%',
        textAlign: 'right',
        borderRightColor: borderColor,
        borderRightWidth: 1,
        paddingRight: 8,
    },
    total: {
        width: '15%',
        textAlign: 'right',
        paddingRight: 8,
    }
});

const InvoiceTableFooter = ({ invoice }) => {
    return (
        <>
            <View style={styles.row}>
                <Text tabIndex={0} style={styles.description} aria-label="Subtotal">Subtotal</Text>
                <Text tabIndex={0} style={styles.total} aria-label={`&#36;${invoice.subtotal}`}>&#36;{invoice.subtotal}</Text>
            </View>
            <View style={styles.row}>
                <Text tabIndex={0} style={styles.description} aria-label="Taxes & Fees">Taxes & Fees</Text>
                <Text tabIndex={0} style={styles.total} aria-label={`&#36;{invoice.tax}`}>&#36;{invoice.tax}</Text>
            </View>
            {invoice.coupon == null
            ?
            null
            :
            <View style={styles.row}>
                <Text style={styles.description} aria-label={invoice.coupon}>{invoice.coupon}</Text>
                <Text style={styles.total} aria-label={`-${invoice.discount}`}>-${invoice.discount}</Text>
            </View>
            }
            <View style={styles.row}>
                <Text style={styles.description} aria-label="TOTAL">TOTAL</Text>
                <Text style={styles.total} aria-label={`&#36;{invoice.total}`}>&#36;{invoice.total}</Text>
            </View>
        </>
    )
};

export default InvoiceTableFooter