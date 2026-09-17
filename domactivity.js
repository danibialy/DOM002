document.addEventListener("DOMContentLoaded", () => {

    const paintings = JSON.parse(content);
    const list = document.querySelector("#paintings ul");
    const figure = document.querySelector("#details figure");
    const description = document.querySelector("#description");

    for (const painting of paintings) {
        list.innerHTML += `<li><img src="images/small/${painting.id}.jpg" data-id="${painting.id}"></li>`;
    }

    list.addEventListener("click", (event) => {
        if (event.target.tagName !== "IMG") return;

        const painting = paintings.find(p => p.id === event.target.dataset.id);

        figure.innerHTML = `<img id="full" src="images/large/${painting.id}.jpg">`;
        description.textContent = "";

        document.querySelector("#title").textContent = painting.title;
        document.querySelector("#artist").textContent = painting.artist;

        for (const feature of painting.features) {
            const box = document.createElement("div");
            box.className = "box";
            box.style.position = "absolute";
            box.style.left = feature.upperLeft[0] + "px";
            box.style.top = feature.upperLeft[1] + "px";
            box.style.width = feature.lowerRight[0] - feature.upperLeft[0] + "px";
            box.style.height = feature.lowerRight[1] - feature.upperLeft[1] + "px";

            box.addEventListener("mouseover", () => {
                description.textContent = feature.description;
            });
            box.addEventListener("mouseout", () => {
                description.textContent = "";
            });

            figure.appendChild(box);
        }
    });
});