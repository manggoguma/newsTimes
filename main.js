const API_KEY=`7455486666bb410abcf1f726178fb9a8`
let newsList = []

const getLatestNews=async()=>{
    const url=  new URL(`https://sage-valkyrie-336587.netlify.app/top-headlines?country=us&apiKey=${API_KEY}`)
    const response=await fetch(url)
    const data = await response.json()
    newsList = data.articles
    render();
    console.log("ddd",newsList);
}

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

const searchNews = () => {
    // Implement your search functionality here
    console.log("Searching news...");
};

// 기사 보이는 부분
const render=()=>{
    const newsHTML = newsList.map(news=>`<div class="row news">
    <div class="col-lg-4">
        <img class="news-img-size" src="${
            news.urlToImage ||
            "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/No-Image-Placeholder.svg/1665px-No-Image-Placeholder.svg.png"
        }"/>
    </div>
    <div class="col-lg-8">
        <h2>${news.title}</h2>
        <p> ${news.description=="null"||news.description==" "
        ?"내용없음"
        :news.description.length>200
        ?news.description.substring(0,200)+"..."
        :news.description
    }</p>
            <div>
                ${news.source.name|| "no Source"} *
                ${moment(news.publishedAt).fromNow()}
            </div>
    </div>
</div>`).join('');
    document.getElementById("news-board").innerHTML=newsHTML
}



getLatestNews();