function SetSaleBanner(message) {
  const banner = document.getElementById("saleText");
  banner.textContent = message;
}

function SaleStatus() {
  fetch('/api/sale', {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
    },
})
    .then((response) => response.json())
    .then((data) => {
      if (data.active) {
        SetSaleBanner(data.message);
      } else {
        SetSaleBanner("");
      }
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

setInterval(SaleStatus, 1000);