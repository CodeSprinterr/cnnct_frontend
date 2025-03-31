import styles from '../styles/register.module.css'
import { registerService } from '../services'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import logo from '../assets/logo-group.svg'
import { Link } from "react-router-dom";
import Toaster from '../components/toaster';

const register = () => {
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState(false)
    const [isChecked, setIsChecked] = useState(false);
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const [toast, setToast] = useState({ message: "", type: "" })
    const [errors, setErrors] = useState({})
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
    })

    useEffect(() => {
        setIsButtonDisabled(!isChecked);
    }, [isChecked]);

    useEffect(() => {
        const token = localStorage.getItem("token")
        if (token) {
            navigate("/dashboard")
        }
    }, [])

    const validateForm = () => {
        let tempErrors = {};

        // First Name Validation
        if (!formData.firstName.trim()) tempErrors.firstName = "First name is required";

        // Last Name Validation
        if (!formData.lastName.trim()) tempErrors.lastName = "Last name is required";

        // Email Validation
        if (!formData.email.trim()) {
            tempErrors.email = "Invalid Email";
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            tempErrors.email = "Invalid Email";
        }

        // Password Validation
        if (!formData.password) {
            tempErrors.password = "Please enter your password*";
        } else if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/.test(formData.password)) {
            tempErrors.password = "Please choose a strong password that includes at least 1 lowercase and uppercase letter, a number, as well as a special character (!@#$%^&*)";
        }

        // Confirm Password Validation
        if (!formData.confirmPassword) {
            tempErrors.confirmPassword = "Please confirm your password";
        } else if (formData.password !== formData.confirmPassword) {
            tempErrors.confirmPassword = "The password you entered does not match*";
        }

        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };



    const registerHandler = async (e) => {
        e.preventDefault()
        if (!validateForm()) return
        try {
            setIsLoading(true)
            const response = await registerService({ data: formData })
            if (!response.ok) {
                const errorData = await response.json();
                setToast({ message: errorData.message || "Login failed. Please try again.", type: "error" });
            }

            if (response.ok && response.status === 200) {
                setToast({ message: "Register successful", type: "success" });
                const data = await response.json()
                localStorage.setItem("token", data.token)
                navigate("/tell-us-more")
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
    
                        <div style={{ width: "85%", marginTop: "50px" }}>
                            <div style={{
                                display: 'flex',
                                flexDirection: 'row',
                                width: "96%",
                                justifyContent: 'space-between',
                                alignItems: 'center',
                            }}>
                                <h3 style={{ fontWeight: "normal", fontSize: '20px' }}>Create an account</h3>
                                <span style={{ marginLeft: "5px" }}>
                                    <Link
                                        to="/login"
                                        style={{
                                            color: "#1877F2",
                                            textDecoration: "underline",
                                            textUnderlineOffset: "6px",
                                            cursor: "pointer"
                                        }}
                                    >
                                        Sign in insted
                                    </Link>
                                </span>
                            </div>

                            <form style={{
                                display: 'flex',
                                flexDirection: 'column',
                                gap: '12px',
                                width: "100%",
                                marginTop: "20px"
                            }}>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                                    <label
                                        style={{
                                            fontSize: "14px",
                                            color: "#666666",
                                        }}
                                    >
                                        First Name
                                    </label>
                                    <input
                                        style={{
                                            padding: "10px",
                                            borderRadius: "10px",
                                            border: "1px solid #ccc",
                                            outline: "none"
                                        }}
                                        type="text"
                                        value={formData.firstName}
                                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                    />
                                    {errors.firstName && <span className={styles.error}>{errors.firstName}</span>}
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                                    <label
                                        style={{
                                            fontSize: "14px",
                                            color: "#666666",
                                        }}
                                    >
                                        Last Name
                                    </label>
                                    <input
                                        style={{
                                            padding: "10px",
                                            borderRadius: "10px",
                                            border: "1px solid #ccc",
                                            outline: "none"
                                        }}
                                        type="text"
                                        value={formData.lastName}
                                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                    />
                                    {errors.lastName && <span className={styles.error}>{errors.lastName}</span>}
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                                    <label
                                        style={{
                                            fontSize: "14px",
                                            color: "#666666",
                                        }}
                                    >
                                        Email
                                    </label>
                                    <input
                                        style={{
                                            padding: "10px",
                                            borderRadius: "10px",
                                            border: "1px solid #ccc",
                                            outline: "none"
                                        }}
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    />
                                    {errors.email && <span className={styles.error}>{errors.email}</span>}
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                                    <label
                                        style={{
                                            fontSize: "14px",
                                            color: "#666666",
                                        }}
                                    >
                                        Password
                                    </label>
                                    <input
                                        style={{
                                            padding: "10px",
                                            borderRadius: "10px",
                                            border: "1px solid #ccc",
                                            outline: "none"
                                        }}
                                        type="password"
                                        value={formData.password}
                                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    />
                                    {errors.password && <span className={styles.error}>{errors.password}</span>}
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                                    <label
                                        style={{
                                            fontSize: "14px",
                                            color: "#666666",
                                        }}
                                    >
                                        Confirm Password
                                    </label>
                                    <input
                                        style={{
                                            padding: "10px",
                                            borderRadius: "10px",
                                            border: "1px solid #ccc",
                                            outline: "none"
                                        }}
                                        type="password"
                                        value={formData.confirmPassword}
                                        onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                                    />
                                    {errors.confirmPassword && <span className={styles.error}>{errors.confirmPassword}</span>}
                                </div>
                                <label style={{ fontSize: '14px', width: '85%', display: 'flex', alignItems: 'center' }}>
                                    <div
                                        onClick={() => setIsChecked(!isChecked)}
                                        style={{
                                            marginRight: '8px',
                                            width: '16px',
                                            height: '16px',
                                            border: '1px solid black',
                                            borderRadius: '1px',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            cursor: 'pointer',
                                            backgroundColor: isChecked ? 'black' : 'transparent',
                                            position: 'relative',
                                        }}
                                    >
                                        {isChecked && (
                                            <span
                                                style={{
                                                    width: '12px',
                                                    height: '10px',
                                                    border: 'solid white',
                                                    borderWidth: '0 2px 2px 0',
                                                    transform: 'rotate(45deg)',
                                                    position: 'absolute',
                                                }}
                                            />
                                        )}
                                    </div>
                                    <span>
                                        By creating an account, I agree to our
                                        <Link to="#" style={{ color: '#000000', textDecoration: 'underline', marginLeft: '5px' }}>Terms of Use </Link>
                                        and
                                        <Link to="#" style={{ color: '#000000', textDecoration: 'underline', marginLeft: '5px' }}> Privacy Policy</Link>.
                                    </span>
                                </label>

                                <button
                                    style={{
                                        marginTop: "20px",
                                        padding: "15px",
                                        borderRadius: "25px",
                                        backgroundColor: "#C3C3C3",
                                        border: "none",
                                        outline: "none",
                                        cursor: "pointer",
                                        opacity: 1,
                                        color: "#fff",
                                        fontWeight: "bold",
                                        fontSize: "16px",
                                        transition: "background-color 0.3s ease, opacity 0.3s ease"
                                    }}
                                    disabled={isButtonDisabled}
                                    onClick={registerHandler}
                                >
                                    {isLoading ? "Creating..." : "Create an account"}
                                </button>


                            </form>
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

export default register