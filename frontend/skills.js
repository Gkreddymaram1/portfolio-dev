// Fetch skills data from the backend API
fetch('http://localhost:3000/skills')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    return response.json();
  })
  .then(data => {
    console.log('Skills data:', data);
    // You can process the data here, e.g., display in the DOM
    // For example, assuming you have a div with id 'skills-list'
    const skillsList = document.getElementById('skills-list');
    skillsList.innerHTML = '<ul></ul>';
    const ul = skillsList.querySelector('ul');
    data.forEach(skill => {
      const li = document.createElement('li');
      li.textContent = `${skill.skillName} - ${skill.experience} years`;
      ul.appendChild(li);
    });
  })
  .catch(error => {
    console.error('There was a problem with the fetch operation:', error);
  });