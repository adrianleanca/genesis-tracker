import React, { useState } from "react";
import { loginEmail, registerEmail, loginGoogle } from "./firebase";

export default function AuthScreen({ onAuth }) {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      if (isLogin) {
        await loginEmail(email, password);
      } else {
        await registerEmail(email, password);
      }
    } catch (err) {
      const messages = {
        "auth/user-not-found": "Contul nu exista.",
        "auth/wrong-password": "Parola incorecta.",
        "auth/email-already-in-use": "Email-ul e deja folosit.",
        "auth/weak-password": "Parola trebuie sa aiba min. 6 caractere.",
        "auth/invalid-email": "Email invalid.",
      };
      setError(messages[err.code] || err.message);
    }
    setLoading(false);
  };

  const handleGoogle = async () => {
    setError("");
    setLoading(true);
    try {
      await loginGoogle();
    } catch (err) {
      setError(err.message);
    }
    setLoading(false);
  };

  return (
    <div style={{
      minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
      backgroundColor: "#F5F3F0", fontFamily: "'Segoe UI', 'SF Pro Display', -apple-system, sans-serif",
      padding: 20,
    }}>
      <div style={{
        backgroundColor: "#fff", borderRadius: 20, padding: "40px 36px", width: "100%", maxWidth: 400,
        boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
      }}>
        <div style={{ textAlign: "center", marginBottom: 30 }}>
          <div style={{
            width: 56, height: 56, borderRadius: 16, backgroundColor: "#7C6CA8",
            display: "flex", alignItems: "center", justifyContent: "center",
            margin: "0 auto 14px", fontSize: 24, color: "#fff",
          }}>G</div>
          <h1 style={{ margin: 0, fontSize: 24, fontWeight: 700, color: "#1A1A2E" }}>Genesis Tracker</h1>
          <p style={{ margin: "6px 0 0", fontSize: 13, color: "#8B8680" }}>
            {isLogin ? "Conecteaza-te la contul tau" : "Creeaza un cont nou"}
          </p>
        </div>

        {error && (
          <div style={{
            padding: "10px 14px", borderRadius: 8, backgroundColor: "#C0524E15",
            color: "#C0524E", fontSize: 13, marginBottom: 16, border: "1px solid #C0524E30",
          }}>{error}</div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: 14 }}>
            <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: "#7B7670", marginBottom: 5, textTransform: "uppercase", letterSpacing: "0.6px" }}>Email</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} required
              placeholder="email@exemplu.com"
              style={{ width: "100%", padding: "11px 14px", border: "1.5px solid #E0DDD8", borderRadius: 8, fontSize: 14, fontFamily: "inherit", outline: "none", boxSizing: "border-box" }}
            />
          </div>
          <div style={{ marginBottom: 20 }}>
            <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: "#7B7670", marginBottom: 5, textTransform: "uppercase", letterSpacing: "0.6px" }}>Parola</label>
            <input type="password" value={password} onChange={e => setPassword(e.target.value)} required
              placeholder="Minim 6 caractere"
              style={{ width: "100%", padding: "11px 14px", border: "1.5px solid #E0DDD8", borderRadius: 8, fontSize: 14, fontFamily: "inherit", outline: "none", boxSizing: "border-box" }}
            />
          </div>
          <button type="submit" disabled={loading} style={{
            width: "100%", padding: "12px", border: "none", borderRadius: 8,
            backgroundColor: "#7C6CA8", color: "#fff", fontSize: 15, fontWeight: 600,
            cursor: loading ? "not-allowed" : "pointer", fontFamily: "inherit",
            opacity: loading ? 0.7 : 1, marginBottom: 10,
          }}>{loading ? "Se incarca..." : isLogin ? "Conecteaza-te" : "Creeaza cont"}</button>
        </form>

        <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "16px 0" }}>
          <div style={{ flex: 1, height: 1, backgroundColor: "#E0DDD8" }} />
          <span style={{ fontSize: 12, color: "#8B8680" }}>sau</span>
          <div style={{ flex: 1, height: 1, backgroundColor: "#E0DDD8" }} />
        </div>

        <button onClick={handleGoogle} disabled={loading} style={{
          width: "100%", padding: "11px", border: "1.5px solid #E0DDD8", borderRadius: 8,
          backgroundColor: "#fff", color: "#1A1A2E", fontSize: 14, fontWeight: 500,
          cursor: "pointer", fontFamily: "inherit", display: "flex", alignItems: "center",
          justifyContent: "center", gap: 8,
        }}>
          <svg width="18" height="18" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
          Continua cu Google
        </button>

        <p style={{ textAlign: "center", marginTop: 20, fontSize: 13, color: "#8B8680" }}>
          {isLogin ? "Nu ai cont? " : "Ai deja cont? "}
          <button onClick={() => { setIsLogin(!isLogin); setError(""); }} style={{
            background: "none", border: "none", color: "#7C6CA8", fontWeight: 600,
            cursor: "pointer", fontFamily: "inherit", fontSize: 13,
          }}>{isLogin ? "Creeaza unul" : "Conecteaza-te"}</button>
        </p>
      </div>
    </div>
  );
}
