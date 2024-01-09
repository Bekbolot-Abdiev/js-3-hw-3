

    const list=document.querySelector('#list')
    const inputs=document.querySelectorAll('input')
    const add=document.querySelector('button')

    const urlAuto='https://659d85cb633f9aee79099593.mockapi.io/auto/auto'

    async function getAuto() {
        const res=await fetch(urlAuto)
        const data=await res.json()
        console.log(data);
        renderAuto(data)
    }
    getAuto()

    function renderAuto(arr) {
        list.innerHTML=''
       for (const obj of arr) {
        list.innerHTML+=`
        <li>
           <h1>Марка: ${obj.marka}</h1>
           <h2>Год выпуска: ${obj.year}</h2>
           <img width='30%' src='${obj.img}' />
           <h4>КПП: ${obj.kpp}</h4>
           <h4>Цена: ${obj.price}</h4>
           <button onclick='delItem(${obj.id})'>DELETE</button>
           <button onclick='editItem(${obj.id})'>EDIT</button>
        </li>
        `
       }
    }

    async function delItem(id) {
        const res=await fetch(urlAuto+'/'+id, {
            method:'DELETE',
            headers: {
                'Content-type': 'application/json; charset=UTF-8'
            }
        })
        const data=await res.json()
        console.log(data);
        getAuto()
    }

async function addItem() {
    const res=await fetch(urlAuto, {
        method:'POST',
        body: JSON.stringify({marka:inputs[0].value, year:inputs[1].value, img:inputs[2].value, kpp:inputs[3].value, price:inputs[4].value}),
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        }
    })
    getAuto()
    inputs.value=''
}

add.onclick=()=>{
    addItem()
    inputs.value=''
}

// 

async function editItem(id) {
    const markasy=prompt('Марка')
    const jyly=prompt('Год выпуска')
    const surot=prompt('Фото')
    const kpp=prompt('КПП')
    const baasy=prompt('Цена')
    const item={
        marka:markasy,
        year:jyly,
        img:surot,
        kpp:kpp,
        price:baasy
    }
    const res=await fetch(urlAuto+'/'+id, {
        method:'PUT',
        body: JSON.stringify(item),
        headers: {
            'Content-type': 'application/json; charset=UTF-8'
        }
    })

    getAuto()
}