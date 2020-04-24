const listEl = document.querySelector('#content');

const collections = async () => {
  const response = await fetch("https://www.loc.gov/collections/?fo=json");
  const data = await response.json();
  console.log(data);
}

collections();