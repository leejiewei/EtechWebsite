window.addEventListener('DOMContentLoaded', (event) => {
    startSelectListen()
});

function startSelectListen() {
    let tablerows = document.querySelectorAll('.tablerow')
    console.log(tablerows)

    for (let index = 0; index < tablerows.length; index++) {
        let tablerow = tablerows[index]
        let HTMLselect = tablerow.firstElementChild.firstElementChild
        HTMLselect.addEventListener('click', clickSelectItem)
    }

    function clickSelectItem(e) {
        
        const select = e.target
        const tr = select.parentNode.parentNode

        // get price
        const price = select.options[select.selectedIndex].dataset.price
        if (price) {
            // replace quantity with select if not already
            if (tr.children[1].innerText == 0) {
                tr.children[1].innerHTML = getQuantitySelect()
                tr.children[1].firstElementChild.addEventListener('click', clickQuantity)
            }
            // get quantity
            const quantity = tr.children[1].firstElementChild.value
            // write price
            tr.children[2].innerText = price
            // write total
            tr.children[3].innerText = price * quantity
            //write total_price
            calculateTotal()
        } else {
            // user not selecting real product
            // clear quantity, price and total
            tr.children[1].innerText = 0
            tr.children[2].innerText = 0
            tr.children[3].innerText = 0
        }

    }

    function clickQuantity(e) {
        const quantitySelect = e.target
        const tr = quantitySelect.parentNode.parentNode
        console.log(tr)
        const itemSelect = tr.firstElementChild.firstElementChild
        const price = itemSelect.options[itemSelect.selectedIndex].dataset.price
        // get quantity
        const quantity = quantitySelect.value
        // write total
        tr.children[3].innerText = price * quantity
        //
        calculateTotal()
    }
}

function getQuantitySelect() {
    return `
        <select name="quantity[]">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
        </select>
    `
}

function calculateTotal() 
{
    const td = document.getElementById("total-price");
    let tablerows = document.querySelectorAll('.tablerow')
    let total = 0
    for (let index = 0; index < tablerows.length; index++) {
        let tablerow = tablerows[index]
        let rowtotal =  parseInt(tablerow.lastElementChild.innerText)
        console.log(rowtotal)
        total = total + rowtotal
    }
    console.log(td)
    td.innerText="RM"+total
            
}