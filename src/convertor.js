export default function convert(map, style){
    const { prefix, suffix, identifier } = normalize(style);
    return Object.entries(map).map(([key, value]) => {
        return `${prefix}${key}${identifier}${value}${suffix}`;
    }).join('\n');
}

function normalize(style) {
    let prefix = '';
    let suffix = '';
    let identifier = ':';
    if(style === 'sass'){
        prefix = '$';
    }else if(style === 'less'){
        prefix = '@';
        suffix = ';';
    }else if(style === 'stylus'){
        identifier = '=';
    }else{
        prefix = '$';
        suffix = ';';
    }
    return {
        prefix,
        suffix,
        identifier
    }
}


