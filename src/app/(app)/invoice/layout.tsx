import { sync } from "~/actions/sync";

const invoiceLayout = async ({
    children,
}: {
    children: React.ReactNode;
}) => {
    await sync("invoice");

    return (
        <>
            {children}
        </>
    );
}

export default invoiceLayout;