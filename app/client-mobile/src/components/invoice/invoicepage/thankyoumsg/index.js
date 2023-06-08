import React from 'react';
import {Text, View, StyleSheet } from '@react-pdf/renderer';

const styles = StyleSheet.create({
   
    titleContainer:{
        flexDirection: 'row',
        marginTop: 28
    },
    reportTitle:{
        fontSize: 12,
        textAlign: 'center',
        textTransform: 'uppercase',
        margin: 'auto'
    }
  });


  const InvoiceThankYouMsg = () => (
    <View style={styles.titleContainer}>
        <Text tabIndex={0} style={styles.reportTitle}>THANK YOU AND APPRECIATE YOUR BUSINESS!</Text>
    </View>
  );
  
  export default InvoiceThankYouMsg