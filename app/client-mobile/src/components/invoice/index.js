import React from 'react';
import { Page, Document, Image, StyleSheet } from '@react-pdf/renderer';
import InvoiceTitle from './invoicepage/invoicetitle'
import BillTo from './invoicepage/billto'
import InvoiceNo from './invoicepage/invoiceno'
import InvoiceItemsTable from './invoicepage/invoiceitemstable'
import InvoiceThankYouMsg from './invoicepage/thankyoumsg'
import logo from '../../assets/images/logo.png'
import { addLeadingZeros, formatToPstPDF, getLocalStorageItem } from '../../service/helper';

const styles = StyleSheet.create({
    page: {
        fontFamily: 'Helvetica',
        fontSize: 11,
        paddingTop: 30,
        paddingLeft: 60,
        paddingRight: 60,
        lineHeight: 1.5,
        flexDirection: 'column',
    },
    logo: {
        width: 150,
        height: 60,
        marginLeft: 'auto',
        marginRight: 'auto'
    }
});

const Invoice = (props) => {
    const { transaction, paymentInfo, orderNo, items, coupon, discount } = props;
    const customer = getLocalStorageItem('user');
    const invoice = {
        "id": transaction.code,
        "invoice_no": addLeadingZeros(orderNo, 10),
        "balance": `$${paymentInfo.tiAmount}`,
        "cardholder": `${customer.firstName} ${customer.lastName}`,
        "company": paymentInfo.tiMerchantAccount,
        "discount": discount,
        "email": " ",
        "phone": " ",
        "address": " ",
        "trans_date": formatToPstPDF(transaction.timestamp),
        "items": items,
        "coupon": coupon,
        "total": (transaction.total - discount).toFixed(2),
        "subtotal": (transaction.subtotal * 1).toFixed(2),
        "tax": (transaction.total - transaction.subtotal).toFixed(2),
    };

    return (
        <Document>
            <Page size="A4" style={styles.page} aria-label="PDF Page" aria-hidden="false">
                <Image style={styles.logo} src={logo} />
                <InvoiceTitle title='RECEIPT' />
                <InvoiceNo invoice={invoice} />
                <BillTo invoice={invoice} />
                <InvoiceItemsTable invoice={invoice} tabIndex={0} />
                <InvoiceThankYouMsg />
            </Page>
        </Document>
    )
};


export default Invoice