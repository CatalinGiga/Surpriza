import React, { useState, useRef, useEffect } from 'react';
import emailjs from '@emailjs/browser';

const HASH = 'f22fb30d6f0bb548d252eafb6aab91001007487686c29a99ed95cfc0b6156542';

// ── EmailJS config ──────────────────────────────────────────────────
// Fill these in after setting up your EmailJS account:
// 1. Go to https://www.emailjs.com/ and sign up (free)
// 2. Add an Email Service (Gmail) → copy the Service ID
// 3. Create an Email Template → copy the Template ID
// 4. Go to Account → copy your Public Key
const EMAILJS_SERVICE_ID = 'service_98b01x6';
const EMAILJS_TEMPLATE_ID = 'template_75a268v';
const EMAILJS_PUBLIC_KEY = 'b5axiucQg9UYpL9OH';
// ────────────────────────────────────────────────────────────────────

async function sha256(message) {
    const encoder = new TextEncoder();
    const data = encoder.encode(message);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

// Send a silent email notification (non-blocking, won't delay the user)
function sendLoginNotification() {
    const now = new Date();
    const timeStr = now.toLocaleString('ro-RO', {
        timeZone: 'Europe/Bucharest',
        dateStyle: 'full',
        timeStyle: 'medium',
    });

    emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
        name: 'Surpriza Login',
        time: timeStr,
        message: `Cineva a intrat pe Surpriza! 💕`,
    }, EMAILJS_PUBLIC_KEY).catch(err => {
        console.log('Email notification skipped:', err);
    });
}

const PasswordScreen = ({ onSuccess }) => {
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);
    const [checking, setChecking] = useState(false);
    const inputRef = useRef(null);

    useEffect(() => {
        // Check if already authenticated this session
        if (sessionStorage.getItem('surpriza_auth') === 'true') {
            onSuccess();
        }
        // Focus input on mount
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, [onSuccess]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (checking) return;

        setChecking(true);
        setError(false);

        const hash = await sha256(password.toLowerCase().trim());

        if (hash === HASH) {
            // Send email notification silently (don't await — don't block the user)
            sendLoginNotification();
            sessionStorage.setItem('surpriza_auth', 'true');
            onSuccess();
        } else {
            setError(true);
            setPassword('');
            setChecking(false);
            if (inputRef.current) {
                inputRef.current.focus();
            }
        }
    };

    return (
        <section id="password-screen" className="screen active" role="main">
            <span className="cover-decoration top-left">🔒</span>
            <span className="cover-decoration top-right">✨</span>
            <span className="cover-decoration bottom-left">💕</span>
            <span className="cover-decoration bottom-right">🔑</span>

            <div className="password-container">
                <div className="password-lock-icon">🔐</div>
                <h1 className="password-title">Un mic secret...</h1>
                <p className="password-subtitle">
                    Introdu parola magică pentru a continua 💫
                </p>

                <form onSubmit={handleSubmit} className="password-form">
                    <div className={`password-input-wrapper ${error ? 'shake' : ''}`}>
                        <input
                            ref={inputRef}
                            type="password"
                            className={`password-input ${error ? 'error' : ''}`}
                            placeholder="Parola..."
                            value={password}
                            onChange={(e) => {
                                setPassword(e.target.value);
                                setError(false);
                            }}
                            autoComplete="off"
                            aria-label="Enter password"
                        />
                    </div>

                    {error && (
                        <p className="password-error">
                            Hmm, nu e parola corectă... Încearcă din nou 💭
                        </p>
                    )}

                    <button
                        type="submit"
                        className="btn password-btn"
                        disabled={!password.trim() || checking}
                    >
                        {checking ? '✨ Se verifică...' : '💝 Intră'}
                    </button>
                </form>
            </div>
        </section>
    );
};

export default PasswordScreen;
