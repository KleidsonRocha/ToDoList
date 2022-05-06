

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
        <li class="list-group-item ">
            <div class="row">
                <div class="col">
                    ${text}
                </div>
            <div class="col-md-auto">
                <span class="badge badge-primary badge-pill">${date}</span>
            </div>
            <div class="col col-lg-2">
                <label class="btn btn-secondary active">
                    <input type="checkbox" ${status} data-indice=${indice}> Feito
                </label>
                <label class="btn active">
                    <button type="button" class="btn btn-danger" data-indice=${indice}>Excluir</button>
                </label>
            </div>
            </div>
        </li>
        
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
    console.log(tecla);
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


