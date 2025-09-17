async function humanize() {
    const input = document.getElementById("inputText").value;

    try {
        const response = await fetch("https://humanizer-2qzw.onrender.com/humanize", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ text: input })
        });

        if (!response.ok) {
            document.getElementById("result").innerHTML =
                "<p style='color:red;'>Error: " + response.statusText + "</p>";
            return;
        }

        const data = await response.json();
        document.getElementById("result").innerHTML =
            "<h3>Humanized Text:</h3><p>" + data.humanized_text + "</p>";

    } catch (error) {
        document.getElementById("result").innerHTML =
            "<p style='color:red;'>Network error: " + error + "</p>";
    }
}



