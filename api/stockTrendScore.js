const { Configuration, OpenAIApi } = require("openai");
const googleNewsAPI = require("google-news-json");
require('dotenv').config();


const regScore = /\-?\d+\.\d+/g

const stockTrendScore = (term, nNews) => {
    var scoreCount = []

    googleNewsAPI.getNews(googleNewsAPI.SEARCH, term, "en-US", async (err, news) => {
        // console.log(news);
        var news = news.items.slice(0, nNews);
        for (const article of news) {
            articleTitle = article.title.split(' - ')[0]
            // console.log(articleTitle)
            var res = await openai.createChatCompletion({
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

            var score = regScore.exec(res.data.choices[0].message.content)

            if (score !== null) {
                // console.log(res.data.choices[0].message.content)
                console.log(`${articleTitle}   (${score})`)
                scoreCount.push(parseFloat(score))
            }
        }
        console.log(scoreCount)

        var tScore = 0
        for (const score of scoreCount) {
            tScore = tScore+score
        }
        console.log(tScore/scoreCount.length)
    });

    const configuration = new Configuration({
        apiKey: process.env.OPENAI_API_KEY,
    });
    const openai = new OpenAIApi(configuration);

}


exports.stockTrendScore = stockTrendScore;