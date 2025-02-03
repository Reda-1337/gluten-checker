async function checkGluten() {
    const product = document.getElementById('productInput').value;
    const resultDiv = document.getElementById('result');
    
    resultDiv.innerHTML = "Analyzing... ⏳";
    
    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: `Analyze this product for celiac safety: ${product}. Respond in this exact format (keep it technical):
                        
                        Product: [product name]
                        Gluten Detected: [Yes/No/Unknown]
                        Ingredients Analysis: [brief ingredients breakdown]
                        Cross-Contamination Risk: [High/Medium/Low]
                        Celiac-Safe: [Yes/No/Unknown]
                        Additional Notes: [any important warnings or certifications]`
                    }]
                }]
            })
        });

        const data = await response.json();
        const analysis = data.candidates[0].content.parts[0].text;
        
        // Format the response
        resultDiv.innerHTML = `<div class="result-box">${analysis.replace(/\n/g, '<br>')}</div>`;
        
    } catch (error) {
        resultDiv.innerHTML = "Error analyzing product. Please try again.";
    }
}
