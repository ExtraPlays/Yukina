
// TYPES = 1 JOB | 2 CONSUMABLEW

const mochila = [
    {
        "id": 1,
        "qtd": 1
    },
    {
        "id": 3,
        "qtd": 5
    }
]


const items = [
    {
        "name": "Vara de Pescar",
        "icon": "🎣",
        "desc": "Ganhe dinheiro pescando",
        "usable": false,
        "price": 3000,
        "type": 1,
        "id": 1
    },
    {
        "name": "Energetico",
        "icon": "🍹",
        "desc": "Recupere 30 de energia ao tomar um delicioso energetico",
        "usable": true,
        "price": 30000,
        "type": 2,
        "id": 2
    },
    {
        "name": "Bala Love",
        "icon": "🍹",
        "desc": "Recupere 30 de energia ao tomar um delicioso energetico",
        "usable": true,
        "price": 30000,
        "type": 2,
        "id": 3
    }
]

// pega todos os itens da mochila

mochila.forEach(m => {    
    
    // verifica se existe os itens
    items.filter(i => i.id == 1).map(items => {

        const usable = items.usable ? "Usavel ✅" : "Usavel ❌"

        console.log(`${items.icon} ${items.name}(${m.qtd}x) - ${usable}`);
    })   
    

})



