let students = []
let filteredStudents = []

let sortAsc = true

const nameInput = document.getElementById("name")
const scoreInput = document.getElementById("score")
const addBtn = document.getElementById("addBtn")

const searchInput = document.getElementById("search")
const filterSelect = document.getElementById("filter")

const tableBody = document.getElementById("tableBody")
const stats = document.getElementById("stats")

const scoreHeader = document.getElementById("scoreHeader")

function getRank(score){

    if(score >= 8.5) return "Giỏi"
    if(score >= 7) return "Khá"
    if(score >= 5) return "Trung bình"
    return "Yếu"

}

function addStudent(){

    let name = nameInput.value.trim()
    let score = Number(scoreInput.value)

    if(name === ""){
        alert("Họ tên không được để trống")
        return
    }

    if(isNaN(score) || score < 0 || score > 10){
        alert("Điểm phải từ 0-10")
        return
    }

    students.push({name,score})

    nameInput.value=""
    scoreInput.value=""
    nameInput.focus()

    applyFilters()

}

function applyFilters(){

    let keyword = searchInput.value.toLowerCase()
    let filter = filterSelect.value

    filteredStudents = students.filter(sv=>{

        let matchName = sv.name.toLowerCase().includes(keyword)

        let rank = getRank(sv.score)

        let matchRank = filter==="all" || rank===filter

        return matchName && matchRank

    })

    filteredStudents.sort((a,b)=>{

        return sortAsc ? a.score - b.score : b.score - a.score

    })

    renderTable()

}

function renderTable(){

    tableBody.innerHTML=""

    if(filteredStudents.length===0){

        tableBody.innerHTML = `<tr><td colspan="5">Không có kết quả</td></tr>`

        updateStats()

        return
    }

    filteredStudents.forEach((sv,index)=>{

        let tr = document.createElement("tr")

        if(sv.score < 5){
            tr.classList.add("low")
        }

        tr.innerHTML=`

        <td>${index+1}</td>
        <td>${sv.name}</td>
        <td>${sv.score}</td>
        <td>${getRank(sv.score)}</td>
        <td>
        <button data-index="${students.indexOf(sv)}">Xóa</button>
        </td>

        `

        tableBody.appendChild(tr)

    })

    updateStats()

}

function updateStats(){

    let total = students.length

    let avg = 0

    if(total>0){

        let sum = students.reduce((a,b)=>a+b.score,0)

        avg = (sum/total).toFixed(2)

    }

    stats.textContent = `Tổng SV: ${total} | Điểm TB: ${avg}`

}

addBtn.addEventListener("click",addStudent)

scoreInput.addEventListener("keydown",e=>{

    if(e.key==="Enter"){
        addStudent()
    }

})

searchInput.addEventListener("input",applyFilters)

filterSelect.addEventListener("change",applyFilters)

scoreHeader.addEventListener("click",()=>{

    sortAsc = !sortAsc

    scoreHeader.textContent = sortAsc ? "Điểm ▲" : "Điểm ▼"

    applyFilters()

})

tableBody.addEventListener("click",e=>{

    if(e.target.tagName==="BUTTON"){

        let index = e.target.dataset.index

        students.splice(index,1)

        applyFilters()

    }

})

applyFilters()