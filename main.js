async function humanize() {
    const input = document.getElementById("inputText").value;

    const response = await fetch("http://0.0.0.0:10000", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ text: input })
    });

    if (!response.ok) {
        document.getElementById("result").innerHTML = "<p style='color:red;'>Error: " + response.statusText + "</p>";
        return;
    }

    const data = await response.json();
    document.getElementById("result").innerHTML =
        "<h3>Humanized Text:</h3><p>" + data.humanized_text + "</p>";
}





