const form = document.querySelector('form');
const loadingElement = document.querySelector('.loading');
const API_URL = 'http://localhost:1000/mews';
const mewsElement = document.querySelector('.mews');

loadingElement.style.display = "none";
listAllMews();
form.addEventListener('submit', function (ev) {
    ev.preventDefault();
    const formData = new FormData(form);
    const name = formData.get('name');
    const content = formData.get('content');
    mewsElement.innerHTML = '';
    const mew = {
        name: name,
        content: content
    };
    fetch(API_URL, {
        method: 'POST',
        body: JSON.stringify(mew),
        headers: {
            'content-type': "application/json"
        }
    }).then(function (value) {
        return value.json()
    })
        .then(function (res) {
            form.reset();
            loadingElement.style.display = "none";
            form.style.display = '';
            listAllMews();
        });
    loadingElement.style.display = "";
    form.style.display = "none";
});

function listAllMews() {
    fetch(API_URL)
        .then(function (value) {
            return value.json();
        }).then(function (mews) {
            mews = mews.reverse();
        for (var mew of mews) {
            const div = document.createElement('div');
            const header = document.createElement('h3');
            header.textContent = mew.name;
            const content = document.createElement('p');
            content.textContent = mew.content;
            const date = document.createElement('small');
            date.textContent = mew.date;
            div.appendChild(header);
            div.appendChild(content);
            div.appendChild(date);
            div.className = 'mew';
            mewsElement.appendChild(div);
        }
    })
}