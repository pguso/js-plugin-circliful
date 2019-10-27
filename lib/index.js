const calc=function(a,b,p) {
    if(a==="" || b==="" || p==="") {
        return "Please provide all parameters";
    }
    switch(p) {
        case '+': {
            return a+b;
            break;
        }
        case '-': {
            return a-b;
            break;
        }
        case '*': {
            return a*b;
            break;
        }
        case '/': {
            return a/b;
            break;
        }
        default:{return;}
    }
}

exports.calc=calc; //very important line
