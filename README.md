import Image from "next/image"
import Link from "next/link"

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-black text-white">

      {/* Uploaded Image */}
      <div className="relative w-full h-[60vh]">
        <Image
          src="/hackathon-banner.jpg"   // <-- Put your uploaded image inside /public folder
          alt="Hack For Green Bharat"
          fill
          className="object-contain"
          priority
        />
      </div>

      {/* Required Text Only */}
      <div className="text-center mt-6 space-y-2">
        <h1 className="text-2xl font-bold">
          Hack For Green Bharat Hackathon
        </h1>
        <p>Team : ERROR404</p>
        <p>Leader : Deepak Kumar</p>
      </div>

      {/* Next Button */}
      <Link
        href="/model"
        className="mt-6 px-6 py-3 bg-green-600 hover:bg-green-700 rounded-xl"
      >
        Next
      </Link>
    </div>
  )
}
