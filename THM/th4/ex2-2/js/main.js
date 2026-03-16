const form = document.getElementById("orderForm")

const product = document.getElementById("product")
const quantity = document.getElementById("quantity")
const delivery = document.getElementById("delivery")
const address = document.getElementById("address")
const note = document.getElementById("note")

const totalPrice = document.getElementById("totalPrice")
const noteCount = document.getElementById("noteCount")

const confirmBox = document.getElementById("confirmBox")
const orderSummary = document.getElementById("orderSummary")

const confirmBtn = document.getElementById("confirmBtn")
const cancelBtn = document.getElementById("cancelBtn")

const successMessage = document.getElementById("successMessage")


const prices = {
Ao:150000,
Quan:200000,
Giay:500000
}



function showError(field,msg){
document.getElementById(field+"Error").textContent = msg
}

function clearError(field){
document.getElementById(field+"Error").textContent = ""
}



function validateProduct(){

if(product.value===""){
showError("product","Vui lòng chọn sản phẩm")
return false
}

clearError("product")
return true

}



function validateQuantity(){

let q = Number(quantity.value)

if(!q || q<1 || q>99){
showError("quantity","Số lượng 1 - 99")
return false
}

clearError("quantity")
return true

}



function validateDelivery(){

let selected = new Date(delivery.value)
let today = new Date()

today.setHours(0,0,0,0)

let maxDate = new Date()
maxDate.setDate(today.getDate()+30)

if(!delivery.value){
showError("delivery","Chọn ngày giao")
return false
}

if(selected < today){
showError("delivery","Không chọn ngày quá khứ")
return false
}

if(selected > maxDate){
showError("delivery","Không quá 30 ngày")
return false
}

clearError("delivery")
return true

}



function validateAddress(){

let value = address.value.trim()

if(value.length < 10){
showError("address","Địa chỉ ≥ 10 ký tự")
return false
}

clearError("address")
return true

}



function validateNote(){

if(note.value.length > 200){
showError("note","Không quá 200 ký tự")
return false
}

clearError("note")
return true

}



function validatePayment(){

let p = document.querySelector('input[name="payment"]:checked')

if(!p){
showError("payment","Chọn phương thức thanh toán")
return false
}

clearError("payment")
return true

}



function updateTotal(){

let p = product.value
let q = Number(quantity.value)

if(prices[p] && q){

let total = prices[p] * q

totalPrice.textContent =
Number(total).toLocaleString("vi-VN")

}

}



note.addEventListener("input",function(){

let len = note.value.length

noteCount.textContent = len + "/200"

if(len > 200){
noteCount.style.color = "red"
}else{
noteCount.style.color = "black"
}

validateNote()

})



product.addEventListener("change",updateTotal)
quantity.addEventListener("input",updateTotal)



product.addEventListener("blur",validateProduct)
quantity.addEventListener("blur",validateQuantity)
delivery.addEventListener("blur",validateDelivery)
address.addEventListener("blur",validateAddress)



form.addEventListener("submit",function(e){

e.preventDefault()

let valid =
validateProduct() &
validateQuantity() &
validateDelivery() &
validateAddress() &
validateNote() &
validatePayment()

if(valid){

let total = prices[product.value] * quantity.value

orderSummary.innerHTML = `
<p>Sản phẩm: ${product.value}</p>
<p>Số lượng: ${quantity.value}</p>
<p>Tổng tiền: ${Number(total).toLocaleString("vi-VN")} VNĐ</p>
<p>Ngày giao: ${delivery.value}</p>
`

confirmBox.style.display="block"

}

})



confirmBtn.addEventListener("click",function(){

confirmBox.style.display="none"
form.style.display="none"

successMessage.innerHTML =
"Đặt hàng thành công 🎉"

})



cancelBtn.addEventListener("click",function(){

confirmBox.style.display="none"

})