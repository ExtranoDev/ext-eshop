"use client";

import { APP_NAME } from "@/lib/constants";
import Link from "next/link";
import {
  Instagram,
  Facebook,
  Twitter,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-pink-50 text-gray-700 mt-10 border-t border-pink-100">
      <div className="mx-auto max-w-7xl px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Brand & About */}
        <div>
          <h2 className="text-2xl font-bold text-pink-600">{APP_NAME}</h2>
          <p className="mt-3 text-sm text-gray-600 leading-relaxed">
            Your one-stop shop for premium skincare, makeup, and wellness
            essentials. Shine inside and out ✨
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Quick Links
          </h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link
                href="/shop"
                className="hover:text-pink-600 transition-colors"
              >
                Shop All
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className="hover:text-pink-600 transition-colors"
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                href="/blog"
                className="hover:text-pink-600 transition-colors"
              >
                Beauty Blog
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className="hover:text-pink-600 transition-colors"
              >
                Contact
              </Link>
            </li>
          </ul>
        </div>

        {/* Customer Care */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Customer Care
          </h3>
          <ul className="space-y-2 text-sm">
            <li>
              <Link
                href="/faq"
                className="hover:text-pink-600 transition-colors"
              >
                FAQs
              </Link>
            </li>
            <li>
              <Link
                href="/shipping"
                className="hover:text-pink-600 transition-colors"
              >
                Shipping & Returns
              </Link>
            </li>
            <li>
              <Link
                href="/privacy"
                className="hover:text-pink-600 transition-colors"
              >
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link
                href="/terms"
                className="hover:text-pink-600 transition-colors"
              >
                Terms & Conditions
              </Link>
            </li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Stay in Touch
          </h3>
          <p className="text-sm text-gray-600 mb-3">
            Subscribe to get beauty tips, special offers, and more.
          </p>
          <form className="flex w-full max-w-sm items-center space-x-2">
            <input
              type="email"
              placeholder="Your email"
              className="flex-1 rounded-full border border-gray-300 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
            <button
              type="submit"
              className="rounded-full bg-pink-600 px-4 py-2 text-sm font-medium text-white hover:bg-pink-700 transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-pink-100 py-6">
        <div className="mx-auto max-w-7xl px-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
          <p>
            © {new Date().getFullYear()} {APP_NAME}. All rights reserved.
          </p>

          {/* Contact Info */}
          <div className="flex items-center gap-5">
            <a
              href="mailto:hello@glowbeauty.com"
              className="flex items-center gap-1 hover:text-pink-600 transition-colors"
            >
              <Mail className="h-4 w-4" /> hello@extshop.com
            </a>
            <a
              href="tel:+123456789"
              className="flex items-center gap-1 hover:text-pink-600 transition-colors"
            >
              <Phone className="h-4 w-4" /> +1 234 567 89
            </a>
            <span className="flex items-center gap-1">
              <MapPin className="h-4 w-4" /> New York, USA
            </span>
          </div>

          {/* Social Media */}
          <div className="flex gap-4">
            <Link
              href="#"
              aria-label="Instagram"
              className="hover:text-pink-600 transition-colors"
            >
              <Instagram className="h-5 w-5" />
            </Link>
            <Link
              href="#"
              aria-label="Facebook"
              className="hover:text-pink-600 transition-colors"
            >
              <Facebook className="h-5 w-5" />
            </Link>
            <Link
              href="#"
              aria-label="Twitter"
              className="hover:text-pink-600 transition-colors"
            >
              <Twitter className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
