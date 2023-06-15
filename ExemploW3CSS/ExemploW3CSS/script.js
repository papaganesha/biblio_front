window.addEventListener("load", () => {
    loadBooks();
    setIntervalBy(loadBooks, 10000);
});

const setIntervalBy = (func, time) => {
    setInterval(() => {
        console.log(`PING ${func.name} - ${time/1000}SECS`);
        func()
    }, time)
}

let books;

const searchByName = (bookName) => {
    console.log(bookName, books);
    let result = books.filter(book => book.name == bookName.toUpperCase());
}

const loadBooks2 = () => {
    console.log('LOAD BOOKS');
    let http = new XMLHttpRequest();
    http.onload = function(){
        const listBooks = JSON.parse(this.responseText);
        console.log(listBooks);
        generate_cards(listBooks);
    }
    http.open("GET", "http://localhost:3000/api/v1/books");
    http.send();
}

const loadBooks = () => {
    console.log('LOAD BOOKS')
    $.ajax({
        url: "http://localhost:3000/api/v1/books",
        type: 'get',
        data: {},
        // beforeSend : function(){
        //      $("#resultado").html("ENVIANDO...");
        // }
    })
        .done(function (data) {
            books = data;
            generate_cards(data);
            // search('(i.b.d.) Akula');
        })
        .fail(function (jqXHR, textStatus, msg) {
            let root = document.getElementById('root');
            root.innerHTML = '';
            let template = `<div class="alert alert-danger d-flex align-items-center" role="alert">
            <svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img" aria-label="Danger:"><use xlink:href="#exclamation-triangle-fill"/></svg>
            <div>
              Erro ao conectar com API
            </div>
          </div>`;
          root.innerHTML = template;
        });
}



const generate_cards = (books) => {
    let root = document.getElementById('root');
    root.innerHTML = '';
    let card = ``;
    for (let book of books) {
        if (book.img_url != null && book.img_url.length > 0 ) {
            card += returnCardTemplate(book.img_url, book.name, book.author, book.publisher, book.stock);
        }
    }
    // console.log(root);
    root.innerHTML += card;
}


const capitalize = (str) => {
    //split the param string into an array of strings 
    //whenever a blank space is encountered
    const arr = str.split(" ");

    //loop through each element of the array and capitalize the first letter.
    for (var i = 0; i < arr.length; i++) {
        arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);

    }

    //Join all the elements of the array back into a string 
    //using a blankspace as a separator 
    const str2 = arr.join(" ");
    return str2
}


const returnCardTemplate = (img_url, name, author, publisher, stock) => {
    return `    
    <div class="col-3 mb-4 mx-1">
        <div class="card" style='width:20rem; height: 36rem; padding-left:0px;'>
            <img src="${img_url}" class="card-img-top border" alt="..." style='width:300px; height: 300px;'>
            <div class="card-body">
                <h5 class="card-title">${capitalize(name.toLowerCase())}</h5>
            </div>
            <table class="table table-striped table-hover table-bordered">
                <tr>
                    <th>Autor</th>
                    <td>${author}</td>
                </tr>
                <tr>
                    <th>Editora</th>
                    <td>${capitalize(publisher.toLowerCase())}</td>
                </tr>
                <tr>
                    <th>Estoque</th>
                    <td> ${stock}</td>
                </tr>
            </table>

        </div>
</div>
`;
}