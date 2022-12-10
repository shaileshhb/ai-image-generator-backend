const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const generateImage = async (req, res) => {

  const  { prompt, imageSize } = req.body;

  try {
    // "naruto mobile wallpaper"
    const response = await openai.createImage({
      prompt: prompt,
      n: 1,
      size: imageSize,
    })

    console.log(response);
    const imageURL = response.data.data[0].url

    res.status(200).json({
      data: imageURL
    })

  } catch (error) {
    if (error.response) {
      console.log(error.response.status);
      console.log(error.response.data);
      res.status(400).json({
        error: error.response.data,
      })
    } else {
      console.log(error.message);

      res.status(400).json({
        error: error.message,
      })
    }

  }
}

module.exports = {
  generateImage
}