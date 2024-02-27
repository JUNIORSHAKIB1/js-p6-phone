const loadPhone = async (searchText, isShowAll) => {
    const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchText}`);

    const data = await res.json();
    const phones = data.data;
    // console.log(phones);
    displayPhones(phones, isShowAll);
    
}

const displayPhones = (phones, isShowAll) => {

    const phoneContainer = document.getElementById("phone-container");
    // clear phone container cards before adding new cards
    phoneContainer.textContent = '';

    // display show button if there are more then 12 phones
    const showAllContainer = document.getElementById('show-all-container');
    if(phones.length > 12 && !isShowAll){
        showAllContainer.classList.remove('hidden');

    }else{
        showAllContainer.classList.add('hidden');
    }

    
    console.log(isShowAll);
    // display only first 10 phone if not show All
    if(!isShowAll){
        phones = phones.slice(0,12);
    }



    phones.forEach(phone => {
        // console.log(phone);
        // 1 caret a div
        const phoneCard = document.createElement('div');
        phoneCard.classList = `card w-96 bg-base-100 shadow-xl`;
        // 3 set inner html 
    phoneCard.innerHTML =`
     <figure><img src="${phone.image}" alt="Shoes" /></figure>
    <div class="card-body">
        <h2 class="card-title">${phone.phone_name}</h2>
        <p>If a dog chews shoes whose shoes does he choose?</p>
        <div class="card-actions justify-center">
        <button onclick="handleShowDetail('${phone.slug}'); show_details_modal.showModal()" class="btn btn-primary">Show details</button>
        </div>
    </div>`;
        // 4 append child
        phoneContainer.appendChild(phoneCard);
    });

    // hide loading spinner 
    toggleLoadingSpinner(false);
}; 

   //
   const handleShowDetail = async (id) =>{
    console.log(id);
    // load dingle phone data
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json();
    const phone = data.data;

    showPhoneDetails(phone);

   }

const showPhoneDetails = (phone) => {
    console.log(phone);

    // Display the phone name
    const phoneName = document.getElementById('phone-name');
    phoneName.innerText = phone.name;

    // Get the container to display phone details
    const showDetailContainer = document.getElementById("show-detail-container");

    // Update the container with phone details
    showDetailContainer.innerHTML = `
        <img src="${phone.image}" alt="${phone.name}" />
        <p><span>Store:</span> ${phone?.mainFeatures?.storage}</p>
        <p><span>GPS:</span> ${phone?.others?.GPS}</p>
    `;

    // Assuming `show_details_modal` is defined somewhere and is meant to show a modal
    show_details_modal.showModal();
}



// handle search button
const handleSearch = (isShowAll) =>{
    toggleLoadingSpinner();
    const searchField = document.getElementById("search-field");
    const searchText = searchField.value;
    console.log(searchText);
    loadPhone(searchText, isShowAll);
}
// handel charge reap 
// const handleSearch2 = () =>{
//     toggleLoadingSpinner();
//     const searchField = document.getElementById("search-field2");
//     const searchText = searchField.value;
//     loadPhone(searchText);
// }

const toggleLoadingSpinner = (isLoading) =>{
    const loadingSpinner = document.getElementById('loading-spinner');
    if(isLoading){
        loadingSpinner.classList.remove('hidden');
    }else{
        loadingSpinner.classList.add('hidden');
    }

}

// handle show all 
const handleShowAll = () =>{
    handleSearch(true);
}

// loadPhone();