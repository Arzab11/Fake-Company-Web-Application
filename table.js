document.addEventListener("DOMContentLoaded", function () {
    const deleteRows = document.querySelectorAll(".delete-row");

    for (let i = 0; i < deleteRows.length; i++) {
        deleteRows[i].addEventListener("click", function () {
            const row = deleteRows[i].parentNode.parentNode;
            const contactId = deleteRows[i].getAttribute("id");
            
            if (contactId) {
                fetch(`/api/contact?id=${contactId}`, {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ id: contactId })
                })
                .then(response => {
                    if (response.status === 200) {
                        row.remove();
                    }
                    else if (response.status === 404) {
                        row.remove()
                    }
                    else {
                        console.error("Error deleting contact: ", response.status);
                    }
                })
            }
        });
    }
    function addTimeUntil() {
        const time_Cells = document.querySelectorAll(".time-until");

        for (let i = 0; i < time_Cells.length; i++) {
            const cell_Data = time_Cells[i];
            const row = cell_Data.parentNode;
            const cells = row.getElementsByTagName("td");

            if (cell_Data) {
                const dateCell = cells[2]; 
                const text_output = dateCell.textContent;
                const finaleDate = Date.parse(text_output);
                const currentDate = new Date();

                if (!isNaN(finaleDate)) {
                    const time = finaleDate - currentDate;
                    if (time > 0) {
                        const days = Math.floor(time / (1000 * 60 * 60 * 24));
                        const hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                        const minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
                        const seconds = Math.floor((time % (1000 * 60)) / 1000);

                        cell_Data.textContent = `${days}d ${hours}h ${minutes}m ${seconds}s`;
                    } else {
                        cell_Data.textContent = "PAST";
                    }
                }
            }
        }
    }
    setInterval(addTimeUntil, 1000);
});

addTimeUntil();