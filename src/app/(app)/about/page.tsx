// app/about/page.tsx
import Link from 'next/link';
import { Button } from '~/components/ui/button';

const AboutPage = () => {
    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
            <div className="bg-white shadow-lg rounded-lg p-8 max-w-2xl w-full">
                <h1 className="text-3xl font-bold text-blue-600 mb-4">About Us</h1>
                <p className="text-lg mb-4">
                    Welcome to our invoice generator tool!
                </p>
                <p className="text-lg mb-4">
                    This project started as a personal hobby with the goal of simplifying the invoicing process for freelancers and small businesses. Our focus is to provide an easy-to-use tool for generating and storing professional invoices efficiently.
                </p>
                <p className="text-lg mb-4">
                    The tool aims to address common challenges in invoicing by offering a user-friendly interface, reliable storage, and streamlined management features. It’s designed to save time and help users maintain organized records without the hassle.
                </p>
                <p className="text-lg">
                    We’re dedicated to continuously improving the tool and adding features that enhance its functionality. Thank you for exploring our project! We hope it makes your invoicing process smoother and more effective. If you have any questions or feedback, please feel free to reach out.
                </p>
                <div className='flex gap-2 pt-3'>
                    <Link href="https://github.com/firasRoggai">
                        <Button variant={"secondary"}>
                            Github
                        </Button>
                    </Link>
                    <Link href="https://x.com/FirasRoggai">
                        <Button variant={"secondary"}>
                            Twitter
                        </Button>
                    </Link>
                    <Link href="https://discordapp/users/573895146588864525">
                        <Button variant={"secondary"}>
                            Discord
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default AboutPage;
