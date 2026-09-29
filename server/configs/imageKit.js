import ImageKit from "imagekit";

var imagekit = new ImageKit({
    publicKey : process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey : process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint : process.env.IMAGEKIT_URL_ENDPOINT
});

export default imagekit;


// test it eventually 
// import ImageKit from "imagekit";

// const {
//     IMAGEKIT_PUBLIC_KEY,
//     IMAGEKIT_PRIVATE_KEY,
//     IMAGEKIT_URL_ENDPOINT,
// } = process.env;

// if (
//     !IMAGEKIT_PUBLIC_KEY ||
//     !IMAGEKIT_PRIVATE_KEY ||
//     !IMAGEKIT_URL_ENDPOINT
// ) {
//     throw new Error("ImageKit environment variables are missing");
// }

// const imagekit = new ImageKit({
//     publicKey: IMAGEKIT_PUBLIC_KEY,
//     privateKey: IMAGEKIT_PRIVATE_KEY,
//     urlEndpoint: IMAGEKIT_URL_ENDPOINT,
// });

// export default imagekit;
