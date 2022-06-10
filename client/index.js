import Web3 from "web3";
import AdvancedStorage from '../build/contracts/AdvancedStorage.json';

let web3;
let advancedStorage; 

const initWeb3 = () => {
    return new Promise((resolve,reject)=>{
        //case1 : new metamask
        if(typeof window.ethereum !== 'undefined'){
            window.ethereum.enable()
            .then( () => {
                resolve(
                    new Web3(window.ethereum)  
                );
            })
            .catch(e => {
                reject(e);
            });
        }
       
        //case2 : old metamask
        if( typeof window.web3 !== 'undefined'){
            return resolve(
            new Web3(window.web3.currentProvider)
            );
        }
        //case3 : no  metamask
        resolve(new Web3('HTTP://127.0.0.1:7545'))
        
    });
   
};

const initContract = () => {
    const deploymentKey = Object.keys(AdvancedStorage.networks);
    console.log(deploymentKey);
    return new web3.eth.Contract(AdvancedStorage.abi,AdvancedStorage.networks[deploymentKey].address);
};


const initApp = () => {
    console.log("initApp")
    const $addData = document.getElementById('addData');
    const $data = document.getElementById('data');

    let accounts = []

    web3.eth.getAccounts()
    .then(_accounts => {
        accounts = _accounts;
        return advancedStorage.methods
        .displayAllContent()
        .call();
    })
    .then( result => {
        $data.innerHTML = result.join(', ');
    })
   

    $addData.addEventListener('submit', e => {
        e.preventDefault();
        const data = e.target.elements[0].value;
        advancedStorage.methods
        .addContent(data)
        .send({from:accounts[0]})
        .then(() => {
            return advancedStorage.methods
            .displayAllContent()
            .call();
        })
        .then( result => {
            $data.innerHTML = result.join(', ');
        });
    });

};

document.addEventListener("DOMContentLoaded",() =>{
    initWeb3()
    .then(_web3 =>{
        web3 = _web3;
        advancedStorage = initContract();
        initApp();
    })
    .catch(e => { 
        console.log(e.message);
    });
})