import rp from 'request-promise';
import cheerio from 'cheerio';

const options = {
    uri: `https://www.newdinosaurs.com/`,
    transform: (body) => {
        return cheerio.load(body);
    }
};
let name = [];
let image = [];
let info = [];
console.log('------STARTED--------')
rp(options)
    .then(($) => {
       
        $('.td-block-span6').find('.td-excerpt').each((i, el) => {
            info[i] = el.children[0].data;
            // console.log("\n\nNo.: ", i, "titles: ", el.children[0].data);
        })
        $(".td-block-span6").find('img').each((i, el) => {
            image[i]=el.attribs.src;
            name[i]=el.attribs.title;
            //   console.log("\n\nNo.: ",i,"images: ",el.attribs.src);
            
        })


    })
    .then(() => {
        export default data = {
            name: name,
            image: image,
            info: info
        }        
        console.log('------ENDED--------')
    })
    .catch((err) => {
        console.log(err)
    });

  ;

     //     $('li').each((i, el) => {
        //          name[i]=el.children[0].children[0].data;
        //         console.log('------Entery No.'+i+'--------')
        //         console.log("\n\nNo.: ", i, "data: ",el.children[0].children[0].data);
        // })

        //  console.log("Names => \n",name);
        // console.log("Images => \n",image);
        // console.log("Info => \n",info);