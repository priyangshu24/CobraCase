import MaxWidthWrapper from "@/app/component/MaxWidthWrapper";
import Link from "next/link";
import { Github, Linkedin, Twitter, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-br from-gray-50 via-white to-gray-50">
      <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent" />
      
      <MaxWidthWrapper>
        <div className="pt-16 pb-8">
          {/* Main Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
            {/* Brand Column */}
            <div className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
                  Your Brand
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  Creating digital experiences that inspire and innovate. Join us on our journey to transform ideas into reality.
                </p>
              </div>
              
              {/* Contact Info */}
              <div className="space-y-3">
                <div className="flex items-center space-x-3 text-gray-600 hover:text-gray-900 transition-all group cursor-pointer">
                  <Mail size={18} className="group-hover:scale-110 transition-transform" />
                  <span className="text-sm">hello@yourbrand.com</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-600 hover:text-gray-900 transition-all group cursor-pointer">
                  <Phone size={18} className="group-hover:scale-110 transition-transform" />
                  <span className="text-sm">+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-600 hover:text-gray-900 transition-all group cursor-pointer">
                  <MapPin size={18} className="group-hover:scale-110 transition-transform" />
                  <span className="text-sm">New York, NY 10012</span>
                </div>
              </div>
            </div>

            {/* Company Links */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Company</h3>
              <div className="grid gap-3">
                {['About', 'Services', 'Team', 'Pricing', 'Contact'].map((item) => (
                  <Link 
                    key={item}
                    href="#" 
                    className="text-gray-600 hover:text-gray-900 transition-colors w-fit group relative"
                  >
                    <span className="relative z-10">{item}</span>
                    <div className="absolute bottom-0 left-0 w-0 h-px bg-gray-900 group-hover:w-full transition-all duration-300" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Resources Links */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Resources</h3>
              <div className="grid gap-3">
                {['Blog', 'Documentation', 'Help Center', 'FAQ', 'Support'].map((item) => (
                  <Link 
                    key={item}
                    href="#" 
                    className="text-gray-600 hover:text-gray-900 transition-colors w-fit group relative"
                  >
                    <span className="relative z-10">{item}</span>
                    <div className="absolute bottom-0 left-0 w-0 h-px bg-gray-900 group-hover:w-full transition-all duration-300" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Newsletter */}
            <div className="space-y-6">
              <h3 className="text-lg font-semibold text-gray-900">Stay Updated</h3>
              <p className="text-sm text-gray-600">Subscribe to our newsletter for the latest updates and insights.</p>
              <div className="space-y-3">
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="w-full px-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-gray-200 transition-all"
                />
                <button className="w-full px-4 py-2 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors">
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="mt-16 pt-8 border-t border-gray-200">
            <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
              {/* Copyright */}
              <p className="text-sm text-gray-600">
                &copy; {new Date().getFullYear()} All rights reserved. Made with{" "}
                <span className="inline-block hover:animate-pulse text-red-500">❤️</span> by{" "}
                <a
                  href="https://github.com/priyangshu24"
                  target="_blank"
                  rel="noreferrer"
                  className="text-gray-900 hover:text-gray-600 transition-colors underline-offset-4 hover:underline"
                >
                  Priyangshu Dey
                </a>
              </p>

              {/* Social Links */}
              <div className="flex space-x-6">
                {[
                  { icon: Github, href: "https://github.com/priyangshu24" },
                  { icon: Linkedin, href: "#" },
                  { icon: Twitter, href: "#" }
                ].map(({ icon: Icon, href }, index) => (
                  <a
                    key={index}
                    href={href}
                    target="_blank"
                    rel="noreferrer"
                    className="text-gray-600 hover:text-gray-900 transition-colors"
                  >
                    <Icon size={20} className="hover:scale-110 transition-transform" />
                  </a>
                ))}
              </div>

              {/* Legal Links */}
              <div className="flex items-center space-x-6">
                {['Terms', 'Privacy', 'Cookies'].map((item) => (
                  <Link
                    key={item}
                    href="#"
                    className="text-sm text-gray-600 hover:text-gray-900 transition-colors relative group"
                  >
                    <span className="relative z-10">{item}</span>
                    <div className="absolute bottom-0 left-0 w-0 h-px bg-gray-900 group-hover:w-full transition-all duration-300" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </MaxWidthWrapper>
    </footer>
  );
};

export default Footer;