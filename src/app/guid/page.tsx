/* eslint-disable react/no-unescaped-entities */

const InvoicingGuide = () => {
  return (
    <div className="bg-gray-100 min-h-screen py-10">
      <div className="bg-white shadow-lg rounded-lg p-8 mx-auto max-w-4xl">
        <h1 className="text-primary font-bold text-4xl mb-6">Invoicing Guide</h1>
        <div className="space-y-6 text-gray-700">
          <p>
            Welcome to the Invoicing Guide for our Invoice Generator App. This guide will help you create, manage, and send invoices with ease. Follow the steps below to get started.
          </p>

          <h2 className="text-gray-600 font-semibold text-2xl mt-8 mb-4">1. Creating an Invoice</h2>
          <p>
            To create an invoice, follow these steps:
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>Log in to your account and navigate to the 'Create Invoice' section.</li>
            <li>Enter the client’s details, including name, address, and contact information.</li>
            <li>Add the items or services provided, including descriptions, quantities, and prices.</li>
            <li>Specify any applicable taxes and discounts.</li>
            <li>Review the invoice details and click 'Save' to create the invoice.</li>
          </ul>

          <h2 className="text-gray-600 font-semibold text-2xl mt-8 mb-4">2. Managing Invoices</h2>
          <p>
            Once you have created invoices, you can manage them as follows:
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>Navigate to the 'Invoices' section to view all your invoices.</li>
            <li>Use the search and filter options to find specific invoices.</li>
            <li>Click on an invoice to view its details, edit, or delete it.</li>
          </ul>

          <h2 className="text-gray-600 font-semibold text-2xl mt-8 mb-4">3. Sending Invoices</h2>
          <p>
            To send an invoice to a client:
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>Open the invoice you wish to send.</li>
            <li>Click the 'Send' button to open the sending options.</li>
            <li>Enter the client’s email address and customize the message if needed.</li>
            <li>Click 'Send Invoice' to email the invoice to the client.</li>
          </ul>

          <h2 className="text-gray-600 font-semibold text-2xl mt-8 mb-4">4. Tracking Payments</h2>
          <p>
            To track payments for your invoices:
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>Navigate to the 'Payments' section to see all payments received.</li>
            <li>Click on a payment to view details and associate it with an invoice.</li>
            <li>Mark invoices as paid once the payment is confirmed.</li>
          </ul>

          <h2 className="text-gray-600 font-semibold text-2xl mt-8 mb-4">5. Reporting and Analytics</h2>
          <p>
            To view reports and analytics for your invoices:
          </p>
          <ul className="list-disc list-inside space-y-2">
            <li>Navigate to the 'Reports' section to see various financial reports.</li>
            <li>Use the filters to customize the reports based on date ranges, clients, and other criteria.</li>
            <li>Export reports as PDF or CSV for further analysis and record-keeping.</li>
          </ul>

          <h2 className="text-gray-600 font-semibold text-2xl mt-8 mb-4">6. Customer Support</h2>
          <p>
            If you need any assistance, please contact our support team at firasreggai@gmail.com . We are here to help you with any questions or issues you may have.
          </p>
        </div>
      </div>
    </div>
  );
};

export default InvoicingGuide;
