let searchInput = document.getElementById('searchInput');
// console.log(searchInput)

// Execute function on keyup
searchInput.addEventListener("keyup", (e) => {
    for (let i of sortedNames) {
        // convert input to lowercase and compare with each string
        if (
            i.toLowerCase().startsWith(searchInput.value.toLowerCase()) && searchInput.value != ""
        ) {
            // create Li element
            let listItem = document.createElement("li");
            // One common class name
            listItem.classList.add("list-items");
            listItem.style.cursor = "pointer";
            listItem.setAttribute("onclick", "displayNames('" + i + "')");
            // Display matched pert in bold
            let word = "<b>" + i.substring(0, searchInput.value.length) + "<b>";
            word += i.substring(searchInput.value.length);
            // Display the value in array
            listItem.innerHTML = word;
            document.querySelector(".section-order__list").appendChild(listItem);
            console.log(word)
        }
    }
});
function displayNames(value) {
    searchInput.value = value;
}






