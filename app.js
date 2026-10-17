let allProducts = [];
const search = document.getElementById('search');

search.addEventListener('input', (event) => {
    const text = event.target.value.toLowerCase();
    
    const found = allProducts.filter(item => {
        const currentText = item.title.toLowerCase();
        return currentText.includes(text);
    });
    renderProduct(found);
});

async function loadProduct() {
    try {
        const res = await fetch("https://fakestoreapi.com/products");
        if (!res.ok) {
            throw new Error('Ошибка сервера: ' + res.status);
        }
        const product = await res.json();
        allProducts = product;
        renderProduct(product);
    } catch(error) {
        console.log("Error!", error);
        const container = document.getElementById("prod");
        container.innerHTML = `<h2>Ошибка загрузки данных</h2>`;
    }
}

function renderProduct(product) {
    const container = document.getElementById("prod")
    if(product.length === 0){
            container.innerHTML = `<article>Not found</article>`;
            return;
        }
    container.innerHTML = product
        .map((item, i) => `<article>
        ${i + 1}. ${item.title}. ${item.price}. <br>
        ${item.description}.<br>
        <img src="${item.image}" alt="${item.title}" width="100" height="100"> <br><br></article>`)
        .join(''); 
}

loadProduct()
