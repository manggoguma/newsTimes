const API_KEY=`7455486666bb410abcf1f726178fb9a8`
let news = []
const getLatestNews=async()=>{
const API_KEY=`7455486666bb410abcf1f726178fb9a8`
    const url=  new URL(`https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`)
    const response=await fetch(url)
    const data = await response.json()
    news = data.articles
    console.log("ddd",news);
}
getLatestNews();