import fetch from "node-fetch";

async function testAPI() {
  try {
    console.log("🚀 Sending test request to NeuronHive backend...");

    const response = await fetch("http://localhost:5000/api/generate-courses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        topic: "Frontend Development with React",
        level: "Beginner",
      }),
    });

    console.log("📥 Response Status:", response.status);

    const text = await response.text();

    if (!response.ok) {
      console.error("❌ Gemini API or backend error:", text);
      return;
    }

    try {
      const data = JSON.parse(text);
      console.log("✅ Parsed API Response:", JSON.stringify(data, null, 2));
    } catch (err) {
      console.error("⚠️ Could not parse response as JSON. Raw output:");
      console.log(text);
    }
  } catch (error) {
    console.error("💥 Error testing API:", error);
  }
}

testAPI();
