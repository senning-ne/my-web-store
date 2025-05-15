function goToProductPage() {
    const searchValue = document.getElementById("inputForm").value;
    localStorage.setItem("searchQuery", searchValue);
    window.location.href = "phone.html";

}
// This part will run on the 'phone.html' page when it loads
const searchValue = localStorage.getItem("searchQuery");
if (searchValue) {
    findProd(searchValue); // Gọi hàm tìm kiếm khi trang vừa tải
    localStorage.removeItem("searchQuery"); // Xóa sau khi dùng
}

function findProd(value) {
    console.log("hello");
    const container = document.getElementById("product-list");
    if (!container) {
        console.error("Error: 'product-list' container not found.");
        return;
    }
    const items = Array.from(container.getElementsByClassName("product-item"));
    value = value.toLowerCase();
    container.innerHTML = "";
    let counter = 0;
    for (let i = 0; i < items.length; i++) {
        const h3Element = items[i].querySelector("h3");
        if (h3Element && h3Element.innerText.toLowerCase().includes(value)) {
            container.appendChild(items[i]);
            counter += 1;
        }
    }
    let heightContainer = 400 * (Math.ceil(counter / 3));
    console.log(heightContainer);
    container.style.height = heightContainer + "px";
    const countProd = document.querySelector("#countProd");
    if (countProd) {
        countProd.style.display = "block";
        countProd.innerText = "Đã tìm thấy " + counter + " sản phẩm";
    } else {
        console.warn("Warning: '#countProd' element not found.");
    }
    container.style.height = "auto"; // Để chiều cao tự động điều chỉnh theo số lượng sản phẩm

    // Nếu cần set min-height cho container, có thể dùng
    container.style.minHeight = "400px";
}

function addToCart() {
    const nameElement = document.querySelector("h2");
    const costElements = document.querySelectorAll("h2");
    const imgElement = document.getElementById("imgPhone");

    if (nameElement && costElements.length > 1 && imgElement) {
        const name = nameElement.innerText;
        const cost = costElements[1].innerText;
        const img = imgElement.getAttribute("src");

        const product = {
            name: name,
            cost: cost,
            img: img
        };

        let cart = JSON.parse(localStorage.getItem("cart")) || [];
        cart.push(product);
        localStorage.setItem("cart", JSON.stringify(cart));
        alert("Sản phẩm đã được thêm vào giỏ hàng!");
    } else {
        console.error("Error: Could not find necessary product information on the page.");
    }
}
/*banner*/
let currentIndex = 0;
  const totalSlides = 2;
  const carouselWrapper = document.querySelector('.carousel-wrapper');
  const containerWidth = document.querySelector('.banner-container').offsetWidth;
  const slideWidth = containerWidth;

  function moveSlide(direction) {
    currentIndex = (currentIndex + direction + totalSlides) % totalSlides;
    carouselWrapper.style.transform = `translateX(-${currentIndex * slideWidth}px)`;
  }

  // Tự động chuyển slide mỗi 3,5 giây
  setInterval(() => {
    moveSlide(1);
  }, 3500);
/*sắp xếp sp theo giá*/
function sortProdAsc()
        {
            const container = document.getElementById("product-list")
            console.log(container)
            const items = Array.from(container.getElementsByClassName("product-item"))
            const sortedItem = items.sort(function(a, b){
                function getvalue(item)
                {
                    const text = item.querySelector("p").innerText;
                    console.log(item.querySelector("p"))
                    const giaText = text.split("Giá:")[1].trim(); 
                    const giaSo = giaText.replace("đ", "").trim(); 
                    const giaCuoi = parseInt(giaSo.replace(/\./g, ""));
                    return(giaCuoi)
                }
                return getvalue(a) - getvalue(b)
            })
            container.innerHTML = ""
            for(let i = 0; i < sortedItem.length; i++)
            {
                container.appendChild(sortedItem[i])
            }
        }

function sortProdDesc()
{
    const container = document.getElementById("product-list")
    console.log(container)
    const items = Array.from(container.getElementsByClassName("product-item"))
    const sortedItem = items.sort(function(a, b){
        function getvalue(item)
        {
            const text = item.querySelector("p").innerText;
            console.log(item.querySelector("p"))
            const giaText = text.split("Giá:")[1].trim(); 
            const giaSo = giaText.replace("đ", "").trim(); 
            const giaCuoi = parseInt(giaSo.replace(/\./g, ""));
            return(giaCuoi)
        }
        return getvalue(b) - getvalue(a)
    })
    container.innerHTML = ""
    for(let i = 0; i < sortedItem.length; i++)
    {
        container.appendChild(sortedItem[i])
    }
}        
/*lọc sản phẩm*/
function searchProducts(query) 
        {
            const products = document.querySelectorAll('.product-item');
            products.forEach(product => {
            const productName = product.querySelector('h3').innerText.toLowerCase();
        // So sánh tên sản phẩm với từ khóa tìm kiếm
        if (productName.includes(query.toLowerCase())) {
            product.style.display = 'block'; // Hiển thị sản phẩm nếu phù hợp
        } else {
            product.style.display = 'none'; // Ẩn sản phẩm nếu không phù hợp
        }
    });}
    
        document.getElementById('inputForm').addEventListener('input', function() {
        const query = this.value.trim();
        searchProducts(query);
        });

        function filterByBrand(brand) 
        {
            const allProducts = document.querySelectorAll('.product-item');
            allProducts.forEach(product => {
            const productName = product.querySelector("h3").innerText; // Lấy tên sản phẩm
            if (brand && !productName.includes(brand)) {
            product.style.display = 'none'; // Ẩn sản phẩm không thuộc hãng lọc
            } else {
            product.style.display = 'block'; // Hiển thị sản phẩm thuộc hãng lọc
        }
        });}
  