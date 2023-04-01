myLeads=[];
const textEl = document.getElementById("text-el");
const inputBtn = document.getElementById("input-btn");
const ulEl = document.getElementById("ul-el");
const deleteBtn = document.getElementById("delete-btn");
const tabBtn=document.getElementById("tab-btn");

let leadsFromLocalStorge=JSON.parse(localStorage.getItem("myLeads"));

if(leadsFromLocalStorge){
    myLeads=leadsFromLocalStorge;
    renderLeads();
}

inputBtn.addEventListener("click", function(){
    myLeads.push(textEl.value);
    textEl.value="";
    localStorage.setItem("myLeads", JSON.stringify(myLeads));
    renderLeads();
});

deleteBtn.addEventListener("dblclick", function(){
    myLeads=[];
    localStorage.clear();
    renderLeads();
});

tabBtn.addEventListener("click", function(){
    chrome.tabs.query({active:true,currentWindow:true},function(tabs){
        myLeads.push(tabs[0].url);
        localStorage.setItem("myLeads", JSON.stringify(myLeads));
        renderLeads();
    })
});


function renderLeads(){
    let listItems="";
    for(let i=0; i<myLeads.length; i++){
        listItems+=`
            <li>
                <a target="_blank" href="${myLeads[i]}">
                    ${myLeads[i]}
                </a>
            </li>
        `
    }
    ulEl.innerHTML=listItems;
} 