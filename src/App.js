import React, { useState, useEffect } from "react";
import { onAuth, logout } from "./firebase";
import AuthScreen from "./AuthScreen";
import GenesisTracker from "./GenesisTracker";

export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuth((u) => {
      setUser(u);
      setLoading(false);
    });
    return unsub;
  }, []);

  if (loading) {
    return (
      <div style={{
        minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center",
        backgroundColor: "#F5F3F0", fontFamily: "'Segoe UI', sans-serif",
      }}>
        <div style={{ textAlign: "center" }}>
          <div style={{
            width: 48, height: 48, border: "4px solid #E8E4DE", borderTopColor: "#7C6CA8",
            borderRadius: "50%", animation: "spin 0.8s linear infinite", margin: "0 auto 12px",
          }} />
          <p style={{ color: "#8B8680", fontSize: 14 }}>Se incarca...</p>
          <style>{`@keyframes spin{to{transform:rotate(360deg)}}`}</style>
        </div>
      </div>
    );
  }

  if (!user) {
    return <AuthScreen />;
  }

  return <GenesisTracker user={user} onLogout={logout} />;
}
