const API_KEY = `7455486666bb410abcf1f726178fb9a8`;

let newsList = [];

const menus = document.querySelectorAll(".menus button");
console.log("mmm", menus);
menus.forEach((menu) => menu.addEventListener("click", (event) => getNewsByCategory(event)));

const fetchNews = async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    newsList = data.articles;
    render();
};

const getLatestNews = async () => {
    const url = new URL(`https://sage-valkyrie-336587.netlify.app/top-headlines?country=us&apiKey=${API_KEY}`);
    await fetchNews(url);
};

const getNewsByCategory = async (event) => {
    const category = event.target.textContent.toLowerCase();
    console.log("category", category);
    const url = new URL(
        `https://sage-valkyrie-336587.netlify.app/top-headlines?country=us&category=${category}&apiKey=${API_KEY}`
    );
    await fetchNews(url);
};

// 사이드 메뉴 확장 및 없애기
const openNav = () => {
    document.getElementById("sideMenu").style.width = "300px";
};

const closeNav = () => {
    document.getElementById("sideMenu").style.width = "0";
};

// 검색창

const SearchBox = () => {
    let inputArea = document.getElementById("input-area");
    if (inputArea.style.display === "none") {
        inputArea.style.display = "inline";
    } else {
        inputArea.style.display = "none";
    }
};

const searchNews = async () => {
    const keyword = document.getElementById("search-input").value;
    console.log("keyword", keyword);
    const url = new URL(
        `https://sage-valkyrie-336587.netlify.app/top-headlines?country=us&q=${keyword}&apiKey=${API_KEY}`
    );
    await fetchNews(url);
};

const imgError = (image) => {
    image.onerror = null;
    // 이미지 에러 핸들러를 중복 호출하지 않도록 이벤트 리스너 제거
    image.src =
        "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg";
};

// 기사 보이는 부분
const render = () => {
    const newsHTML = newsList
        .map((news) => `<div class="row news">
    <div class="col-lg-4">
        <img class="news-img-size" src="${
    news.urlToImage
        }" alt="뉴스 이미지" onerror="imgError(this)"/>
    </div>
    <div class="col-lg-8">
        <h2>${news.title}</h2>
        <p> ${
news.description == "null" || news.description == " "
            ? "내용없음"
            : news.description.length > 200
            ? news.description.substring(0, 200) + "..."
            : news.description
        }</p>
            <div>
                ${news.source.name || "no Source"} *
                ${moment(news.publishedAt).fromNow()}
            </div>
    </div>
</div>`)
        .join("");
    document.getElementById("news-board").innerHTML = newsHTML;
};

getLatestNews();
