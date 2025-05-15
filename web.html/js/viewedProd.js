function addViewedProd(button){
    let viewedList = Array.from(JSON.parse(localStorage.getItem("viewed")) || [])
    let divParent = button.closest("div")
    let img = divParent.querySelector("img").src
    const sourceIMG = img.replace("hinhanh", "sanpham").replace("jpg", "html")
    let textInDiv = divParent.innerHTML
    viewedList = viewedList.filter(item => item != textInDiv)
    viewedList.push(textInDiv)
    localStorage.setItem("viewed", JSON.stringify(viewedList))
    window.location.href=sourceIMG
}

const container = document.getElementById("container-viewed"); container.innerHTML = ""
const viewedList = JSON.parse(localStorage.getItem("viewed"))
if(viewedList.length <= 4)
{
    for(let i = viewedList.length - 1; i >= 0; i--)
        {
            let divItem = document.createElement("div"); divItem.className = "product-item" // để let divitem ở ngoài thì không chạy đuọcq
            divItem.innerHTML = viewedList[i]
            
            container.appendChild(divItem)
        }
}
else
{
    for(let i = viewedList.length - 1; i > viewedList.length - 5 ; i--)
        {
            let divItem = document.createElement("div"); divItem.className = "product-item" // để let divitem ở ngoài thì không chạy đuọcq
            divItem.innerHTML = viewedList[i]
            
            container.appendChild(divItem)
        }   
}

