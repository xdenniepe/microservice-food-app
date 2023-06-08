import React from 'react';
import {Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    headerContainer: {
        marginTop: 36
    },
    billTo: {
        marginTop: 20,
        paddingBottom: 3,
        fontFamily: 'Helvetica-Oblique'
    },
  });


  const BillTo = ({invoice}) => (
    <View style={styles.headerContainer}>
        <Text tabIndex={0} style={styles.billTo} aria-label="Bill To">Bill To:</Text>
        <Text tabIndex={0} aria-label={invoice.cardholder}>{invoice.cardholder}</Text>
    </View>
  );
  
  export default BillTo