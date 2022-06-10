const advancedStorage = artifacts.require('./AdvancedStorage.sol');

contract('AdvancedStorage',()=>{
    let AdvancedStorage = null;
    before(async () => {
        AdvancedStorage = await advancedStorage.deployed();
    })
    it('Should add element in the array', async () =>{
       await AdvancedStorage.addContent(10);
        const result = await AdvancedStorage.data(0);
        assert(result.toNumber() === 10);
    })
    
    it('Should get single element in the array', async () =>{
        await AdvancedStorage.addContent(20);
        const result = await AdvancedStorage.data(1);
        assert(result.toNumber() === 20);
    })

    it('Should displayAllContent in the array', async () =>{
        const rawIds = await AdvancedStorage.displayAllContent();
        const ids = rawIds.map(id => id.toNumber());
        assert.deepEqual(ids , [10,20]);
    })

    it('Should display length of the array', async () =>{
        const result  = await AdvancedStorage.length();
        assert(result.toNumber() === 2);
    })
})