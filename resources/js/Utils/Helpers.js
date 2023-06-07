
//define slugify method
export function slugify(str) {
    if(str){
    str = str.replace(/^\s+|\s+$/g, ''); // trim leading/trailing white space
    str = str.toLowerCase(); // convert string to lowercase
    str = str.replace(/[^a-z0-9 -]/g, '') // remove any non-alphanumeric characters
        .replace(/\s+/g, '-') // replace spaces with hyphens
        .replace(/-+/g, '-'); // remove consecutive hyphens
    return str;
    }
    else {
        return null;
    }
}
//define makeTitle method
export function makeTitle(slug) {
    var words = slug.replaceAll('-', ' ').replaceAll('_', ' ').split(' ')


    for (var i = 0; i < words.length; i++) {
        var word = words[i];
        words[i] = word.charAt(0).toUpperCase() + word.slice(1);
    }

    return words.join(' ');
}
export const toArray = (object) => {
    let  array= [];
    for (const key in object) {
        array.push(
            {
                key: key,
                value: object[key]
            }
        )
    }
    return array;
}

export const isClient = (auth) => {
    return auth.user.roles[0].name === 'client' ? true : false;
}