let allProducts = [];
const search = document.getElementById('search');
const category = document.getElementById('category');

search.addEventListener('input', () => {
    applyFilters();
});

category.addEventListener('change', () => {
    applyFilters();
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

function applyFilters() {
    const text = search.value.toLowerCase();
    const selectedCategory = category.value;

    let result = allProducts;

    if (selectedCategory !== 'all') {
        result = result.filter(item => item.category === selectedCategory);
    }

    result = result.filter(item => item.title.toLowerCase().includes(text));   

    renderProduct(result);               
}
loadProduct()


// 
// 