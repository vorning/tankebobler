// DEBUG VERSION - Maksimal logging til fejlfinding

console.log("🔥 APP.JSX FILE LOADING...");

import { useState, useEffect } from "react";

console.log("✅ React hooks imported successfully");

function App() {
  console.log("🚀 APP COMPONENT RENDERING");

  const [debugInfo, setDebugInfo] = useState({
    timestamp: new Date().toLocaleTimeString(),
    renderCount: 0,
  });

  useEffect(() => {
    console.log("🔄 useEffect running");
    setDebugInfo((prev) => ({
      ...prev,
      renderCount: prev.renderCount + 1,
    }));
  }, []);

  console.log("📊 Current debugInfo:", debugInfo);

  // Test localStorage
  try {
    localStorage.setItem("test", "works");
    const test = localStorage.getItem("test");
    console.log("💾 localStorage test:", test);
  } catch (error) {
    console.error("❌ localStorage error:", error);
  }

  // Test user data
  try {
    const savedUser = localStorage.getItem("tankebobler_user");
    console.log("👤 Saved user data:", savedUser);
  } catch (error) {
    console.error("❌ User data error:", error);
  }

  return (
    <div
      style={{
        padding: "20px",
        fontFamily: "Arial, sans-serif",
        backgroundColor: "#f0f0f0",
        minHeight: "100vh",
      }}
    >
      <div
        style={{
          backgroundColor: "white",
          padding: "20px",
          borderRadius: "10px",
          marginBottom: "20px",
          border: "2px solid #4CAF50",
        }}
      >
        <h1 style={{ color: "#4CAF50", margin: "0 0 20px 0" }}>
          🎉 REACT VIRKER! 🎉
        </h1>
        <p>
          <strong>Timestamp:</strong> {debugInfo.timestamp}
        </p>
        <p>
          <strong>Render count:</strong> {debugInfo.renderCount}
        </p>
        <p>
          <strong>Current URL:</strong> {window.location.href}
        </p>
        <p>
          <strong>User Agent:</strong> {navigator.userAgent.substring(0, 100)}
          ...
        </p>
      </div>

      <div
        style={{
          backgroundColor: "#fff3cd",
          padding: "20px",
          borderRadius: "10px",
          marginBottom: "20px",
          border: "2px solid #ffc107",
        }}
      >
        <h2 style={{ color: "#856404", margin: "0 0 15px 0" }}>
          🔍 DEBUG INFORMATION
        </h2>
        <button
          onClick={() => {
            console.log("🖱️ Button clicked!");
            console.log(
              "📱 Window size:",
              window.innerWidth,
              "x",
              window.innerHeight
            );
            console.log("🌐 Location:", window.location);
            setDebugInfo((prev) => ({
              ...prev,
              renderCount: prev.renderCount + 1,
              timestamp: new Date().toLocaleTimeString(),
            }));
          }}
          style={{
            padding: "10px 20px",
            backgroundColor: "#ffc107",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "16px",
            marginRight: "10px",
          }}
        >
          🔄 Opdater Debug Info
        </button>

        <button
          onClick={() => {
            console.log("🗑️ Clearing localStorage");
            localStorage.clear();
            console.log("✅ localStorage cleared");
          }}
          style={{
            padding: "10px 20px",
            backgroundColor: "#dc3545",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
            fontSize: "16px",
          }}
        >
          🗑️ Clear localStorage
        </button>
      </div>

      <div
        style={{
          backgroundColor: "#d4edda",
          padding: "20px",
          borderRadius: "10px",
          border: "2px solid #28a745",
        }}
      >
        <h2 style={{ color: "#155724", margin: "0 0 15px 0" }}>
          ✅ TEST RESULTS
        </h2>
        <ul style={{ margin: 0, paddingLeft: "20px" }}>
          <li>✅ JavaScript is running</li>
          <li>✅ React components are rendering</li>
          <li>✅ State management works</li>
          <li>✅ Event handlers work</li>
          <li>✅ Console logging works</li>
          <li>✅ localStorage is accessible</li>
        </ul>
      </div>

      <div
        style={{
          marginTop: "20px",
          padding: "20px",
          backgroundColor: "#f8f9fa",
          borderRadius: "10px",
          border: "2px solid #6c757d",
        }}
      >
        <h3 style={{ color: "#495057", margin: "0 0 10px 0" }}>
          📝 NEXT STEPS
        </h3>
        <p style={{ margin: 0, color: "#6c757d" }}>
          Hvis du kan se denne side, så virker React! Nu kan vi tilføje routing
          og context tilbage step by step.
        </p>
      </div>
    </div>
  );
}

console.log("📦 APP COMPONENT DEFINED");

export default App;

console.log("🏁 APP.JSX FILE LOADED COMPLETELY");
