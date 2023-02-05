const {Configuration , OpenAIApi} = require("openai");

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);



const generateImage = async (req,res) => { 
    const { prompt , size } = req.body;
    console.log("---------------------------------------------------------------");
    console.log(req);
    const imageSize = 
        size === false ? '256x256' : '512x512';

    try{
        const response = await openai.createImage({
            prompt,
            n: 1,
            size: imageSize,
        });
        const imageUrl = response.data.data[0].url
        res.status(200).json({
            success : true,
            data: imageUrl
        });

    }catch(error){
        console.log(error)
        if (error.response) {
            console.log(error.response.status);
            console.log(error.response.data);
          } else {
            console.log(error.message);
          }        
        res.status(400).json({
            success : false,
            error: 'The image could not be generated'

        });
    }
};

module.exports = { generateImage } ;
