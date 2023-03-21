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