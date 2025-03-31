import styles from '../styles/login.module.css'
import { login } from '../services'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'
import logo from '../assets/logo-group.svg'
import { Link } from "react-router-dom";
import Toaster from '../components/toaster';
import eye from '../assets/eye.svg'
import eyeOff from '../assets/eye.svg'  // Add an eye-off icon

export default function Login() {
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)
    const [toast, setToast] = useState({ message: "", type: "" })
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })

    useEffect(() => {
        const token = localStorage.getItem("token")
        if (token) {
            navigate("/dashboard")
        }
    }, [])

    const loginHandler = async (e) => {
        try {
            e.preventDefault()
            setIsLoading(true)
            const response = await login({ data: formData })
            if (!response.ok) {
                const errorData = await response.json();
                setToast({ message: errorData.message || "Login failed. Please try again.", type: "error" });
            }
            if (response.ok) {
                setToast({ message: "Login successful", type: "success" });
                const data = await response.json()
                localStorage.setItem("token", data.token)
                navigate(`${data.redirectURl}`)
            }
            setIsLoading(false)
        }
        catch (error) {
            console.log(error)
            setToast({ message: "Something went wrong", type: "error" });
            setIsLoading(false)
        }
    }

    return (
        <div className={styles.container}>
            <div>
                <div className={styles.logoContainer}>
                    <Link to="/">
                        <img src={logo} alt="Spark Logo" style={{ width: "123px", height: "33px" }} />
                    </Link>
                </div>
                {toast.message && <Toaster message={toast.message} type={toast.type} onClose={() => setToast({ message: "", type: "" })} />}
                <div className={styles.leftContainer}>
                    <div className={styles.innerContainer}>      
                        <h1 style={{ fontSize: '40px', fontWeight: 'bolder', letterSpacing: '-0.02em', lineHeight: '1.1' }}>Sign in</h1>

                        <form style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '12px',
                            width: "100%"
                        }}>
                            <input style={{
                                padding: "15px",
                                borderRadius: "10px",
                                backgroundColor: "#EFF0EC",
                                border: "none",
                                outline: "none"
                            }} type="text" placeholder="Spark/ Username" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />

                            <div style={{ position: "relative", width: "100%" }}>
                                <input 
                                    style={{
                                        padding: "15px",
                                        borderRadius: "10px",
                                        backgroundColor: "#EFF0EC",
                                        border: "none",
                                        outline: "none",
                                        width: "100%"
                                    }} 
                                    type={showPassword ? "text" : "password"} 
                                    placeholder="Password" 
                                    value={formData.password} 
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                />
                                <img 
                                    src={showPassword ? eyeOff : eye} 
                                    alt="Toggle Password" 
                                    onClick={() => setShowPassword(!showPassword)}
                                    style={{
                                        position: "absolute",
                                        right: "15px",
                                        top: "50%",
                                        transform: "translateY(-50%)",
                                        cursor: "pointer",
                                        width: "20px",
                                        height: "20px"
                                    }}
                                />
                            </div>

                            <button
                                style={{
                                    marginTop: "30px",
                                    padding: "15px",
                                    borderRadius: "25px",
                                    backgroundColor: formData.email && formData.password ? "#1877F2" : "#EFF0EC",
                                    border: "none",
                                    outline: "none",
                                    cursor: formData.email && formData.password ? "pointer" : "not-allowed",
                                    opacity: formData.email && formData.password ? 1 : 0.6,
                                    transition: "background-color 0.3s ease, opacity 0.3s ease"
                                }}
                                disabled={!formData.email || !formData.password}
                                onClick={loginHandler}
                            >
                                {isLoading ? "Logging in..." : "Log in"}
                            </button>
                        </form>
                        <div style={{ margin: "0 auto", textAlign: "center" }}>
                            <h3 style={{ fontWeight: "normal" }}>
                                Don&apos;t have an account?
                                <span style={{ marginLeft: "5px" }}>
                                    <Link
                                        to="/register"
                                        style={{
                                            color: "#1877F2",
                                            textDecoration: "underline",
                                            textUnderlineOffset: "6px",
                                            cursor: "pointer"
                                        }}
                                    >
                                        Sign up
                                    </Link>
                                </span>
                            </h3>
                        </div>
                    </div>
                </div>
            </div>

            <div className={styles.rightContainer}>
                <div className={styles.imageContainer}></div>
            </div>
        </div>
    )
}
