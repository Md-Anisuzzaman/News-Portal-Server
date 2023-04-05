const arrObjs = [
    {
        title: "step 1",
        childrens: [
            {
                title: "step 1-1",
                childrens: []
            },
            {
                title: "step 1-2",
                childrens: []
            },
            {
                title: "step 1-3",
                childrens: []
            }
        ]

    },
    {
        title: "step 2",
        childrens: [
            {
                title: "step 2-1",
                childrens: []
            },
            {
                title: "step 2-2",
                childrens: [
                    {
                        title: "step 2-2-1",
                        childrens: []
                    },
                    {
                        title: "step 2-2-2",
                        childrens: []
                    },
                    {
                        title: "step 2-2-3",
                        childrens: []
                    }
                ]
            },
            {
                title: "step 2-3",
                childrens: []
            }
        ]
    },
    {
        title: "step 3",
        childrens: [
            {
                title: "step 3-1",
                childrens: []
            },
            {
                title: "step 3-2",
                childrens: []
            },
            {
                title: "step 3-3",
                childrens: []
            }
        ]
    }
]

const outPut = document.getElementById("output");
const render = (lists) => {
    let html = "<ul>"
    for (let index = 0; index < lists.length; index++) {
        let items = lists[index];
        console.log(items);
        html += `<li>${items.title}</li>`
        html += render(items.childrens)
    }
    html += "</ul>"
    return html;
}

let htmlOutPut = render(arrObjs);
outPut.innerHTML = htmlOutPut;

const objs = [{
    name: "juel",
}]

objs.push({ name: "author 1" },
    { name: "author 2" })

// console.log(objs);

const book = ({
    title: 'Example Book',
    authors: []
});

book.authors = book.authors.concat([
    { name: 'Author 1' },
    { name: 'Author 2' },
    { name: 'Author 3' }
]);

const paragraphs = document.querySelectorAll('#text-container p');
const searchInput = document.querySelector('#search-input');
const showMoreBtn = document.querySelector('#show-more-btn');
const showLessBtn = document.querySelector('#show-less-btn');

let showingMore = false;

function toggleText() {
    for (let i = 1; i < paragraphs.length; i++) {
        if (showingMore) {
            paragraphs[i].style.display = 'none';
        } else {
            paragraphs[i].style.display = 'block';
        }
    }

    showingMore = !showingMore;
    showMoreBtn.style.display = showingMore ? 'none' : 'block';
    showLessBtn.style.display = showingMore ? 'block' : 'none';
}

function filterText() {
    const searchTerm = searchInput.value.toLowerCase();

    for (let i = 0; i < paragraphs.length; i++) {
        const paragraphText = paragraphs[i].textContent.toLowerCase();

        if (paragraphText.includes(searchTerm)) {
            paragraphs[i].style.display = 'block';
        } else {
            paragraphs[i].style.display = 'none';
        }
    }
}

showMoreBtn.addEventListener('click', toggleText);
showLessBtn.addEventListener('click', toggleText);
searchInput.addEventListener('input', filterText);



// console.log(book);