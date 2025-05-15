function hoverEffect()
{
    let divItem = document.getElementsByClassName("product-item")
    for(let i = 0; i < divItem.length; i++)
    {
        divItem[i].addEventListener("mouseover", function(){
            this.style.transform = "scale(1.05)";
            this.style.boxShadow = "0 4px 8px rgba(0,0,0,0.2)";
        })
    }
    for(let i = 0; i < divItem.length; i++)
        {
            console.log("helelo")
            divItem[i].addEventListener("mouseout", function(){
                this.style.transform = "scale(1)";
                this.style.boxShadow = "none";
            })
        }
}