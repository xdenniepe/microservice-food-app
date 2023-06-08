import React from 'react';
import { View, StyleSheet } from '@react-pdf/renderer';
import InvoiceTableHeader from '../header'
import InvoiceTableRow from '../tablerow'
import InvoiceTableBlankSpace from '../invoicetableblankspace'
import InvoiceTableFooter from '../footer'

const styles = StyleSheet.create({
    tableContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 24,
        borderWidth: 1,
        borderColor: '#751132',
    },
});

  const InvoiceItemsTable = ({invoice, tabIndex}) => (
    <View style={styles.tableContainer}>
        <InvoiceTableHeader />
        <InvoiceTableRow items={invoice.items} />
        <InvoiceTableFooter invoice={invoice} />
    </View>
  );
  
  export default InvoiceItemsTable