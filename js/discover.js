const search = document.getElementById('searchbar');
const prevbtn = document.getElementById('prevbtn');
const nextbtn = document.getElementById('nextbtn');
const dropdown = document.getElementById('dropdown_menu');

let loaddata = [];

fetch("../opp.json")
    .then(response => response.json())
    .then(json =>{
        loaddata = json;
        renderData();
    });

let itemsPerPage = Number(document.getElementById('dropdown_menu').value);
let currentPage = 1;
let dataToDisplay = loaddata;

function renderData(){
    itemsPerPage = Number(document.getElementById('dropdown_menu').value);
    if(search.value.trim() == '') dataToDisplay = loaddata;
    const startIndex = (currentPage-1)*itemsPerPage;
    const sum = startIndex + itemsPerPage;
    const endIndex = Math.min(sum ,dataToDisplay.length);
    const dataPerPage = dataToDisplay.slice(startIndex, endIndex);
    const contents = document.getElementById("contents");
    contents.innerHTML = "";
    dataPerPage.forEach(item =>{
        let blocks = document.createElement('div');
        blocks.classList.add('blocks');
        blocks.innerHTML = `<div class="visible"><h4>${item.name}</h4>`
        + `<h6>${item.organiser}</h6>`
        +`<h5>${item.typeOfEvent}</h5>`
        +`<p>Eligibility :  ${item.eligibility}</p></div>`
        +`<div class="popup">`
            +`<div class="popupHeader">`
                +`<h4>${item.name}</h4>`
                +`<button class="closePopup">x</button>`
            +`</div>`
            +`<div class="popupBody">`
                +`<p><span>Organiser:</span>         ${item.organiser}</p>`
                +`<p><span>Type of Event:</span>     ${item.typeOfEvent}</p>`
                +`<p><span>Eligibility:</span>       ${item.eligibility}</p>`
                +`<p><span>Rewards:</span>           ${item.awardsPrizesBenefits}</p>`
                +`<p><span>Application date:</span>  ${item.applicationDate}</p>`
                +`<p><span>Tags:</span>       ${item.eventDomainTags}</p>`
                +`<p><span>Description:</span>       ${item.description}</p>`
                +`<a href=${item.website}>Learn more >></a>`
            +`</div>`
            +`<div class="overlay"></div>`
        +`</div>`;
        contents.appendChild(blocks);
    });

    
    const popupWork = document.querySelectorAll('.blocks');
    const overlay = document.getElementById('test');
    popupWork.forEach(item=>{
      const vis = item.querySelector('.visible');
      const popup = item.querySelector('.popup');
      const close = item.querySelector('.closePopup'); 
      let isOpen = false;

      console.log(popup, close, overlay);
    
    vis.addEventListener('click',()=>{
          if(!isOpen){
          overlay.style.display = 'block';
          popup.style.display = 'block';
          isOpen = true;
          }  
        });
    
    close.addEventListener('click',()=>{
        if(isOpen){
            overlay.style.display = 'none';
            popup.style.display = 'none';
            isOpen = false;
        }
      });

      overlay.addEventListener('click', ()=>{
        if(isOpen){
            overlay.style.display = 'none';
            popup.style.display = 'none';
            isOpen = false;
        }
      });

    })
    const pageContainer = document.getElementById('itemsshowing');
    pageContainer.innerHTML = `Showing ${startIndex+1} to ${endIndex} of ${dataToDisplay.length} items`;
    
    prevbtn.hidden = currentPage === 1;
    nextbtn.hidden = currentPage === Math.ceil(dataToDisplay.length/itemsPerPage);
}


function searching(){

    const search_input = document.getElementById('searchbar').value;
    dataToDisplay = loaddata.filter(item =>{ 
        return item.name.toLowerCase().includes(search_input.toLowerCase())            
                || item.organiser.toLowerCase().includes(search_input.toLowerCase())
                || item.typeOfEvent.toLowerCase().includes(search_input.toLowerCase())
                || item.awardsPrizesBenefits.toLowerCase().includes(search_input.toLowerCase())
                || item.eventDomainTags.toLowerCase().includes(search_input.toLowerCase())  
    });
    renderData();
}

prevbtn.addEventListener('click', prevpage=>{
    document.documentElement.scrollTop =0;
    currentPage--;
    renderData();
});

nextbtn.addEventListener('click', nextpage=>{
    document.documentElement.scrollTop =0;
    currentPage++;
    renderData();
});

dropdown.addEventListener('change', dropdown_change=>{
    currentPage = 1;
    renderData();
});


