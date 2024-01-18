import {Link} from "react-router-dom";

export const Header = () => {
    return (
        <header className="sticky top-0 left-0 bg-gradient-to-r from-blue-500 to-purple-500 z-50">
            <div className="sm:container mx-auto lg:px-20">
                <div className="px-4 py-3 lg:py-5 flex items-center justify-between">
                    <Link
                        to="/"
                        className="text-white text-lg lg:text-3xl font-extrabold font-martelSans inline-block cursor-pointer"
                    >
                        My assignment
                    </Link>
                </div>
            </div>
        </header>
    );
};
