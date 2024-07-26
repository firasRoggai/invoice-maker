"use client";

import { Document, Font, Page, StyleSheet, Text, View } from '@react-pdf/renderer';
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
    }
});

// Create Document Component
const MyDoc = () => {

    return (
        <Document>
            <Page style={styles.page}>
                {/* top section */}
                <View>
                    <Text style={{ paddingRight: "10px" }}>TESTING</Text>
                </View>
            </Page>
        </Document>
    )
}

export default MyDoc;