const API_KEY = `7455486666bb410abcf1f726178fb9a8`;

let newsList = [];

const menus = document.querySelectorAll(".menus button");
console.log("mmm", menus);
menus.forEach((menu) => menu.addEventListener("click", (event) => getNewsByCategory(event)));

let url = new URL(`https://sage-valkyrie-336587.netlify.app/top-headlines?country=us&apiKey=${API_KEY}`)
let totalResults = 0
let page = 1
const pageSize = 10
const groupSize = 5

const fetchNews = async () => {
    try {
        url.searchParams.set("page",page); // -> &page=page
        url.searchParams.set("pageSize",pageSize);
        let response = await fetch(url);
        let data = await response.json();
        if(response.status===200){
            if(data.articles.length===200){
                throw new Error("No result for this search");
            }
            newsList = data.articles;
            totalResults = data.totalResults
            render();  
            paginationRender();  
        } else{
            throw new Error(data.message);
        }
    } catch (error) {
        errorRender(error.message)
    }

};

const getLatestNews = async () => {
    url = new URL(`https://sage-valkyrie-336587.netlify.app/top-headlines?country=us&apiKey=${API_KEY}`);
    await fetchNews();
};

const getNewsByCategory = async (event) => {
    const category = event.target.textContent.toLowerCase();
    console.log("category", category);
    url = new URL(
        `https://sage-valkyrie-336587.netlify.app/top-headlines?country=us&category=${category}&apiKey=${API_KEY}`
    );
    await fetchNews();
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
    let keyword = document.getElementById("search-input").value;
    console.log("keyword", keyword);
    url = new URL(
        `https://sage-valkyrie-336587.netlify.app/top-headlines?country=us&q=${keyword}&apiKey=${API_KEY}`
    );
    await fetchNews();
};

const imgError = (image) => {
    image.onerror = null;
    // 이미지 에러 핸들러를 중복 호출하지 않도록 이벤트 리스너 제거
    image.src =
        "https://upload.wikimedia.org/wikipedia/commons/1/14/No_Image_Available.jpg";
};

// 기사 보이는 부분
const render = () => {
    let newsHTML = newsList
        .map(
            (news) => `<div class="row news">
    <div class="col-lg-4">
        <img class="news-img-size" src="${news.urlToImage}" alt="뉴스 이미지" onerror="imgError(this)"/>
    </div>
    <div class="col-lg-8">
        <h2>${news.title}</h2>
        <p> ${
news.description == null || news.description == " "
            ? "내용없음"
            : news.description.length > 200
            ? news.description.substring(0, 200) + "..."
            : news.description
        }</p>
            <div>
                ${news.source.name || "no Source"} 
                ${moment(news.publishedAt).fromNow()}
            </div>
    </div>
</div>`)
        .join("");
    document.getElementById("news-board").innerHTML = newsHTML;    
};

const errorRender = (errorMessage) =>{
    let errorHTML=`<div class="alert alert-danger d-flex align-items-center" role="alert">
        ${errorMessage}
    </div>`;

    document.getElementById("news-board").innerHTML=errorHTML
    
}

const paginationRender=()=>{
    // totalResult
    // page
    // pagesize
    // group size
    // totalPages
    let totalPages = Math.ceil(totalResults/pageSize);

    // pageGroup
    let pageGroup = Math.ceil(page/groupSize);

    // lastPage
    let lastPage =  pageGroup*5;
    if(lastPage>totalPages){
        lastPage=totalPages;
    }

    // 마지막 페이지그룹이 그룹사이즈보다 작다? lastPage=totalpage
    if(lastPage>totalPages){
        lastPage=totalPages;
    }

    // firstPage
    let firstPage = lastPage-4<=0?1:lastPage-4;

// 처음과 끝 페이지 그룹에서는 화살표 없애기 ⭐
let paginationHTML='';

if(page>1){
paginationHTML += `<li class="page-item" onclick="moveToPage(1)"><a class="page-link"><<<</a></li>
<li class="page-item" onclick="moveToPage(${page-1})"><a class="page-link">Previous</+a></li>`;
}
for(let i=firstPage;i<=lastPage;i++){
    paginationHTML+=`<li class="page-item ${i===page?"active":""}" onclick="moveToPage(${i})"><a class="page-link">${i}</a></li>`;
}
if(page<totalPages){
paginationHTML+=`<li class="page-item" onclick="moveToPage(${page+1})"><a class="page-link">Next</a></li>
<li class="page-item" onclick="moveToPage(${totalPages})"><a class="page-link">>>></a></li>`;
}
document.querySelector(".pagination").innerHTML =paginationHTML
    // <nav aria-label="Page navigation example">
    // <ul class="pagination">
    //     <li class="page-item"><a class="page-link" href="#">Previous</a></li>
    //     <li class="page-item"><a class="page-link" href="#">1</a></li>
    //     <li class="page-item"><a class="page-link" href="#">2</a></li>
    //     <li class="page-item"><a class="page-link" href="#">3</a></li>
    //     <li class="page-item"><a class="page-link" href="#">Next</a></li>
    // </ul>
    // </nav>
}
const moveToPage = (pageNum) =>{
    console.log("movetopage",pageNum);
    page=pageNum;
    fetchNews();
}

getLatestNews();

// 페이지네이션
// API를 통해 알 수 있는 정보 : totalResult, page
// 우리가 정해야 하는 정보 : pageSize, groupSize

