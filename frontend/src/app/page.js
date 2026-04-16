import Link from 'next/link';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-amber-50">
      <header className="bg-white shadow-sm h-16 flex items-center px-6 justify-between">
        <h1 className="text-2xl font-bold text-amber-600">HoneyDew</h1>
        <nav className="space-x-4 flex">
          <Link href="/login" className="text-gray-600 hover:text-amber-600 font-medium px-4 py-2">Login</Link>
          <Link href="/register" className="bg-amber-600 text-white px-4 py-2 rounded-md hover:bg-amber-700 font-medium transition">Register</Link>
        </nav>
      </header>

      <main className="flex-grow flex flex-col items-center justify-center p-8 text-center bg-amber-50">
        <h2 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-6">
          Fresh From the Farm,<br/>
          <span className="text-indigo-600">Powered by AI</span>
        </h2>
        <p className="text-xl text-gray-600 max-w-2xl mb-10">
          Connecting local farms directly to consumers with smart inventory management and personalized shopping experiences.
        </p>
        <div className="flex space-x-4">
          <Link href="/login" className="bg-amber-600 text-white px-8 py-3 rounded-full text-lg font-bold shadow-lg hover:bg-amber-700 hover:scale-105 transition transform">
            Get Started
          </Link>
          <Link href="/analytics" className="bg-white text-amber-600 border-2 border-amber-600 px-8 py-3 rounded-full text-lg font-bold shadow hover:bg-amber-50 transition">
            View Dashboard
          </Link>
        </div>
      </main>

      <footer className="bg-gray-800 text-white p-6 text-center">
        <p>&copy; {new Date().getFullYear()} HoneyDew2026. All rights reserved.</p>
      </footer>
    </div>
  );
}
