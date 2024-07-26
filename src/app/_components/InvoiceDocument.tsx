"use client";

import { Document, Font, Page, StyleSheet, Text, View, Image } from '@react-pdf/renderer';
import type { InvoiceObjectType } from '~/types';
// fonts
// Register the font
Font.register({
    family: 'helvetica',
    fonts: [
        { src: '/fonts/HelveticaNeueLight.ttf', fontWeight: "light" },
        { src: '/fonts/HelveticaNeueUltraLight.ttf', fontWeight: "ultralight" },
        { src: '/fonts/HelveticaNeueBold.ttf', fontWeight: "bold" },
        { src: '/fonts/HelveticaNeueMedium.ttf', fontWeight: "medium" },
    ]
});

Font.register({
    family: 'roboto',
    fonts: [
        { src: "/fonts/RobotoRegular.ttf" },
        { src: "/fonts/RobotoBold.ttf", fontWeight: "bold" },
    ]
});


const LIGHT_GREY_CODE = "#808080";
const GREY_CODE = "#a6a6a6";

// Create styles
const styles = StyleSheet.create({
    page: {
        fontFamily: "roboto",
        fontSize: "10px",
        padding: 15
    },
    topSection: {
        marginTop: 30,
        height: "200px",
        display: "flex",
        flexDirection: "row",
        padding: 10,
        paddingRight: 0
    },
    leftSide: {
        display: "flex",
        width: "100%",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "100%",
    },
    rightSide: {
        display: "flex",
        width: "100%",
        justifyContent: "center",
        textAlign: "right",
        flexDirection: "column",
        height: "100%",
    },
    term: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-end",
        columnGap: "5px",
        paddingRight: "10px"
    },
    termContainer: {
        display: "flex",
        rowGap: 5,
        paddingVertical: 10,
        justifyContent: "space-between"
    },
    // table section
    tableContainer: {
        marginTop: "25px"
    },
    tableHeader: {
        display: "flex",
        backgroundColor: "#232E38",
        flexDirection: "row",
        fontFamily: "helvetica",
        fontWeight: "bold",
        justifyContent: "space-between",
        columnGap: "5px"
    },
    tableHeaderText: {
        padding: "5px 7px",
        textAlign: "center",
        color: "white",
        fontSize: "12px",
    },
    tableItemRow: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        columnGap: "2px"
    },
    tableItemText: {
        padding: "5px 7px",
        textAlign: "center",
        fontSize: "11px",
        fontFamily: "helvetica",
        fontWeight: "light",
    },
    // price adjustments
    adjustmentText: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-end",
        columnGap: "5px",
        padding: "2px",
    },
    adjustmentsContainer: {
        marginTop: "70px"
    },
    // notes
    notesSection: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        rowGap: "15px",
        paddingRight: "10px"
    }
});

// Create Document Component
const InvoiceDocument = ({ invoiceObject }: { invoiceObject: InvoiceObjectType }) => {

    const currency = invoiceObject.currency.value;
    const logo = invoiceObject.logo;

    return (
        <Document>
            <Page style={styles.page}>
                {/* top section */}
                <View style={styles.topSection}>
                    {/* left side */}
                    <View style={styles.leftSide}>
                        <View>

                            {logo &&
                                // eslint-disable-next-line jsx-a11y/alt-text
                                <Image source={invoiceObject.logo} style={{ height: "90px", width: "90px", marginBottom: "20px" }} />
                            }
                            <Text style={{ paddingRight: "10px", fontSize: "15px" }}>{invoiceObject.from}</Text>
                        </View>
                        {/* bill_to / Ship to */}
                        <View style={{ display: "flex", flexDirection: "row", columnGap: 40, paddingVertical: 10 }}>
                            <View>
                                <Text>{invoiceObject.to_title}</Text>
                                <Text style={{ fontWeight: "bold" }}>{invoiceObject.to}</Text>
                            </View>
                            <View>
                                <Text>{invoiceObject.shipping_title}</Text>
                                <Text style={{ fontWeight: "bold" }}>{invoiceObject.ship_to}</Text>
                            </View>
                        </View>
                    </View>

                    {/* right side */}
                    <View style={styles.rightSide}>
                        <Text style={{ fontSize: 30, paddingRight: "10px" }}>{invoiceObject.header}</Text>

                        <Text style={{ paddingRight: "10px" }}># {invoiceObject.id}</Text>

                        <View style={styles.termContainer}>
                            <View style={styles.term}>
                                <Text style={{ color: LIGHT_GREY_CODE }}>{invoiceObject.date_title}:</Text>
                                <Text style={{ width: "100px" }}>3/3/2003</Text>
                            </View>
                            <View style={styles.term}>
                                <Text style={{ color: LIGHT_GREY_CODE }}>{invoiceObject.due_date_title}:</Text>
                                <Text style={{ width: "100px" }}>28/10/2003</Text>
                            </View>
                            <View style={styles.term}>
                                <Text style={{ color: LIGHT_GREY_CODE }}>{invoiceObject.to_title}:</Text>
                                <Text style={{ width: "100px" }}>3423</Text>
                            </View>
                            <View style={styles.term}>
                                <Text style={{ color: LIGHT_GREY_CODE }}>{invoiceObject.payment_terms_title}:</Text>
                                <Text style={{ width: "100px" }}>{invoiceObject.payment_terms}</Text>
                            </View>
                        </View>
                        <View style={{ ...styles.term, backgroundColor: GREY_CODE, padding: 10, paddingRight: 0 }}>
                            <Text style={{ fontFamily: "roboto", fontWeight: "bold", fontSize: "11px" }}>{invoiceObject.balance_title}:</Text>
                            <Text style={{ width: "100px", fontWeight: "bold" }}>{currency}{" "}{invoiceObject.balance}</Text>
                        </View>
                    </View>
                </View>

                {/* table */}
                <View style={styles.tableContainer}>
                    <View style={styles.tableHeader}>
                        <Text style={{ ...styles.tableHeaderText, width: "60%", textAlign: "left" }}>{invoiceObject.item_header}</Text>
                        <Text style={{ ...styles.tableHeaderText, width: "13%" }}>{invoiceObject.quantity_header}</Text>
                        <Text style={{ ...styles.tableHeaderText, width: "13%" }}>{invoiceObject.unit_cost_header}</Text>
                        <Text style={{ ...styles.tableHeaderText, width: "13%", textAlign: "right" }}>{invoiceObject.amount_header}</Text>
                    </View>
                    {/* items rows */}
                    <View style={{}}>
                        {
                            invoiceObject.items.map((item) => {
                                return (
                                    <View key={item.name} style={styles.tableItemRow}>
                                        <Text style={{ ...styles.tableItemText, width: "60%", textAlign: "left" }}>{item.name}</Text>
                                        <Text style={{ ...styles.tableItemText, width: "13%" }}>{currency}{" "}{item.quantity.toFixed(2)}</Text>
                                        <Text style={{ ...styles.tableItemText, width: "13%" }}>{currency}{" "}{item.unit_cost.toFixed(2)}</Text>
                                        <Text style={{ ...styles.tableItemText, width: "13%", textAlign: "right" }}>{currency}{" "}{item.amount.toFixed(2)}</Text>
                                    </View>
                                )
                            })
                        }
                    </View>
                </View>

                {/* price adjustment */}
                <View style={styles.adjustmentsContainer}>
                    <View style={styles.adjustmentText}>
                        <Text style={{ color: LIGHT_GREY_CODE }}>{invoiceObject.subtotal_title}:</Text>
                        <Text style={{ width: "100px", textAlign: "right" }}>{currency}{invoiceObject.subtotal.toFixed(2)}</Text>
                    </View>
                    <View style={styles.adjustmentText}>
                        <Text style={{ color: LIGHT_GREY_CODE }}>{invoiceObject.discounts_title}:</Text>
                        <Text style={{ width: "100px", textAlign: "right" }}>{currency}{invoiceObject.discounts.toFixed(2)}</Text>
                    </View>
                    <View style={styles.adjustmentText}>
                        <Text style={{ color: LIGHT_GREY_CODE }}>{invoiceObject.tax_title}:</Text>
                        <Text style={{ width: "100px", textAlign: "right" }}>{currency}{invoiceObject.tax.toFixed(2)}</Text>
                    </View>
                    <View style={styles.adjustmentText}>
                        <Text style={{ color: LIGHT_GREY_CODE }}>{invoiceObject.shipping_title}:</Text>
                        <Text style={{ width: "100px", textAlign: "right" }}>{currency}{invoiceObject.shipping.toFixed(2)}</Text>
                    </View>
                    <View style={styles.adjustmentText}>
                        <Text style={{ color: LIGHT_GREY_CODE }}>{invoiceObject.total_title}:</Text>
                        <Text style={{ width: "100px", textAlign: "right" }}>{currency}{invoiceObject.total.toFixed(2)}</Text>
                    </View>
                    <View style={styles.adjustmentText}>
                        <Text style={{ color: LIGHT_GREY_CODE }}>{invoiceObject.amount_paid_title}:</Text>
                        <Text style={{ width: "100px", textAlign: "right" }}>{currency}{invoiceObject.amount_paid.toFixed(2)}</Text>
                    </View>
                </View>

                {/* Notes / Terms */}
                <View style={{ ...styles.notesSection, padding: 10, paddingLeft: 0 }}>
                    <View>
                        <Text style={{ fontFamily: "roboto", fontWeight: "bold", fontSize: "11px" }}>{invoiceObject.notes_title}:</Text>
                        <Text style={{ width: "250px" }}>{invoiceObject.notes}</Text>
                    </View>
                    <View>
                        <Text style={{ fontFamily: "roboto", fontWeight: "bold", fontSize: "11px" }}>{invoiceObject.terms_title}:</Text>
                        <Text style={{ width: "250px" }}>{invoiceObject.terms}</Text>
                    </View>
                </View>
            </Page>
        </Document>
    )
}

export default InvoiceDocument;