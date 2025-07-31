import{formatCurrency} from '../scripts/utils/money.js';

// automated test 
if(formatCurrency(2095) === '20.95'){
    console.log('passed');
}else{
    console.log('failed ');
}

if(formatCurrency(2000.5) === '20.01'){ // basic case 
    console.log('passed');
}else{
    console.log('failed ');
}
if(formatCurrency(2000.4) === '20.00'){ // basic case 
    console.log('passed');
}else{
    console.log('failed ');
}


