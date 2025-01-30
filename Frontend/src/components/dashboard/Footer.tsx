export function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-6 mt-8 animate-slide-up">
      <div className="container mx-auto px-4">
        {/* Flex layout for Desktop & Vertical Stack for Mobile */}
        <div className="flex flex-col md:flex-row justify-between items-center text-center md:text-left">
          {/* Logo & Description */}
          <div className="mb-4 md:mb-0">
            <h2 className="text-2xl font-bold">Ebook</h2>
            <p className="text-gray-400">Your favorite online book store</p>
          </div>

          {/* Navigation Links (Centered in Mobile, Right-Aligned in Desktop) */}
          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-6">
            <a href="#" className="hover:text-gray-400 transition duration-300">Home</a>
            <a href="#" className="hover:text-gray-400 transition duration-300">About</a>
            <a href="#" className="hover:text-gray-400 transition duration-300">Contact</a>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="mt-4 text-center text-gray-400 text-sm">
          &copy; {new Date().getFullYear()} Ebook. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
