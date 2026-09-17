document.addEventListener("DOMContentLoaded", () => {

    const paintings = JSON.parse(content);
    const list = document.querySelector("#paintings ul");

    for (const painting of paintings) {
        list.innerHTML += `<li><img src="images/small/${painting.id}.jpg" data-id="${painting.id}"></li>`;
    }
});