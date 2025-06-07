function Navbar() {
  return (
    <nav class="bg-white shadow-md">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16 items-center">
          <div class="flex-shrink-0">
            <a href="#" class="text-xl font-semibold text-gray-800">
              MyApp
            </a>
          </div>

          <div class="md:hidden">
            <button class="text-gray-700 hover:text-blue-500 focus:outline-none">
              <svg
                class="h-6 w-6"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                viewBox="0 0 24 24"
                stroke-linecap="round"
                stroke-linejoin="round"
              >
                <path d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
