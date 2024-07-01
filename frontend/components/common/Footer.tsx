import Link from "next/link";

export default function Footer() {
    return (
        <footer className=" w-full bg-black bottom-0">
            <div className="justify-between px-4 mx-auto lg:max-w-7xl md:items-center md:flex md:px-8">
                    <Link href="/">
                        <h2 className="text-1l text-cyan-600 font-bold ">footer</h2>
                    </Link>
            </div>
        </footer>
    )
}