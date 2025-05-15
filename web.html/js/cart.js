const container = document.getElementById("container"); 
container.innerHTML = "";

// Lấy dữ liệu giỏ hàng từ localStorage
const cart = JSON.parse(localStorage.getItem("cart"));
let object = {};

cart.forEach(element => {
    const item = document.createElement("div");
    item.className = "product-item";

    // Thêm CSS trực tiếp vào các phần tử
    item.style.backgroundColor = "#f9f9f9";
    item.style.border = "1px solid #ccc";
    item.style.padding = "15px";
    item.style.margin = "10px 0";
    item.style.borderRadius = "10px";
    item.style.alignItems = "center";
    item.style.justifyContent = "space-between";
    item.style.display = "flex";
    item.style.flexDirection = "row";


    // Đảm bảo không lặp lại hình ảnh
    object[element.img] = (object[element.img] || 0) + 1;

    let imagePath = `images/${element.img}`;
    
    // Cấu trúc HTML bên trong item
    item.innerHTML = `
        <img src="${imagePath}" width="70px" alt="Sản phẩm">
        <p>${element.name}</p>
        <p>${element.cost}</p>
        <input type="number" placeholder="Số lượng (Mặc định 0)" class="input" value="1">
        <button onclick="DelItem(this)" style="font-size: 10px;">Xóa</button>
    `;

    // Append item vào container nếu chưa có sản phẩm với hình ảnh trùng lặp
    if (object[element.img] == 1) {
        container.appendChild(item);
    }
});

// Thêm sự kiện cho input để tính toán lại giá trị
const input = document.getElementsByClassName("input");
for (let i = 0; i < input.length; i++) {
    input[i].addEventListener("input", function(){
        calc();
    });
}

calc(); // Tính toán tổng khi trang được tải

// Hàm xóa sản phẩm
function DelItem(button) {
    const parentDiv = button.closest(".product-item");
    const nameProduct = parentDiv.querySelector("p").innerText;

    let cart = JSON.parse(localStorage.getItem("cart"));
    cart = cart.filter(item => item.name != nameProduct);
    localStorage.setItem("cart", JSON.stringify(cart));

    parentDiv.remove();  // Xóa sản phẩm khỏi giỏ hàng hiển thị
    calc(); // Tính toán lại tổng sau khi xóa sản phẩm
}

// Hàm tính toán tổng số tiền
function calc() {
    const item = Array.from(document.getElementsByClassName("product-item"));
    const input = document.getElementsByClassName("input");
    let cost, value; 
    let sum = 0;

    for (let i = 0; i < item.length; i++) {
        let quantity = parseInt(input[i].value || 0);
        cost = item[i].querySelectorAll("p")[1].innerText;
        value = parseInt(cost.replace("Giá:", "").replace(/\./g, "").replace("đ", "").trim());
        sum += (value * quantity);
    }

    const total = document.getElementById("total").querySelector("p");
    total.innerText = "Tổng số tiền cần thanh toán là: " + sum + "đ";
    let checkout = document.querySelector(".checkout");
    checkout.innerHTML = `
    <div style="height: 50px; background-color: #FC7600; border-radius: 10px;  display: flex; justify-content: center; align-items: center; margin-bottom: 20px;">
        <a href="" style="color: white; text-decoration: none;">
            THANH TOÁN
        </a>
    </div>
`
    let empty_cart = document.querySelector(".empty-cart");
    empty_cart.innerHTML = "";
}

// Hàm xóa giỏ hàng
function clearCart() {
    localStorage.clear();
    location.reload();
}
