

async function loadProduct() {
    try {
        const res = await fetch("https://fakestoreapi.com/products");
        if (!res.ok) {
            throw new Error('Ошибка сервера: ' + res.status);
        }
        const product = await res.json();
        
        renderProduct(product);
    } catch(error) {
        console.log("Error!", error);
        const container = document.getElementById("prod");
        container.innerHTML = `<h2>Ошибка загрузки данных</h2>`;
    }
}

function renderProduct(product) {
    const container = document.getElementById("prod")
        container.innerHTML = product
            .map((item, i) => `<article>
            ${i + 1}. ${item.title}. ${item.price}. <br>
            ${item.description}.<br>
            <img src="${item.image}" alt="${item.title}" width="100" height="100"> <br><br></article>`)
            .join(''); 
}



loadProduct()




