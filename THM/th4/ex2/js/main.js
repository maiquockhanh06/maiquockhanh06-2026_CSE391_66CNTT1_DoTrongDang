const form = document.getElementById("registerForm")

const fullname = document.getElementById("fullname")
const email = document.getElementById("email")
const phone = document.getElementById("phone")
const password = document.getElementById("password")
const confirmPassword = document.getElementById("confirmPassword")
const terms = document.getElementById("terms")

const nameCount = document.getElementById("nameCount")
const togglePassword = document.getElementById("togglePassword")

const strengthBar = document.getElementById("strength")
const strengthText = document.getElementById("strengthText")

const successMessage = document.getElementById("successMessage")

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
const phoneRegex = /^0[0-9]{9}$/
const nameRegex = /^[a-zA-ZÀ-ỹ\s]+$/


function showError(field,msg){
document.getElementById(field+"Error").textContent = msg
}

function clearError(field){
document.getElementById(field+"Error").textContent = ""
}



function validateFullname(){

let value = fullname.value.trim()

if(value.length < 3){
showError("fullname","Tên ≥ 3 ký tự")
return false
}

if(!nameRegex.test(value)){
showError("fullname","Chỉ được nhập chữ")
return false
}

clearError("fullname")
return true

}



function validateEmail(){

let value = email.value.trim()

if(!emailRegex.test(value)){
showError("email","Email không hợp lệ")
return false
}

clearError("email")
return true

}



function validatePhone(){

if(!phoneRegex.test(phone.value)){
showError("phone","SĐT phải 10 số")
return false
}

clearError("phone")
return true

}



function validatePassword(){

let value = password.value

if(value.length < 8){
showError("password","Mật khẩu ≥ 8 ký tự")
return false
}

clearError("password")
return true

}



function validateConfirmPassword(){

if(confirmPassword.value !== password.value){
showError("confirmPassword","Mật khẩu không khớp")
return false
}

clearError("confirmPassword")
return true

}



function validateGender(){

let gender = document.querySelector('input[name="gender"]:checked')

if(!gender){
document.getElementById("genderError").textContent="Chọn giới tính"
return false
}

document.getElementById("genderError").textContent=""
return true

}



function validateTerms(){

if(!terms.checked){
document.getElementById("termsError").textContent="Phải đồng ý điều khoản"
return false
}

document.getElementById("termsError").textContent=""
return true

}



fullname.addEventListener("input",function(){

let len = fullname.value.length

nameCount.textContent = len + "/50"

})



password.addEventListener("input",function(){

let value = password.value
let strength = 0

if(value.length >= 8) strength++
if(/[A-Z]/.test(value)) strength++
if(/[0-9]/.test(value)) strength++
if(/[^A-Za-z0-9]/.test(value)) strength++

if(strength <= 1){
strengthBar.style.width="33%"
strengthBar.style.background="red"
strengthText.textContent="Yếu"
}

else if(strength <=3){
strengthBar.style.width="66%"
strengthBar.style.background="orange"
strengthText.textContent="Trung bình"
}

else{
strengthBar.style.width="100%"
strengthBar.style.background="green"
strengthText.textContent="Mạnh"
}

})



togglePassword.addEventListener("click",function(){

if(password.type === "password"){
password.type = "text"
}
else{
password.type = "password"
}

})



form.addEventListener("submit",function(e){

e.preventDefault()

let valid =
validateFullname() &
validateEmail() &
validatePhone() &
validatePassword() &
validateConfirmPassword() &
validateGender() &
validateTerms()

if(valid){

form.style.display="none"

successMessage.innerHTML =
"Đăng ký thành công 🎉<br>Xin chào <b>"+fullname.value+"</b>"

}

})