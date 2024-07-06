import Link from "next/link";

const Footer = () => {
    return (
        <footer className="bg-[#dfe3e8] min-h-[35vh] flex flex-col justify-center items-center py-12">
            <div className="flex flex-col md:flex-row justify-start md:gap-x-48 w-[80%]">

                <div>
                    <div className="text-[#5e6a73] py-1">
                        USE INVOICE GENERATOR
                    </div>
                    <div>
                        <ul>
                            <li className="py-1 hover:text-sky-600 cursor-pointer">
                                <Link href={"/"}>
                                    Invoice Template
                                </Link>
                            </li>
                            <li className="py-1 hover:text-sky-600 cursor-pointer">
                                <Link href={"/"}>
                                    How to Use
                                </Link>
                            </li>
                            <li className="py-1 hover:text-sky-600 cursor-pointer">
                                <Link href={"/"}>
                                    Release Notes
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>

                <div>
                    <div className="py-3 md:py-0">
                        <div className="text-[#5e6a73]">
                            © 2023-2024 invoicemakerio.netlify.app
                        </div>
                        <ul>
                            <li className="py-1 hover:text-sky-600 cursor-pointer">Terms of Use</li>
                        </ul>
                    </div>
                </div>

            </div>
        </footer>
    );
}

export default Footer;