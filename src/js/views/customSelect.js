function customSelect() {
  let dropdowns = document.querySelectorAll('.select');
  let dropdownChange = new Event('input');

  dropdowns.forEach(dropdown => {
    dropdown.addEventListener('click', toggleDropdown);
  });

  function toggleDropdown(event) {
    let dropdown = event.target.closest('.select');
    let dropdownOptions = dropdown.querySelector('.select-options');
    let dropdownBoxText = dropdown.querySelector('.select-box-text');

    let option = event.target.closest('.select-options-item');
    if (option) {
      if (dropdownBoxText.innerText !== option.innerText) {
        dropdownBoxText.innerText = option.innerText;
        dropdown.dispatchEvent(dropdownChange);
      }
    }

    dropdown.classList.toggle('active');
    dropdownOptions.classList.toggle('hidden');
  }
}

export default customSelect;
