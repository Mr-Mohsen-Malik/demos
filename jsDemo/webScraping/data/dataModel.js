import { data } from "../common/data";
let data2 = [];


let dataModel = {};

dataModel.getData = (req, res) => {
    console.log("getData")
    if (data == undefined || data == null) {
        return res.send({ 'error': '404' });
    }
    else {

        return res.send(data);
    }
}
dataModel.getDataById = (req, res) => {

    let id = req.query.id;
    if (id == 0) {
        return res.send(data);
    }
    else if (id <= data.length) {
        return res.send(data[id - 1]);
    }
    else {
        return res.send({ 'error': '404' });
    }
}
dataModel.getDataByName = (req, res) => {
    let name = req.query.name;
    if (name == null || name == undefined) {
        return res.send({ 'error': '404' });
    }
    else {

        let nameArr = [];
        let len = 0;
        let promis = new Promise((resolve, rejects) => {
            try {

                for (let i = 0; i < data.length; i++) {
                    var newName = `^.*${name}.*$`;
                    var re = new RegExp(newName,"i");
                    if (data[i].name.match(re) != null) {
                        nameArr[len++] = data[i];
                    }
                }
                return resolve(nameArr);

            }
            catch (error) { return rejects(error); }
        });
        promis
            .then((nameArr) => {
                return res.send(nameArr);
            })

    }
}



module.exports = dataModel;