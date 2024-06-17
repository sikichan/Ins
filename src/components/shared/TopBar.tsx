import {Link} from "react-router-dom";

const TopBar = () => {
    return (
        <section className="top-bar">
            <div className="flex-between py-3 px-5">
                <Link to="/" className="flex gap-3 items-center text-white font-bold">
                    <img src="/assets/logo.png" className="w-10 h-10 rounded-full" alt="logo"/>
                    Ins App
                </Link>
            </div>
        </section>
    );
}

export default TopBar;