document.addEventListener("DOMContentLoaded", () => {

    const paintings = JSON.parse(content);
    const list = document.querySelector("#paintings ul");
    const figure = document.querySelector("#details figure");

    for (const painting of paintings) {
        list.innerHTML += `<li><img src="images/small/${painting.id}.jpg" data-id="${painting.id}"></li>`;
    }

    list.addEventListener("click", (event) => {
        if (event.target.tagName !== "IMG") return;

        const painting = paintings.find(p => p.id === event.target.dataset.id);

        figure.innerHTML = `<img id="full" src="images/large/${painting.id}.jpg">`;

        document.querySelector("#title").textContent = painting.title;
        document.querySelector("#artist").textContent = painting.artist;
    });
});