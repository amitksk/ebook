
export function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-8 mt-8 animate-slide-up">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold">Ebook</h2>
            <p className="text-gray-400">Your favorite online book store</p>
          </div>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-gray-400 transition duration-300">Home</a>
            <a href="#" className="hover:text-gray-400 transition duration-300">About</a>
            <a href="#" className="hover:text-gray-400 transition duration-300">Contact</a>
          </div>
        </div>
        <div className="mt-4 text-center text-gray-400">
          &copy; {new Date().getFullYear()} Ebook. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
