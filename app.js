const auth = "563492ad6f917000010000018b844077d9524de9834c005c2cff6d99";
const gallery = document.querySelector(".gallery");
const searchInput = document.querySelector(".search-input");
const form = document.querySelector(".search-form");
const more = document.querySelector(".more");
let searchValue;
let currentUrl;
let pages = 1;
let currentSearch;

const getRequest = async (url) => {
  const getData = await fetch(url, {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: auth,
    },
  });
  const data = await getData.json();
  return data;
};

const generateHtml = (data) => {
  data.photos.forEach((photo) => {
    const galleryImg = document.createElement("div");
    galleryImg.classList.add("gallery-img");
    galleryImg.innerHTML = `
        <div class="gallery-info">
        <p>${photo.photographer}</p>
        <a href=${photo.src.original}>Download</a>
        </div>
        <img src="${photo.src.large}"></img>
        `;
    gallery.appendChild(galleryImg);
  });
};
const photon = async () => {
  currentUrl = "https://api.pexels.com/v1/curated?per_page=15&page=1";
  const data = await getRequest(currentUrl);
  generateHtml(data);
};
photon();

searchInput.addEventListener("input", (e) => {
  searchValue = e.target.value;
});
//
// search logic
//
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  currentSearch = searchValue;
  clear();
  currentUrl = `https://api.pexels.com/v1/search?query=${searchValue}+query&per_page=15&page=1`;
  const data = await getRequest(currentUrl);
  generateHtml(data);
});

const clear = () => {
  gallery.innerHTML = "";
  searchInput.value = "";
};

more.addEventListener("click", async () => {
  pages++;
  if (currentSearch) {
    currentUrl = `https://api.pexels.com/v1/search?query=${currentSearch}+query&per_page=15&page=${pages}`;
  } else {
    currentUrl = `https://api.pexels.com/v1/curated?per_page=15&page=${pages}`;
  }
  const data = await getRequest(currentUrl);
  generateHtml(data);
});
