import rp from 'request-promise';
import cheerio from 'cheerio';

const options = {
    uri: `https://www.newdinosaurs.com/`,
    transform: (body) => {
        return cheerio.load(body);
    }
};
let data = [];
let name = [];
let image = [];
let info = [];
console.log('------STARTED--------')
rp(options)
    .then(($) => {

        $('.td-block-span6').find('.td-excerpt').each((i, el) => {
            info[i] = el.children[0].data;
            // console.log("\n\nNo.: ",i,"name: ",el.attribs.title);
            //  console.log("\n\nNo.: ", i, "info: ", el.children[0].data);
        })
        $(".td-block-span6").find('img').each((i, el) => {
            image[i] = el.attribs.src;
            name[i] = el.attribs.title;
            //   console.log("\n\nNo.: ",i,"images: ",el.attribs.src);
            //   console.log("\n\nNo.: ",i,"name: ",el.attribs.title);

        })


    })
    .then(() => {
        for (let i = 0; i < name.length; i++) {
            data[i] = { 'id': i+1, 'name': name[i], 'info': info[i], 'image': image[i] };
        }
        //    console.log(name.length);
        // console.log("Names => \n",name);
        // console.log("Images => \n",image);
        // console.log("Info => \n",info);
        console.log('------ENDED--------')
    })
    .catch((err) => {
        console.log(err)
    });

module.exports = { data };  