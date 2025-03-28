import Link from "next/link";
import { MenuSection } from "./MenuSection";

export const Navbar = () => {
    return (
        <div className="flex flex-row bg-pink-50 h-15 w-full">
            <div className="flex flex-row items-center">
                <Link href="/" className="text-3xl text-orange-300 pr-4">
                    Cars Review
                </Link>
                <MenuSection/>
            </div>
            <div>
                
            </div>
        </div>
    );
};