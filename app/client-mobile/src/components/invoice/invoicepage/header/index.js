import React from 'react';
import {Text, View, StyleSheet } from '@react-pdf/renderer';

const borderColor = 'white'
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        borderBottomColor: '#751132',
        backgroundColor: '#751132',
        borderBottomWidth: 1,
        alignItems: 'center',
        height: 24,
        textAlign: 'center',
        fontStyle: 'bold',
        flexGrow: 1,
        color: 'white',
  
    },
    description: {
        width: '60%',
        borderRightColor: borderColor,
        borderRightWidth: 2,
    },
    qty: {
        width: '10%',
        borderRightColor: borderColor,
        borderRightWidth: 2,
    },
    rate: {
        width: '15%',
        borderRightColor: borderColor,
        borderRightWidth: 2,
    },
    amount: {
        width: '15%'
    }
  });

  const InvoiceTableHeader = () => (
    <View style={styles.container}>
        <Text tabIndex={0} style={styles.description} aria-label="Product Name">Product Name</Text>
        <Text tabIndex={0} style={styles.qty} aria-label="Qty">Qty</Text>
        <Text tabIndex={0} style={styles.rate} aria-label="Price">Price</Text>
        <Text tabIndex={0} style={styles.amount} aria-label="Subtotal">Subtotal</Text>
    </View>
  );
  
  export default InvoiceTableHeader