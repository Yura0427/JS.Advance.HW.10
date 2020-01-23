const getID = id => document.getElementById(id);
let page;
getID('search').onclick = () => {
    const xhr = new XMLHttpRequest();
    page = 1;
    xhr.open('GET', `http://www.omdbapi.com/?s=${getID('val').value}&page=${page}&apikey=c91a0026`);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const data = JSON.parse(xhr.responseText).Search;
            rend(data);
        }
    }
    xhr.send();
};

function closeWindow() {
    getID('close').parentNode.style.display = 'none';
};

function more() {
    getID('more').style.display = 'block';
    getID('more').innerHTML = '';
    const xhr = new XMLHttpRequest();
    xhr.open('GET', `http://www.omdbapi.com/?i=${this.id}&apikey=c91a0026`);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const data = JSON.parse(xhr.responseText);
            let {
                Poster,
                Title,
                Rated,
                Year,
                Genre,
                Plot,
                Writer,
                Director,
                Actors,
                BoxOffice,
                Awards,
                Ratings
            } = data;
            const img = document.createElement('img');
            img.src = `${Poster}`;
            img.align = "left";
            img.style.margin = "1%";
            img.style.height = '97%';
            getID('more').appendChild(img);
            const title = document.createElement('h1');
            title.textContent = `${Title}`;
            getID('more').appendChild(title);
            const close = document.createElement('input');
            close.value = 'X';
            close.id = 'close';
            close.type = 'button';
            close.onclick = closeWindow;
            getID('more').appendChild(close);
            const ryg = document.createElement('h5');
            ryg.textContent = `${Rated} ${Year} ${Genre}`;
            getID('more').appendChild(ryg);
            const plot = document.createElement('p');
            plot.textContent = `${Plot}`;
            getID('more').appendChild(plot);
            const writer = document.createElement('p');
            writer.innerHTML = `<b>Written by:</b> ${Writer}`;
            getID('more').appendChild(writer);
            const director = document.createElement('p');
            director.innerHTML = `<b>Directed by:</b> ${Director}`;
            getID('more').appendChild(director);
            const actors = document.createElement('p');
            actors.innerHTML = `<b>Starring:</b> ${Actors}`;
            getID('more').appendChild(actors);
            const boxOffice = document.createElement('p');
            boxOffice.innerHTML = `<b>BoxOffice:</b> ${BoxOffice}`;
            getID('more').appendChild(boxOffice);
            const awards = document.createElement('p');
            awards.innerHTML = `<b>Awards:</b> ${Awards}`;
            getID('more').appendChild(awards);
            const ratings = document.createElement('p');
            ratings.innerHTML = `<b>Ratings:</b></br>
                ${Ratings[0].Source} ${Ratings[0].Value}</br>
                ${Ratings[1].Source} ${Ratings[1].Value}</br>
                ${Ratings[2].Source} ${Ratings[2].Value}</br>
                `;
            getID('more').appendChild(ratings);
        }
    }
    xhr.send();
};

function rend(data) {
    getID('box').innerHTML = '';
    for (let i = 0; i < data.length; i++) {
        let {
            Title,
            Year,
            imdbID,
            Type,
            Poster
        } = data[i];
        const minBox = document.createElement('div');
        minBox.id = 'minBox';
        const img = document.createElement('img');
        img.src = `${Poster}`;
        const h2 = document.createElement('h2');
        h2.textContent = `${Title}`;
        const h4 = document.createElement('h4');
        h4.textContent = `${Type}`;
        const p = document.createElement('p');
        p.textContent = `${Year}`;
        const input = document.createElement('input');
        input.id = `${imdbID}`;
        input.type = 'button';
        input.value = `More details`;
        input.onclick = more;
        minBox.appendChild(img);
        minBox.appendChild(h2);
        minBox.appendChild(h4);
        minBox.appendChild(p);
        minBox.appendChild(input);
        getID('box').appendChild(minBox);
    }
    getID('nav').innerHTML = '';
    const next = document.createElement('input');
    next.type = 'button';
    next.value = `10>>`;
    next.onclick = nextPage;
    getID('nav').appendChild(next);
    if (page > 1){
        const prev = document.createElement('input');
        prev.type = 'button';
        prev.value = `<<10`;
        prev.onclick = prevPage;
        getID('nav').prepend(prev);
    }
};

function nextPage() {
    const xhr = new XMLHttpRequest();
    page++;
    xhr.open('GET', `http://www.omdbapi.com/?s=${getID('val').value}&page=${page}&apikey=c91a0026`);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const data = JSON.parse(xhr.responseText).Search;
            rend(data);
        }
    }
    xhr.send();
}
function prevPage() {
    const xhr = new XMLHttpRequest();
    page--;
    xhr.open('GET', `http://www.omdbapi.com/?s=${getID('val').value}&page=${page}&apikey=c91a0026`);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const data = JSON.parse(xhr.responseText).Search;
            rend(data);
        }
    }
    xhr.send();
}