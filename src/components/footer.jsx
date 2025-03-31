import { Link } from "react-router-dom"
import { Twitter, Instagram, Youtube, Music, Flame } from "lucide-react"

export default function Footer() {
    return (
        <div className="footer-wrapper">
            <footer>
                <div className="footer-content">
                    <div className="auth-buttons">
                        <Link to="/login" className="btn btn-login">
                            Log in
                        </Link>
                        <Link to="/register" className="btn btn-signup">
                            Sign up free
                        </Link>
                    </div>
                    <div className="footer-column">
                        <Link href="/about">About Spark</Link>
                        <Link href="/blog">Blog</Link>
                        <Link href="/press">Press</Link>
                        <Link href="/social-good">Social Good</Link>
                        <Link href="/contact">Contact</Link>
                    </div>

                    <div className="footer-column">
                        <Link href="/careers">Careers</Link>
                        <Link href="/getting-started">Getting Started</Link>
                        <Link href="/features">Features and How-Tos</Link>
                        <Link href="/faqs">FAQs</Link>
                        <Link href="/report">Report a Violation</Link>
                    </div>

                    <div className="footer-column">
                        <Link href="/terms">Terms and Conditions</Link>
                        <Link href="/privacy">Privacy Policy</Link>
                        <Link href="/cookie">Cookie Notice</Link>
                        <Link href="/trust">Trust Center</Link>
                    </div>
                    <div className="auth-buttons-1">
                        <Link to="/login" className="btn btn-login">
                            Log in
                        </Link>
                        <Link to="/register" className="btn btn-signup">
                            Sign up free
                        </Link>
                    </div>
                </div>

                <div className="footer-bottom">
                    <p className="acknowledgment">
                        We acknowledge the Traditional Custodians of the land on which our office stands, The Wurundjeri people
                        of the Kulin Nation, and pay our respects to Elders past, present and emerging.
                    </p>

                    <div className="social-links">
                        <Link href="#" aria-label="Twitter">
                            <Twitter size={20} />
                        </Link>
                        <Link href="#" aria-label="Instagram">
                            <Instagram size={20} />
                        </Link>
                        <Link href="#" aria-label="YouTube">
                            <Youtube size={20} />
                        </Link>
                        <Link href="#" aria-label="TikTok">
                            <Music size={20} />
                        </Link>
                        <Link href="#" aria-label="Other Platform">
                            <Flame size={20} />
                        </Link>
                    </div>
                </div>
            </footer>

            <style>{`
                .footer-wrapper {
                    padding: 2rem;
                    margin: 2rem;
                }

                footer {
                    background: white;
                    padding: 4rem 2rem;
                    border-radius: 20px;
                    box-shadow: 12px 12px 12px 30px  #DFEBFA;
                }

                .footer-container {
                max-width: 1200px;
                margin: 0 auto;
                }

                .auth-buttons {
                    margin-bottom: 3rem;
                }
                .auth-buttons-1 {
                   display: none;
                }

                .btn {
                    padding: 0.75rem 1.5rem;
                    font-size: 0.875rem;
                    font-weight: 500;
                    text-decoration: none;
                    transition: all 0.2s ease;
                    display: inline-block;
                }

                .btn-login {
                    background: #f3f4f6;
                    color: #1f2937;
                    margin-right: 1rem;
                    padding: 16px 12px;
                    border-radius: 8px;
                }

                .btn-signup {
                background: #1877F2;
                color: white;
                border-radius: 25px;
                }

                .btn:hover {
                transform: translateY(-1px);
                }

                .footer-content {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                    gap: 2rem;
                    margin-bottom: 3rem;
                }


                .footer-column a {
                display: block;
                color: #4b5563;
                text-decoration: none;
                margin-bottom: 0.75rem;
                font-size: 0.875rem;
                font-weight: 600;
                color: #1f2937;
                transition: color 0.2s ease;
                }

                .footer-column a:hover {
                color: #1877F2;
                }

                .footer-bottom {
                display: flex;
                justify-content: space-between;
                align-items: center;
                padding-top: 2rem;
                border-top: 1px solid #e5e7eb;
                flex-wrap: wrap;
                gap: 2rem;
                }

                .acknowledgment {
                font-size: 12px;
                font-weight: 700;
                line-height: 21.45px;
                letter-spacing: 0.13px;
                color: #4b5563;
                max-width: 600px;
                }

                .social-links {
                display: flex;
                gap: 1.5rem;
                }

                .social-links a {
                color: black;
                transition: color 0.2s ease;
                }

                .social-links a:hover {
                color: #1877F2;
                }

                @media (max-width: 768px) {
                .footer-wrapper {
                    margin: 1rem;
                    padding: 1rem;
                }

                .footer-bottom {
                    flex-direction: column;
                    text-align: center;
                }
                .auth-buttons {
                    display: flex;
                    flex-direction: column;
                    gap: 20px;
                }
                .btn-login {
                    width: fit-content;
                }
                .btn-signup {
                    width: fit-content;
                }

                .social-links {
                    justify-content: center;
                }
                .footer-content {
                    display: flex;
                    flex-direction: column;
                    gap: 1rem;
                }

                .auth-buttons {
                    display: none;
                }

                .auth-buttons-1 {
                    display: block;
            }
                    .acknowledgment{
                    display: none
                    }
                }
                `}
            </style>
        </div>
    )
}

