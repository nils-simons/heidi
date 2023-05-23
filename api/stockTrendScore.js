const { Configuration, OpenAIApi } = require("openai");
const googleNewsAPI = require("google-news-json");
require('dotenv').config();


const regScore = /\-?\d+\.\d+/g


const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const stockTrendScore = async (term, nNews, res) => {
    new Promise(async (resolve, reject) => {
        var scoreCount = []

        var news = await googleNewsAPI.getNews(googleNewsAPI.SEARCH, term, "en-US")
        var news = news.items
        var i = 0

        for (const article of news) {

            if (i == nNews) {
                break;
            }

            articleTitle = article.title.split(' - ')[0]
            // console.log(articleTitle)
            try {
                var resp = await openai.createChatCompletion({
                    model: "gpt-3.5-turbo",
                    messages: [
                    {
                        "role": "system",
                        "content": `You are a financial advisor. When the user gives you a headline, respond with a number between -1.0 and 1.0, signifying whether the headline is extremely negative (-1.0), neutral (0.0), or extremely positive (1.0) for the stock value of ${term}.`
                    },
                    {
                        "role": "user",
                        "content": articleTitle
                    }
                    ],
                })
                 var score = regScore.exec(resp.data.choices[0].message.content)

            } catch (err) {
                score = null
            }

            if (score !== null) {
                // console.log(res.data.choices[0].message.content)
                console.log(`${articleTitle}   (${score})`)
                scoreCount.push(parseFloat(score))
                i++
            }
        }


        console.log(scoreCount)

        var tScore = 0
        for (const score of scoreCount) {
            tScore = tScore+score
        }
        console.log(tScore/scoreCount.length)
        res.send(JSON.stringify({score: tScore/scoreCount.length}))
    })
}


exports.stockTrendScore = stockTrendScore;