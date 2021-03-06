const download = require('image-downloader');
const GoogleImages = require('google-images');

const client = new GoogleImages('015019655846772113991:ilcjc1u67ka', 'AIzaSyAul6EAakSG0CnwLTmroXnZsQFkbvyx7UI');


export default async function searchImage(name) {
  let res;
  let result;

  if (!(name === '' || name === undefined || name === null)) {
    result = await client.search(name, { size: 'large' })
      .then((images) => {
        // console.log(images);
        res = images[0].url;

        // download.image({
        //   url: res.url,
        //   dest: '/src/assets/img/people/',
        // })
        //   .then(({
        //     filename,
        //     image,
        //   }) => {
        //     console.log('File saved to', filename);
        //   }).catch((err) => {
        //     throw err;
        //   });

        /*
		[{
			"url": "http://steveangello.com/boss.jpg",
			"type": "image/jpeg",
			"width": 1024,
			"height": 768,
			"size": 102451,
			"thumbnail": {
				"url": "http://steveangello.com/thumbnail.jpg",
				"width": 512,
				"height": 512
			}
		}]
		 */
      });
  }

  return res;
}

// module.exports = searchImage;
