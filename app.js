

//let bank = [
//    {'tarefa': 'Estudar','date': '', 'status': ''},
//    {'tarefa': 'Dormir','date': '', 'status': 'checked'}
//]

const getbank = () => JSON.parse(localStorage.getItem('todoList')) ?? [];
const setBank = (bank) => localStorage.setItem('todoList', JSON.stringify(bank))

const criarItem = (text, date, status, indice) => {
    const item = document.createElement('label');

    item.classList.add('todo__item');
    item.innerHTML = `
        <input type="checkbox" ${status} data-indice=${indice}>
        <div>${text}</div>
        <div>${date}</div>
        <input type="button" value="Excluir" data-indice=${indice}>
    `

    document.getElementById('todoList').appendChild(item);
} 

const clearRender = () => {
    const todoList = document.getElementById('todoList');
    while(todoList.firstChild) {
        todoList.removeChild(todoList.lastChild)
    }
}

//RENDER
const render = () => {
    clearRender();
    const bank = getbank();
    bank.forEach( (item, indice) => criarItem (item.tarefa,item.date, item.status, indice));
}

//ADD TO THE BANK
function addOnBank() {
    let text = document.getElementById('input').value
    let date = document.getElementById('dateInput').value

    const bank = getbank();
    bank.push({'tarefa': text,'date': date, 'status': ''},)
    setBank(bank);
    render();

    document.getElementById('input').value = '';
    document.getElementById('dateInput').value = '';
}

//ADD BY PRESSING ENTER
document.getElementById('newItem').addEventListener('keypress', (event) => {
    const tecla = event.key;
    if(tecla === 'Enter'){
       addOnBank()
    }
});

document.getElementById('todoList').addEventListener('click', (event) => {
    const element = event.target;
    const bank = getbank();
    if(element.type === 'button') {
        const indice = element.dataset.indice
        bank.splice (indice, 1);
        setBank(bank);
        render();
    }else if (element.type === 'checkbox') {
        const indice = element.dataset.indice
        const bank = getbank()
        bank[indice].status = bank[indice].status === '' ? 'checked' : '';
        setBank(bank)
        render();
    }
});

render();


