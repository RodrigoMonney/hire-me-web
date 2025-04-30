import { Geist, Geist_Mono } from "next/font/google";
import { UserTable } from "../components/UserTable";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export default function Home() {
  return (
    <div className={`${geistSans.className} ${geistMono.className} min-h-screen p-8`}>
      <div className="w-full mb-6 mx-6">
        <h1 className="text-4xl font-extrabold text-shadow shadow-white">Hire.me</h1>
      </div>
      <UserTable />
    </div>
  );
}
