const fs = require('fs');
const superagent = require('superagent');


const readFilePro = file => {
    return new Promise((resolve, reject) => {
        fs.readFile(file, 'utf-8', (err, data) => {
            if (err) reject("I count not find that file");
            resolve(data);
        })
    })
}

const writeFilePro = (file, data) => {
    return new Promise((resolve, reject) => {
        fs.writeFile(file, data, err => {
            if (err) reject('could not write file');
            resolve('success');
        })
    });
}

// readFilePro(`../4-async-js/doggg.txt`).then(data => {
//     console.log('data', data);
//     return superagent.get(`https://dog.ceo/api/breed/${data}11/images/random`)
// })
//     .then((res) => {
//         console.log(res.body.message);
//         // return writeFilePro('./dog-img.txt', res.body.message);
//         return superagent.get(`https://dog.ceo/api/breed/${data}11/images/random`)
//     })
//     .then(res => {
//         console.log('random dogs');
//     })
//     .catch(err => console.log('2-', err))

// async/ await

const getDogPic = async () => {
    try {
        const data = await readFilePro(`../4-async-js/dog.txt`);
        console.log(`Bread: ${data}`);
        const res1 = await superagent.get(`https://dog.ceo/api/breed/${data}GG/images/random`);
        const res2 = await superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
        const all = await Promise.all([res1,res2]);
        const [img1,img2] = all.map(x=>x.body.message);
        console.log(img1,img2);
        console.log('Random dog');
    }
    catch (err) {
        console.log(err.message != null ? `1.5 err.message` : `1.5 err`);
        // nếu ko có throw err thì khi nó xuống catch nhưng nó vẫn trả về giá trị 2.ready
        throw err;
    }
    return `2.ready`;
}

// console.log(`1-----`);
// getDogPic()
//     .then(x => {
//         console.log(x);
//         console.log(`3-----`);
//     })
//     .catch(err => {
//         console.log(err.message != null ? `${err.message}` : err);
//     });

(async () => {
    try {
        console.log(`1-----`);
        const x = await getDogPic();
        console.log(x);
        console.log(`3-----`);
    }
    catch {
        console.log('error-----------');
    }
})();

// readFilePro(`../4-async-js/dog.txt`).then(data=>{
//     console.log('data',data);
//     superagent.get(`https://dog.ceo/api/breed/${data}11/images/random`)
//     .then((res) => {
//         console.log(res.body.message);
//         fs.writeFile('./dog-img.txt', res.body.message, (err) => {
//             if (err) return console.log(object);
//             console.log("print ok");
//         })
//     })
//     .catch(err=>console.log(err.message));
// })

// fs.readFile(`../4-async-js/dog.txt`, { encoding: 'utf-8' }, (err, data) => {
//     console.log(data);

//     superagent.get(`https://dog.ceo/api/breed/${data}/images/random`)
//         .then((res) => {
//             console.log(res.body.message);
//             fs.writeFile('./dog-img.txt', res.body.message, (err) => {
//                 if (err) return console.log(object);
//                 console.log("dasdad");
//             })
//         })
// })