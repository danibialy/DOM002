// We wait for the HTML to be ready before running anything.
// The script is in the <head>, so without this the <ul> would not exist yet.
document.addEventListener("DOMContentLoaded", () => {

    // paintings.json gives us a variable called content, which is just text.
    // JSON.parse turns that text into a real array we can use.
    const paintings = JSON.parse(content);

    // We save the parts of the page we are going to change.
    const list = document.querySelector("#paintings ul");
    const figure = document.querySelector("#details figure");
    const description = document.querySelector("#description");

    // One small image per painting. The id in the data is also the file name,
    // so we can build the path with it. We keep the id in data-id to use it later.
    for (const painting of paintings) {
        list.innerHTML += `<li><img src="images/small/${painting.id}.jpg" data-id="${painting.id}"></li>`;
    }

    // Only one click handler, on the <ul>, instead of one per image.
    // Clicks travel up from the image to the list, so the list can handle them all.
    list.addEventListener("click", (event) => {

        // If the click was not on an image, we do nothing.
        if (event.target.tagName !== "IMG") return;

        // We look for the painting whose id matches the image we clicked.
        const painting = paintings.find(p => p.id === event.target.dataset.id);

        // Replacing the content of the figure also deletes the boxes
        // of the painting we were looking at before.
        figure.innerHTML = `<img id="full" src="images/large/${painting.id}.jpg">`;
        description.textContent = "";

        document.querySelector("#title").textContent = painting.title;
        document.querySelector("#artist").textContent = painting.artist;

        // One red box per feature of the painting.
        for (const feature of painting.features) {
            const box = document.createElement("div");

            // The class box already has the red border and the grey colour in the CSS.
            box.className = "box";

            // Absolute position, so the box sits on top of the painting.
            box.style.position = "absolute";

            // The top left corner comes straight from the data.
            box.style.left = feature.upperLeft[0] + "px";
            box.style.top = feature.upperLeft[1] + "px";

            // The size is the difference between the two corners.
            box.style.width = feature.lowerRight[0] - feature.upperLeft[0] + "px";
            box.style.height = feature.lowerRight[1] - feature.upperLeft[1] + "px";

            // When the mouse is on the box we show its text under the painting,
            // and when it leaves we empty it again.
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