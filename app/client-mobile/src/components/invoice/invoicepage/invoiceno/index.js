import React, { Fragment } from 'react';
import {Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    invoiceNoContainer: {
        flexDirection: 'row',
        marginTop: 36,
        justifyContent: 'flex-end'
    },
    invoiceDateContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end'
    },
    invoiceDate: {
            fontSize: 12,
            fontStyle: 'bold',
            marginLeft: '16px'
    },
    orderNumberLabel: {
        width: 75,
    },
    dateLabel: {
        width: 50,
    }
    
  });


  const InvoiceNo = ({invoice}) => (
        <Fragment>
            <View style={styles.invoiceNoContainer}>
                <Text tabIndex={0} style={styles.orderNumberLabel} aria-label="Order Number">Order Number:</Text>
                <Text tabIndex={0} style={styles.invoiceDate} aria-label={invoice.invoice_no}>{invoice.invoice_no}</Text>
            </View >
            <View style={styles.invoiceDateContainer}>
                <Text tabIndex={0} style={styles.dateLabel} aria-label="Date">Date: </Text>
                <Text tabIndex={0} aria-label={invoice.trans_date}>{invoice.trans_date}</Text>
            </View >
        </Fragment>
  );
  
  export default InvoiceNo