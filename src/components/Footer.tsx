
import Link from 'next/link';

const Footer = () => {
    return (
        // Using a very dark background to match the image
        <footer className="w-full bg-[#050505] pt-16 pb-8 px-6 border-t border-[#1a1a1a]">
            <div className="w-full max-w-300 mx-auto flex flex-col gap-16">
                
                {/* Top Section: Brand & Links */}
                <div className="flex flex-col md:flex-row justify-between gap-12 md:gap-0">
                    
                    {/* Brand Column */}
                    <div className="flex flex-col gap-6 max-w-sm">
                        {/* Logo */}
                        <Link href="/">
                            <div className="flex items-center text-3xl font-extrabold tracking-tighter cursor-pointer">
                                <span className="text-[#0088ff]">hire</span>
                                <span className="text-[#ff6b00]">loop</span>
                            </div>
                        </Link>
                        
                        <p className="text-gray-500 text-sm leading-relaxed pr-4">
                            The AI-native career platform. Built for people who take their work seriously.
                        </p>
                    </div>

                    {/* Links Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-12 md:gap-24">
                        {/* Product Column */}
                        <div className="flex flex-col gap-5">
                            <h3 className="text-[#5C53FE] font-medium text-base">Product</h3>
                            <div className="flex flex-col gap-4 text-sm text-gray-400">
                                <Link href="/job-discovery" className="hover:text-white transition-colors">Job discovery</Link>
                                <Link href="/worker-ai" className="hover:text-white transition-colors">Worker AI</Link>
                                <Link href="/companies" className="hover:text-white transition-colors">Companies</Link>
                                <Link href="/salary-data" className="hover:text-white transition-colors">Salary data</Link>
                            </div>
                        </div>

                        {/* Navigations Column */}
                        <div className="flex flex-col gap-5">
                            <h3 className="text-[#5C53FE] font-medium text-base">Navigations</h3>
                            <div className="flex flex-col gap-4 text-sm text-gray-400">
                                <Link href="/help-center" className="hover:text-white transition-colors">Help center</Link>
                                <Link href="/career-library" className="hover:text-white transition-colors">Career library</Link>
                                <Link href="/contact" className="hover:text-white transition-colors">Contact</Link>
                            </div>
                        </div>

                        {/* Resources Column */}
                        <div className="flex flex-col gap-5">
                            <h3 className="text-[#5C53FE] font-medium text-base">Resources</h3>
                            <div className="flex flex-col gap-4 text-sm text-gray-400">
                                <Link href="/brand-guideline" className="hover:text-white transition-colors">Brand Guideline</Link>
                                <Link href="/newsroom" className="hover:text-white transition-colors">Newsroom</Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Bottom Section: Socials & Copyright */}
                <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-4">
                    
                    {/* Social Icons */}
                    <div className="flex items-center gap-3">
                        {/* Facebook */}
                        <Link href="#" className="w-10 h-10 flex items-center justify-center bg-[#111111] hover:bg-[#1a1a1a] rounded-xl transition-colors">
                            <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                <path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" />
                            </svg>
                        </Link>
                        
                        {/* Pinterest (Uses brand purple) */}
                        <Link href="#" className="w-10 h-10 flex items-center justify-center bg-[#5C53FE] hover:bg-[#4b43db] rounded-xl transition-colors">
                            <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.951-7.252 4.168 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.366 18.619 0 12.017 0z" />
                            </svg>
                        </Link>
                        
                        {/* LinkedIn */}
                        <Link href="#" className="w-10 h-10 flex items-center justify-center bg-[#111111] hover:bg-[#1a1a1a] rounded-xl transition-colors">
                            <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd" />
                            </svg>
                        </Link>
                    </div>

                    {/* Legal Links & Copyright */}
                    <div className="flex flex-col md:flex-row items-center gap-2 md:gap-8 text-sm text-gray-500">
                        <p>Copyright 2026 — HireLoop</p>
                        <p>Terms & Policy - Privacy Guideline</p>
                    </div>
                </div>
                
            </div>
        </footer>
    );
};

export default Footer;