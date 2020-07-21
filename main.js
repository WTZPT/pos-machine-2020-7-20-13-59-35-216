const productDB = [
    {
       barcode: 'ITEM000000',
       name: 'Coca-Cola',
       price: 3
     },
     {
       barcode: 'ITEM000001',
       name: 'Sprite',
       price: 3
     },
     {
       barcode: 'ITEM000002',
       name: 'Apple',
       price: 5
     },
     {
       barcode: 'ITEM000003',
       name: 'Litchi',
       price: 15
     },
     {
       barcode: 'ITEM000004',
       name: 'Battery',
       price: 2
     },
     {
       barcode: 'ITEM000005',
       name: 'Instant Noodles',
       price: 4
     }
 ]

function printReceipt(barcodes) {
     
    var barcode_quantity_maps = duplicateRemovalBarcodes(barcodes);
    var itemReceipts = createItemReceipts(barcode_quantity_maps);
    var total = sumReceiptsTotal(itemReceipts);
    var receipt = generateReceipt(itemReceipts,total);
    console.log(receipt)
}


function duplicateRemovalBarcodes(barcodes){
    var barcode_quantity_maps = new Map();
    for(let barcode of barcodes){
        if(barcode_quantity_maps.has(barcode)) {
            let barcode_quantity = barcode_quantity_maps.get(barcode);
            barcode_quantity.quantity++;
            barcode_quantity_maps.delete(barcode);
            barcode_quantity_maps.set(barcode,barcode_quantity);
        } else {
            let barcode_quantity = {};
            barcode_quantity.barcode = barcode;
            barcode_quantity.quantity = 1;
            barcode_quantity_maps.set(barcode,barcode_quantity);
        }
    }

    return barcode_quantity_maps;
}

function createItemReceipts(barcode_quantity_maps) {
    let itemReceipts = [];

    for(let barcode of barcode_quantity_maps.keys()) {

        let product = findProductByBarcode(barcode);
        let itemReceipt = generateItemReceipt(barcode_quantity_maps.get(barcode),product)
        itemReceipts.push(itemReceipt);
    }
    return itemReceipts;   
}

function findProductByBarcode(barcode) {
    for(let product of productDB) {
        if(product.barcode == barcode) {
            return product;
        }
    }

    return null;
}

function generateItemReceipt(barcode_quantity,product){
    let itemReceipt = {};
    itemReceipt.Name = product.name;
    itemReceipt.Quantity = barcode_quantity.quantity;
    itemReceipt.UnitPrice = product.price;
    itemReceipt.Subtotal = barcode_quantity.quantity*product.price;
    return itemReceipt;
}

function sumReceiptsTotal(itemReceipts){
    let total = 0;
    for(let itemReceipt of itemReceipts) {
        total += itemReceipt.Subtotal;
    }
    return total;
}

function generateReceipt(itemReceipts,total) {
    let receiptText = "\n***<store earning no money>Receipt ***\n";
    for(let itemReceipt of itemReceipts) {
        receiptText += "Name: "+ itemReceipt.Name + ", Quantity: "+itemReceipt.Quantity 
        + ", Unit price: " + itemReceipt.UnitPrice + " (yuan), Subtotal: " + itemReceipt.Subtotal
        +" (yuan)\n";
    }
    receiptText += "----------------------\nTotal: " + total + " (yuan)\n**********************"
    return receiptText;
}
module.exports = {
    printReceipt
};

