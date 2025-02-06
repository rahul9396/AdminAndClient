import { useState } from "react";
import PropTypes from "prop-types";
import { Menu, Home, PackageSearch, HousePlus, LogOut } from "lucide-react";
import { Link, Outlet } from "react-router-dom";

export default function Layout({ children }) {
  const [isOpen, setIsOpen] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    if (!isMobileMenuOpen) {
      setIsOpen(true);
    }
  };

  const sidebarWidth = isOpen ? "w-64" : "w-20";
  const sidebarMargin = isOpen ? "md:ml-64" : "md:ml-20";

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-100 overflow-hidden">
     
      <div className="md:hidden bg-gray-900 p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-white">Admin</h1>
        <button onClick={toggleMobileMenu} className="text-white">
          <Menu className="w-6 h-6" />
        </button>
      </div>

      <aside
        className={`
          ${sidebarWidth} bg-gray-900 text-white transition-all duration-300
          flex flex-col fixed top-0 left-0 h-full z-30
          ${isMobileMenuOpen ? "block" : "hidden"} md:block
        `}
      >
        <div className="hidden md:flex items-center justify-between p-4 border-b border-gray-700">
          <h1 className={`text-xl font-bold ${!isOpen && "hidden"}`}>Admin</h1>
          <button onClick={() => setIsOpen(!isOpen)} className="p-1">
            <Menu className="w-6 h-6 text-white" />
          </button>
        </div>

        <nav className="flex-1 mt-4">
          <SidebarLink
            href="/admin"
            icon={<Home />}
            label="Dashboard"
            isOpen={isOpen}
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <SidebarLink
            href="/admin/product"
            icon={<PackageSearch />}
            label="Add Product"
            isOpen={isOpen}
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <SidebarLink
            href="/"
            icon={<HousePlus />}
            label="Client Panel"
            isOpen={isOpen}
            onClick={() => setIsMobileMenuOpen(false)}
          />
        </nav>

        <div className="p-4 mt-auto border-t border-gray-700">
          <SidebarLink
            href="#"
            icon={<LogOut />}
            label="Logout"
            isOpen={isOpen}
            onClick={() => setIsMobileMenuOpen(false)}
          />
        </div>
      </aside>

      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>
      )}

      <div
        className={`flex-1 flex flex-col min-w-0 ${sidebarMargin} transition-all duration-300`}
      >
        <nav className="bg-white shadow p-4 flex justify-between items-center">
          <h2 className="text-lg font-semibold">Admin Panel</h2>
          <div className="flex items-center space-x-4">
            <span className="text-gray-600 text-sm md:text-base">
              Welcome, Admin
            </span>
          </div>
        </nav>

        <main className="flex-1 p-4 md:p-6 overflow-auto">
          {children || <Outlet />}
        </main>

        <footer className="bg-white shadow p-4 text-center text-sm text-gray-600">
          &copy; {new Date().getFullYear()} Admin Dashboard. All rights reserved.
        </footer>
      </div>
    </div>
  );
}

const SidebarLink = ({ href, icon, label, isOpen, onClick }) => {
  return (
    <Link
      to={href}
      className="flex items-center p-3 hover:bg-gray-800 transition rounded-lg text-gray-300 hover:text-white"
      style={{ textDecoration: "none" }}
      onClick={onClick}
    >
      <span className="w-6 h-6">{icon}</span>
      <span className={`ml-3 ${!isOpen && "hidden"}`}>{label}</span>
    </Link>
  );
};

SidebarLink.propTypes = {
  href: PropTypes.string.isRequired,
  icon: PropTypes.node.isRequired,
  label: PropTypes.string.isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClick: PropTypes.func,
};

Layout.propTypes = {
  children: PropTypes.node,
};
