// app/dashboard/page.tsx
import { api } from "~/trpc/server";

const Dashboard = async () => {

    let data = await api.invoice.get({ text: "HIII" });

    return (
        <main className="text-xl bg-gray-800 text-white min-h-screen p-6">
            Dashboard {data?.greeting || "No greeting available"}
        </main>
    );
};

export default Dashboard;
