import { sync } from "~/actions/sync";

const invoiceLayout = async ({
    children,
}: {
    children: React.ReactNode;
}) => {
    
    return (
        <>
            {children}
        </>
    );
}

export default invoiceLayout;